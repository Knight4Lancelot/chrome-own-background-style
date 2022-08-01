var pageWidth, pageHeight;
var naturalImgSize = {
	height: 0,
	width: 0
};
/*
	选择背景图片的时候缩小版的图片展示信息
		readImgInfos初始化时只需要填充naturalWidth，naturalHeight即可
		其余的用initImgChoosePartSize()函数即可
*/
var isExist = false;
var isChange = false;
var readImgInfos = {
	top: 0,
	left: 0, // 这俩是在略缩状态下距离边框的偏移量
	offsetLeft: 0,
	offsetTop: -70, // 这俩是实际上相对浏览器可视区域的偏移量
	ratio: 100,
	minratio: 100,
	maxratio: 100,
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
	initWidth: 0,
	initHeight: 0,
	width: 0,
	height: 0
};
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
var pageCoverLayer = document.getElementById('cover-layer');
var backgroundImg = document.getElementById('body-background');
var searchBtnIcon = document.getElementById('btn-cover-icon');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('confirm-search-btn');
var timer = document.getElementById('Timer');
var timeClock = document.getElementById('time-clock');
var dateClock1 = document.getElementById('date-clock-1');
var dateClock2 = document.getElementById('date-clock-2');
var tools = document.getElementById('tools');

// 功能按钮与功能名称描述集合
var btnList = document.getElementsByClassName('function-entries');
var nameList = document.getElementsByClassName('hover-show-function-name');

// 常用功能列表元素
var sleepReminder = document.getElementById('sleep-reminder');
// var webCollectionsName = document.getElementById('web-collections-name');
var setBackground = document.getElementById('set-background');
// var setBackgroundName = document.getElementById('set-background-name');
var moreFunctions = document.getElementById('more-functions');
// var moreFunctionsName = document.getElementById('more-functions-name');
var memoIssue = document.getElementById('memo-issues');
// var memoIssueName = document.getElementById('memo-issues-name');

// 不在页面中显示的模块
var outerPartList = document.getElementsByClassName('outer-part');
var indexCoverLayer = document.getElementById('cover-layer');
// 修改背景功能元素
var changeBackgroundComponent = document.getElementById('change-background-img');
var chooseImgBtn = document.getElementById('choose-img-btn');
var confirmSetBtn = document.getElementById('confirm-set-background');
var ratioSetter = document.getElementById('change-img-ratio');
var imgChosenPart = document.getElementById('img-chosen-part');
var chosenImg = document.getElementById('chosen-img');
var imgCoverLayer = document.getElementsByClassName('choose-img-cover-layer');
var imgChosenPart = document.getElementById('img-chosen-part');
var imgChosenCornerList = document.getElementsByClassName('corner-boundaries');
var chooseImgBtn = document.getElementById('choose-img-btn');
var selectFileBtn = document.getElementById('select-files-btn');
// 备忘录元素
var memoContainer = document.getElementById('memo-container');
// 提示睡觉元素
var sleepClockSetter = document.getElementById('sleep-remind-setter');
var sleepClockReminder = document.getElementById('sleep-remind-reminder');
// 不在页面中显示的模块的关闭按钮与图标
var closeBtnsList = document.getElementsByClassName('close-btns');
var closeIconList = document.getElementsByClassName('close-btns-icon');


body.onload = function() {
	readDBTableData();
	setTimeout(()=>{ init(); }, 100);
}; // normal.js

// 搜索框函数设置
searchBtn.onmouseover = function() { searchBtnStatus(true); }; // normal.js
searchBtn.onmouseout = function() { searchBtnStatus(false); }; // normal.js
searchBtn.onclick = function() { jump2URL(); }; // normal.js
searchInput.onfocus = function() { searchInputIsFocus(true); }; // normal.js
searchInput.onblur = function() { searchInputIsFocus(false); }; // normal.js
searchInput.onmouseover = function() { searchInputIsOver(true); }; // normal.js
searchInput.onmouseout = function() { searchInputIsOver(false); }; // normal.js

/* 
	功能列表的函数设置
*/
// 修改时钟样式（白-黑）
timer.onclick = function() { changeTimerColor(); };
// 设置背景功能
setBackground.onmouseover = function() { changeBtnSize(0, true); }; // function-entry-btns.js
setBackground.onmouseout = function() { changeBtnSize(0, false); }; // function-entry-btns.js
setBackground.onclick = function() { showChangeBackground(); }; // change-background.js
// 备忘录功能
memoIssue.onmouseover = function() { changeBtnSize(1, true); }; // function-entry-btns.js
memoIssue.onmouseout = function() { changeBtnSize(1, false); }; // function-entry-btns.js
memoIssue.onclick = function() { showMemoContainer(); }; // outerPart.js
// 
sleepReminder.onmouseover = function() { changeBtnSize(2, true); }; // function-entry-btns.js
sleepReminder.onmouseout = function() { changeBtnSize(2, false); }; // function-entry-btns.js
// 更多功能
moreFunctions.onmouseover = function() { changeBtnSize(3, true); }; // function-entry-btns.js
moreFunctions.onmouseout = function() { changeBtnSize(3, false); }; // function-entry-btns.js

