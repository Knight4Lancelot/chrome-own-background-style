var pageWidth, pageHeight;
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
var webCollectionsName = document.getElementById('web-collections-name');
var setBackground = document.getElementById('set-background');
var setBackgroundName = document.getElementById('set-background-name');
var moreFunctions = document.getElementById('more-functions');
var moreFunctionsName = document.getElementById('more-functions-name');

body.onload = init;
searchBtn.onmouseover = function() { searchBtnStatus(true); }
searchBtn.onmouseout = function() { searchBtnStatus(false); }
searchBtn.onclick = jump2URL;
searchInput.onfocus = function() { searchInputIsFocus(true); }
searchInput.onblur = function() { searchInputIsFocus(false); }
searchInput.onmouseover = function() { searchInputIsOver(true); }
searchInput.onmouseout = function() { searchInputIsOver(false); }
// 常用功能列表的函数设置
webCollections.onmouseover = function() { changeBtnSize(0, true); }
webCollections.onmouseout = function() { changeBtnSize(0, false); }
setBackground.onmouseover = function() { changeBtnSize(1, true); }
setBackground.onmouseout = function() { changeBtnSize(1, false); }
moreFunctions.onmouseover = function() { changeBtnSize(2, true); }
moreFunctions.onmouseout = function() { changeBtnSize(2, false); }

for (let i = 0; i < nameList.length; i++) {
	nameList[i].onmouseover = function() { changeNameVisible(i, true); }
	nameList[i].onmouseout = function() { changeNameVisible(i, false); }	
}

function init() {
	pageHeight=document.documentElement.clientHeight;
	pageWidth=document.documentElement.clientWidth;
	if (pageHeight<700) { pageHeight = 700; }
	if (pageWidth<1300) { pageWidth = 1300; }
	body.style.width = pageWidth;
	body.style.height = pageHeight;
	
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
	dateClock1.style.left = String((pageWidth-155)/2) + 'px';
	dateClock2.style.left = String((pageWidth - 120)/2) + 'px';
	tools.style.left = String((pageWidth - 790)/2) + 'px';
	// 功能按钮定位
	for (var i = 0; i < btnList.length; i++) {
		btnListLocation.left.push(20+(i%5) * 150);
		btnListLocation.top.push(20+(i<5?0:1) * 150);
		btnList[i].style.left = String(btnListLocation.left[i]) + 'px';
		btnList[i].style.top = String(btnListLocation.top[i]) + 'px';
		nameList[i].style.left = String(btnListLocation.left[i]+12) + 'px';
		nameList[i].style.top = String(btnListLocation.top[i]+50) + 'px';
		hiddenNameList.btn.push(false);
		hiddenNameList.span.push(false);
	}
}

function setInputShow(status) {
	if (status) {
		searchInput.style.border = "2px solid #4CA4FF";
		searchInput.style.borderRight = "none";
		searchBtn.style.border = "2px solid #4CA4FF";
		searchBtn.style.borderLeft = "none";
	} else {
		searchInput.style.border = "2px solid #C0C4CC";
		searchInput.style.borderRight = "none";
		searchBtn.style.border = "2px solid #C0C4CC";
		searchBtn.style.borderLeft = "none";
	}
}

function setBtnIconShow(status) {
	if (status) {
		searchBtnIcon.src = "../logo/search-active.png"
	} else {
		searchBtnIcon.src = "../logo/search.png"
	}
}

function setSearchPartOpacity(status) {
	if (status) {
		searchBtn.style.opacity = 1;
		searchInput.style.opacity = 1;
	} else {
		searchBtn.style.opacity = 0.5;
		searchInput.style.opacity = 0.5;
	}
}

function jump2URL() {
	var url = searchInput.value;
	console.log(url)
	//console.log(document.location)
	if (url.slice(0,4)==="http") {
		window.open(url);
	} else {
		window.open('http://'+url);
	}
}

function searchBtnStatus(status) {
	btnHover = status;
	setBtnIconShow(btnHover);
	setSearchPartOpacity(btnHover||inputFocus||inputHover);
}

function searchInputIsFocus(status) {
	inputFocus = status;
	setInputShow(inputFocus);
	setSearchPartOpacity(btnHover||inputFocus||inputHover);
}

function searchInputIsOver(status) {
	inputHover = status;
	setSearchPartOpacity(btnHover||inputFocus||inputHover);
}

function freshTime() {
	window.setTimeout(function(){
		freshTime();
	},1000/2)
	var rawDate = new Date();
	var hour = rawDate.getHours()   //获取小时
	var minute = rawDate.getMinutes()  //获取分钟
	var second = rawDate.getSeconds()   //获取秒
	if (hour<10) hour = "0" + hour;
	if (minute<10) minute = "0" + minute;
	if (second<10) second = "0" + second;
	var time = hour+" : "+minute+" : "+second;
	timeClock.innerText = time;
}

function changeBtnSize(index, status) {
	hiddenNameList.btn[index] = status;
	ShowNameInfo(index, hiddenNameList.span[index]||hiddenNameList.btn[index]);
}

function changeNameVisible(index, status) {
	hiddenNameList.span[index] = status;
	ShowNameInfo(index, hiddenNameList.span[index]||hiddenNameList.btn[index]);
}

function ShowNameInfo(index, status) {
	nameList[index].style.visibility = status ? 'visible' : 'hidden';
	if (status) {
		btnList[index].style.width = '120px';
		btnList[index].style.height = '120px';
		btnList[index].style.opacity = 1;
		btnList[index].style.left = String(btnListLocation.left[index]-20)+'px';
		btnList[index].style.top = String(btnListLocation.top[index]-20)+'px';
		btnList[index].children[0].style.left = '42px';
		btnList[index].children[0].style.top = '30px';
	} else {
		btnList[index].style.width = '80px';
		btnList[index].style.height = '80px';
		btnList[index].style.opacity = 0.7;
		btnList[index].style.left = String(btnListLocation.left[index])+'px';
		btnList[index].style.top = String(btnListLocation.top[index])+'px';
		btnList[index].children[0].style.left = '22px';
		btnList[index].children[0].style.top = '22px';
	}
}