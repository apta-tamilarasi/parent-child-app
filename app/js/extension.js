let selectParent;
let selectParentName;
let selectChild;
let contacts = [];
let parentInvoices = [];
let childInvoices = [];
let parentSelect;
let customDatas = [];
let orgDetails = {};
let credits = [];
let debits = [];
let parentChildSelectPrevious = [];
let childSelectPrevious = [];
let childSplitId;
let childSplitName;
let wareHousesData = [];

window.onload = function () {
  ZFAPPS.extension.init().then(function (App) {
    ZFAPPS.get("organization")
      .then(function (data) {
        orgDetails.dc = data.organization.api_root_endpoint;
        orgDetails.orgId = data.organization.organization_id;
        contactGet("parent-select");
        paymentRecordGet()
      })
      .catch(function (err) {
        console.error(err);
      });
  });
};

const ShowNotification = (message, type) => {
  ZFAPPS.invoke("SHOW_NOTIFICATION", {
    type,
    message,
  }).catch((er) => {
    console.error(er);
  });
};
