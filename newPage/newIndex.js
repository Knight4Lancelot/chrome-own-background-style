var pageWidth, pageHeight;
var inputFocus = false;
var btnHover = false;
var inputHover = false;

var body = document.getElementById('main-body');
var backgroundImg = document.getElementById('body-background');
var searchBtnIcon = document.getElementById('btn-cover-icon');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('confirm-search-btn');
var dateClock1 = document.getElementById('date-clock-1');
var dateClock2 = document.getElementById('date-clock-2');
var timeClock = document.getElementById('time-clock');
var tools = document.getElementById('tools');

body.onload = init;
searchBtn.onmouseover = searchBtnOver;
searchBtn.onmouseout = searchBtnOut;
searchBtn.onclick = jump2URL;
searchInput.onfocus = searchInputFocus;
searchInput.onblur = searchInputBlur;
searchInput.onmouseover = searchInputOver;
searchInput.onmouseout = searchInputOut;

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
	dateClock1.style.left = String((pageWidth-140)/2) + 'px';
	dateClock2.style.left = String((pageWidth - 73)/2) + 'px';
	tools.style.left = String((pageWidth - 750)/2) + 'px';
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

function searchBtnOver() {
	btnHover = true;
	setBtnIconShow(btnHover);
	setSearchPartOpacity(btnHover||inputFocus||inputHover);
}

function searchBtnOut() {
	btnHover = false;
	setBtnIconShow(btnHover);
	setSearchPartOpacity(btnHover||inputFocus||inputHover);
}

function searchInputFocus() {
	inputFocus = true;
	setInputShow(inputFocus);
	setSearchPartOpacity(btnHover||inputFocus||inputHover);
}

function searchInputBlur() {
	inputFocus = false;
	setInputShow(inputFocus);
	setSearchPartOpacity(btnHover||inputFocus||inputHover);
}

function searchInputOver() {
	inputHover = true;
	setSearchPartOpacity(btnHover||inputFocus||inputHover);
}

function searchInputOut() {
	inputHover = false;
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