setTimeout(function(){
let pre = getShareData("_PluginCheck")
let name='Restatistical'
let version = '0.3.2'
pre(name,version)
let cada = getShareData("_Register")
let command = 'look'
let explain = '查看统计排行榜'
cada(command,explain)
bab(cada)
},3000);

//再次注册指令
function bab(cada){
	let command = 'block'
    let explain = '查看统计数据'
    cada(command,explain)
}

//全局变量创建
var idd = {};
var tanchuang = {};

/**************文件生成***************/

//主记录文件生成
let have = fileReadAllText('plugins\\Restatistical\\restatistical.json');
if(have == null) {
    let normal = [{},{},{},{}];
	let Json = JSON.stringify(normal);
    fileWriteAllText('plugins\\Restatistical\\restatistical.json',Json);
}

//玩家上线记录清空
let popupq = [{}];
let popJson = JSON.stringify(popupq);
fileWriteAllText('plugins\\Restatistical\\restatistical_Popup.json',popJson); 
  
//综合配置文件创建
let haveq = fileReadAllText('plugins\\Restatistical\\restatistical_notice.json');
if(haveq == null) {
    let normal = {"Title":"公告","Content":"这里是公告内容","button_on":"这里是按钮显示","button_off":"关闭","onandoff":"true","delayed":"2000","cmd": "/block","是否为新公告（yes/no）":"no","是否每次上线都弹窗（yes/no）":"no","提示":"cmd可修改成其他插件的开启指令，onandoff为上线弹窗开关，true为开启。"};
    let Json = JSON.stringify(normal, null, "\t");
    fileWriteAllText('plugins\\Restatistical\\restatistical_notice.json',Json);
}

//玩家死亡，击杀等记录文件创建
let die = fileReadAllText('plugins\\Restatistical\\restatistical_die.json');
if(die == null) {
    let diee = [{},{},{},{}];
	let Json = JSON.stringify(diee);
    fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',Json);
}
  
//破坏检测功能配置文件创建	
	let deploy = fileReadAllText('plugins\\Restatistical\\deploy.json');
    if(deploy == null){
	let dataccq = {"检测玩家几秒内破坏的数量":"2","破坏数量报警值":"15","玩家破坏检测开关（on/off）":"off","是否开启黑名单":"off","黑名单功能需配合Banplayer使用下载地址":"https://www.minebbs.com/resources/banplayer-ban-ban.1010/"};
    let datacaa = JSON.stringify(dataccq, null, "\t");
	fileWriteAllText('plugins\\Restatistical\\deploy.json',datacaa);
}

//玩家是否查看新公告记录文件创建
    let nertong = fileReadAllText('plugins\\Restatistical\\recently.json');
    if(deploy == null){
		let newcacc = [{},{},{},{},{},{}]
		let newkijk = JSON.stringify(newcacc);
        fileWriteAllText('plugins\\Restatistical\\recently.json',newkijk);
    }

/**************全局读取文件**************/

MSignfile = fileReadAllText('plugins\\Restatistical\\restatistical.json');
MSJson = JSON.parse(MSignfile);
Popupgnfile = fileReadAllText('plugins\\Restatistical\\restatistical_Popup.json');
PopupJson = JSON.parse(Popupgnfile);
dieignfile = fileReadAllText('plugins\\Restatistical\\restatistical_die.json');
dieJson = JSON.parse(dieignfile);
tick = fileReadAllText('plugins\\Restatistical\\deploy.json');
traab = JSON.parse(tick);
newlooka = fileReadAllText('plugins\\Restatistical\\recently.json');
newlook = JSON.parse(newlooka);

/**************各种监听和函数**************/

//重置公告观看记录
function qingyi_restatistical_newlook(je){
    let Buttonsa = fileReadAllText('plugins\\Restatistical\\restatistical_notice.json');
    let bcca = JSON.parse(Buttonsa);
    let dafw = bcca["是否为新公告（yes/no）"];
    if(dafw == 'yes'){
	    newlook[0][je.playername] = 0;
	    let inpuqt = JSON.stringify(newlook);
        fileWriteAllText('plugins\\Restatistical\\recently.json',inpuqt);
		bcca["是否为新公告（yes/no）"] = "no"
		let aasas = JSON.stringify(bcca, null, "\t");
        fileWriteAllText('plugins\\Restatistical\\restatistical_notice.json',aasas);
    }
}

//重置每日破坏统计
function qingyi_restatistical_reset(today,nemm){
	if(MSJson[0][nemm] != today){
		MSJson[2][nemm] = 0;
		MSJson[0][nemm] = today;
		var input = JSON.stringify(MSJson);
        fileWriteAllText('plugins\\Restatistical\\restatistical.json',input);
	}
}

