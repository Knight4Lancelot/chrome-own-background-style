function loadBackground() {
	naturalImgSize.height = backgroundImg.naturalHeight;
	naturalImgSize.width = backgroundImg.naturalWidth;
	var ratio, ratio1, ratio2;
	var top = 0, left = 0;
	// ratio1 = naturalImgSize.height / pageHeight;
	// ratio2 = naturalImgSize.width / pageWidth;
	// ratio = ratio1 < ratio2 ? ratio1 : ratio2;
	// console.log(ratio);
	ratio = 1.25;
	backgroundImg.style.left = String(-top) + 'px';
	backgroundImg.style.top = String(-left) + 'px';
	backgroundImg.style.width = String(naturalImgSize.width/ratio) + 'px';
	backgroundImg.style.height = String(naturalImgSize.height/ratio) + 'px';
}

function init() {
	pageHeight=document.documentElement.clientHeight;
	pageWidth=document.documentElement.clientWidth;
	if (pageHeight<700) { pageHeight = 700; }
	if (pageWidth<1300) { pageWidth = 1300; }
	body.style.width = pageWidth;
	body.style.height = pageHeight;
	// 加载背景图片
	loadBackground();
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
	dateClock1.style.left = String((pageWidth-155)/2) + 'px';
	dateClock2.style.left = String((pageWidth - 120)/2) + 'px';
	tools.style.left = String((pageWidth - 790)/2) + 'px';
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

