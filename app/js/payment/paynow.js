let payInput = document.getElementsByClassName("payments");
let payNow = document.getElementsByClassName("paynow")

let payments = (invoice, balance, index) => {
  if (payInput[index - 1].value > balance) {
    payInput[index - 1].value = "";
    ShowNotification(`${invoice} - Amount Exceed than balance`, "error");
  } else if (Number(payInput[index - 1].value) === 0) {
    payInput[index - 1].value = "";
    ShowNotification(`Please ensure payment can't be Zero`, "error");
  } else if (Number(payInput[index - 1].value) < 0) {
    payInput[index - 1].value = "";
    ShowNotification("Please make sure that the payment amount is not negative.", "error");

  }
};

let payBalanceAmount = () => {
  let isPayDate = true;
  let bank = JSON.parse(bankAccount.value);
  let paymentType = JSON.parse(paymentMode.value);
  if (bank !== "" && paymentType !== "") {
    if (paymentDate.value === "") isPayDate = false;
    if (isPayDate) {
      payNow[0].setAttribute("id", "paynow-notview")
      payNow[1].removeAttribute("id")
      customerPayment(paymentInvoiceAmount, totalOfPay);
    } else {
      ShowNotification(`Please enter the date`, "error");
    }
  }
  else{
    if(bank === "" && paymentType === ""){
      ShowNotification(`Please choose the Bank Account and Payment Type`, "error");
    }
    else if(bank === ""){
      ShowNotification(`Please choose the Bank Account`, "error");
    }
    else{
      ShowNotification(`Please choose the Payment Type`, "error");
    }
  }
};
