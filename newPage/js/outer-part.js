function setBtnStatus(index, status) {
	if (status) {
		closeIconList[index].src = "../../assets/icons/close-active.png";
	} else {
		closeIconList[index].src = "../../assets/icons/close.png"
	}
}

function closeOuterPart(index) {
	console.log(index)
	outerPartList[index].style.visibility = 'hidden';
	outerPartList[index].style.top = '-600px';
}

function showChangeBackground() {
	changeBackgroundComponent.style.visibility = 'visible';
	changeBackgroundComponent.style.top = String((pageHeight-600)/2)+'px';
}