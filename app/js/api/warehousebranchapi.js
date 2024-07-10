
let wareHouseGet = () => {
    warehouseselect = [];
    let wareHousesData = [];
    let wareHouseSec = document.getElementById("warehouse-sec");
    let warehouse = {
      url: `${orgDetails.dc}/settings/warehouses?organization_id=${orgDetails.orgId}`,
      method: "GET",
      connection_link_name: "zohobookscontact",
    };
    ZFAPPS.request(warehouse)
      .then(function (value) {
        let responseJSON = JSON.parse(value.data.body);
        wareHouseSec.innerHTML = "";
        wareHousesData = []
        wareHousesData = [...wareHousesData, ...responseJSON.warehouses];
        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode("Select Warehouse"));
        opt.value = "";
        opt.disabled = true;
        wareHouseSec.appendChild(opt);
  
        wareHousesData.map((w) => {
          let opt = document.createElement("option");
          opt.appendChild(document.createTextNode(w.warehouse_name));
          opt.value = w.warehouse_id;
          wareHouseSec.appendChild(opt);
        });
        M.FormSelect.init(wareHouseSec);
      })
      .catch(function (err) {
        console.error("warehouse request failed", err);
      });
  };
  
  let branchGet = () => {
    branchSelect = [];
    let branchData = [];
    let branchSec = document.getElementById("branch-sec");
    branchSec.innerHTML = "";
    let branch = {
      url: `${orgDetails.dc}/branches?organization_id=${orgDetails.orgId}`,
      method: "GET",
      connection_link_name: "zohobookscontact",
    };
    ZFAPPS.request(branch)
      .then(function (value) {
        let responseJSON = JSON.parse(value.data.body);
        branchData = [...branchData, ...responseJSON.branches];
        let opt = document.createElement("option");
        opt.appendChild(document.createTextNode("Select Branch"));
        opt.value = "";
        opt.disabled = true;
        branchSec.appendChild(opt);
  
        branchData.map((b) => {
          let opt = document.createElement("option");
          opt.appendChild(document.createTextNode(b.branch_name));
          opt.value = b.branch_id;
          branchSec.appendChild(opt);
        });
        M.FormSelect.init(branchSec);
      })
      .catch(function (err) {
        console.error("branches request failed", err);
      });
  };
  