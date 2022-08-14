function initMemosLocation() {
	for (var i = 0; i < memoIssueList.length; i++) {
		memoIssueList[i].style.top = String(60+i*130) + 'px';
	}
}

function showMemoContainer() {
	if (!isMemoInited) {
		isMemoInited = true;
		initMemosLocation();
	}
	memoContainer.style.visibility = 'visible';
	memoContainer.style.left = '0px';
}

function changeAddBtnStatus(status) {
	addNewMemoIcon.src = status ?
		"../../assets/icons/add-active.png" : "../../assets/icons/add.png";
}

function changeDeleteMemoBtnStatus(index, status) {
	console.log(index, 'yes')
	memoDeleteBtnList[index].style.color = status ? '#F56C6C' : '#606266';
	console.log(memoDeleteBtnList[index].style.color)
}

function changeAlertTimeBtnStatus(index, status) {
	memoAlertTimeList[index].style.color = status ? '#4BA4FF' : '#606266';
}