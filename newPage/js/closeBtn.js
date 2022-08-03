function closeOuterPart(index) {
	indexCoverLayer.style.visibility = 'hidden';
	console.log(index)
	switch(index) {
		default:
			outerPartList[index].style.visibility = 'hidden';
		case 2:
		case 0:
			outerPartList[index].style.top = '-650px';
			break;
		case 1:
			outerPartList[index].style.left = '-1000px';
			break;
		case 3:
			outerPartList[index].style.right = '-450px';
			break;
	}
	// setTimeout(()=>{
	// 	outerPartList[index].style.visibility = 'hidden';
	// }, 500);
}