

let creditNotesGet = (page = 1) => {
  let creditNo = {
    url: `${orgDetails.dc}/creditnotes?page=${page}&organization_id=${orgDetails.orgId}`,
    method: "GET",
    connection_link_name: "zohobookscontact",
  };
  ZFAPPS.request(creditNo)
    .then(function (value) {
      let responseJSON = JSON.parse(value.data.body);
      credits = [...credits, ...responseJSON.creditnotes];
      page = page + 1;
      if (responseJSON.page_context.has_more_page === true) {
        creditNotesGet(page);
      }
    })
    .catch(function (err) {
      console.error("credit notes request failed", err);
    });
};

let debitNotesGet = (page = 1) => {
  let debitNo = {
    url: `${orgDetails.dc}/vendorcredits?page=${page}&organization_id=${orgDetails.orgId}`,
    method: "GET",
    connection_link_name: "zohobookscontact",
  };
  ZFAPPS.request(debitNo)
    .then(function (value) {
      let responseJSON = JSON.parse(value.data.body);
      debits = [...debits, ...responseJSON.vendor_credits];
      page = page + 1;
      if (responseJSON.page_context.has_more_page === true) {
        debitNotesGet(page);
      }
    })
    .catch(function (err) {
      console.error("debit notes request failed", err);
    });
};
