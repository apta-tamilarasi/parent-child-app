
let amountBalance = document.getElementById("amountbalance");
let totalPayment = document.getElementById("totalpayment");

let paymentInvoices = [];
let paymentInvoiceAmount = [];
let totalOfPay = 0;

let makePayment = () => {
  totalOfPay = 0;
  paymentInvoiceAmount = [];

  let paymentInput = document.getElementById("amountpayment").value;
  let modal = document.getElementsByClassName("modal");
  let paymentInvoiceTable = document.getElementById("payinvoices");
  paymentInvoiceTable.innerHTML = "";
  let isInput = false;

  for (let i = 0; i < payInput.length; i++) {
    if (payInput[i].value !== "") {
      isInput = true;
      totalOfPay = totalOfPay + Number(payInput[i].value);
      paymentInvoiceAmount.push({
        invoice: unpaidInvoices[i],
        amount: Number(payInput[i].value),
      });
    }
  }
  totalPayment.innerHTML = "Total Invoice Payment: Rs. " + totalOfPay;
  paymentDate.value = "";
  if (paymentInput !== "") {
    if (paymentInput > 0) {
      if (isInput) {
        if (totalOfPay === Number(paymentInput)) {
          bankAccountGet();
          paymentModeGet();

          paymentInvoices = [];
          modal[0].style.display = "block";
          modal[0].setAttribute("id", "exampleModalCenter");

          payNow[0].removeAttribute("id");
          payNow[1].setAttribute("id", "paynow-notview");

          let table = document.createElement("table");
          table.setAttribute("id", "table");
          table.setAttribute("class", "table table-striped");

          let headerRow = table.insertRow();

          let sno = document.createElement("th");
          sno.textContent = "S.NO";
          headerRow.appendChild(sno);

          let parentCustomerName = document.createElement("th");
          parentCustomerName.textContent = "Customer Name";
          headerRow.appendChild(parentCustomerName);

          let invoiceNumber = document.createElement("th");
          invoiceNumber.textContent = "Invoice Number";
          headerRow.appendChild(invoiceNumber);

          let total = document.createElement("th");
          total.textContent = "Invoice Amount";
          headerRow.appendChild(total);

          let balance = document.createElement("th");
          balance.textContent = "Balance";
          headerRow.appendChild(balance);

          let payBalance = document.createElement("th");
          payBalance.textContent = "Payment Amount";
          headerRow.appendChild(payBalance);

          paymentInvoiceAmount.forEach((payinvoice, i) => {
            let row = table.insertRow();
            let arr = [
              "sno",
              "customer_name",
              "invoice_number",
              "total",
              "balance",
              "amount",
            ];
            arr.map((e) => {
              let content = document.createElement("td");
              content.textContent =
                e === "sno"
                  ? i + 1
                  : e === "amount"
                    ? "Rs. " + payinvoice.amount
                    : payinvoice.invoice[e];
              row.appendChild(content);
            });
          })
          paymentInvoiceTable.appendChild(table);
        }
        else {
          if (totalOfPay > Number(paymentInput)) {
            modal[0].removeAttribute("id");
            ShowNotification(
              `Invoice Payment total exceed than Total Payment Amount`,
              "error"
            )
          }
          else {
            modal[0].removeAttribute("id");
            ShowNotification(
              `Invoice Payment less than Total Payment Amount`,
              "error"
            )
          }
        }
      }
      else {
        modal[0].removeAttribute("id");
        ShowNotification(
          `Please Enter the payment Amount atleast one Invoice`,
          "error"
        );
      }
    } else {
      modal[0].removeAttribute("id");
      ShowNotification(
        `Please Enter the valid Total Payment Amount`,
        "error"
      );
    }
  } else {
    modal[0].removeAttribute("id");
    ShowNotification(`Please Enter the Total Payment Amount`, "error");
  }
}

