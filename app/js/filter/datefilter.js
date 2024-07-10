let filterDateWise = (id) => {
  let dateInput = document.getElementsByClassName("date");
  let searchBtn = document.getElementById("viewbtn");
  let loadingBtn = document.getElementById("notviewbtn");
  isDate = true;
  searchBtn.removeAttribute("id");
  searchBtn.setAttribute("id", "notviewbtn");

  loadingBtn.removeAttribute("id");
  loadingBtn.setAttribute("id", "viewbtn");

  dateInputValue1 = dateInput[0].value;
  dateInputValue2 = dateInput[1].value;
  if (id === "invoice-sec") {
    invoiceGet(selectParent, childSplitId, id);
  } else {
    let wareHouseSec = document.getElementById("warehouse-sec");
    let branchSec = document.getElementById("branch-sec");
    warehouseSelect = [];
    if (filterBy === "Warehouse") {
      for (let i = 0; i < wareHouseSec.options.length; i++) {
        if (wareHouseSec.options[i].selected) {
          let selectWarehouses = {
            name: wareHouseSec.options[i].innerHTML,
            id: wareHouseSec.options[i].value,
          };
          warehouseSelect.push(selectWarehouses);
        }
      }
    } else if (filterBy === "Branch") {
      for (let i = 0; i < branchSec.options.length; i++) {
        if (branchSec.options[i].selected) {
          let selectBranch = {
            name: branchSec.options[i].innerHTML,
            id: branchSec.options[i].value,
          };
          warehouseSelect.push(selectBranch);
        }
      }
    }
    statement();
  }
};

let fromSelect = (id) => {
  let dateInput = document.getElementsByClassName("date");

  parentInvoices = [];
  childInvoices = [];

  dateInput[1].setAttribute("min", dateInput[0].value);
  let todayDate = new Date();

  if (id === "totalinvoice-sec") {
    let selectedDate = new Date(dateInput[0].value);
    let maxDate = new Date(selectedDate);
    maxDate.setMonth(maxDate.getMonth() + 12);
    if (maxDate > todayDate) {
      dateInput[1].setAttribute(
        "max",
        `${todayDate.getFullYear()}-${
          Number(todayDate.getMonth()) + 1 >= 10
            ? Number(todayDate.getMonth()) + 1
            : "0" + (Number(todayDate.getMonth()) + 1)
        }-${
          todayDate.getDate() >= 10
            ? todayDate.getDate()
            : "0" + todayDate.getDate()
        }`
      );
    } else {
      dateInput[1].setAttribute(
        "max",
        `${maxDate.getFullYear()}-${
          Number(maxDate.getMonth()) + 1 >= 10
            ? Number(maxDate.getMonth()) + 1
            : "0" + (Number(maxDate.getMonth()) + 1)
        }-${maxDate.getDay() >= 10 ? maxDate.getDay() : "0" + maxDate.getDay()}`
      );
    }
  } else {
    dateInput[1].setAttribute(
      "max",
      `${todayDate.getFullYear()}-${
        Number(todayDate.getMonth()) + 1 >= 10
          ? Number(todayDate.getMonth()) + 1
          : "0" + (Number(todayDate.getMonth()) + 1)
      }-${
        todayDate.getDate() >= 10
          ? todayDate.getDate()
          : "0" + todayDate.getDate()
      }`
    );
  }
};
