/*
 * Dùng để tự gán role cho tài khoản vnPortal
 *
 */
const GROUP_CHECK = ["chuyên mục", "Banner", "tin tức", "bài viết", "thư viện ảnh", "Youtube", "tin bài", "liên kết", "liên hệ", "văn bản", "quảng cáo"];
function script_vnPortal_autoRole() {
	let ifrm = window.frames[0];
	let idoc =
		ifrm.document || ifrm.contentDocument || ifrm.contentWindow.document;
	let parentIds = ["grdModulePermission_ctl00", "AdminPermissonGroupEdit_grdModulePermission_ctl00"];
	for (let parentId of parentIds) {
		let i = 0;
		if (idoc.querySelector('#' + parentId)) {
			console.log("autoRole::", parentId);
			while (idoc.querySelector('#' + parentId + '__' + i) !== null) {
				if (checkGroup(idoc.querySelector('#' + parentId + '__' + i + ' td:first-child').innerText) === true) {
					idoc
						.querySelectorAll('#' + parentId + '__' + i + " input")
						.forEach((e) => {
							e.checked = true;
						});
				}
				i++;
			}
		}
	}
}
function checkGroup(str) {
	for (let i = 0; i < GROUP_CHECK.length; i++) {
		if (str.indexOf(GROUP_CHECK[i]) > -1) {
			return true;
		}
	}
	return false;
}
if (document.URL.indexOf("cdpn.io") < 0) {
	script_vnPortal_autoRole();
}
/*=============================================================================================*/

/*
 * Dùng để mở quyền cho module Phân quyền quản trị chuyên mục bài viết
 *
 */