//读取年月日
function qingyi_restatistical_getdata(){
	var myDate = new Date();
	var y = myDate.getFullYear();
    var q = myDate.getMonth();  
    var d = myDate.getDate();
    q=q+1;
    var today = y +'-'+ q +'-'+ d;
	return today;
}

//载入名字玩家数据创建
function qingyi_restatistical_loadname(e){
    var je = JSON.parse(e);
	qingyi_restatistical_newlook(je)
    dieJson[3][je.playername] = 0;
	var diecJson = JSON.stringify(dieJson);
    fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diecJson);
	if(MSJson[0][je.playername] == null){
	    MSJson[0][je.playername] = 0;
	    MSJson[1][je.playername] = 0;
	    MSJson[2][je.playername] = 0;
	    MSJson[3][je.playername] = je.uuid;
	    var input = JSON.stringify(MSJson);
        fileWriteAllText('plugins\\Restatistical\\restatistical.json',input);
	}
	if(PopupJson[0][je.playername]== null){
	    PopupJson[0][je.playername] = 0;
		var popupq = JSON.stringify(PopupJson);
        fileWriteAllText('plugins\\Restatistical\\restatistical_Popup.json',popupq);
	}
	if(dieJson[0][je.playername] == null){
	    dieJson[0][je.playername] = 0;
		var dieq = JSON.stringify(dieJson);
        fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',dieq);
	}
	if(dieJson[1][je.playername] == null){
		dieJson[1][je.playername] = 0;
		var diea = JSON.stringify(dieJson);
        fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diea);
	}
	if(dieJson[2][je.playername] == null){
		dieJson[2][je.playername] = 0;
		var diec = JSON.stringify(dieJson);
        fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diec);
	}
	var today=qingyi_restatistical_getdata();
	var nemm=je.playername;
	qingyi_restatistical_reset(today,nemm);
}

//破坏方块检测，包括破坏检测和记录
function qingyi_restatistical_block(e){
    var je = JSON.parse(e);
	if (je.result) {
	   var today=qingyi_restatistical_getdata();
	   var nemm=je.playername;
	   qingyi_restatistical_reset(today,nemm);
	}
	let aa = traab["是否开启黑名单"];
	let aac = traab["破坏数量报警值"];
	let aaca = traab["检测玩家几秒内破坏的数量"];
	let aacaa = traab["玩家破坏检测开关（on/off）"];
	if(aacaa == 'on'){
	    if(dieJson[3][je.playername] == 0){
		    dieJson[3][je.playername] = 1;
		    var diecJson = JSON.stringify(dieJson);
            fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diecJson);
		    var jiancea = MSJson[2][je.playername]
	    }
		if(dieJson[3][je.playername] == 1){
		    setTimeout(function(){
			
                let jianceb = MSJson[2][je.playername]
		        if(jiancea != undefined){
		         let c = Number(jianceb) - Number(jiancea) 
				    if(c >= aac){
					runcmd('tellraw @a { "rawtext" : [ { "text" : "§6玩家'+je.playername+'在'+aaca+'秒钟内破坏了'+c+'个物品！请注意！" } ] }')
					var tnow = TimeNow();
		            let rizi = '['+tnow+'] 玩家'+je.playername+'在'+aaca+'秒钟内破坏了'+c+'个物品！请注意'
		            fileWriteLine('plugins\\Restatistical\\log.json',rizi)
					dieJson[3][je.playername] = 0;
		            let diecJson = JSON.stringify(dieJson);
                    fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diecJson);
					    if(aa == 'on'){
					     pupg = fileReadAllText('plugins\\Banplayer\\Banplayer.json');
                         pup = JSON.parse(pupg);
					     pup[0][aadd] = 1;
		                 let aass = JSON.stringify(pup);
                         fileWriteAllText('plugins\\Banplayer\\Banplayer.json',aass);
					    }
				    }else{
						dieJson[3][je.playername] = 0;
		                let diecJson = JSON.stringify(dieJson);
                        fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diecJson);
					}
		        }
            },1000*aaca);
	    }
	}
	var chisu = MSJson[1][je.playername] + 1;
	var chisuq = MSJson[2][je.playername] + 1;
    MSJson[1][je.playername] = chisu;
    MSJson[2][je.playername] = chisuq;
	var input = JSON.stringify(MSJson);
    fileWriteAllText('plugins\\Restatistical\\restatistical.json',input);
}

