
let tableContainer = document.getElementById("invoice-table");
let tableContent = document.getElementById("content")

let invoiceTable = (invoiceCollection, sn) => {
  let totalInvoice = 0;
  let totalBalance = 0;
  let table;

  let invoiceKeys = [
    "parent_customer_name",
    "child_customer_name",
    "invoice_number",
    "status",
    "total",
    "balance",
    "sales_person",
    "due_date",
  ];
  pageLoad.setAttribute("id", "loadingview");

  if (invoiceCollection.length === 0) {
    if (isDate) {
      dateform("invoice-sec");
    }
  } else {
    dateform("invoice-sec");
    table = document.createElement("table");
    table.setAttribute("id", "table");
    table.setAttribute("class", "table table-striped")


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

    let invoiceNumber = document.createElement("th");
    invoiceNumber.textContent = "Invoice Number";
    headerRow.appendChild(invoiceNumber);

    let status = document.createElement("th");
    status.textContent = "Status";
    headerRow.appendChild(status);

    let total = document.createElement("th");
    total.textContent = "Invoice Amount";
    headerRow.appendChild(total);

    let balance = document.createElement("th");
    balance.textContent = "Balance";
    headerRow.appendChild(balance);

    let salesPerson = document.createElement("th");
    salesPerson.textContent = "Sales Person";
    headerRow.appendChild(salesPerson);

    let dueDate = document.createElement("th");
    dueDate.textContent = "Due Date ";
    headerRow.appendChild(dueDate);
  }
  [selectParent, ...childSplitId].map((e) => {
    isInvoiceHere = false;
    totalBalance = 0;
    totalInvoice = 0;
    sn = 0;
    invoiceCollection.forEach(function (item) {

      if (item.customer_id === e && item.status !== "draft") {
        isInvoiceHere = true;
        let row = table.insertRow();
        let cell = row.insertCell();
        cell.textContent = sn + 1;
        sn += 1;
        for (var key in invoiceKeys) {
          let cell = row.insertCell();
          if (item["customer_id"] === selectParent) {
            if (invoiceKeys[key] === "parent_customer_name") {
              cell.textContent = item["customer_name"];
            } else if (invoiceKeys[key] === "child_customer_name") {
              cell.textContent = "";
            } else {
              if (invoiceKeys[key] === "status") {
                if (item[invoiceKeys[key]] === "paid") {
                  cell.textContent = item[invoiceKeys[key]]
                  cell.setAttribute("class", "colorpaid")
                }
                else if(item[invoiceKeys[key]] === "overdue"){
                  cell.setAttribute("class", "coloroverdue")
                  cell.textContent = item[invoiceKeys[key]]
                }
                else {
                  cell.setAttribute("class", "colornotpaid")
                  cell.textContent = item[invoiceKeys[key]]
                }
              }
              else {
                cell.textContent = item[invoiceKeys[key]]
              }
            }
          } else {
            if (invoiceKeys[key] === "parent_customer_name") {
              cell.textContent = "";
            } else if (invoiceKeys[key] === "child_customer_name") {
              cell.textContent = item["customer_name"];
            } else {
              if (invoiceKeys[key] === "status") {
                if (item[invoiceKeys[key]] === "paid") {
                  cell.textContent = item[invoiceKeys[key]]
                  cell.setAttribute("class", "colorpaid")
                }
                else if(item[invoiceKeys[key]] === "overdue"){
                  cell.setAttribute("class", "coloroverdue")
                  cell.textContent = item[invoiceKeys[key]]
                }
                else {
                  cell.setAttribute("class", "colornotpaid")
                  cell.textContent = item[invoiceKeys[key]]
                }
              }
              else {
                cell.textContent = item[invoiceKeys[key]]
              }

            }
          }

          if (invoiceKeys[key] === "total") {
            totalInvoice += item[invoiceKeys[key]];
          } else if (invoiceKeys[key] == "balance") {
            totalBalance += item[invoiceKeys[key]];
          }
        }
      }

    });
    if (isInvoiceHere) {
      if (invoiceCollection.length > 0) {
        let row = table.insertRow();
        let cell = row.insertCell();
        cell.textContent = "Total";
        for (var key in invoiceKeys) {
          let cell = row.insertCell();
          if (invoiceKeys[key] === "total") {
            cell.textContent = totalInvoice.toFixed(3);
          } else if (invoiceKeys[key] === "balance") {
            cell.textContent = totalBalance;
          }
        }

        tableContainer.appendChild(table);
        isDate = false;
      }
    }
  });
};

let pagiNation = (parentInvoices, childInvoices) => {
  if (parentInvoices.length === 0 && childInvoices.length === 0) {
    if (isDate) {
      ShowNotification(
        `${selectParentName} - Invoices not available between the date`,
        "error"
      );
    } else {
      tableContainer.textContent = "";
      ShowNotification(
        `Both Parent and child company invoices is not avialable for ${selectParentName}`,
        "error"
      );
    }
  } else {
    if (isDate) {
      ShowNotification(`Successfully filtered`, "success");
    } else if (parentInvoices.length === 0) {
      ShowNotification(
        `Parent company invoices is not avialable for ${selectParentName}`,
        "error"
      );
    } else if (childInvoices.length === 0) {
      ShowNotification(
        `Child company invoices is not avialable for ${selectParentName}`,
        "error"
      );
    } else {
      ShowNotification(`Success`, "success");
    }
  }

  paginationDiv.innerHTML = "";
  contentDiv.innerHTML = "";

  let data = [...parentInvoices, ...childInvoices];
  const itemsPerPage = 50;
  let currentPage = 1;

  function displayData(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    contentDiv.innerHTML = "";
    invoiceTable(paginatedData, startIndex);
  }

  function setupPagination() {
    paginationDiv.innerHTML = "";

    const numPages = Math.ceil(data.length / itemsPerPage);
    for (let i = 1; i <= numPages; i++) {
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = i;
      link.addEventListener("click", () => {
        currentPage = i;
        displayData(currentPage);
        highlightCurrentPage();
      });
      paginationDiv.appendChild(link);
    }

    highlightCurrentPage();
  }

  function highlightCurrentPage() {
    const paginationLinks = document.querySelectorAll(".pagination a");
    paginationLinks.forEach((link) => {
      link.classList.remove("active");
      if (parseInt(link.textContent) === currentPage) {
        link.classList.add("active");
      }
    });
  }
  displayData(currentPage);
  setupPagination();
};