// 修改背景功能元素的函数设置
imgChosenPart.onmousedown = function() { partChoose(); }; // outer-part.js
imgChosenPart.onmouseup = function() { partRelease(); }; // outer-part.js
imgChosenPart.onmouseout = function() { partRelease(); }; // outer-part.js
imgChosenPart.onmousemove = function() { partMove() }; // outer-part.js
ratioSetter.onblur = function() { changeRatio(0, true); }; // outer-part.js
chooseImgBtn.onmouseover = function() { changeBtnStyle(chooseImgBtn, true); }; // outer-part.js
chooseImgBtn.onmouseout = function() { changeBtnStyle(chooseImgBtn, false); }; // outer-part.js
chooseImgBtn.onclick = function() { selectFileBtn.click(); };
selectFileBtn.onchange = function() { getPicture(this); };
confirmSetBtn.onmouseover = function() { changeBtnStyle(confirmSetBtn, true); }; // outer-part.js
confirmSetBtn.onmouseout = function() { changeBtnStyle(confirmSetBtn, false); }; // outer-part.js
confirmSetBtn.onclick = function() { confirmToSetBackground(); }; // outer-part.js

// 设置备忘录元素的函数设置


for (let i = 0; i < nameList.length; i++) {
	nameList[i].onmouseover = function() { changeNameVisible(i, true); };
	nameList[i].onmouseout = function() { changeNameVisible(i, false); };	
}
for (let i = 0; i < closeBtnsList.length; i++) { // outer-part.js
	closeBtnsList[i].onmouseover = function() { setBtnStatus(i, true); };
	closeBtnsList[i].onmouseout = function() { setBtnStatus(i, false); };
	closeBtnsList[i].onclick = function() { closeOuterPart(i); }
}

document.onkeypress = function() {
	switch(event.keyCode) {
		case 13: jump2URL(); break;
	}
}

document.onmousewheel = function() {
	if (changeBackgroundComponent.style.visibility==="visible") {
		changeRatio(window.event.wheelDelta, false);
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
	// timeClock.style.left = String((pageWidth - 400)/2-10) + 'px';
	// dateClock1.style.left = String((pageWidth - 155)/2) + 'px';
	// dateClock2.style.left = String((pageWidth - 110)/2) + 'px';
	timer.style.left = String((pageWidth - 600)/2+20) + 'px';
	tools.style.left = String((pageWidth - 750)/2) + 'px';
	changeBackgroundComponent.style.left = String((pageWidth - 1100)/2) + 'px';
	
	if (isExist) {
		backgroundImg.src = readImgInfos.imgSrc;
		chosenImg.src = readImgInfos.imgSrc;
		setTimeout(()=>{
			readImgInfos.naturalHeight = backgroundImg.naturalHeight;
			readImgInfos.naturalWidth = backgroundImg.naturalWidth;
		}, 100);
	}
	backgroundImg.style.height = String(100*readImgInfos.naturalHeight/readImgInfos.ratio) + 'px';
	backgroundImg.style.width = String(100*readImgInfos.naturalWidth/readImgInfos.ratio) + 'px';
	backgroundImg.style.left = String(readImgInfos.offsetLeft) + 'px';
	backgroundImg.style.top = String(readImgInfos.offsetTop) + 'px';
	
	// 初始化选择背景图片的一系列组件的大小
	initImgChoosePartSize();
	
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

function initImgChoosePartSize() {
	readImgInfos.narrowWidth = 430*readImgInfos.naturalWidth/readImgInfos.naturalHeight;
	readImgInfos.left = (1000-readImgInfos.narrowWidth)/2;
	if (readImgInfos.left<0) { readImgInfos.left=0; }
	chosenImg.style.left = String(readImgInfos.left) + 'px';
	imgSelectorInfo.height = 430*pageHeight/readImgInfos.naturalHeight;
	if (imgSelectorInfo.height>430) {
		imgSelectorInfo.height = 430;
	}
	imgSelectorInfo.width = imgSelectorInfo.height*pageWidth/pageHeight;
	imgSelectorInfo.initHeight = imgSelectorInfo.height;
	imgSelectorInfo.initWidth = imgSelectorInfo.width;
	imgSelectorInfo.top = 0;
	imgSelectorInfo.left = (1000-readImgInfos.narrowWidth)/2;
	imgChosenPart.style.left = chosenImg.style.left;
	imgChosenPart.style.top = '0px';
	imgChosenPart.style.width = String(imgSelectorInfo.width)+'px';
	imgChosenPart.style.height = String(imgSelectorInfo.height)+'px';
	imgCoverLayer[0].style.width = chosenImg.style.left;
	imgCoverLayer[1].style.width = String(
		(chosenImg.narrowWidth>1000?chosenImg.narrowWidth:1000)
		-imgSelectorInfo.width-imgSelectorInfo.left) + 'px';
	imgCoverLayer[2].style.width = String(imgSelectorInfo.width) + 'px';
	imgCoverLayer[2].style.left = String(imgSelectorInfo.left) + 'px';
	imgCoverLayer[2].style.height = String(imgSelectorInfo.top) + 'px';
	imgCoverLayer[3].style.width = String(imgSelectorInfo.width) + 'px'
	imgCoverLayer[3].style.left = String(imgSelectorInfo.left) + 'px';
	imgCoverLayer[3].style.height = String(
		430-imgSelectorInfo.top-imgSelectorInfo.height
		) + 'px';
	var r1 = 430/imgSelectorInfo.initHeight,
		r2 = readImgInfos.narrowWidth/imgSelectorInfo.initWidth;
	readImgInfos.maxratio = (r1 < r2 ? r1 : r2) * 100;
	r1 = 100/imgSelectorInfo.initHeight;
	r2 = 100/imgSelectorInfo.initWidth;
	readImgInfos.minratio = (r1 > r2 ? r1 : r2) * 100;
	if (readImgInfos.ratio>readImgInfos.maxratio) {
		readImgInfos.ratio = readImgInfos.maxratio;
		ratioSetter.value = String(parseInt(readImgInfos.ratio));
		changeRatio(0, true);
	}
}