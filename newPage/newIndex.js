var pageWidth, pageHeight;

var body = document.getElementById('main-body');
var searchBtnIcon = document.getElementById('btn-cover-icon');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('confirm-search-btn');

body.onload = init;
searchBtn.onmouseover = searchBtnOver;
searchBtn.onmouseout = searchBtnOut;
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

function searchBtnOver() {
	searchBtnIcon.src = "../logo/search-active.png"
}

function searchBtnOut() {
	searchBtnIcon.src = "../logo/search.png"
}

function searchInputFocus() {
	searchInput.style.border = "2px solid #4CA4FF";
	searchInput.style.borderRight = "none";
	searchBtn.style.border = "2px solid #4CA4FF";
	searchBtn.style.borderLeft = "none";
}

function searchInputBlur() {
	searchInput.style.border = "2px solid #C0C4CC";
	searchInput.style.borderRight = "none";
	searchBtn.style.border = "2px solid #C0C4CC";
	searchBtn.style.borderLeft = "none";
}