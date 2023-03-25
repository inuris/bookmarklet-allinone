/*
 * Dùng để tự gán role cho tài khoản vnPortal
 *
 */
function script_vnPortal_autoRole() {
	let ifrm = window.frames[0];
	let idoc =
		ifrm.document || ifrm.contentDocument || ifrm.contentWindow.document;
	let group = [0, 1, 2, 3, 4, 5, 17, 18, 19, 28, 29, 31, 35, 36];
	for (let i = 0; i < group.length; i++) {
		idoc
			.querySelectorAll("#grdModulePermission_ctl00__" + group[i] + " input")
			.forEach((e) => {
				e.checked = true;
			});
	}
}
if (document.URL.indexOf("cdpn.io") < 0) {
	script_vnPortal_autoRole();
}
/*=============================================================================================*/

/*
 * Dùng để mở quyền cho module Phân quyền quản trị chuyên mục bài viết
 *
 */
const ACC_ROW_INDEX = 2;
const DELAY = 1000;
let index = 0;
async function script_vnPortal_permCategory() {
  
  let repeat = true;
  while (repeat === true){
    repeat = await repeatAction();
  }  
}
async function repeatAction(){
  let ifrm, idoc; 
  
  /* Check & update */
  ifrm = window.frames[0];
  idoc = ifrm.document || ifrm.contentDocument || ifrm.contentWindow.document;
  let row = idoc.querySelectorAll('.PermissionRow')[ACC_ROW_INDEX].querySelectorAll('input');
  
  row.forEach(e => {
    e.checked = "checked";
  });
  idoc.querySelectorAll('.Box a')[0].click();

  console.log("wait::");
  await wait(DELAY);  

  ifrm = window.frames[0];
  idoc = ifrm.document || ifrm.contentDocument || ifrm.contentWindow.document;
  let cat = idoc.querySelectorAll('.rtIn');
  
  /* Click next category */
  if (index < cat.length) {
    index++;
    console.log("click cat::", cat[index]);
    cat[index].click();
    return true;
  }

  return false;
}
let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

if (document.URL.indexOf("cdpn.io") < 0) {
  if (document.URL.indexOf("/Admin/Main.aspx") >= 0) {
    script_vnPortal_permCategory();
  }
}

/*=============================================================================================*/

/*
 * Dùng để gán IP tự động cho Ads SMS Brandname
 * https://ads.vinaphone.com.vn/Agent/Home.aspx?module=API_Manager
 * Chạy bookmark, điền các comId cách nhau dấu "," VD: 123,124,125 để set các comId cần chạy
 * Mặc định là 2 = get_sms_list, cần chọn option x thì thêm .x sau. VD: 123,123.12,124,124.12
 */
function script_adsSMSBrandname() {
	try{
		let checkLocalStorage = localStorage.getItem("comId");
		if (!checkLocalStorage){
			checkLocalStorage = prompt("Input comId. Ex: 123,123.12,124,124.12");
		}
		if (checkLocalStorage === ""){
			console.log("checkLocalStorage::null");
			return false;
		}
		let comIds = checkLocalStorage.split(",");
		localStorage.setItem("comId", comIds.slice(1));
		let comId = comIds[0];
		if (!comId) {
			console.log("comId::null");
			return false;
		}
		console.log("Running::", comId);
		let comIdOpt = comId.split(".");
		document.querySelector(
			"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1_ctl18_chkbox"
		).checked = true;
		document.querySelector(
			"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1_ctl18_ddlAG"
		).value = comIdOpt[0];		
		document.querySelector(
			"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1_ctl18_ddlAPI"
		).value = comIdOpt[1] || 2;
		document.querySelector(
			"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1_ctl18_txtUserName"
		).value = "VNPT-BV";
		document.querySelector(
			"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1_ctl18_txtPassword"
		).value = "BV#A123";
		document.querySelector(
			"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1_ctl18_txtIP"
		).value =	"113.182.23.76,113.161.141.173,113.161.141.105,113.161.141.106,113.161.141.107,113.161.141.108,113.161.141.109,10.1.2.21,14.164.86.114,113.161.141.110,123.28.102.4,14.246.178.70,14.246.17.129,123.28.103.91,113.182.72.247,14.173.73.122,113.182.20.221,14.183.165.229,14.173.71.40,14.184.171.30,113.169.211.203,14.246.123.11,14.234.46.207,123.22.235.246,14.164.26.69,14.234.238.80,14.246.122.149,14.234.239.92,123.23.36.163,14.183.165.51,113.174.1.109,14.246.177.127,14.234.24.189,14.176.191.50,113.163.254.186,14.173.70.197,113,182.68.116,113.174.0.83,14.246.178.180,14.234.24.240,123.28.145.48,113.174.0.74,123.23.37.41,113.182.69.52,113.182.69.173,113.182.68.193,123.28.144.230,113.174.0.184,113.182.82.196,192.168.143.148,115.79.34.119,58.186.7.148,113.182.159.26,113.182.73.235,123.28.5.198,14.173.238.186,14.161.177.227,14.173.175.87,113.180.81.210,113.182.7.250,14.234.25.252";
		document.querySelector(
			"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1_ctl18_chkPub"
		).checked = true;
		document
			.querySelector("#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_btn_add")
			.click();
		
		return true;
	}
	catch(e){
		console.log(e);
		return false;
	}
}
if (document.URL.indexOf("cdpn.io") < 0) {
	console.log(script_adsSMSBrandname());
}

