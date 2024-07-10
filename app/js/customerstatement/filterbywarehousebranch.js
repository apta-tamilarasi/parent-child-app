let filterByWB = (value) => {
  filterBy = value;
  customerReport.innerHTML = "";
  customerTable.innerHTML = "";
  dateInputValue1 = "";
  dateInputValue2 = "";

  let wareHouseBranchSec = document.querySelectorAll(".warehousebranch-select");
  wareHouseBranchSec[0].removeAttribute("class");
  wareHouseBranchSec[1].removeAttribute("class");

  if (value === "Warehouse") {
    wareHouseBranchSec[0].setAttribute(
      "class",
      "section warehouse-visible  warehousebranch-select"
    );
    wareHouseBranchSec[1].setAttribute(
      "class",
      "section branch-notvisible  warehousebranch-select"
    );
    branchGet();
  } else if (value === "Branch") {
    wareHouseBranchSec[0].setAttribute(
      "class",
      "section warehouse-notvisible  warehousebranch-select"
    );
    wareHouseBranchSec[1].setAttribute(
      "class",
      "section branch-visible  warehousebranch-select"
    );
    wareHouseGet();
  } else {
    wareHouseBranchSec[0].setAttribute(
      "class",
      "section warehouse-notvisible  warehousebranch-select"
    );
    wareHouseBranchSec[1].setAttribute(
      "class",
      "section branch-notvisible  warehousebranch-select"
    );
    dateform("totalinvoice-sec")
    wareHouseGet();
    branchGet();
  }
};

let wareHouseBranchSelectValue = () => {
  customerTable.innerHTML = "";
  dateform("totalinvoice-sec")
};