//调用在线玩家数据弹窗
function qingyi_restatistical_bGUI(e,formname,uuid){
    idd[formname]=function (e){
		let je = JSON.parse(e);
	    if(je.selected == 'true') {
	        qingyi_restatistical_GUI(uuid)
	    }
    }
	setTimeout(function(){
		delete idd[formname]
		releaseForm(formname);
	},30*1000);
}

//查看自己破坏数据弹窗
function qingyi_restatistical_aGUI(je,e){
    var date = new Date();
	MSignfile = fileReadAllText('plugins\\Restatistical\\restatistical.json');
    MSJson = JSON.parse(MSignfile);
	var bb = MSJson[0][je.playername];
    var dd = MSJson[1][je.playername];
	var cc = MSJson[2][je.playername];
	var uuid = MSJson[3][je.playername];
	var ee = dieJson[0][je.playername];
	var ff = dieJson[1][je.playername];
	var gg = dieJson[2][je.playername];
    var myDate = new Date();
	var t = myDate.getHours(); 
	var m = myDate.getMinutes();
    var today=qingyi_restatistical_getdata();
	var nemm=je.playername;
	qingyi_restatistical_reset(today,nemm);
	if(MSJson[2][je.playername]<=500){
		var formname = sendModalForm(uuid,'统计','现在时间：'+t+'点'+m+'分\n\n今日你敲碎了'+cc+'个物品。\n进服至今你一共破坏了'+dd+'个物品。\n一共死亡：'+ee+'次,击杀生物'+ff+',击杀玩家'+gg+'次。\n快乐游戏，养肝护体。\n~o( =∩ω∩= )m', "查看其他在线玩家数据", "关闭")
		qingyi_restatistical_bGUI(e,formname,uuid)
	}
	else if(MSJson[2][je.playername]>=501||MSJson[2][je.playername]<=2000){
		formname = sendModalForm(uuid,'统计','现在时间：'+t+'点'+m+'分\n\n今日你敲碎了'+cc+'个物品。\n进服至今你一共破坏了'+dd+'个物品。\n一共死亡：'+ee+'次,击杀生物'+ff+',击杀玩家'+gg+'次。\n娱乐小肝，保护身体。\nヾ(≧▽≦*)o', "查看其他在线玩家数据", "关闭")
		qingyi_restatistical_bGUI(e,formname,uuid)
	}
	else if(MSJson[2][je.playername]>=2001||MSJson[2][je.playername]<=10000){
		formname = sendModalForm(uuid,'统计','现在时间：'+t+'点'+m+'分\n\n今日你敲碎了'+cc+'个物品。\n进服至今你一共破坏了'+dd+'个物品。\n一共死亡：'+ee+'次,击杀生物'+ff+',击杀玩家'+gg+'次。\n肝天肝地肝空气，你的肝还好吗？\nˋ( ° ▽、° ) ', "查看其他在线玩家数据", "关闭")
		qingyi_restatistical_bGUI(e,formname,uuid)
	}
	else{
		formname = sendModalForm(uuid,'统计','现在时间：'+t+'点'+m+'分\n\n今日你敲碎了'+cc+'个物品。\n进服至今你一共破坏了'+dd+'个物品。\n一共死亡：'+ee+'次,击杀生物'+ff+',击杀玩家'+gg+'次。\n住手！这样下去服务器要被你挖空了！！\nw(ﾟДﾟ)w', "查看其他在线玩家数据", "关闭")
		qingyi_restatistical_bGUI(e,formname,uuid)
	};
}

//指令监听
function qingyi_restatistical_command(e){
    var je = JSON.parse(e);
    if(je.cmd == '/block') {
        qingyi_restatistical_aGUI(je)
		return false;
	}else if(je.cmd == '/look'){
		var uuid = MSJson[3][je.playername];
		qingyi_restatistical_lookform(uuid)
		return false;
	}
}