/*=============================================================================================*/

/*
 * Chạy trực tiếp trong console
 * Dùng để lấy danh sách comId trong Ads SMS Brandname
 * https://ads.vinaphone.com.vn/Agent/Home.aspx?module=API_Manager
 */
function getComIdFromSelect() {
	let selects = document.querySelectorAll(
		"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1 tr td:nth-child(2) select"
	);
	let html = "<table>";
	for (let i = 0; i < selects.length - 1; i++) {
		let options = selects[i].querySelector("option:checked");
		html +=
			"<tr><td>" + options.innerText + "</td><td>" + options.value + "</td></tr>";
	}
	html += "</table>";
	let newDoc = window.open(
		"https://ads.vinaphone.com.vn/Agent/Home.aspx?module=API_Manager",
		"",
		"width=400,height=400"
	);
	setTimeout(() => {
		newDoc.document.write(html);
	}, 1000);
}

/*=============================================================================================*/

/*
 * Dùng để tạo báo cáo mới trong OneBSS
 * https://onebss.vnpt.vn/#/print/CauHinhBaoCao
 * Chạy bookmark, điền các comId cách nhau dấu "," VD: 123,124,125 để set các comId cần chạy
 * Mặc định là 2 = get_sms_list, cần chọn option x thì thêm .x sau. VD: 123,123.12,124,124.12
 */
function script_OneBSSReportNew() {
	try{		
		ask = prompt("Input:");
		if (ask === ""){
			console.log("Input::null");
			return false;
		}
		let inputs = JSON.parse(ask);
		if (!inputs) {
			console.log("JSON::null");
			return false;
		}
		console.log("Running::", inputs);
		
		document.querySelector('a[title="Nhập mới"]').click();
		
		setTimeout(()=>{
			console.log("Set::order");
			document.querySelectorAll('.box-form .row')[1].querySelectorAll('input')[0].value = inputs.order;
			document.querySelectorAll('.box-form .row')[1].querySelectorAll('input')[0]._value = inputs.order;
		},100);
		setTimeout(()=>{
			console.log("Set::name");
			document.querySelectorAll('.box-form .row')[2].querySelectorAll('input')[0].value = inputs.name;
		},100);
		setTimeout(()=>{
			console.log("Set::code");
			document.querySelectorAll('.box-form .row')[2].querySelectorAll('input')[1].value = inputs.code;
		},100);
		setTimeout(()=>{
			console.log("Set::path");
			document.querySelectorAll('.box-form .row')[3].querySelectorAll('input')[0].value = inputs.path;
		},100);
		
		return true;
	}
	catch(e){
		console.log(e);
		return false;
	}
}
if (document.URL.indexOf("cdpn.io") < 0) {
	if (document.URL.indexOf("onebss.vnpt.vn/#/print/CauHinhBaoCao") >=0){
		console.log(script_OneBSSReportNew())
	}
}