let payRecordLoad = document.getElementById("loadingview4");
let paymentTableRecord = document.getElementById("paymentrecordTable");
let pagiNationPayment = document.getElementById("paginationpayment");

let paymentRecordTable = (data, sn) => {
  let totalAmount = 0;
  let totalPaid = 0;
  paymentTableRecord.innerHTML = "";

  table = document.createElement("table");
  table.setAttribute("id", "table");
  table.setAttribute("class", "table table-striped");

  let headerRow = table.insertRow();

  let sno = document.createElement("th");
  sno.textContent = "S.NO";
  headerRow.appendChild(sno);

  let parentCustomerName = document.createElement("th");
  parentCustomerName.textContent = "Parent Customer";
  headerRow.appendChild(parentCustomerName);

  let childCustomerName = document.createElement("th");
  childCustomerName.textContent = "Child Customer";
  headerRow.appendChild(childCustomerName);

  let invoiceNumber = document.createElement("th");
  invoiceNumber.textContent = "Invoice Number";
  headerRow.appendChild(invoiceNumber);

  let total = document.createElement("th");
  total.textContent = "Invoice Amount";
  headerRow.appendChild(total);

  let amount = document.createElement("th");
  amount.textContent = "Entered Amount";
  headerRow.appendChild(amount);

  let balance = document.createElement("th");
  balance.textContent = "Paid Amount";
  headerRow.appendChild(balance);

  let bank = document.createElement("th");
  bank.textContent = "Bank Account";
  headerRow.appendChild(bank);

  let paymenttype = document.createElement("th");
  paymenttype.textContent = "Payment Type";
  headerRow.appendChild(paymenttype);

  let dueDate = document.createElement("th");
  dueDate.textContent = "paid Date";
  headerRow.appendChild(dueDate);

  let paymentArr = [
    "sno",
    "cf__ungzm_customer_name",
    "cf__ungzm_customer_name",
    "cf__ungzm_invoice_number",
    "cf__ungzm_invoice_amount",
    "cf__ungzm_entered_amount",
    "cf__ungzm_paid_amount",
    "cf__ungzm_bank_account",
    "cf__ungzm_payment_type",
    "cf__ungzm_paid_date",
  ];
  let todayDate = new Date();
  let todayDateSplit = todayDate.toLocaleDateString().split("/");
  todayDateSplit[0].length === 2
    ? ""
    : (todayDateSplit[0] = `0${todayDateSplit[0]}`);
  todayDateSplit[1].length === 2
    ? ""
    : (todayDateSplit[1] = `0${todayDateSplit[1]}`);

  data.map((e) => {
    sn++;
    totalAmount = totalAmount + Number(e.cf__ungzm_invoice_amount);
    totalPaid = totalPaid + Number(e.cf__ungzm_paid_amount);
    let row = table.insertRow();

    paymentArr.map((p, index) => {
      let content = document.createElement("td");
      content.textContent =
        p === "sno"
          ? sn
          : p === "cf__ungzm_customer_name"
          ? index === 1
            ? selectParent === e.cf__ungzm_customer_id
              ? e[p]
              : ""
            : index === 2
            ? selectParent !== e.cf__ungzm_customer_id
              ? e[p]
              : ""
            : e[p]
          : e[p];
      row.appendChild(content);
    });
  });
  if (totalAmount > 0) {
    console.log(table);
    paymentTableRecord.appendChild(table);
    console.log(paymentTableRecord);
  } else {
    ShowNotification(
      "Paid Invoices not available for " + selectParentName,
      "error"
    );
  }
  payRecordLoad.setAttribute("id", "loadingview4");
};

let checkDateFromInput = () => {
  const inputDate = document.getElementById("paymentdate").value;
  const parsedDate = new Date(inputDate);
  const currentDate = new Date();
  if (parsedDate.toLocaleDateString() < currentDate.toLocaleDateString()) {
    ShowNotification("Payment date is in the past.", "success");
  } else if (
    parsedDate.toLocaleDateString() === currentDate.toLocaleDateString()
  ) {
    ShowNotification("Payment date is today.", "success");
  } else {
    ShowNotification("Payment date is in the future.", "success");
  }
};

let paginationPayment = () => {
  let x = paidRecord.filter((e) => {
    let isCustomer = false;
    [selectParent, ...childSplitId].find((id) => {
      if (id === e.cf__ungzm_customer_id) {
        isCustomer = true;
      }
    });
    if (isCustomer) {
      return e;
    }
  });
  let data = x;
  const itemsPerPage = 25;
  let currentPage = 1;

  function displayData(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    paymentRecordTable(paginatedData, startIndex);
  }

  function setupPagination() {
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
      pagiNationPayment.appendChild(link);
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
