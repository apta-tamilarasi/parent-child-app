let account=[]

let bankAccountGet = (page = 1) => {
    if(page===1){
        account=[]
    }
  let bank = {
    url: `${orgDetails.dc}/bankaccounts?page=${page}&organization_id=${orgDetails.orgId}`,
    method: "GET",
    connection_link_name: "zohobookscontact",
  };
  ZFAPPS.request(bank)
    .then(function (value) {
      let responseJSON = JSON.parse(value.data.body);
      account=[...account,...responseJSON.bankaccounts]
      if (responseJSON.page_context.has_more_page === true) {
        page = page + 1;
        bankAccountGet();
      }
      else{
       bankAccount.innerHTML=''
       let parentOpt = document.createElement("option");
          parentOpt.textContent ="Select Bank Account";
          parentOpt.value =JSON.stringify("");
          bankAccount.append(parentOpt);

        account.map((e)=>{
          let parentOpt = document.createElement("option");
          parentOpt.textContent = e.account_name;
          parentOpt.value = JSON.stringify(e);
          bankAccount.append(parentOpt);
        })
      }
    })
    .catch(function (err) {
      console.error("bank account request failed", err);
    });
};

let paymentModeGet = () => {
  let paymentType = {
    url: `${orgDetails.dc}/settings/paymentmodes?organization_id=${orgDetails.orgId}`,
    method: "GET",
    connection_link_name: "zohobookscontact",
  };
  ZFAPPS.request(paymentType)
    .then(function (value) {
      let responseJSON = JSON.parse(value.data.body);
      paymentMode.innerHTML=''

      let parentOpt = document.createElement("option");
      parentOpt.textContent ="Select Payment Type";
      parentOpt.value =JSON.stringify("");
      paymentMode.append(parentOpt);

      responseJSON.payment_modes.map((e)=>{
        let parentOpt = document.createElement("option");
        parentOpt.textContent = e.name;
        parentOpt.value =JSON.stringify(e);
        paymentMode.append(parentOpt);
      })
      
    })
    .catch(function (err) {
      console.error("payment mode request failed", err);
    });
};