//其他玩家数据弹窗
function qingyi_restatistical_GUI(uuid){
	let OnlinePlayers = getOnLinePlayers();
    var OnlineJson = JSON.parse(OnlinePlayers);
    var OnlinePlayersText = JSON.stringify(OnlinePlayers);
    var OnlineNum=(OnlinePlayersText.split('playername')).length-1;
    var list = ""
    for (i = 0; i < OnlineNum ; i++) {
	    list += '"' + OnlineJson[i].playername +'"';
	}
    choose = list.replace(/""/g,'","');
    var qylist = sendSimpleForm(uuid, '统计', '请选择要查看的玩家：', '['+ choose +']')
	idd[qylist]=function (e){
		let je = JSON.parse(e);
	    if(je.selected != 'null') {
            var myDate = new Date();
	        var t = myDate.getHours(); 
	        var m = myDate.getMinutes();
            var player = choose.split(',');
            var fstchose = player[je.selected];
            var change = '/"/g';
            var chose = fstchose.replace(eval(change),'');
		    var bat = MSJson[2][chose];
		    var cat = MSJson[1][chose];
		    var dat = dieJson[0][chose];
		    var ee = dieJson[0][chose];
		    var ff = dieJson[1][chose];
		    var gg = dieJson[2][chose];
            var ccbb = sendModalForm(uuid,'统计','现在时间：'+t+'点'+m+'分\n\n今日'+chose+'敲碎了'+bat+'个物品。\n\n进服至今'+chose+'一共敲碎了'+cat+'个物品。\n\n至今一共死亡：'+dat+'次,击杀生物'+ff+',击杀玩家'+gg+'次。', "返回在线玩家列表", "关闭")
	        idd[ccbb]=function (e){
			    let je = JSON.parse(e);
			        if(je.selected == 'true') {
		            qingyi_restatistical_GUI(uuid)
			    }
		    }
		    setTimeout(function(){
		    delete idd[ccbb]
		    releaseForm(ccbb);
	        },30*1000);
		}
	}
	setTimeout(function(){
		delete idd[qylist]
		releaseForm(qylist);
	},30*1000);
}

//弹窗回调监听
function qingyi_restatistical_FormSelect(e){
    let je = JSON.parse(e);
    let Tfile = fileReadAllText('plugins\\Restatistical\\restatistical.json');
    var TJson = JSON.parse(Tfile);
    var uuid = MSJson[3][je.playername];
    if(idd[je.formid]!=null){
		idd[je.formid](e);
		delete idd[je.formid];
	}
}

//上线公告弹窗
function qingyi_restatistical_notice(uuid,bcc,e){
    var bcca = bcc["Title"];
	var bccb = bcc["Content"];
	var bccc = bcc["button_on"];
	var bccd = bcc["button_off"];
	var cmd = bcc["cmd"];
    var tanchuang = sendModalForm(uuid,bcca,bccb,bccc,bccd)
	idd[tanchuang]=function (e){
		var je = JSON.parse(e);
		if(je.selected == 'true'){
		let t = runcmdAs(uuid, cmd)
		}
	}
	setTimeout(function(){
		delete idd[tanchuang]
		releaseForm(tanchuang);
	},30*1000);
}

//玩家重生监听，调用公告弹窗。
function qingyi_restatistical_onre(e){
	var je = JSON.parse(e);
	let Buttons = fileReadAllText('plugins\\Restatistical\\restatistical_notice.json');
    let bcc = JSON.parse(Buttons);
    let caa = bcc["onandoff"];
	let del = bcc["delayed"];
	let dfa = bcc["是否每次上线都弹窗（yes/no）"];
	setTimeout(function(){
	    let uuid = MSJson[3][je.playername];
	    let nemm = je.playername
	    if(PopupJson[0][nemm]!=1&&caa=='true'&&newlook[0][nemm]!=1||dfa=='yes'){
		    PopupJson[0][nemm] = 1;
		    newlook[0][nemm] = 1;
		    let input = JSON.stringify(PopupJson);
            fileWriteAllText('plugins\\Restatistical\\restatistical_Popup.json',input);
		    let inpuqt = JSON.stringify(newlook);
            fileWriteAllText('plugins\\Restatistical\\recently.json',inpuqt);
	        qingyi_restatistical_notice(uuid,bcc);
		}
	},del);
}

//玩家离开游戏监听
function qingyi_restatistical_left(e){
	let je = JSON.parse(e);
	PopupJson[0][je.playername] = 0;
    var input = JSON.stringify(PopupJson);
    fileWriteAllText('plugins\\Restatistical\\restatistical_Popup.json',input);
}

//生物死亡监听
function qingyi_restatistical_die(e) {
	var je = JSON.parse(e);
	if(je.mobname == je.playername){
		var diec = dieJson[0][je.playername] + 1;
		dieJson[0][je.playername] = diec;
		var diecJson = JSON.stringify(dieJson);
        fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diecJson);
	    if(je.mobtype == 'entity.player.name'){
		    var died = dieJson[2][je.srcname] + 1;
		    dieJson[2][je.srcname] = died;
		    var diecJson = JSON.stringify(dieJson);
            fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diecJson);
	    }
	}else if(je.mobtype != 'entity.player.name'){
		if(je.srctype == 'entity.player.name'){
		    var dieb = dieJson[1][je.srcname] + 1;
		    dieJson[1][je.srcname] = dieb;
		    var diecJson = JSON.stringify(dieJson);
            fileWriteAllText('plugins\\Restatistical\\restatistical_die.json',diecJson);
		}
	}
}

