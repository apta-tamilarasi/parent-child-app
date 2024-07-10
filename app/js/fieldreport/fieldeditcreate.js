let createNew = () => {
  let createBtn = document.getElementById("notviewdiv");
  let createPC = document.getElementById("viewdiv");
  let del = document.getElementsByClassName("delbtn");

  if (document.getElementById("table")) {
    let table = document.getElementById("table");
    table.innerHTML = "";
  }
  createBtn.removeAttribute("id");
  createPC.removeAttribute("id");
  createBtn.setAttribute("id", "viewdiv");
  createPC.setAttribute("id", "notviewdiv");
  del[0].removeAttribute("id");
  del[0].setAttribute("id", "notviewdelbtn");

  parentOptionSelect("new-parent-select");
  childOptionSelect(selectParent, contacts, "new-child-select");
};

let customEdit = (select) => {
  console.log(select);

  // parentIdEdit.map((p, i) => {
  //   if (select === p) selectParent = p;
  // });
  selectParent = select
  customDatas.map((c) => {
    if (selectParent === c.cf__ungzm_parent_company_id)
      selectParentName = c.cf__ungzm_parent_company;
  });
  isEdit = true;
  currentTab(0);
};

let create = () => {
  isCreate = true;
  currentTab(0);
};
