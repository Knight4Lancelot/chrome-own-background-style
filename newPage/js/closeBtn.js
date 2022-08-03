function closeOuterPart(index) {
	indexCoverLayer.style.visibility = 'hidden';
	console.log(index)
	switch(index) {
		case 2:
		case 0:
			outerPartList[index].style.top = '-600px';
			break;
		case 1:
			outerPartList[index].style.left = '-1000px';
			break;
	}
	// setTimeout(()=>{
	// 	outerPartList[index].style.visibility = 'hidden';
	// }, 500);
}