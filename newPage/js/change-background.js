var isChosen = false;
var m_move_x, m_move_y,
	m_down_x, m_down_y,
	dx, dy,
	md_x, md_y,
	ndx, ndy;

function getPicture(obj){
	var fileInfo = obj.files[0].name.split('.');
	var imgSource;
	isChange = true;
	switch (fileInfo[fileInfo.length-1]) {
		case "png":
		case "jpeg":	
		case "jpg": break;
		default: alert('文件类型不合要求'); return;
	}
	if (typeof FileReader != "undefined") {
		var reader = new FileReader();
		reader.onload = function(e) {
			imgSource = e.target.result;
			chosenImg.src = e.target.result;
			// updateInfo(e.target.result)
		}
		reader.readAsDataURL(obj.files[0]);
		setTimeout(()=>{
			// console.log(chosenImg.naturalHeight, chosenImg.naturalWidth);
			readImgInfos.naturalWidth = chosenImg.naturalWidth;
			readImgInfos.naturalHeight = chosenImg.naturalHeight;
			readImgInfos.ratio = 100;
			readImgInfos.imgSrc = chosenImg.src;
			initImgChoosePartSize();
		}, 100);
	} else if (browserVersion.indexOf("SAFARI") > -1) {
		alert("暂时不支持Safari浏览器!");
	}
}

function changeBtnStyle(element, status) {
	element.style['background-color'] = status ? '#409EFF' : '#D8EBFF';
	element.style['color'] = status ? 'white' : '#0A84FF';
}

function confirmToSetBackground() {
	backgroundImg.src = chosenImg.src;
	backgroundImg.style.height = String(100*readImgInfos.naturalHeight/readImgInfos.ratio) + 'px';
	backgroundImg.style.width = String(100*readImgInfos.naturalWidth/readImgInfos.ratio) + 'px';
	readImgInfos.offsetLeft = -(
		pageWidth*(imgSelectorInfo.left-readImgInfos.left)/imgSelectorInfo.width
	);
	backgroundImg.style.left = String(readImgInfos.offsetLeft) + 'px';
	readImgInfos.offsetTop = -(
		pageHeight*imgSelectorInfo.top/imgSelectorInfo.height
	);
	backgroundImg.style.top = String(readImgInfos.offsetTop) + 'px';
	var attrs = [
		{ attrName: "isExist", attrValue: isExist?1:0 },
		{ attrName: "left", attrValue: parseInt(readImgInfos.offsetLeft) },
		{ attrName: "top", attrValue: parseInt(readImgInfos.offsetTop) },
		{ attrName: "ratio", attrValue: parseInt(readImgInfos.ratio) },
	];
	if (isChange) {
		attrs.push({ attrName: "imgData", attrValue: readImgInfos.imgSrc });
	}
	updateBackgroundTableData(attrs);
	closeOuterPart(0);
}

function setBtnStatus(index, status) {
	if (status) {
		closeIconList[index].src = "../../assets/icons/close-active.png";
	} else {
		closeIconList[index].src = "../../assets/icons/close.png"
	}
}

function showChangeBackground() {
	indexCoverLayer.style.visibility = 'visible';
	changeBackgroundComponent.style.visibility = 'visible';
	changeBackgroundComponent.style.top = String((pageHeight-600)/2)+'px';
}

