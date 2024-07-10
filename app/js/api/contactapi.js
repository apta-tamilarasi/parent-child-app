let contactGet = (parentid, page = 1) => {
  getContact = {
    url: `${orgDetails.dc}/contacts?page=${page}&organization_id=${orgDetails.orgId}`,
    method: "GET",
    connection_link_name: "zohobookscontact",
  };
  parentSelect = document.getElementById("parent-select");

  ZFAPPS.request(getContact)
    .then(function (value) {
      let responseJSON = JSON.parse(value.data.body);
      contacts = [...contacts, ...responseJSON.contacts];
      page = page + 1;
      if (responseJSON.page_context.has_more_page === true) {
        contactGet(parentid, page);
      } else {
        contacts = contacts.filter((customer) => {
          return customer.contact_type === "customer";
        });
        customDatas = [];
        if (!isEdit && !isCreate) {
          customGet(parentid);
        }
       
        else {
          isEdit = false;
          isCreate = false;
          currentTab(1);
        }
      }
    })
    .catch(function (err) {
      console.error("contact-get request failed", err);
      let errorMsg = err.message.split(":")[0]
        ? err.message
        : "Something went wrong";
      if (err.message === errorMsg) {
        ShowNotification(
          `Un authenticated,Please establish the connection ${
            err.message.split(":")[1]
          }, go to settings under Developer space > Connections > New connection >My connections>connect zohobookscontact`,
          "error"
        );
      } else {
        ShowNotification(errorMsg, "error");
      }
    });
};
