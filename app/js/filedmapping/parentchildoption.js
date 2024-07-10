let parentOptionSelect = (id) => {
  let parentSelect = document.getElementById(id);
  if (parentSelect.innerHTML !== null) {
    parentSelect.innerHTML = "";
  }
  if (!isEdit && id !== "paymentrecord") {
    let parentOpt = document.createElement("option");
    parentOpt.textContent = "Select Parent Company";
    parentOpt.value = "";
    parentSelect.append(parentOpt);
  }
  else if (id === "paymentrecord") {
    paymentRecordSec.innerHTML = ""
    let parentOpt = document.createElement("option");
    parentOpt.textContent = "Select Customer Name";
    parentOpt.value = "";
    paymentRecordSec.append(parentOpt);
  }

  if (id === "invoice-sec" || id === "totalinvoice-sec" || id === "payment-sec" || id === "paymentrecord") {
    customDatas.map((e) => {
      let parentOpt = document.createElement("option");
      parentOpt.textContent = e.cf__ungzm_parent_company;
      parentOpt.value = e.cf__ungzm_parent_company_id;
      parentSelect.append(parentOpt);
    });
  }
  else {
    if (isEdit) {
      let parentOpt = document.createElement("option");
      parentOpt.textContent = selectParentName;
      parentOpt.value = selectParent;
      parentSelect.append(parentOpt);
    } else if (isCreate) {
      contacts.map((e) => {
        isChild = false;
        childSelectPrevious.find((c) => {
          if (c === e.contact_id) {
            isChild = true;
          }
        });
        customDatas.map((custom) => {
          if (custom.cf__ungzm_parent_company_id === e.contact_id) {
            isChild = true;
          }
        });
        if (!isChild) {
          let parentOpt = document.createElement("option");
          parentOpt.textContent = e.contact_name;
          parentOpt.value = e.contact_id;
          parentSelect.append(parentOpt);
        }
      });
    } else {
      contacts.map((e) => {
        isChild = false;
        childSelectPrevious.find((c) => {
          if (c === e.contact_id) {
            isChild = true;
          }
        });
        if (!isChild) {
          let parentOpt = document.createElement("option");
          parentOpt.textContent = e.contact_name;
          parentOpt.value = e.contact_id;
          parentSelect.append(parentOpt);
        }
      });
    }
  }
};

let childOptionSelect = (selectParent, contacts, childid) => {
  let childSelect = document.getElementById(childid);
  childSelect.innerHTML = "";
  let opt = document.createElement("option");
  opt.appendChild(document.createTextNode("Select Child Company"));
  opt.value = "";
  opt.disabled = true;
  childSelect.appendChild(opt);
  contacts.forEach(function (option) {
    let isParentChild = false;

    if (selectParent !== option.contact_id) {
      parentChildSelectPrevious.find((c) => {
        if (option.contact_id === c) {
          isParentChild = true;
        }
      });

      if (isParentChild) {
        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode(option.contact_name));
        opt.value = option.contact_id;
        opt.disabled = true;
        childSelect.appendChild(opt);
      } else {
        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode(option.contact_name));
        opt.value = option.contact_id;
        childSelect.appendChild(opt);
      }
    }
  });
  M.FormSelect.init(childSelect);
};
