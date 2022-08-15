function initMemosLocation() {
	for (var i = 0; i < memoIssueList.length; i++) {
		memoIssueList[i].style.top = String(100+i*100) + 'px';
	}
}

function showMemoText(index) {
	for (i = 0; i < memoIssueList.length; i++) {
		if (i<index) {
			memoIssueList[i].style.top = String(100+i*100) + 'px';
			memoIssueList[i].style.height = '50px';
			memoIssueList[i].style.left = '90px';
			memoIssueList[i].style.width = '780px';
			memoTextList[i].style.visibility = 'hidden';
		} else if (i===index) {
			memoIssueList[i].style.top = String(100+i*100) + 'px';
			memoIssueList[i].style.height = '100px';
			memoIssueList[i].style.left = '80px';
			memoIssueList[i].style.width = '800px';
			memoTextList[i].style.visibility = 'visible';
		} else {
			memoIssueList[i].style.top =
				String(150+100*i) + 'px';
			memoIssueList[i].style.height = '50px';
			memoIssueList[i].style.left = '90px';
			memoIssueList[i].style.width = '780px';
			memoTextList[i].style.visibility = 'hidden';
		}
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