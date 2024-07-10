let parentSelectValue = (id, childid) => {
  let parentSelect = document.getElementById(id);
  let filterSec = document.getElementsByClassName("filter")

  tableContainer.innerHTML = "";
  customerReport.innerHTML = "";
  customerTable.innerHTML = "";
  paginationDiv.innerHTML = "";
  contentDiv.innerHTML = "";
  

  if (parentSelect.value !== "") {
    filterSec[0].removeAttribute("id")
    isDate = false;
    if (!isEdit) {
      selectParent = parentSelect.value;
    }
    selectParentName = selectParent;

    contacts.find((e) => {
      e.contact_id === selectParent ? selectParentName = e.contact_name : ""
    })
    if (id === "invoice-sec" || id === "totalinvoice-sec" || id === "payment-sec" || id === "paymentrecord") {

      let x = customDatas.filter((e) => {
        if (e.cf__ungzm_parent_company_id === selectParent) {
          childSplitName = e.cf__ungzm_child_company;
          return e.cf__ungzm_child_company_id;
        }
      });
      if (x.length > 0) {
        childSplitId = x[0].cf__ungzm_child_company_id.split(",");
        childSplitName = childSplitName.split(",");
      }

      if (id === "paymentrecord") {
        payRecordLoad.removeAttribute("id")
        pagiNationPayment.innerHTML=''
        // paymentRecordTable()
        paginationPayment()
      }
      else {
        parentInvoices = [];
        childInvoices = [];
        dateInputValue1 = "";
        dateInputValue2 = "";
        invoiceGet(selectParent, childSplitId, id);
      }
    }
    else {
      childOptionSelect(selectParent, contacts, childid);
      childSelectValue(selectParent, childid);
    }
  }
  else {
    ShowNotification(
      "Please select valid Company Name",
      "error"
    );
    if (id === "parent-select") {
      childOptionSelect(selectParent, contacts, childid);
    }
    else if (id === "totalinvoice-sec") {
      filterSec[0].removeAttribute("id")
      filterSec[0].setAttribute("id", "paynow-notview")
    }
    else if (id === "payment-sec") {
      paymentLable.removeAttribute("class")
      paymentLable.setAttribute("class", "payment-notvisible")
      payBtn.removeAttribute("class")
      payBtn.setAttribute("class", "paybtn-notview")
    }
    else if(id === "paymentrecord"){
      paymentTable.innerHTML = ''
      pagiNationPayment.innerHTML=''
      paymentTableRecord.innerHTML = ''
      balanceCheque = ""
    }
  }
};

let childSelectValue = (selectParent, childid) => {
  let selected = [];
  let childSelect = document.getElementById(childid);

  customDatas.map((ele) => {
    let spiltChild = ele.cf__ungzm_child_company_id.split(",");
    selected.push(ele.cf__ungzm_parent_company_id);
    spiltChild.map((s) => selected.push(s));
  });
  for (let i = 0; i < childSelect.options.length; i++) {
    if (i > 0) {
      childSelect.options[i].disabled = false;
    }
  }

  for (let i = 0; i < childSelect.options.length; i++) {
    selected.map((s) => {
      if (s === childSelect.options[i].value) {
        childSelect.options[i].disabled = true;
      }
    });
  }
  let x = customDatas.find((getData) => {
    if (getData.cf__ungzm_parent_company_id === selectParent) {
      return getData.cf__ungzm_child_company_id.split(",");
    }
  });
  if (x !== undefined) {
    let childSplit = x.cf__ungzm_child_company_id.split(",");
    for (let i = 0; i < childSelect.options.length; i++) {
      for (let j = 0; j < childSplit.length; j++) {
        if (childSplit[j] == childSelect.options[i].value) {
          childSelect.options[i].selected = true;
          childSelect.options[i].disabled = false;
        }
      }
    }
  }
  M.FormSelect.init(childSelect);
};
