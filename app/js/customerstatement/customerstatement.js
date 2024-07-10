let customerReport = document.getElementById("customerstatementdate");
let customerTable = document.getElementById("dateTable");
let totalInvoiceDetails = document.getElementById("invoice-card");

let customerStatementInvoices = [];
let selectedDateCs = [];
let warehouseId;
let warehouseName;
let warehouseInvoices = [];
let warehouseSelect = [];
let branchSelect = [];
let filterBy;
let filterByNone;

let statement = () => {
  let searchBtn = document.getElementById("notviewbtn");
  let loadingBtn = document.getElementById("viewbtn");

  if (dateInputValue1 !== "" && dateInputValue2 !== "") {
    pageLoadForStatement.removeAttribute("id");
  }
  customerTable.innerHTML = "";
  selectedDateCs = [];
  let company = [selectParent, ...childSplitId];
  let childName = childSplitName;
  if (dateInputValue1 !== "" && dateInputValue2 !== "") {
    let table = document.createElement("table");
    table.setAttribute("id", "table");
    table.setAttribute("class", "table table-striped");

    let headerRow = table.insertRow();
    let sno = document.createElement("th");
    sno.textContent = "S.NO";
    headerRow.appendChild(sno);

    let parentCustomerName = document.createElement("th");
    parentCustomerName.textContent = "Parent Company";
    headerRow.appendChild(parentCustomerName);

    let childCustomerName = document.createElement("th");
    childCustomerName.textContent = "Child Company";
    headerRow.appendChild(childCustomerName);
    if (filterBy !== "None") {
      let invoiceWarehouse = document.createElement("th");
      filterBy === "Warehouse"
        ? (invoiceWarehouse.textContent = "Ware House")
        : (invoiceWarehouse.textContent = "Branch");
      headerRow.appendChild(invoiceWarehouse);
    }

    let from = dateInputValue1.split("-");
    let to = dateInputValue2.split("-");

    function createMonthYearTable() {
      let fromDate = new Date(
        from[0],
        from[1],
        from[2] === "31" || from[2] === "30" ? "01" : from[2]
      );
      const toDate = new Date(to[0], to[1], to[2] === "31" ? "30" : to[2]);
      while (fromDate <= toDate) {
        const fromCell = document.createElement("th");
        fromCell.className = "datecol";
        fromCell.textContent = formatDate(fromDate);
        headerRow.appendChild(fromCell);
        fromDate.setMonth(fromDate.getMonth() + 1);
        fromDate !== toDate ? fromDate.setDate("01") : fromDate.setDate(to[2]);
      }

      let grandTotal = document.createElement("th");
      grandTotal.textContent = "Grand Total";
      headerRow.appendChild(grandTotal);
      customerTable.appendChild(table);
    }

    function formatDate(date) {
      let obj = {
        day: `${date.getDate()}`,
        year:
          date.getMonth() !== 0
            ? `${date.getFullYear()}`
            : `${date.getFullYear() - 1})`,
        month:
          date.getMonth() === 0
            ? `12`
            : date.getMonth() === 10 || date.getMonth() === 11
            ? `${date.getMonth()}`
            : `0${date.getMonth()}`,
        amount: 0,
        monthlyTotal: 0,
      };
      selectedDateCs.push(obj);
      return date.getMonth() === 0
        ? `${date.getFullYear() - 1}-12`
        : date.getMonth() === 10 || date.getMonth() === 11
        ? `${date.getFullYear()}-${date.getMonth()} `
        : `${date.getFullYear()}-0${date.getMonth()} `;
    }

    createMonthYearTable();
    let totalOfGrandTotal = 0;
    company.map((co, i) => {
      let row1 = table.insertRow();
      let sno = document.createElement("td");
      sno.textContent = i + 1;
      row1.appendChild(sno);

      let cusParentName = document.createElement("td");
      let cusChildName = document.createElement("td");

      if (i === 0) {
        cusParentName.textContent = selectParentName;
        cusChildName.textContent = "";
      } else {
        cusParentName.textContent = "";
        cusChildName.textContent = childName[i - 1];
      }
      row1.appendChild(cusParentName);
      row1.appendChild(cusChildName);
      warehouseName = "";

      if (filterBy !== "None") {
        warehouseSelect.map((e, i) => {
          if (warehouseSelect.length - 1 === i) warehouseName += e.name;
          else warehouseName += e.name + "/";
        });

        let cusCreditLmt = document.createElement("td");
        cusCreditLmt.textContent = warehouseName;
        row1.appendChild(cusCreditLmt);
      }

      let x = selectedDateCs;

      if (filterBy === "Warehouse") {
        warehouseInvoices.map((c) => {
          if (c !== undefined) {
            let isWarehouse = false;
            if (c.customer_id === co) {
              let splitDate = c.date.split("-");
              c.line_items.map((item) => {
                if (item.warehouse_id) {
                  warehouseSelect.map((e) => {
                    if (item.warehouse_id === e.id) {
                      isWarehouse = true;
                    }
                  });
                }
              });

              if (isWarehouse) {
                x = x.map((s) => {
                  return new Date(dateInputValue1) <= new Date(c.date) &&
                    new Date(dateInputValue2) >= new Date(c.date) &&
                    s.year === splitDate[0] &&
                    s.month === splitDate[1]
                    ? { ...s, amount: s.amount + c.balance }
                    : s;
                });
              }
            }
          }
        });
      } else if (filterBy === "Branch") {
        customerStatementInvoices.map((c) => {
          let isBranch = false;
          if (c.customer_id === co) {
            let splitDate = c.date.split("-");
            warehouseSelect.map((b) => {
              if (b.id === c.branch_id) {
                isBranch = true;
              }
            });

            if (isBranch) {
              x = x.map((s) => {
                return new Date(dateInputValue1) <= new Date(c.date) &&
                  new Date(dateInputValue2) >= new Date(c.date) &&
                  s.year === splitDate[0] &&
                  s.month === splitDate[1]
                  ? { ...s, amount: s.amount + c.balance }
                  : s;
              });
            }
          }
        });
      } else {
        customerStatementInvoices.map((c) => {
          if (c.customer_id === co) {
            let splitDate = c.date.split("-");
            x = x.map((s) => {
              return new Date(dateInputValue1) <= new Date(c.date) &&
                new Date(dateInputValue2) >= new Date(c.date) &&
                s.year === splitDate[0] &&
                s.month === splitDate[1]
                ? { ...s, amount: s.amount + c.balance }
                : s;
            });
          }
        });
      }
      let grandTot = 0;
      selectedDateCs = x.map((e) => {
        return { ...e, monthlyTotal: e.monthlyTotal + e.amount, amount: 0 };
      });
      x.map((e) => {
        let createDateAmount = document.createElement("td");
        if (e.amount > 0) {
          grandTot = grandTot + e.amount;
          createDateAmount.textContent = e.amount.toFixed(3);
        } else {
          createDateAmount.textContent = "";
        }
        row1.appendChild(createDateAmount);
      });

      let cusTotal = document.createElement("td");
      totalOfGrandTotal += grandTot;
      grandTot = grandTot.toFixed(3);
      cusTotal.textContent = grandTot;
      row1.appendChild(cusTotal);
    });

    let row = table.insertRow();
    let total = document.createElement("td");
    total.textContent = "Total";
    row.appendChild(total);

    for (let i = 0; i < (filterBy !== "None" ? 3 : 2); i++) {
      let emptyData = document.createElement("td");
      emptyData.textContent = " ";
      row.appendChild(emptyData);
    }
    selectedDateCs.map((e) => {
      let total = document.createElement("td");
      total.textContent = e.monthlyTotal === 0 ? "" : e.monthlyTotal;
      row.appendChild(total);
    });
    let gdTotal = document.createElement("td");
    gdTotal.textContent = totalOfGrandTotal;
    row.appendChild(gdTotal);

    pageLoadForStatement.setAttribute("id", "loadingview2");
  } else {
    if (isDate) {
      ShowNotification("Date Field can't be empty", "error");
      isDate = false;
    }
    pageLoadForStatement.setAttribute("id", "loadingview2");
  }
  searchBtn.removeAttribute("id");
  searchBtn.setAttribute("id", "viewbtn");

  loadingBtn.removeAttribute("id");
  loadingBtn.setAttribute("id", "notviewbtn");
  
};

let close=()=>{
  let ui=document.getElementById("select-options-291f15cb-cdc5-4e83-847e-26898bbf80c8")
  ui.style=""
}
