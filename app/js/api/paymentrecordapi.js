let paidRecord=[]
let paymentRecordSec=document.getElementById("paymentrecord")
let paymentRecordPost = (paymentData) => {
    let custom = {
        url: `${orgDetails.dc}/cm__ungzm_payment_for_parent_child?organization_id=${orgDetails.orgId}`,
        method: "POST",
        body: {
            mode: "raw",
            raw: paymentData,
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

let paymentRecordGet = (page = 1) => {
    let custom = {
        url: `${orgDetails.dc}/cm__ungzm_payment_for_parent_child?page=${page}&organization_id=${orgDetails.orgId}`,
        method: "GET",
        connection_link_name: "zohobookscontact",
    };
    ZFAPPS.request(custom)
        .then(function (value) {
            if (page === 1) {
                paidRecord=[]
            }
            let responseJSON = JSON.parse(value.data.body);
            paidRecord=[...paidRecord,...responseJSON.module_records]

            
      if (responseJSON.page_context.has_more_page) {
        page = page + 1;
        paymentRecordGet(page);
      }
        })
        .catch(function (err) {
            console.error("payment record-get request falied", err);
          });
}
