let nav = document.querySelectorAll(".nav");
let fieldMap = document.querySelectorAll(".fm");
let section = document.querySelectorAll(".sec");
let bodyDiv=document.getElementById("body")

let customerImg = document.getElementById("customerimg");
let invoiceDetails = document.getElementById("invoicedetails");

let pageLoad = document.getElementById("loadingview");
let pageLoadForStatement = document.getElementById("loadingview2");
let pageLoadForPayment=document.getElementById("loadingview3");

let dateInputValue1 = "";
let dateInputValue2 = "";
let isDate = false;
let isAllInvoices = true;

let paginationDiv = document.getElementById("pagination");
let contentDiv = document.getElementById("content");

for (let n = 0; n < nav.length; n++) {
  nav[n].addEventListener("click", function () {
    if (isEdit) {
      ShowNotification("Please save changes", "error");
    } else {
      currentTab(n);
    }
  });
}

let currentTab = (n) => {
  customDatas = [];
  field = false;
  filedModal.innerHTML=""
  let filterByDiv = document.getElementById("filterby");
  filterByDiv.removeAttribute("class");
  filterByDiv.setAttribute("class", "filternot-visible");
  bodyDiv.removeAttribute("class")

  payBtn.removeAttribute("class")
  payBtn.setAttribute("class","paybtn-notview")

  if (!isEdit) selectParent = "";
  dateInputValue1 = "";
  dateInputValue2 = "";
  isDate = false;
  allCheck = false;

  if (n === 0) {
    bodyDiv.setAttribute("class","body")
    customGet("parent-select");
  } else if (n === 1) {
    customGet("select");
  } else if (n === 2) {
    customGet("invoice-sec");
  } else if (n === 3) {
    customGet("totalinvoice-sec");
    customerTable.innerHTML = "";
    let wareHouseBranchSec = document.querySelectorAll(
      ".warehousebranch-select"
    );
    wareHouseBranchSec[0].removeAttribute("class");
    wareHouseBranchSec[0].setAttribute(
      "class",
      "section warehouse-notvisible warehousebranch-select"
    );
    wareHouseBranchSec[1].removeAttribute("class");
    wareHouseBranchSec[1].setAttribute(
      "class",
      "section branch-notvisible warehousebranch-select"
    );
  }
  else if(n===4){
    customGet('payment-sec')
  }
  else if(n===5){
    customGet('paymentrecord')
    paymentRecordGet()
    pagiNationPayment.innerHTML=''  
    paymentTableRecord.innerHTML=''
  }
  tableContainer.textContent = "";
  totalInvoiceDetails.textContent = "";
  customerImg.innerHTML = "";
  paginationDiv.innerHTML = "";
  contentDiv.innerHTML = "";
  customerReport.innerHTML = "";
  fieldTable.innerHTML=""
  paymentTable.innerHTML=''
  pay.innerHTML=""
  paymentLable.removeAttribute("class");
  paymentLable.setAttribute("class","payment-notvisible");

  invoiceDetails.removeAttribute("class", "invoicecard");

  for (let s = 0; s < section.length; s++) {
    if (s == n) {
      section[s].classList.remove("section-notvisible");
      fieldMap[s].setAttribute("id", "fm");
      section[s].classList.add("section-visible");
    } else {
      section[s].classList.add("section-notvisible");
      fieldMap[s].removeAttribute("id", "fm");
      section[s].classList.remove("section-visible");
    }
    if (s == 1) {
      field = true;
    }
  }
};
