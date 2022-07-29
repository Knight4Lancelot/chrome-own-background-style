var isChosen = false;
var m_move_x, m_move_y,
	m_down_x, m_down_y,
	dx, dy,
	md_x, md_y,
	ndx, ndy;

function setBtnStatus(index, status) {
	if (status) {
		closeIconList[index].src = "../../assets/icons/close-active.png";
	} else {
		closeIconList[index].src = "../../assets/icons/close.png"
	}
}

function closeOuterPart(index) {
	indexCoverLayer.style.visibility = 'hidden';
	outerPartList[index].style.visibility = 'hidden';
	outerPartList[index].style.top = '-600px';
}

function showChangeBackground() {
	indexCoverLayer.style.visibility = 'visible';
	changeBackgroundComponent.style.visibility = 'visible';
	changeBackgroundComponent.style.top = String((pageHeight-600)/2)+'px';
}

function changeRatio(value) {
	console.log('mouse-once-change-value = ', value);
	var ratio = ratioSetter.value;
	if (ratio.length===0) { ratio = 100; }
	else { ratio = parseInt(parseFloat(ratio)); }
	ratio += (value) / 150;
	if (ratio>999) {
		ratio = 999;
	} else if (ratio < 10) {
		ratio = 10
	}
	ratioSetter.value = String(ratio);
}

function setChooserSize() {
	
}

// 拖动选中区域div的代码部分
function partChoose() {
	isChosen = true;
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
}
function partMove() {
	//实时更新div的坐标
	dx = imgChosenPart.offsetLeft;
	dy = imgChosenPart.offsetTop;
	//获取鼠标移动实时坐标
	m_move_x = event.pageX;
	m_move_y = event.pageY;
	//鼠标按下时移动才触发
	if(isChosen){
		//获取新div坐标，鼠标实时坐标 - 鼠标与div的偏移量
		ndx = m_move_x - md_x;
		ndy = m_move_y - md_y;
		//把新div坐标值赋给div对象
		imgChosenPart.style.left = ndx+"px";
		imgChosenPart.style.top = ndy+"px";
	}
}