function changeRatio(value, status) {
	var ratio = ratioSetter.value;
	if (ratio.length===0) { ratio = 100; }
	else { ratio = parseInt(parseFloat(ratio)); }
	if (!status) { ratio += (value>0?1:-1); }
	if (ratio>readImgInfos.maxratio) {
		ratio = readImgInfos.maxratio;
	} else if (ratio<readImgInfos.minratio) {
		ratio = readImgInfos.minratio;
	}
	ratioSetter.value = String(parseInt(ratio));
	var change = ratio-readImgInfos.ratio;
	readImgInfos.ratio = ratio;
	imgSelectorInfo.width = imgSelectorInfo.initWidth*ratio/100;
	imgSelectorInfo.height = imgSelectorInfo.initHeight*ratio/100;
	imgChosenPart.style.width = String(imgSelectorInfo.width) + 'px';
	imgChosenPart.style.height = String(imgSelectorInfo.height) + 'px';
	imgCoverLayer[2].style.width = String(imgSelectorInfo.width) + 'px';
	imgCoverLayer[3].style.width = String(imgSelectorInfo.width) + 'px';
	if (status) {
		imgSelectorInfo.left = readImgInfos.left;
		imgSelectorInfo.top = 0;
		imgCoverLayer[0].style.width = String(readImgInfos.left) + 'px';
		imgCoverLayer[1].style.width = String(
			(chosenImg.narrowWidth>1000?chosenImg.narrowWidth:1000)
			-imgSelectorInfo.width-imgSelectorInfo.left) + 'px';
		imgCoverLayer[1].style.left = String(imgSelectorInfo.left+imgSelectorInfo.width) + 'px';
		imgCoverLayer[2].style.left = String(readImgInfos.left) + 'px';
		imgCoverLayer[2].style.height = '0px';
		imgCoverLayer[3].style.left = String(readImgInfos.left) + 'px';
		imgCoverLayer[3].style.height = String(
			430-imgSelectorInfo.top-imgSelectorInfo.height
			) + 'px';
		imgChosenPart.style.top = '0px';
		imgChosenPart.style.left = String(imgSelectorInfo.left) + 'px';
	} else {
		if (imgSelectorInfo.left+imgSelectorInfo.width>readImgInfos.left+readImgInfos.narrowWidth) {
			imgSelectorInfo.left -= change*imgSelectorInfo.initWidth/100;
			if (imgSelectorInfo.left<readImgInfos.left) { imgSelectorInfo.left=readImgInfos.left; }
			imgCoverLayer[1].style.left = String(imgSelectorInfo.left+imgSelectorInfo.width) + 'px';	
			imgCoverLayer[0].style.width = String(imgSelectorInfo.left) + 'px';
			imgCoverLayer[2].style.left = String(imgSelectorInfo.left) + 'px';
			imgCoverLayer[3].style.left = String(imgSelectorInfo.left) + 'px';
			imgChosenPart.style.left = String(imgSelectorInfo.left) + 'px';
		}
		imgCoverLayer[1].style.width = String(
			(chosenImg.narrowWidth>1000?chosenImg.narrowWidth:1000)
			-imgSelectorInfo.width-imgSelectorInfo.left) + 'px';	
		imgCoverLayer[1].style.left = String(imgSelectorInfo.left+imgSelectorInfo.width) + 'px';
		if (imgSelectorInfo.top+imgSelectorInfo.height<430) {
			imgCoverLayer[3].style.height = String(
				430-imgSelectorInfo.top-imgSelectorInfo.height
				) + 'px';
		} else {
			imgSelectorInfo.top -= change*imgSelectorInfo.initHeight/100;
			imgCoverLayer[2].style.height = String(imgSelectorInfo.top) + 'px';
			imgChosenPart.style.top = String(imgSelectorInfo.top) + 'px';
		}
	}
}

// 拖动选中区域div的代码部分
function partChoose() {
	isChosen = true;
	isExist = true;
	for (let i = 0; i < imgChosenCornerList.length; i++) {
		imgChosenCornerList[i].style['border-color'] = '#2E95FF';
	}
	//获取鼠标按下时坐标
	m_down_x = event.pageX;
	m_down_y = event.pageY;
	//获取div坐标
	dx = imgChosenPart.offsetLeft;
	dy = imgChosenPart.offsetTop;
	//获取鼠标与div偏移量
	md_x = m_down_x - dx;
	md_y = m_down_y - dy;
}
function partRelease() {
	isChosen = false;
	for (let i = 0; i < imgChosenCornerList.length; i++) {
		imgChosenCornerList[i].style['border-color'] = '#92C8FF';
	}
}
function partMove() {
	//实时更新div的坐标
	dx = imgChosenPart.offsetLeft;
	dy = imgChosenPart.offsetTop;
	//获取鼠标移动实时坐标
	m_move_x = event.pageX;
	m_move_y = event.pageY;
	ndx = m_move_x - md_x;
	ndy = m_move_y - md_y;
	if (ndx<readImgInfos.left) { ndx=readImgInfos.left; }
	if (ndx+imgSelectorInfo.width>readImgInfos.left+readImgInfos.narrowWidth) {
		ndx=readImgInfos.left+readImgInfos.narrowWidth-imgSelectorInfo.width;
	}
	if (ndy<0) { ndy=0; }
	if (ndy+imgSelectorInfo.height>430) {
		ndy = 430-imgSelectorInfo.height;
	}
	if(isChosen){
		imgChosenPart.style.left = String(ndx)+"px";
		imgChosenPart.style.top = String(ndy)+"px";
		if (md_x!==0) {
			imgSelectorInfo.left = ndx;
			imgCoverLayer[0].style.width = String(imgSelectorInfo.left)+'px';
			imgCoverLayer[1].style.width = String(
				(chosenImg.narrowWidth>1000?chosenImg.narrowWidth:1000)
				-imgSelectorInfo.width-imgSelectorInfo.left) + 'px';	
			imgCoverLayer[1].style.left = String(ndx+imgSelectorInfo.width) + 'px';
			imgCoverLayer[2].style.left = imgChosenPart.style.left;
			imgCoverLayer[3].style.left = imgChosenPart.style.left;
		}
		if (md_y!==0) {
			imgSelectorInfo.top = ndy;
			imgCoverLayer[2].style.height = String(imgSelectorInfo.top) + 'px';
			imgCoverLayer[3].style.height = String(
				430-imgSelectorInfo.top-imgSelectorInfo.height
				) + 'px';
		}
	}
}