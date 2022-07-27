var pageWidth, pageHeight;
var naturalImgSize = {
	height: 0,
	width: 0
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

body.onload = function() { init(); };
// 搜索框函数设置
searchBtn.onmouseover = function() { searchBtnStatus(true); };
searchBtn.onmouseout = function() { searchBtnStatus(false); };
searchBtn.onclick = function() { jump2URL(); };
searchInput.onfocus = function() { searchInputIsFocus(true); };
searchInput.onblur = function() { searchInputIsFocus(false); };
searchInput.onmouseover = function() { searchInputIsOver(true); };
searchInput.onmouseout = function() { searchInputIsOver(false); };

// 常用功能列表的函数设置
webCollections.onmouseover = function() { changeBtnSize(0, true); };
webCollections.onmouseout = function() { changeBtnSize(0, false); };
setBackground.onmouseover = function() { changeBtnSize(1, true); };
setBackground.onmouseout = function() { changeBtnSize(1, false); };
setBackground.onclick = function() { showChangeBackground(); }; // outerPart.js
recordIssue.onmouseover = function() { changeBtnSize(2, true); };
recordIssue.onmouseout = function() { changeBtnSize(2, false); };
moreFunctions.onmouseover = function() { changeBtnSize(3, true); };
moreFunctions.onmouseout = function() { changeBtnSize(3, false); };

for (let i = 0; i < nameList.length; i++) {
	nameList[i].onmouseover = function() { changeNameVisible(i, true); };
	nameList[i].onmouseout = function() { changeNameVisible(i, false); };	
}

document.onkeypress = function() {
	if (event.keyCode==13) {
		jump2URL();
	}
} 