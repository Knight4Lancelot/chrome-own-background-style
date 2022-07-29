var pageWidth, pageHeight;
var naturalImgSize = {
	height: 0,
	width: 0
};
// 选择背景图片的时候缩小版的图片展示信息
var readImgInfos = {
	top: 0,
	left: 0,
	ratio: 1,
	naturalWidth: 1920,
	naturalHeight: 1080,
	narrowWidth: 0,
	narrowHeight: 430,
	imgSrc: '0'
};
// 选择背景图片的时候选择框的信息
var imgSelectorInfo = {
	left: 0,
	top: 0,
	width: 0,
	height: 0
};
readImgInfos.narrowWidth = 430*readImgInfos.naturalWidth/readImgInfos.naturalHeight;
var inputFocus = false;
var btnHover = false;
var inputHover = false;
var btnListLocation = {
	left: [],
	top: []
};
var hiddenNameList = {
	btn: [],
	span: []
};

var body = document.getElementById('main-body');
var backgroundImg = document.getElementById('body-background');
var searchBtnIcon = document.getElementById('btn-cover-icon');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('confirm-search-btn');
var dateClock1 = document.getElementById('date-clock-1');
var dateClock2 = document.getElementById('date-clock-2');
var timeClock = document.getElementById('time-clock');
var tools = document.getElementById('tools');

// 功能按钮与功能名称描述集合
var btnList = document.getElementsByClassName('function-entries');
var nameList = document.getElementsByClassName('hover-show-function-name');

// 常用功能列表元素
var webCollections = document.getElementById('web-collections');
// var webCollectionsName = document.getElementById('web-collections-name');
var setBackground = document.getElementById('set-background');
// var setBackgroundName = document.getElementById('set-background-name');
var moreFunctions = document.getElementById('more-functions');
// var moreFunctionsName = document.getElementById('more-functions-name');
var recordIssue = document.getElementById('record-issues');
// var recordIssueName = document.getElementById('record-issues-name');

// 不在页面中显示的模块
var outerPartList = document.getElementsByClassName('outer-part');
var indexCoverLayer = document.getElementById('cover-layer');
// 修改背景功能元素
var changeBackgroundComponent = document.getElementById('change-background-img');
var chooseImgBtn = document.getElementById('choose-img');
var ratioSetter = document.getElementById('change-img-ratio');
var imgChosenPart = document.getElementById('img-chosen-part');
var chosenImg = document.getElementById('chosen-img');


// 不在页面中显示的模块的关闭按钮与图标
var closeBtnsList = document.getElementsByClassName('close-btns');
var closeIconList = document.getElementsByClassName('close-btns-icon');


body.onload = function() { init(); }; // normal.js
// 搜索框函数设置
searchBtn.onmouseover = function() { searchBtnStatus(true); }; // normal.js
searchBtn.onmouseout = function() { searchBtnStatus(false); }; // normal.js
searchBtn.onclick = function() { jump2URL(); }; // normal.js
searchInput.onfocus = function() { searchInputIsFocus(true); }; // normal.js
searchInput.onblur = function() { searchInputIsFocus(false); }; // normal.js
searchInput.onmouseover = function() { searchInputIsOver(true); }; // normal.js
searchInput.onmouseout = function() { searchInputIsOver(false); }; // normal.js

// 常用功能列表的函数设置
webCollections.onmouseover = function() { changeBtnSize(0, true); }; // function-entry-btns.js
webCollections.onmouseout = function() { changeBtnSize(0, false); }; // function-entry-btns.js
setBackground.onmouseover = function() { changeBtnSize(1, true); }; // function-entry-btns.js
setBackground.onmouseout = function() { changeBtnSize(1, false); }; // function-entry-btns.js
setBackground.onclick = function() { showChangeBackground(); }; // outerPart.js
recordIssue.onmouseover = function() { changeBtnSize(2, true); }; // function-entry-btns.js
recordIssue.onmouseout = function() { changeBtnSize(2, false); }; // function-entry-btns.js
moreFunctions.onmouseover = function() { changeBtnSize(3, true); }; // function-entry-btns.js
moreFunctions.onmouseout = function() { changeBtnSize(3, false); }; // function-entry-btns.js

// 修改背景功能元素的函数设置
imgChosenPart.onmousedown = function() { partChoose(); }; // outer-part.js
imgChosenPart.onmouseup = function() { partRelease(); }; // outer-part.js
imgChosenPart.onmousemove = function() { partMove() }; // outer-part.js

for (let i = 0; i < nameList.length; i++) {
	nameList[i].onmouseover = function() { changeNameVisible(i, true); };
	nameList[i].onmouseout = function() { changeNameVisible(i, false); };	
}
for (let i = 0; i < closeBtnsList.length; i++) {
	closeBtnsList[i].onmouseover = function() { setBtnStatus(i, true); };
	closeBtnsList[i].onmouseout = function() { setBtnStatus(i, false); };
	closeBtnsList[i].onclick = function() { closeOuterPart(i); }
}

document.onkeypress = function() {
	if (event.keyCode==13) {
		jump2URL();
	}
}

document.onmousewheel = function() {
	if (changeBackgroundComponent.style.visibility==="visible") {
		changeRatio(window.event.wheelDelta);
	}
}

function init() {
	pageHeight=document.documentElement.clientHeight;
	pageWidth=document.documentElement.clientWidth;
	if (pageHeight<700) { pageHeight = 700; }
	if (pageWidth<1300) { pageWidth = 1300; }
	body.style.width = pageWidth;
	body.style.height = pageHeight;
	// 加载背景图片
	loadBackground(); // normal.js
	// 加载时钟
	var rawDate = new Date();
	var year = rawDate.getFullYear()  //获取年
	var month = rawDate.getMonth()+1;  //获取月
	var day = rawDate.getDay()    //获取日
	var days = rawDate.getDate() //获取日期
	if (month<10) month = "0" + month;
	if (days<10) days = "0" + days;
	var week = new Array(
		"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
	);
	var date = year+" 年 "+month+" 月 "+days+" 日";
	dateClock1.innerText = date;
	dateClock2.innerText = week[day];
	freshTime() // 加载时钟
	
	// 组件位置居中对齐
	body.style.width = String(pageWidth) + 'px';
	body.style.height = String(pageHeight) + 'px';
	searchInput.style.left = String((pageWidth - 564)/2) + 'px';
	searchBtn.style.left = String((pageWidth - 564)/2 + 484) + 'px';
	timeClock.style.left = String((pageWidth - 370)/2-10) + 'px';
	dateClock1.style.left = String((pageWidth - 155)/2) + 'px';
	dateClock2.style.left = String((pageWidth - 80)/2) + 'px';
	tools.style.left = String((pageWidth - 750)/2) + 'px';
	changeBackgroundComponent.style.left = String((pageWidth - 1100)/2) + 'px';
	if (readImgInfos.narrowWidth<1000) {
		chosenImg.style.left = String((1000-readImgInfos.narrowWidth)/2) + 'px';
	}
	// 功能按钮定位
	for (var i = 0; i < btnList.length; i++) {
		btnListLocation.left.push(20+i*150);
		btnListLocation.top.push(20);
		btnList[i].style.left = String(btnListLocation.left[i]) + 'px';
		btnList[i].style.top = String(btnListLocation.top[i]) + 'px';
		nameList[i].style.left = String(btnListLocation.left[i]+5) + 'px';
		nameList[i].style.top = String(btnListLocation.top[i]+55) + 'px';
		hiddenNameList.btn.push(false);
		hiddenNameList.span.push(false);
	}
}