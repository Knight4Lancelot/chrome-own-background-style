function loadBackground() {
	naturalImgSize.height = backgroundImg.naturalHeight;
	naturalImgSize.width = backgroundImg.naturalWidth;
	var ratio, ratio1, ratio2;
	var top = 0, left = 0;
	ratio = 1;
	backgroundImg.style.left = String(-top) + 'px';
	backgroundImg.style.top = String(-left) + 'px';
	backgroundImg.style.width = String(naturalImgSize.width/ratio) + 'px';
	backgroundImg.style.height = String(naturalImgSize.height/ratio) + 'px';
}

function changeTimerColor() {
	console.log(dateClock1.style.color)
	if (timeClock.style.color === 'rgb(96, 98, 102)') {
		timeClock.style.color = 'white';
		dateClock1.style.color = 'white';
		dateClock2.style.color = 'white';
	} else {
		timeClock.style.color = 'rgb(96, 98, 102)';
		dateClock1.style.color = 'rgb(99, 101, 108)';
		dateClock2.style.color = 'rgb(99, 101, 108)';
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
		searchBtnIcon.src = "../../assets/icons/search-active.png";
	} else {
		searchBtnIcon.src = "../../assets/icons/search.png"
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

