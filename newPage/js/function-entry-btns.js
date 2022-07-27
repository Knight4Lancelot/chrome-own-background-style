function changeBtnSize(index, status) {
	hiddenNameList.btn[index] = status;
	ShowNameInfo(index, hiddenNameList.span[index]||hiddenNameList.btn[index]);
}

function changeNameVisible(index, status) {
	hiddenNameList.span[index] = status;
	ShowNameInfo(index, hiddenNameList.span[index]||hiddenNameList.btn[index]);
}

function ShowNameInfo(index, status) {
	nameList[index].style.visibility = status ? 'visible' : 'hidden';
	if (status) {
		btnList[index].style.width = '120px';
		btnList[index].style.height = '120px';
		btnList[index].style.opacity = 1;
		btnList[index].style.left = String(btnListLocation.left[index]-20)+'px';
		btnList[index].style.top = String(btnListLocation.top[index]-20)+'px';
		btnList[index].children[0].style.left = '42px';
		btnList[index].children[0].style.top = '30px';
	} else {
		btnList[index].style.width = '80px';
		btnList[index].style.height = '80px';
		btnList[index].style.opacity = 0.6;
		btnList[index].style.left = String(btnListLocation.left[index])+'px';
		btnList[index].style.top = String(btnListLocation.top[index])+'px';
		btnList[index].children[0].style.left = '22px';
		btnList[index].children[0].style.top = '22px';
	}
}