let paymentLable = document.getElementById("payment");
let paymentTable = document.getElementById("payment-invoices-sec");
let pay = document.getElementById("payment-input");
let payBtn = document.getElementById("paybtn-sec");
let isPay = false;
let unpaidInvoices = [];

let paymentInvoiceTable = () => {
  pay.innerHTML = "";
  let input = document.createElement("input");
  input.type = "number";
  input.setAttribute("id", "amountpayment");
  input.placeholder = "Amount-To Pay";
  paymentTable.innerHTML = "";
  if (!isPay) {
    pay.appendChild(input);
    table = document.createElement("table");
    table.setAttribute("id", "table");
    table.setAttribute("class", "table table-striped")

    let headerRow = table.insertRow();

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

    let dueDate = document.createElement("th");
    dueDate.textContent = "Due Date ";
    headerRow.appendChild(dueDate);

    let companyName = document.createElement("th");
    companyName.textContent = "Enter the payment Amount";
    headerRow.appendChild(companyName);

    let paymentArr = [
      "parent",
      "child",
      "invoice_number",
      "status",
      "total",
      "balance",
      "due_date",
    ];
    let invoices = [selectParent, ...childSplitId];
    let isInvoice = false;
    let index = 0;
    unpaidInvoices = [];
    invoices.map((id) => {
      let totalAmount = 0;
      let totalBalance = 0;
      customerStatementInvoices.map((e) => {
        if (id === e.customer_id) {
          if (e.status !== "paid" && e.status !== "draft") {
            unpaidInvoices.push(e);
            isInvoice = true;
            index++;
            totalAmount = totalAmount + e.total;
            totalBalance = totalBalance + e.balance;
            let row = table.insertRow();

            paymentArr.map((p) => {
              let content = document.createElement("td");
              if(p==="status"){
                if (e.status=== "overdue") {
                  content.setAttribute("class", "coloroverdue")
                }
                else{
                  content.setAttribute("class", "colornotpaid")   
                }
              }
              content.textContent =
                
                 p === "parent"
                  ? selectParent === e.customer_id
                    ? e.customer_name
                    : ""
                  : p === "child"
                  ? selectParent === e.customer_id
                    ? ""
                    : e.customer_name
                  : e[p];
              row.appendChild(content);
            });
            let content = document.createElement("td");
            let input = document.createElement("input");
            input.type = "number";
            input.setAttribute("class", "payments");
            input.placeholder = "Enter the Amount";
            input.setAttribute(
              "onchange",
              `payments("${e.invoice_number}",${e.balance},${index})`
            );
            input.value = "";
            content.appendChild(input);
            row.appendChild(content)
          }
        }
      });
      
    });
    // setTimeout(() => {
      if (isInvoice) {
        paymentTable.appendChild(table);
        payBtn.removeAttribute("class");
        payBtn.setAttribute("class", "paybtn-view");
      } else {
        ShowNotification(
          "Unpaid Invoices not available for " + selectParentName,
          "error"
        );
      }
      pageLoadForPayment.setAttribute("id", "loadingview3");
    // }, 1000);
  } else {
    invoiceGet(selectParent, childSplitId, "payment-sec");
    isPay = false;
  }
};