//破坏排行榜
function qingyi_restatistical_blocktop(e){
	var je = JSON.parse(e);
	var top = "";
	var data = MSJson[1];
	var uuid = MSJson[3][je.playername];
	var topname = [];
    var topdata = [];
    for(a in data){
        topname.push(a);
        topdata.push(data[a]);
    }
    topname.sort(function(a,b){return data[b] - data[a];});
    topdata.sort(function(a,b){return b-a;});
	if(topname.length<=10){
        for(var i = 0; i < topname.length; i++) {
            top += '"'+ topname[i] +'\n破坏数量：'+topdata[i]+'"';
        }
	}else{
        for(var i = 0; i <= 10; i++) {
            top += '"'+ topname[i] +'\n破坏数量：'+topdata[i]+'"';
        }	
	}
    var topButton = top.replace(/""/g,'","');
    var btop = sendSimpleForm(uuid, '统计', '破坏榜（前十）：', '['+ topButton +']');

}

//死亡排行榜
function qingyi_restatistical_dietop(e){
	var je = JSON.parse(e);
	var top = "";
	var data = dieJson[0]
	var uuid = MSJson[3][je.playername];
	var topname = [];
    var topdata = [];
    for(a in data){
        topname.push(a);
        topdata.push(data[a]);
    }
    topname.sort(function(a,b){return data[b] - data[a];});
    topdata.sort(function(a,b){return b-a;});
	if(topname.length<=10){
        for(var i = 0; i < topname.length; i++) {
            top += '"'+ topname[i] +'\n丢脸次数：'+topdata[i]+'"';
        }
	}else{
        for(var i = 0; i <= 10; i++) {
            top += '"'+ topname[i] +'\n丢脸次数：'+topdata[i]+'"';
        }	
	}
    var topButton = top.replace(/""/g,'","');
    var btop = sendSimpleForm(uuid, '统计', '丢脸榜（前十）：', '['+ topButton +']');

}

//击杀排行榜
function qingyi_restatistical_killtop(e){
	var je = JSON.parse(e);
	var top = "";
	var data = dieJson[1]
	var uuid = MSJson[3][je.playername];
	var topname = [];
    var topdata = [];
    for(a in data){
        topname.push(a);
        topdata.push(data[a]);
    }
    topname.sort(function(a,b){return data[b] - data[a];});
    topdata.sort(function(a,b){return b-a;});
	if(topname.length<=10){
        for(var i = 0; i < topname.length; i++) {
            top += '"'+ topname[i] +'\n击杀数量：'+topdata[i]+'"';
        }
	}else{
        for(var i = 0; i <= 10; i++) {
            top += '"'+ topname[i] +'\n击杀数量：'+topdata[i]+'"';
        }	
	}
    var topButton = top.replace(/""/g,'","');
    var btop = sendSimpleForm(uuid, '统计', '击杀榜（前十）：', '['+ topButton +']');

}

//排行榜主窗口
function qingyi_restatistical_lookform(uuid){
	let lookform = sendSimpleForm(uuid, '统计', '排行榜菜单：', '["查看公告","查看破坏排行榜","查看丢脸排行榜","查看击杀排行榜"]')
	idd[lookform]=function (e){
		var je = JSON.parse(e);
	    if(je.selected == null)
		    return false;
	    if(je.selected == 0){
		    let Buttons = fileReadAllText('plugins\\Restatistical\\restatistical_notice.json');
            var bcc = JSON.parse(Buttons);
		    var del = bcc["delayed"];
		    var uuid = MSJson[3][je.playername];
		    qingyi_restatistical_notice(uuid,bcc);
	    }else if(je.selected == 1){
		    qingyi_restatistical_blocktop(e)
	    }else if(je.selected == 2){
		    qingyi_restatistical_dietop(e)
	    }else if(je.selected == 3){
		    qingyi_restatistical_killtop(e)	
	    }
    }
	setTimeout(function(){
		delete idd[lookform]
		releaseForm(lookform);
	},30*1000);
}

//调用函数
setAfterActListener('onMobDie', qingyi_restatistical_die)
setAfterActListener('onRespawn', qingyi_restatistical_onre)
setAfterActListener('onPlayerLeft', qingyi_restatistical_left)
setBeforeActListener('onFormSelect', qingyi_restatistical_FormSelect)
setBeforeActListener('onInputCommand', qingyi_restatistical_command)
setAfterActListener('onDestroyBlock', qingyi_restatistical_block)
setAfterActListener('onLoadName', qingyi_restatistical_loadname)