let dateform = (id) => {
  let todayDate = new Date();
  
  let selectName = document.createElement("h6");
  selectName.textContent = "Customer Name : " + selectParentName;

  let inputDiv = document.createElement("div");
  inputDiv.setAttribute("id", "dateinput");

  let inputDiv1 = document.createElement("div");
  inputDiv1.setAttribute("id", "dateinput1");
  inputDiv.appendChild(inputDiv1);

  let label1 = document.createElement("label");
  label1.setAttribute("for", "in1");
  label1.textContent = "From : ";
  inputDiv1.appendChild(label1);

  let input1 = document.createElement("input");
  input1.setAttribute("type", "date");
  input1.setAttribute("id", "in1");
  id === "invoice-sec"
    ? input1.setAttribute("onchange", "fromSelect(`invoice-sec`)")
    : input1.setAttribute("onchange", "fromSelect(`totalinvoice-sec`)");

  input1.setAttribute("class", "date");
  dateInputValue1 !== "" || dateInputValue2 !== ""
    ? input1.setAttribute("value", dateInputValue1)
    : "";
  input1.setAttribute(
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
  inputDiv1.appendChild(input1);

  let inputDiv2 = document.createElement("div");
  inputDiv2.setAttribute("id", "dateinput2");
  inputDiv.appendChild(inputDiv2);

  let label2 = document.createElement("label");
  label2.setAttribute("for", "in2");
  label2.textContent = "To : ";
  inputDiv2.appendChild(label2);

  let input2 = document.createElement("input");
  input2.setAttribute("type", "date");
  input2.setAttribute("id", "in2");
  input2.setAttribute("class", "date");
  dateInputValue1 !== "" || dateInputValue2 !== ""
    ? input2.setAttribute("value", dateInputValue2)
    : "";
  input2.setAttribute(
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
  inputDiv2.appendChild(input2);

  let btn = document.createElement("button");
  id === "invoice-sec"
    ? (btn.textContent = "Search")
    : (btn.textContent = "Report");
  id === "invoice-sec"
    ? btn.setAttribute("onclick", "filterDateWise(`invoice-sec`)")
    : btn.setAttribute("onclick", "filterDateWise(`totalinvoice-sec`)");

  btn.setAttribute("class", "filterbtn");
  btn.setAttribute("id", "viewbtn");
  inputDiv.appendChild(btn);

  let loadingspan = document.createElement("span");
  loadingspan.setAttribute("class", "spinner-border spinner-border-sm");
  loadingspan.setAttribute("role", "status");
  loadingspan.setAttribute("aria-hidden", "true");

  let loadingbtn = document.createElement("button");
  loadingbtn.appendChild(loadingspan);
  loadingbtn.append(" Loading..");
  loadingbtn.setAttribute("disabled", "true");
  loadingbtn.setAttribute("class", "loadingbtn filterbtn");
  loadingbtn.setAttribute("id", "notviewbtn");
  inputDiv.appendChild(loadingbtn);

  if (id === "invoice-sec") {
    tableContainer.textContent = "";
    tableContent.innerHTML = "";
    tableContent.appendChild(selectName);
    tableContent.appendChild(inputDiv);
  } else {
    customerReport.innerHTML = "";
    customerReport.append(inputDiv);
  }
};
