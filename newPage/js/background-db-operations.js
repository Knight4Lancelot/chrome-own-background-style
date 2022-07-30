var db = openDatabase('backgorundInfos','1.0','backgorundInfos db',1024*100);
var imgLeft, imgTop, ratio, imgSource;

/* 
	数据库中表的存储结构：
	表名：imgAttrs
		名			类型			存储内容
		isExist		int			是否已经有用户选中的图片存在
		top			int			背景图片定位
		left		int			背景图片定位
		ratio		int		放缩比例
		imgData		BLOB		背景图片二进制流数据
*/
// 若数据库中相关表不存在，则初始化表
function initDBTable() {
	var sqlCreate = 'create table imgAttrs(isExist int, left int, top int, ratio int, imgData BLOB);';
	var sqlInitData = 'insert into imgAttrs values(0,0,0,100,"0");';
	db.transaction(function (tx) {
		tx.executeSql(sqlCreate, [],
			function (tx, results) { console.log(results) },
			function(error) { console.log(error); })
	});
	db.transaction(function (tx) {
		tx.executeSql(sqlInitData, [],
			function (tx, results) { console.log(results) },
			function(error) { console.log(error); })
	});
}
// 删除数据库的相关表
function dropDBTable() {
	var sql = 'drop table imgAttrs;';
	db.transaction(function (tx) {
		tx.executeSql(sql, [],
			function (tx, results) { console.log(tx, results) },
			function(error) { console.log(error); })
	});
}
// 读取数据库相关表中需要的参数
function readDBTableData() {
	var sql = 'select * from imgAttrs;';
	db.transaction(function (tx) {
		tx.executeSql(sql, [],
			function (tx, results) {
				var res = results.rows.item(0);
				console.log(res);
				isExist = (res.isExist===0);
				if (isExist) {
					readImgInfos.offsetTop = res.left;
					readImgInfos.offsetLeft = res.top;
					readImgInfos.ratio = res.ratio;
					readImgInfos.imgSrc = res.imgData;
					chosenImg.imgSrc = res.imgData;
				}
			},
			function() {
				initDBTable();
				readDBTableData();
			})
	});
}
// 更新选中的图片信息
// attrList元素格式：{ attrName: val, attrValue: val }
// updateAttrs([
// 	{ attrName: "name1", attrValue: 1 },
// 	{ attrName: "name2", attrValue: 2 },
// 	{ attrName: "name3", attrValue: '3' },
// 	{ attrName: "name4", attrValue: 4 },
// 	{ attrName: "name5", attrValue: '5' }
// ])
function updateAttrs(attrList) {
	var sql = 'update imgAttrs set', attrs = [];
	for (var i = 0; i < attrList.length; i++) {
		sql += (' '+attrList[i].attrName+'=?');
		if (i<attrList.length-1) {
			sql+=','
		} else {
			sql+=';'
		}
		attrs.push(attrList[i].attrValue)
	}
	db.transaction(function (tx) {
		tx.executeSql(sql, attrs,
			function (tx, results) { console.log(tx, results) },
			function() { console.log('failed') })
	});
}