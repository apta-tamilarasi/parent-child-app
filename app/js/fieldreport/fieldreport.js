let fieldTable = document.getElementById("fieldtable");
let filedModal = document.getElementById("fieldreportmodal");
let field = false;
let moduleId = [];
let parentIdEdit = [];
let isEdit = false;
let allCheck = false;
let anyChecked = false;
let isCreate = false;
let childDetails = [];

let fieldReport = () => {

  fieldTable.innerHTML = "";
  selectParent = null;
  moduleId = [];
  parentIdEdit = [];
  childDetails = [];

  let div = document.createElement("div");
  div.className = "field";
  let btn = document.createElement("button");
  btn.textContent = "Create new Parent-Child Data";
  btn.setAttribute("onclick", "create()");
  btn.setAttribute("id", "viewdiv");
  div.appendChild(btn);
  fieldTable.appendChild(div);

  if (customDatas.length > 0) {

    customDatas.map((cd) => {
      let divCard = document.createElement("div")
      divCard.setAttribute("class", "childcompany")

      let parentCard = document.createElement("div")
      parentCard.setAttribute("class", "parentcard")
      let parent = document.createElement("p");

      parent.textContent = cd.cf__ungzm_parent_company;
      parentCard.appendChild(parent);

      let editIcon = document.createElement("i");
      editIcon.setAttribute("class", "fa fa-pencil");
      editIcon.setAttribute("onclick", `customEdit("${cd.cf__ungzm_parent_company_id}")`);
      parentCard.appendChild(editIcon);
      divCard.appendChild(parentCard)


      let btn = document.createElement("i")
      btn.setAttribute("class", "fa fa-trash-o")
      btn.setAttribute("onclick", `customDelete("${cd.module_record_id}")`);
      parentCard.appendChild(btn);

      let childCard = document.createElement("div")
      childCard.setAttribute("class", "childcard")

      cd.cf__ungzm_child_company.split(',').map((e) => {

        let childDiv = document.createElement("div")
        childDiv.setAttribute("class", "childdiv")
        childCard.appendChild(childDiv)

        let div = document.createElement("div")
        div.setAttribute("class", "branch")
        childDiv.appendChild(div)

        let child = document.createElement("p")
        child.textContent = e
        childDiv.appendChild(child)

      })
      divCard.appendChild(childCard)

      let obj = {
        parent: cd.cf__ungzm_parent_company,
        parentId: cd.cf__ungzm_parent_company_id,
        child: cd.cf__ungzm_child_company,
        childId: cd.cf__ungzm_child_company_id,
      };
      childDetails.push(obj);
      moduleId.push(cd.module_record_id);
      parentIdEdit.push(cd.cf__ungzm_parent_company_id);
      fieldTable.appendChild(divCard);
    });

  }
};

let selectAllCheck = () => {
  let allCheckBox = document.querySelector("#selectAllCheckbox");
  let checkBox = document.getElementsByClassName("selectCheckbox");
  let del = document.getElementsByClassName("delbtn");
  if (allCheckBox.checked) {
    for (let i = 0; i < checkBox.length; i++) {
      checkBox[i].checked = true;
      del[0].removeAttribute("id");
      del[0].setAttribute("id", "viewdelbtn");
    }
  } else {
    for (let i = 0; i < checkBox.length; i++) {
      checkBox[i].checked = false;
      del[0].removeAttribute("id");
      del[0].setAttribute("id", "notviewdelbtn");
    }
  }
};

let allChecked = () => {
  let allCheckBox = document.querySelector("#selectAllCheckbox");
  let checkBox = document.querySelectorAll(".selectCheckbox");
  let del = document.getElementsByClassName("delbtn");
  let isTrue = false;
  let isDel = false;

  for (let i = 0; i < checkBox.length; i++) {
    if (!checkBox[i].checked) isTrue = true;
    else isDel = true;
  }
  if (!isTrue) allCheckBox.checked = true;
  else allCheckBox.checked = false;

  if (isDel) {
    del[0].removeAttribute("id");
    del[0].setAttribute("id", "viewdelbtn");
  } else {
    del[0].removeAttribute("id");
    del[0].setAttribute("id", "notviewdelbtn");
  }
};

let view = (id) => {
  let ul = document.querySelectorAll(".list-group-flush")
  let btn = document.getElementsByClassName("childviewbtn")
  let pop = document.querySelectorAll(".pop");
  childDetails.find((e, index) => {
    if (id === e.parentId) {
      ul[index].innerHTML = ""
      if (btn[index].innerHTML !== "Hide Child") {
        pop[index].removeAttribute("class")
        pop[index].setAttribute("class", "card pop")

        let child = e.child.split(",");
        for (i = 0; i < child.length; i++) {
          let li = document.createElement("li")
          li.setAttribute("class", "list-group-item")
          li.textContent = child[i]
          ul[index].appendChild(li)
        }
        btn[index].innerHTML = "Hide Child"
      }
      else {
        ul[index].innerHTML = ""
        btn[index].innerHTML = "View Child"
        pop[index].removeAttribute("class")
        pop[index].setAttribute("class", "notcard pop")
      }
    }
    else {
      ul[index].innerHTML = ""
      btn[index].innerHTML = "View Child"
      pop[index].removeAttribute("class")
      pop[index].setAttribute("class", "notcard pop")
    }
  });
};