const ACC_ROW_INDEX = 0;
const DELAY = 1800;
let index = 0;
async function script_vnPortal_permCategory() {

	let repeat = true;
	while (repeat === true) {
		repeat = await repeatAction();
	}
}
async function repeatAction() {
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
 * Dùng để xóa n tin bài trong Danh sách Tin tức
 *
 */
const MAX = 200;
const DELAY = 1800;
let index = 0;

async function script_vnPortal_deleteArticle() {

	let repeat = true;
	while (repeat === true) {
		repeat = await repeatAction();
	}
}
async function repeatAction() {
	let ifrm, idoc;
	if (index < MAX) {
		ifrm = window.frames[0];
		idoc = ifrm.document || ifrm.contentDocument || ifrm.contentWindow.document;
		let btnDel = idoc.querySelectorAll('#ctrlAI9_grvListArticle_ctl00__0 input[title="Delete"]')[0];
		console.log("click::", btnDel);
		btnDel.onclick = "";
		btnDel.click();

		console.log("wait::");
		await wait(DELAY);
		return true;
	}
	return false;
}
let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

if (document.URL.indexOf("cdpn.io") < 0) {
	if (document.URL.indexOf("/Admin/Main.aspx") >= 0) {
		script_vnPortal_deleteArticle();
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
	try {
		let checkLocalStorage = localStorage.getItem("comId");
		if (!checkLocalStorage) {
			checkLocalStorage = prompt("Input comId. Ex: 123,123.12,124,124.12");
		}
		if (checkLocalStorage === "") {
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
		).value = "113.182.23.76,113.161.141.173,113.161.141.105,113.161.141.106,113.161.141.107,113.161.141.108,113.161.141.109,10.1.2.21,14.164.86.114,113.161.141.110,123.28.102.4,14.246.178.70,14.246.17.129,123.28.103.91,113.182.72.247,14.173.73.122,113.182.20.221,14.183.165.229,14.173.71.40,14.184.171.30,113.169.211.203,14.246.123.11,14.234.46.207,123.22.235.246,14.164.26.69,14.234.238.80,14.246.122.149,14.234.239.92,123.23.36.163,14.183.165.51,113.174.1.109,14.246.177.127,14.234.24.189,14.176.191.50,113.163.254.186,14.173.70.197,113,182.68.116,113.174.0.83,14.246.178.180,14.234.24.240,123.28.145.48,113.174.0.74,123.23.37.41,113.182.69.52,113.182.69.173,113.182.68.193,123.28.144.230,113.174.0.184,113.182.82.196,192.168.143.148,115.79.34.119,58.186.7.148,113.182.159.26,113.182.73.235,123.28.5.198,14.173.238.186,14.161.177.227,14.173.175.87,113.180.81.210,113.182.7.250,14.234.25.252";
		document.querySelector(
			"#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_GridView1_ctl18_chkPub"
		).checked = true;
		document
			.querySelector("#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_btn_add")
			.click();

		return true;
	}
	catch (e) {
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
	let options = document.querySelector(
		"select#ctl00_ContentPlaceHolder2_PlaceHolder_ctl00_ddlAdser option"
	);
	let html = "<table>";
	for (let i = 0; i < options.length - 1; i++) {
		html +=
			"<tr><td>" + options[i].innerText + "</td><td>" + options[i].value + "</td></tr>";
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
 * Dùng để tạo POST trong OneBSS
 */

async function script_One_POST(vattu_id) {
	const url = 'https://api-one' + 'bss.vnpt.vn/web-quantri/vattu/fn_ins_vattu_md';
	const token = JSON.parse(localStorage.getItem('One' + 'BSS-Token')).access_token;
	const data = {
		"ds_md": [
			{ "MUCDICH_ID": 61 },
			{ "MUCDICH_ID": 62 },
			{ "MUCDICH_ID": 63 },
			{ "MUCDICH_ID": 64 },
			{ "MUCDICH_ID": 243 },
			{ "MUCDICH_ID": 10163 },
			{ "MUCDICH_ID": 10164 }
		],
		"vattu_id": vattu_id
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify(data)
	};
	try {
		const response = await fetch(url, options);
		const responseData = await response.json();
		console.log('Success:', responseData);
		return responseData;
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function loop_One_POST() {
	let vattu_ids = [6809, 3136, 3139, 3129, 3148, 88, 3150, 4896, 4888, 3128, 3445, 4174, 3103, 4177, 3505, 3513, 4389, 4886, 190, 4885, 4390, 4391, 4893, 4894, 834, 3439, 6525, 3440, 871, 4897, 4895, 6909, 4898, 4899, 3424, 3425, 3267, 3444, 3229, 263, 7471, 7470, 7472, 3451, 4892, 1311, 1968, 3511, 3465, 3469, 3160, 7017, 7018, 3496, 3518, 3090, 3153, 2226, 6609, 2665, 3446, 3503, 6939, 3448, 3449, 3468, 3462, 2729, 2752, 418, 3452, 3453, 3420, 3456, 3421, 3458, 3459, 3460, 2790, 2823, 2836, 4744, 4955, 3386, 3397, 3408, 3419, 3348, 3357, 3366, 3375, 4721, 3155, 3159, 3244, 6912, 3464, 1101, 123, 1962, 3232, 3137, 3203, 3035, 4887, 6608, 2605, 3096, 3147, 3133, 3116, 2590, 3530, 2584, 3101, 3105, 3149, 3474, 2549, 1354, 2739, 4745, 4244, 2107, 2815, 2814, 2802, 4243, 3138, 2582, 3135, 5126, 3433, 3441, 6060, 3134, 3423, 3098, 3512, 2551, 3506, 3507, 2627, 3472, 3527, 3502, 4392, 560, 2043, 2092, 802, 808, 1100, 2828, 2770, 3508, 3235, 700, 3114, 2822, 3481, 1960, 2842, 1141, 1143, 1145, 3497, 3477, 2145, 3475, 3495, 3247, 1268, 3102, 3124, 3510, 3491, 3494, 6910, 6448, 2042, 4688, 3467, 4956, 4861, 3528, 3521, 3443, 3152, 6013, 6911, 6449, 4889, 3895, 2787, 6447, 7015, 3457, 7143, 6636, 6663, 6951, 6479, 4891, 2819, 4957, 4890, 4857, 6905, 6908, 6906, 6451, 6907, 4372, 3531, 6015, 2218, 6770, 7126, 7234, 7016, 1156, 1168, 1169, 1171, 2748, 2746, 5003, 6314, 7144, 5004, 7145, 7146, 2652, 2637, 2729, 2090, 2761, 2735, 2902, 1146, 1175, 2020, 6482, 2720, 2639, 3473, 3471, 1136, 4959, 796, 797, 2929, 3470, 2906, 2907, 265, 268, 3304, 3127, 3492, 7159];
	for (let i = 0; i < vattu_ids.length; i++) {
		await script_One_POST(vattu_ids[i]);
		await delay(2000);
	}
}
if (document.URL.indexOf("cdpn.io") < 0) {
	if (document.URL.indexOf("one" + "bss.vnpt.vn") >= 0) {
		loop_One_POST();
	}
}

/*=============================================================================================*/

/*
 * Dùng để gán BC theo QUYEN_ID trong One /#/print/CauHinhBaoCao
 */

async function script_One_GanBC_QuyenId(quyen_id) {
	let logger = [];
	try {
		const url = 'https://api-one' + 'bss.vnpt.vn/web-quantri/quanlyquyen/sp_action_ds_quyen_baocao';
		const token = JSON.parse(localStorage.getItem('One' + 'BSS-Token')).access_token;
		let baocao_id = [parseInt(document.querySelector('.box-form:nth-child(3) .e-active:nth-child(2)').innerText)];
		logger.push("baocao_id::" + baocao_id);
		let nhom_bc_id = document.querySelector('.box-form .row:nth-child(3) select').value;
		logger.push("nhom_bc_id::" + nhom_bc_id);
		const data = {
			"p_baocao_id_arr": baocao_id,
			"p_kieu": 1,
			"p_nhom_bc_id": nhom_bc_id,
			"p_quyen_id": quyen_id
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(data)
		};

		const response = await fetch(url, options);
		const responseData = await response.json();
		console.log('Success:', responseData);
		return responseData;
	} catch (error) {
		console.error('Error:', error);
		return {
			message: "Error::script_One_GanBC_QuyenId",
			message_detail: logger.toString()
		};
	}
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function main(quyen_ids) {
	try {
		let quyen_ids_arr = quyen_ids.replace(new RegExp('[^0-9,]','gm'),'').split(',');
		let logger_html = document.querySelector('.box-form .row:nth-child(5) .info-row:nth-child(4) .value');
		logger_html.innerHTML = "";
		for (let i = 0; i < quyen_ids_arr.length; i++) {
			let quyen_id = quyen_ids_arr[i];
			let result = await script_One_GanBC_QuyenId(quyen_id);
			if (result.message == "Success") {
				logger_html.innerHTML += '<p style="color:green">' + quyen_id + ': Đã gán mới</p>';
			}
			else {
				if (result.message_detail.indexOf('unique constraint') >= 0) {
					logger_html.innerHTML += '<p style="color:green">' + quyen_id + ': Đã tồn tại</p>';
				}
				else {
					logger_html.innerHTML += '<p style="color:red">' + quyen_id + ': Lỗi: ' + result.message_detail + '</p>';
				}

			}
			await delay(500);
		}
	}
	catch (e) {
		console.log(e);
	}
}
if (document.URL.indexOf("cdpn.io") < 0) {
	if (document.URL.indexOf("one" + "bss.vnpt.vn") >= 0 && document.URL.indexOf("CauHinhBaoCao") >= 0) {
		let dsquyen = prompt("Điền các QUYEN_ID cần gán (cách nhau bằng dấu phẩy)");
		if (dsquyen) {
			main(dsquyen);
		}
	} else {
		alert("Sử dụng tại trang CauHinhBaoCao");
	}
}



/*=============================================================================================*/

/*
 * Dùng để tạo mới BC trong OneBSS
 */

async function script_One_TaoBC(input) {
	let logger = [];
	try {
		if (input[0] === '"' && input.length - 2 === '"') {
			input = input.substr(1, input.length - 2);
		}
		input_split = input.split("||");
		input_json = {
			"BAOCAO_ID": 0,
			"PHANVUNG_ID": "2",
			"MA_BC": input_split[2],
			"NHOM_BC_ID": "",
			"TEN_BC": input_split[1],
			"TRANGTHAI": 1,
			"GHICHU": "",
			"CAULENH": input_split[3],
			"THUTU": input_split[0],
			"LOAIHD_ID": 0,
			"THUTUC": "",
			"XUAT_EXCEL": 0
		};
		const url = 'https://api-one' + 'bss.vnpt.vn/web-quantri/danhmuc-chung/fn_thietke_baocao_capnhat';
		const token = JSON.parse(localStorage.getItem('One' + 'BSS-Token')).access_token;
		let nhom_bc_id = document.querySelector('.box-form .row:nth-child(3) select').value;
		logger.push("nhom_bc_id::" + nhom_bc_id);
		input_json["NHOM_BC_ID"] = nhom_bc_id;
		const data = {
			"p_ds_baocao": JSON.stringify(input_json),
			"p_ds_baocao_hg": "[]",
			"p_ds_baocao_phanvungs": "[]",
			"p_kieu": 1
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(data)
		};

		const response = await fetch(url, options);
		const responseData = await response.json();
		console.log('Success:', responseData);
		return responseData;
	} catch (error) {
		console.error('Error:', error);
		return {
			message: "Error::script_One_GanBC_QuyenId",
			message_detail: logger.toString()
		};
	}
}
async function main(input) {
	let result = await script_One_TaoBC(input);
	if (result.message == "Success") {
		alert('Đã tạo thành công');
	}
	else {
		alert("Có lỗi xảy ra: " + result.message + ":" + + result.message_detail);
	}
}
if (document.URL.indexOf("cdpn.io") < 0) {
	if (document.URL.indexOf("one" + "bss.vnpt.vn") >= 0) {
		let input = prompt("Điền JSON tạo mới BC");
		if (input) {
			main(input);
		}
	}
	else {
		window.location.href = "https://one" + "bss.vnpt.vn/#/print/CauHinhBaoCao";
	}
}