let saveTheDetails = (parent, child) => {
  let parentSelect = document.getElementById("parent-select");
  if (parentSelect.value !== "") {
    parentSelect = document.getElementById(parent);
    let childSelect = document.getElementById(child);

    let multiple = false;
    let isCustomPut = true;

    let parentSelectedValues;
    let childSelectedValues = [];
    let parentSelectedId;
    for (let i = 0; i < parentSelect.options.length; i++) {
      let option = parentSelect.options[i];
      if (option.selected) {
        if (isEdit) {
          option.value = selectParent;
        }
        contacts.find((e) => {
          if (e.contact_id === option.value) {
            parentSelectedValues = `${e.contact_name}`;
            parentSelectedId = `${e.contact_id}`;
            customDatas.map((g) => {
              if (g.cf__ungzm_parent_company_id === e.contact_id) {
                isCustomPut = false;
                module_record_id = g.module_record_id;
              }
            });
          }
        });
      }
    }
    for (var i = 0; i < childSelect.options.length; i++) {
      let option = childSelect.options[i];
      if (option.selected) {
        multiple = true;
        contacts.filter((e) => {
          if (e.contact_id === option.value) {
            childSelectedValues.push({
              customer_name: e.contact_name,
              customer_id: e.contact_id,
            });
          }
        });
      }
    }
    const commaSeparatedChild = childSelectedValues
      .map((obj) => `${obj.customer_name}`)
      .join(",");
    const commaSeparatedChildid = childSelectedValues
      .map((obj) => `${obj.customer_id}`)
      .join(",");

    let parentChildSelect = {
      cf__ungzm_parent_company: parentSelectedValues,
      cf__ungzm_child_company: commaSeparatedChild,
      cf__ungzm_child_company_id: commaSeparatedChildid,
      cf__ungzm_parent_company_id: parentSelectedId,
    };
    if (!(!isEdit && !isCreate)) {
      parentOptionSelect(parent);
    }
   
    if (selectParent != null) {
      if (multiple) {
        contacts = [];
        customDatas = [];
        if (isCustomPut) {
          customPost(parentChildSelect);
        } else {
          customPut(parentChildSelect, isCustomPut);
        }
        if (!isEdit && !isCreate) {
          // parentOptionSelect(parent);
          ShowNotification("New Parent-Child Relation is created", "success");
        }

        fieldTable.innerHTML = "";
        allCheck = false;

        if (parent === "parent-select") {
          contactGet(parent);
        } else {
          contactGet("select");
        }
        if (!isEdit) {
          selectParent = null;
        }
      } else {
        ShowNotification("Please select the Child company", "error");
      }
      
    } else {
      if (multiple) {
        ShowNotification("Please select the Parent company", "error");
        selectParent = null;
      } else {
        ShowNotification("Please select the Parent and Child company", "error");
        selectParent = null;
      }
    }
  }
  else {
    ShowNotification("Please select the Parent company", "error");
  }
};
