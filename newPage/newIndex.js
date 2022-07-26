var pageWidth, pageHeight;
var inputFocus = false;
var btnHover = false;

var body = document.getElementById('main-body');
var searchBtnIcon = document.getElementById('btn-cover-icon');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('confirm-search-btn');

body.onload = init;
searchBtn.onmouseover = searchBtnOver;
searchBtn.onmouseout = searchBtnOut;
searchBtn.onclick = jump2URL;
searchInput.onfocus = searchInputFocus;
searchInput.onblur = searchInputBlur;

function init() {
	pageHeight=document.documentElement.clientHeight;
	pageWidth=document.documentElement.clientWidth;
	if (pageHeight<700) { pageHeight = 700; }
	if (pageWidth<1300) { pageWidth = 1300; }
	body.style.width = pageWidth;
	body.style.height = pageHeight;
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
	window.open('https://'+url);
}

function searchBtnOver() {
	btnHover = true;
	setBtnIconShow(btnHover);
	setSearchPartOpacity(btnHover||inputFocus);
}

function searchBtnOut() {
	btnHover = false;
	setBtnIconShow(btnHover);
	setSearchPartOpacity(btnHover||inputFocus);
}

function searchInputFocus() {
	inputFocus = true;
	setInputShow(inputFocus);
	setSearchPartOpacity(btnHover||inputFocus);
}

function searchInputBlur() {
	inputFocus = false;
	setInputShow(inputFocus);
	setSearchPartOpacity(btnHover||inputFocus);
}