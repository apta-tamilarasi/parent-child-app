let bankAccount = document.getElementById("bankaccount");
let paymentMode = document.getElementById("payment-mode");
let paymentDate = document.getElementById("paymentdate");
let chequeBalanceDiv = document.getElementById("paymentbalance");
let chequeBalance = document.getElementById("chequebalance");
let balanceCheque = "";

let customerPayment = (paymentInvoiceAmount, total) => {
  let paymentInput = document.getElementById("amountpayment").value;
  let bank = JSON.parse(bankAccount.value);
  let paymentType = JSON.parse(paymentMode.value);
  let code= "";
  paymentInvoiceAmount.map((pay, i) => {
    let data = {
      customer_id: pay.invoice.customer_id,
      account_name: bank.account_name,
      account_id: bank.account_id,
      account_type: bank.account_type,
      payment_mode: paymentType.name,
      amount: pay.amount,
      date: paymentDate.value,
      invoices: [
        {
          invoice_id: pay.invoice.invoice_id,
          amount_applied: pay.amount,
        },
      ],
      invoice_id: pay.invoice.invoice_id,
      amount_applied: pay.amount,
    }

    let paymentData={
      cf__ungzm_customer_name:pay.invoice.customer_name,
      cf__ungzm_customer_id:pay.invoice.customer_id,
      cf__ungzm_invoice_number:pay.invoice.invoice_number,
      cf__ungzm_invoice_amount:pay.invoice.total,
      cf__ungzm_paid_amount:pay.amount,
      cf__ungzm_entered_amount:paymentInput,
      cf__ungzm_bank_account:bank.account_name,
      cf__ungzm_bank_account_id: bank.account_id,
      cf__ungzm_payment_type:paymentType.name,
      cf__ungzm_paid_date:paymentDate.value
    }
    
    let custom = {
      url: `${orgDetails.dc}/customerpayments?organization_id=${orgDetails.orgId}`,
      method: "POST",
      body: {
        mode: "raw",
        raw: data,
      },
      connection_link_name: "zohobookscontact",
    };
    ZFAPPS.request(custom)
      .then(function (value) {
        let responseJSON = JSON.parse(value.data.body);
        if (responseJSON.code===0) {
          paymentRecordPost(paymentData)
          code= responseJSON.code;
        }
        else{
          code= responseJSON.code;
        }
        if (paymentInvoiceAmount.length === i + 1) {
          if (code === "" ||code ===0) {
            payNow[0].removeAttribute("id");
            payNow[1].setAttribute("id", "paynow-notview");

            let modalBackdrop =
              document.getElementsByClassName("modal-backdrop");
            modalBackdrop[0].remove();
            modalBackdrop[0].remove();

            let modal = document.getElementById("exampleModalCenter");
            modal.removeAttribute("class");
            modal.setAttribute("class", "modal fade");
            modal.ariaHidden = true;
            modal.style.display = "none";
            paymentTable.innerHTML = "";
            pay.innerHTML = "";
            payBtn.removeAttribute("class")
            payBtn.setAttribute("class", "paybtn-notview")

            ShowNotification(`Successfully Paid`, "success");
            invoiceGet(selectParent, childSplitId, "payment-sec");
          } else if(code===21003){
            payNow[0].removeAttribute("id");
            payNow[1].setAttribute("id", "paynow-notview");

            ShowNotification(
              "Your payment is not success.Choose your correct transaction Bank Account ",
              "error"
            );
          }
        }
      })
      .catch(function (err) {
        console.error("err", err);
      });
  });
};
