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