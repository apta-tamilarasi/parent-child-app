let customGet = (id, page = 1) => {

  childSelectPrevious = [];

  let custom = {
    url: `${orgDetails.dc}/cm__ungzm_parent_child_data?page=${page}&organization_id=${orgDetails.orgId}`,
    method: "GET",
    connection_link_name: "zohobookscontact",
  };
  ZFAPPS.request(custom)
    .then(function (value) {
      if (page === 1) {
        customDatas = [];
      }
      let responseJSON = JSON.parse(value.data.body);
      customDatas = [...customDatas, ...responseJSON.module_records];

      if (responseJSON.page_context.has_more_page) {
        page = page + 1;
        customGet(id, page);
      } else {
        customDatas.map((child) => {
          let x = child.cf__ungzm_child_company_id.split(",");
          x.map((childId) => {
            childSelectPrevious.push(childId);
            parentChildSelectPrevious.push(
              childId,
              child.cf__ungzm_parent_company_id
            );
          });
        });

        childOptionSelect(selectParent, contacts, "child-select");

        if (id === "parent-select") {
          parentOptionSelect(id);
          childSelectValue(selectParent, "child-select");
        } else if (id === "invoice-sec") {
          parentOptionSelect("invoice-sec");
        } else if (id === "totalinvoice-sec") {
          parentOptionSelect("totalinvoice-sec");
        }
        else if (id === "payment-sec") {
          parentOptionSelect("payment-sec")
        }
        else if (id === "paymentrecord") {
          parentOptionSelect("paymentrecord")
        }

        else if (field) {
          fieldTable.innerHTML = "";
          fieldReport();
        }
      }
    })
    .catch(function (err) {
      console.error("custom-get request falied", err);
    });
};

let customPost = (parentChildSelect) => {
  let custom = {
    url: `${orgDetails.dc}/cm__ungzm_parent_child_data?organization_id=${orgDetails.orgId}`,
    method: "POST",
    body: {
      mode: "raw",
      raw: parentChildSelect,
    },
    connection_link_name: "zohobookscontact",
  };
  ZFAPPS.request(custom)
    .then(function (value) {
      let responseJSON = JSON.parse(value.data.body);
    })
    .catch(function (err) {
      console.error("err", err);
    });
};

let customDelete = (moduleId) => {
  field = true;
  // let checkBox = document.querySelectorAll(".selectCheckbox");
  // checkBox.forEach((check) => {
  //   if (check.checked) {
      let custom = {
        url: `${orgDetails.dc}/cm__ungzm_parent_child_data/${moduleId}?organization_id=${orgDetails.orgId}`,
        method: "DELETE",
        connection_link_name: "zohobookscontact",
      };
      ZFAPPS.request(custom)
        .then(function (value) {
          let responseJSON = JSON.parse(value.data.body);
        })
        .catch(function (err) {
          console.error("err", err);
        });
    // }
  // });

  customDatas = [];
  contacts = [];
  contactGet();
};

let customPut = (parentChildSelect,isCustomPut) => {
  parentChildSelect = { ...parentChildSelect, module_record_id };
  let custom = {
    url: `${orgDetails.dc}/cm__ungzm_parent_child_data?organization_id=${orgDetails.orgId}`,
    method: "PUT",
    body: {
      mode: "raw",
      raw: parentChildSelect,
    },
    connection_link_name: "zohobookscontact",
  };
  ZFAPPS.request(custom)
    .then(function (value) {
      let responseJSON = JSON.parse(value.data.body);
      isCustomPut = false;
    })
    .catch(function (err) {
      console.error("err", err);
    });
};
