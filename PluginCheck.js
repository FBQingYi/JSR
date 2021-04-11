var locala = 0;
var clouda = 0;
var url = 'http://up.qingyimc.cn/home/api/check.php';
request(url,'post','plugin=',function(nv) {
	if(nv == '') {
		let time1 = time_nian()
		log('['+time1+' INFO] 数据库链接成功！即将开始检测服务器插件版本！')
		setShareData('_PluginCheck', UPDATE);
		setShareData('_Register', register);
	} else {
		let time1 = time_nian()
		log('['+time1+' ERROR] 链接数据库失败，请检查网络设置或者联系本插件作者！');
		setShareData('_PluginCheck', UPDATEfail);
		setShareData('_Register', register);
	}
});

function cloudup(name, version, vers) {
	clouda += 1;
	let time1 = time_nian()
	log('['+time1+' ERROR] ['+ name +'] >> 云端版本过低，请联系作者更新云端数据！');
	log('['+time1+' ERROR] ['+ name +'] >> 加载成功，当前版本：'+ version +'，云端版本：'+ vers);
	log('-------------------------------------');
}

function localup(name, upurll, vers, version) {
	locala += 1;
	let time1 = time_nian()
	log('['+time1+' UPDATE] ['+ name +'] >> 当前版本：'+ version +',最新版本：'+ vers);
	log('['+time1+' UPDATE] ['+ name +'] >> 请前往 '+ upurll +' 更新！');
	log('-------------------------------------');
}

function VersionNeworOld(version, vers, name, upurll) {
	var a = version.split('.');
	var b = vers.split('.');
	if(vers == '') {
		let time1 = time_nian()
		log('['+time1+' ERROR] ['+ name +'] >> 云端数据库暂未查询到此插件信息！');
		log('-------------------------------------');
	} else if(a[0]==b[0]&&a[1]==b[1]&&a[2]==b[2]) {
		let time1 = time_nian()
		log('['+time1+' INFO] ['+ name +'] >> 加载成功，无需更新!版本：'+ version);
		log('-------------------------------------');
	} else {
		if(a[0] < b[0]) {
			localup(name, upurll, vers, version);
		} else if(a[0] == b[0]) {
			if(a[1] < b[1]) {
				localup(name, upurll, vers, version);
			} else if(a[1] == b[1]) {
				if(a[2] < b[2]) {
					localup(name, upurll, vers, version);
				} else if(a[2] > b[2]) {
					cloudup(name, version, vers);
				}
			} else if(a[1] > b[1]) {
				cloudup(name, version, vers);
			}
		}  else if(a[0] > b[0]) {
			cloudup(name, version, vers);
		}
	}
}

function UPDATE(name, version) {
	request(url, 'post', 'plugin='+ name, function(cv) {
		var upurl = cv.indexOf("链接");
		var upurll = cv.substring(upurl);
		var vers = cv.substring(3,upurl);
		var outq = vers.split('.');
		var outw = version.split('.');
		VersionNeworOld(version, vers, name, upurll);
	});
}

function UPDATEfail(name, version) {
	let time1 = time_nian()
	log('['+time1+' INFO] ['+ name +'] >> 加载成功，无法检测更新!版本：'+ version);
	log('-------------------------------------');
}

function register(command, explain) {
	setCommandDescribe(command,explain)
	let time1 = time_nian()
	log('['+time1+' INFO]指令 '+command+' 注册成功！')
}

function time_nian(){
	var date = new Date();
	var myyear = date.getFullYear();
	var mymonth = date.getMonth()+1;
	var myweekday = date.getDate();
	var curHours = date.getHours();
	var curMinutes = date.getMinutes();
	var Seconds = date.getSeconds();
	if(mymonth < 10){
		mymonth = "0" + mymonth;
	}
	if(myweekday <10){
		myweekday = "0" + myweekday;
	}
	if(curMinutes < 10){
		curMinutes = "0" + curMinutes;
	}
	if(Seconds < 10){
		Seconds = "0" + Seconds;
	}
	return (myyear + "-" + mymonth + "-" + myweekday + " " + curHours + ":" + curMinutes + ":" + Seconds);
}

setTimeout(function() {
	let time1 = time_nian()
	if(locala >= 1 &&clouda >= 1){
		log('['+time1+' INFO] [版本检测] >> 更新检测完毕，本次检测到您有 '+ locala +' 个插件需要更新，'+ clouda +' 个插件数据库没更新，请联系作者更新数据库！');
	}else if(clouda >= 1){
		log('['+time1+' INFO] [版本检测] >> 更新检测完毕，本次检测到您有 '+ clouda +' 个插件数据库没有更新，请联系作者更新数据库！');
	}else if(locala >= 1 ){
		log('['+time1+' INFO] [版本检测] >> 更新检测完毕，本次检测到您有 '+ locala +' 个插件需要更新，为了您的更好的体验，请速去更新！');
	}else {
		log('['+time1+' INFO] [版本检测] >> 更新检测完毕，您没有需要更新的插件！');
	}
},8000);