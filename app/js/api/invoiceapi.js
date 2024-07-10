let invoiceIds;
let invoiceGet = (selectParent, childSplitId, id, page = 1) => {
  if (page === 1) {
    customerStatementInvoices = [];
    parentInvoices=[]
    childInvoices=[]
  }
  if (id === "totalinvoice-sec") {
    totalInvoiceDetails.innerHTML = "";
    invoiceDetails.removeAttribute("class");
    customerImg.innerHTML = "";

    let wareHouseBranchSec = document.querySelectorAll(
      ".warehousebranch-select"
    );
    wareHouseBranchSec[0].removeAttribute("class");
    wareHouseBranchSec[1].removeAttribute("class");
    wareHouseBranchSec[0].setAttribute(
      "class",
      "section warehouse-notvisible  warehousebranch-select"
    );
    wareHouseBranchSec[1].setAttribute(
      "class",
      "section branch-notvisible  warehousebranch-select"
    );
    
    
    let filterByDiv = document.getElementById("filterby");
          filterByDiv.removeAttribute("class");
          filterByDiv.setAttribute("class", "filter-visible");
          let warehouseBranchSec = document.getElementById("warebranch");
          warehouseBranchSec.innerHTML = `<input type="radio" onchange="filterByWB(value)" value="Warehouse" id="customfilter"
          name="customfilter"> Warehouse
          <input type="radio" onchange="filterByWB(value)" value="Branch" id="customfilter"
          name="customfilter"> Branch
          <input type="radio" onchange="filterByWB(value)" value="None" id="customfilter" name="customfilter">
          None`;
  } else if (id === "invoice-sec") {
    if (!isDate) {
      pageLoad.removeAttribute("id");
    }
  }

  let getInvoice = {
    url: `${orgDetails.dc}/invoices?page=${page}&organization_id=${orgDetails.orgId}`,
    method: "GET",
    connection_link_name: "zohobookscontact",
  };
  ZFAPPS.request(getInvoice)
    .then(function (value) {
      let responseJSON = JSON.parse(value.data.body);
      let getInvoices = responseJSON.invoices.filter((e) => {
        return e.customer_id === selectParent;
      });
      childSplitId.forEach((c) => {
        responseJSON.invoices.filter((e) => {
          if (e.customer_id === c) {
            childInvoices.push(e);
          }
        });
      });
      parentInvoices = [...getInvoices, ...parentInvoices];

      if (responseJSON.page_context.has_more_page) {
        page = page + 1;
        invoiceGet(selectParent, childSplitId, id, page);
      } else {

        if (id === "invoice-sec") {
          if (dateInputValue1 !== "" && dateInputValue2 !== "") {
            let parentIn = parentInvoices.filter((a) => {
              return new Date(dateInputValue1) <= new Date(a.date) && new Date(dateInputValue2) >= new Date(a.date)
            });
            let childIn = childInvoices.filter((a) => {
              return new Date(dateInputValue1) <= new Date(a.date) && new Date(dateInputValue2) >= new Date(a.date)
            });
            if (parentIn.length === 0 && childIn.length === 0) {
              isDate = true;
            }
            paginationDiv.innerHTML = "";
            contentDiv.innerHTML = "";
           
            pagiNation(parentIn, childIn);
          } else {
            if (isDate) {
              tableContainer.innerHTML = "";
              paginationDiv.innerHTML = "";
              contentDiv.innerHTML = "";
              dateform(id)
              ShowNotification("Date Field can't be empty", "error");
              isDate = false;
            } else {
              paginationDiv.innerHTML = "";
              contentDiv.innerHTML = "";
              pagiNation(parentInvoices, childInvoices);
            }
          }
        } else if (id === "totalinvoice-sec") {
          wareHouseGet();
          branchGet();
          customerStatementInvoices = [...parentInvoices, ...childInvoices];
          filterByNone = customerStatementInvoices;
          getWareHouseInvoices();
        } else if (id === "payment-sec") {
          payBtn.removeAttribute("class")
          payBtn.setAttribute("class","paybtn-notview")

          pageLoadForPayment.removeAttribute("id");
          paymentTable.innerHTML = "";
          customerStatementInvoices = [...parentInvoices, ...childInvoices];
          paymentLable.removeAttribute("class");
          paymentLable.setAttribute("class", "payment-visible");
          paymentInvoiceTable();
        }
      }
    })
    .catch(function (err) {
      console.error("err", err);
      pageLoad.setAttribute("id", "loadingview");
    });
};

let getWareHouseInvoices = () => {
  warehouseInvoices = [];
  customerStatementInvoices.map((invoices) => {
    let warehouse = {
      url: `${orgDetails.dc}/invoices/${invoices.invoice_id}?organization_id=${orgDetails.orgId}`,
      method: "GET",
      connection_link_name: "zohobookscontact",
    };
    ZFAPPS.request(warehouse)
      .then(function (value) {
        let responseJSON = JSON.parse(value.data.body);
        warehouseInvoices.push(responseJSON.invoice);
      })

      .catch(function (err) {
        console.error("request failed", err);
      });
  });
};
