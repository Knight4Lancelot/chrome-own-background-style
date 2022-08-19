function setBtnStatus(index, status) {
	if (status) {
		closeIconList[index].src = "../../assets/icons/close-active.png";
	} else {
		closeIconList[index].src = "../../assets/icons/close.png"
	}
}

function setLeftBtnStatus(status) {
	console.log(status)
	if (status) {
		closeMemoIcon.src = "../../assets/icons/left-close-active.png";
	} else {
		closeMemoIcon.src = "../../assets/icons/left-close.png"
	}
}

function closeOuterPart(index) {
	indexCoverLayer.style.visibility = 'hidden';
	console.log(index)
	switch(index) {
		default:
			outerPartList[index].style.visibility = 'hidden';
		case 2: // 睡觉提醒时间设置
		case 0: // 修改背景
			outerPartList[index].style.top = '-650px';
			break;
		case 1: // 备忘录
			outerPartList[index].style.left = '-1000px';
			closeMemoBtn.style.left = '-1000px';
			closeMemoBtn.style.visibility = 'hidden';
			break;
		case 3: // 睡觉时间闹钟提醒
			outerPartList[index].style.right = '-450px';
			sleepClockInfo.isReminderClosed = true;
			break;
	}
	// setTimeout(()=>{
	// 	outerPartList[index].style.visibility = 'hidden';
	// }, 500);
}