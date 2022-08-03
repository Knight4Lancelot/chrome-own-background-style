var db = openDatabase('otherInfos','1.0','otherInfos db',1024*100);

/* 
	数据库中表的存储结构：
	表名：sleepinfo
		名			类型			存储内容
		hour		int			睡觉时间 - 小时
		minute		int			睡觉时间 - 分
		interval	int			闹钟多长时间出现一次，单位：分钟
*/

// 若数据库中相关表不存在，则初始化表
// 初始化默认时间为23:00开始提醒闹钟
function initSleepTableData() {
	var sqlCreate = 'create table sleepinfo(hour int, minute int, interval int);';
	var sqlInitData = 'insert into sleepinfo values(23,30, 10);';
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
function dropSleepTableData() {
	var sql = 'drop table sleepinfo;';
	db.transaction(function (tx) {
		tx.executeSql(sql, [],
			function (tx, results) { console.log(tx, results) },
			function(error) { console.log(error); })
	});
}
// 读取数据库相关表中需要的参数
function readSleepTableData() {
	var sql = 'select * from sleepinfo;';
	db.transaction(function (tx) {
		tx.executeSql(sql, [],
			function (tx, results) {
				var res = results.rows.item(0);
				console.log(res);
				sleepClockInfo.hour = res.hour;
				sleepClockInfo.minute = res.minute;
				sleepClockInfo.interval = res.interval;
			},
			function() {
				initSleepTableData();
				readSleepTableData();
			})
	});
}
// 更新选中的图片信息
// attrList元素格式：{ attrName: val, attrValue: val }
function updateSleepTableData(attrList) {
	var sql = 'update sleepinfo set', attrs = [];
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