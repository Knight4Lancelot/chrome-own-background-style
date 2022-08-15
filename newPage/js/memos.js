function initMemosLocation() {
	for (var i = 0; i < memoIssueList.length; i++) {
		memoIssueList[i].style.top = String(100+i*100) + 'px';
	}
}

function showMemoText(index) {
	if (isMemoTextExpanded===-1||isMemoTextExpanded!==index) {
		for (i = 0; i < memoIssueList.length; i++) {
			if (i<index) {
				memoIssueList[i].style.top = String(100+i*100) + 'px';
				memoIssueList[i].style.height = '50px';
				memoIssueList[i].style.left = '90px';
				memoIssueList[i].style.width = '780px';
				memoTextList[i].style.visibility = 'hidden';
			} else if (i===index) {
				memoIssueList[i].style.top = String(100+i*100) + 'px';
				memoIssueList[i].style.height = '120px';
				memoIssueList[i].style.left = '80px';
				memoIssueList[i].style.width = '800px';
				memoTextList[i].style.visibility = 'visible';
			} else {
				memoIssueList[i].style.top =
					String(170+100*i) + 'px';
				memoIssueList[i].style.height = '50px';
				memoIssueList[i].style.left = '90px';
				memoIssueList[i].style.width = '780px';
				memoTextList[i].style.visibility = 'hidden';
			}
		}
		if (isMemoTextExpanded!==-1) {
			memoTileList[isMemoTextExpanded].style.color = '#303133';
		}
		memoTileList[index].style.color = '#409EFF';
		isMemoTextExpanded = index;
	} else {
		for (var i = index; i < memoIssueList.length; i++) {
			memoIssueList[i].style.top = String(100+i*100) + 'px';
			memoIssueList[i].style.height = '50px';
			memoIssueList[i].style.left = '90px';
			memoIssueList[i].style.width = '780px';
			memoTextList[i].style.visibility = 'hidden';
		}
		memoTileList[index].style.color = '#303133';
		isMemoTextExpanded = -1;
	}
}

function deleteMemoIssue(index) {
	memoContainer.removeChild(memoIssueList[index]);
	for (let i = 0; i < memoDeleteBtnList.length; i++) {
		// 备忘录单个模块的事件
		memoIssueList[i].onclick = function() { showMemoText(i); };
		// 删除备忘录按钮的事件
		memoDeleteBtnList[i].onmouseover = function() { changeDeleteMemoBtnStatus(i, true); };
		memoDeleteBtnList[i].onmouseout = function() { changeDeleteMemoBtnStatus(i, false); };
		memoDeleteBtnList[i].onclick = function() { deleteMemoIssue(i); };
		// 修改时间按钮的事件
		memoAlertTimeList[i].onmouseover = function() { changeAlertTimeBtnStatus(i, true); };
		memoAlertTimeList[i].onmouseout = function() { changeAlertTimeBtnStatus(i, false); };
		memoAlertTimeList[i].onclick = function() { };
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
	memoDeleteBtnList[index].style.color = status ? '#F56C6C' : '#606266';
}

function changeAlertTimeBtnStatus(index, status) {
	memoAlertTimeList[index].style.color = status ? '#4BA4FF' : '#606266';
}