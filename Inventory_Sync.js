
/******配置文件生成*******/

let deploy = fileReadAllText('plugins\\Inventory_Sync\\deploy.json');
if(deploy == null){
	let dataccq = {"记录玩家数据时间（分）":"10","玩家状态同步（on/off）":"off","玩家能力值同步（on/off）":"off","玩家效果同步（on/off）":"off","玩家背包同步（on/off）":"off","玩家背包储存路径":"../../\\player-data\\player-ltems\\","玩家能力值储存路径":"../../\\player-data\\player-abilities\\","玩家状态储存路径":"../../\\player-data\\player-attributes\\","玩家buff储存路径":"../../\\player-data\\player-effects\\","插件日志储存路径":"../../\\player-data\\log\\","玩家在线记录文件路径":"../../\\player-data\\player-online\\","提示":"../为返回上层目录，需要返回多少次就加多少个"};
    let datacaa = JSON.stringify(dataccq, null, "\t");
	fileWriteAllText('plugins\\Inventory_Sync\\deploy.json',datacaa);
}

/******相关文件读取******/

tick = fileReadAllText('plugins\\Inventory_Sync\\deploy.json');
traab = JSON.parse(tick);

/*****重置玩家在线数据*****/

let online3 = traab["玩家在线记录文件路径"];
let caaca = [{},{},{},{},{}];
let batas = JSON.stringify(caaca);
fileWriteAllText(online3+'online.json',batas);

online = traab["玩家在线记录文件路径"];
online1 = fileReadAllText(online+'online.json');
onl = JSON.parse(online1);

//调用uuid
function qingyi_money_getUuid(name) {
	let on = getOnLinePlayers();
	if (on != null) {
		let onl = JSON.parse(on);
		if (onl != null) {
			for (let i = 0; i < onl.length; i++) {
				let online = onl[i];
				if (online.playername == name)
					return online.uuid;
            }
        }
	}
	return null;
}

/***************玩家文件写入储存文件*****************/

//玩家背包写文件
function qingyi_playerdata_Items(je,uuid,datacca){
	let aaca = traab["玩家背包同步（on/off）"];
	if(aaca == 'on'){
	    let tta = getPlayerItems(uuid);
	    fileWriteAllText(datacca+je.playername+'.json',tta);
	}else{
		return false;
	}
}

//玩家能力值写文件
function qingyi_playerdata_abilities(je,uuid,dataccb){
	let aacb = traab["玩家能力值同步（on/off）"];
	if(aacb == 'on'){
		let ttb = getPlayerAbilities(uuid);
		fileWriteAllText(dataccb+je.playername+'.json',ttb);
	}else{
		return false;
	}
}

//玩家状态写文件
function qingyi_playerdata_data(je,uuid,dataccc){
	let aacc = traab["玩家状态同步（on/off）"];
	if(aacc == 'on'){
		let ttc = getPlayerAttributes(uuid)
		fileWriteAllText(dataccc+je.playername+'.json',ttc);
	}else{
		return false;
	}
}

//玩家buff写文件
function qingyi_playerdata_effects(je,uuid,dataccd){
	let aacd = traab["玩家效果同步（on/off）"];
	if(aacd == 'on'){
		let ttd = getPlayerEffects(uuid)
		fileWriteAllText(dataccd+je.playername+'.json',ttd);
	}else{
		return false;
	}
}

/***************读取储存文件写入服务器*****************/

//玩家背包写服务器
function qingyi_player_Items(je,uuid,datacca,datacce){
	let aacaa = traab["玩家背包同步（on/off）"];
	let name = je.playername;
	if(aacaa == 'on'){
		let ccaaa = fileReadAllText(datacca+je.playername+'.json')
		if(ccaaa != null){
		    if(ccaaa != 'undefined'){
			    let r = setPlayerItems(uuid,ccaaa)
		    }else{
			    log('玩家'+je.playername+'背包文件上次数据保存错误，已停止同步！！请腐竹检测玩家数据文件')
			    let tnow = TimeNow();
	            let rizi1 = '['+tnow+'] 玩家ID '+name+'  背包文件上次数据保存错误，已停止同步！！请腐竹检测玩家数据文件'
	            fileWriteLine(datacce+'log.json',rizi1)
		    }
		}else{
			log('玩家'+je.playername+'背包数据文件未找到，已停止同步！！')
			let tnow = TimeNow();
	        let rizi2 = '['+tnow+'] 玩家ID '+name+'  背包数据文件未找到，已停止同步！！'
	        fileWriteLine(datacce+'log.json',rizi2)
		}
	}else{
		return false;
	}
}

//玩家能力值写服务器
function qingyi_player_abilities(je,uuid,dataccb,datacce){
	let aacab = traab["玩家能力值同步（on/off）"];
	let name = je.playername;
	if(aacab == 'on'){
		let ccaab = fileReadAllText(dataccb+je.playername+'.json')
	    if(ccaab != null){
		    if(ccaab != 'undefined'){
			    let r = setPlayerAbilities(uuid,ccaab)
		    }else{
			    log('玩家'+je.playername+'能力值数据上次数据保存错误，已停止同步！！请腐竹检测玩家数据文件')
			    let tnow = TimeNow();
	            let rizi1 = '['+tnow+'] 玩家ID '+name+'  能力值文件上次数据保存错误，已停止同步！！请腐竹检测玩家数据文件'
	            fileWriteLine(datacce+'log.json',rizi1)
		    }
		}else{
			log('玩家'+je.playername+'能力值数据数据文件未找到，已停止同步！！')
			let tnow = TimeNow();
	        let rizi2 = '['+tnow+'] 玩家ID '+name+'  能力值数据文件未找到，已停止同步！！'
	        fileWriteLine(datacce+'log.json',rizi2)
		}
	}else{
		return false;
	}
}

//玩家状态写服务器
function qingyi_player_data(je,uuid,dataccc,datacce){
	let aacac = traab["玩家状态同步（on/off）"];
	let name = je.playername;
	if(aacac == 'on'){
		let ccaac = fileReadAllText(dataccc+je.playername+'.json')
	    if(ccaac != null){
		    if(ccaac != 'undefined'){
			    let r = setPlayerTempAttributes(uuid,ccaac)
		    }else{
			    log('玩家'+je.playername+'状态数据上次数据保存错误，已停止同步！！请腐竹检测玩家数据文件')
			    let tnow = TimeNow();
	            let rizi1 = '['+tnow+'] 玩家ID '+name+'  状态文件上次数据保存错误，已停止同步！！请腐竹检测玩家数据文件'
	            fileWriteLine(datacce+'log.json',rizi1)
		    }
		}else{
			log('玩家'+je.playername+'状态文件数据文件未找到，已停止同步！！')
			let tnow = TimeNow();
	        let rizi2 = '['+tnow+'] 玩家ID '+name+'  状态数据文件未找到，已停止同步！！'
	        fileWriteLine(datacce+'log.json',rizi2)
		}
	}else{
		return false;
	}
}

//玩家buff写服务器
function qingyi_player_effects(je,uuid,dataccd,datacce){
	let aacad = traab["玩家效果同步（on/off）"];
	let name = je.playername;
	if(aacad == 'on'){
		let ccaad = fileReadAllText(dataccd+je.playername+'.json')
	    if(ccaad != null){
		    if(ccaad != 'undefined'){
			    let r = setPlayerEffects(uuid,ccaad)
		    }else{
			    log('玩家'+je.playername+'玩家上次保存身上没有BUFF，停止同步')
			    let tnow = TimeNow();
	            let rizi1 = '['+tnow+'] 玩家ID '+name+'  玩家上次保存身上没有BUFF，停止同步'
	            fileWriteLine(datacce+'log.json',rizi1)
		    }
		}else{
			log('玩家'+je.playername+'buff数据数据文件未找到，已停止同步！！')
			let tnow = TimeNow();
	        let rizi2 = '['+tnow+'] 玩家ID '+name+'  buff数据文件未找到，已停止同步！！'
	        fileWriteLine(datacce+'log.json',rizi2)
		}
	}else{
		return false;
	}
}

//上线监听
function qingyi_transfer_loadname(e) {
    var je = JSON.parse(e);
	if(onl[0][je.playername] == 1){
		setTimeout(function(){qingyi_kick_q(je)},5000);
		setTimeout(function(){qingyi_kick_q(je)},10000);
		setTimeout(function(){qingyi_kick_q(je)},15000);
		setTimeout(function(){qingyi_kick_q(je)},20000);
	}else{
		onl[0][je.playername] = 1;
	    let tickonline = JSON.stringify(onl);
        fileWriteAllText(online+'online.json',tickonline);
		var uuid = qingyi_money_getUuid(je.playername);
	    var datacca = traab["玩家背包储存路径"];
	    var dataccb = traab["玩家能力值储存路径"];
	    var dataccc = traab["玩家状态储存路径"];
	    var dataccd = traab["玩家buff储存路径"];
		var datacce = traab["插件日志储存路径"];
		qingyi_player_Items(je,uuid,datacca,datacce)
		qingyi_player_abilities(je,uuid,dataccb,datacce)
		qingyi_player_data(je,uuid,dataccc,datacce)
		qingyi_player_effects(je,uuid,dataccd,datacce)
    }
}

/***************调用玩家文件写入储存文件*****************/

//下线监听
function qingyi_transferb_left(e) {
	var je = JSON.parse(e);
	var uuid = qingyi_money_getUuid(je.playername);
	var datacca = traab["玩家背包储存路径"];
	var dataccb = traab["玩家能力值储存路径"];
	var dataccc = traab["玩家状态储存路径"];
	var dataccd = traab["玩家buff储存路径"];
    qingyi_playerdata_Items(je,uuid,datacca)
	qingyi_playerdata_data(je,uuid,dataccc)
	qingyi_playerdata_abilities(je,uuid,dataccb)
	qingyi_playerdata_effects(je,uuid,dataccd)
	onl[0][je.playername] = 0;
	let tickonline = JSON.stringify(onl);
    fileWriteAllText(online+'online.json',tickonline);
}

//关箱监听
function qingyi_inventory_chesr(e) {
	var je = JSON.parse(e);
	var uuid = qingyi_money_getUuid(je.playername);
	var datacca = traab["玩家背包储存路径"];
	var dataccb = traab["玩家能力值储存路径"];
	var dataccc = traab["玩家状态储存路径"];
	var dataccd = traab["玩家buff储存路径"];
    qingyi_playerdata_Items(je,uuid,datacca)
	qingyi_playerdata_data(je,uuid,dataccc)
	qingyi_playerdata_abilities(je,uuid,dataccb)
	qingyi_playerdata_effects(je,uuid,dataccd)
}

//指令监听
function qingyi_transfer_command(e) {
	let je = JSON.parse(e);
	if(je.cmd=='/trs'){
	var uuid = qingyi_money_getUuid(je.playername);
	var datacca = traab["玩家背包储存路径"];
	var dataccb = traab["玩家能力值储存路径"];
	var dataccc = traab["玩家状态储存路径"];
	var dataccd = traab["玩家buff储存路径"];
    qingyi_playerdata_Items(je,uuid,datacca)
	qingyi_playerdata_data(je,uuid,dataccc)
	qingyi_playerdata_abilities(je,uuid,dataccb)
	qingyi_playerdata_effects(je,uuid,dataccd)
	return false;
	}
}

//定时保存数据
function qingyi_back(){
    let OnlinePlayers = getOnLinePlayers();
		if(OnlinePlayers != null){
        var OnlineJson = JSON.parse(OnlinePlayers);
        var OnlinePlayersText = JSON.stringify(OnlinePlayers);
        var OnlineNum=(OnlinePlayersText.split('playername')).length-1;
        var list = ""
		var datacca = traab["玩家背包储存路径"];
	    var dataccb = traab["玩家能力值储存路径"];
	    var dataccc = traab["玩家状态储存路径"];
	    var dataccd = traab["玩家buff储存路径"];
        for (i = 0; i < OnlineNum ; i++) {
            if(OnlineJson[i].uuid != null){
		        let t = getPlayerItems(OnlineJson[i].uuid);
		        let tt = getPlayerAttributes(OnlineJson[i].uuid);
		        let ttt = getPlayerAbilities(OnlineJson[i].uuid);
		        let tttt = getPlayerEffects(OnlineJson[i].uuid);
	            fileWriteAllText(datacca+OnlineJson[i].playername+'.json',t);
		        fileWriteAllText(dataccc+OnlineJson[i].playername+'.json',tt);
		        fileWriteAllText(dataccb+OnlineJson[i].playername+'.json',ttt);
		        fileWriteAllText(dataccd+OnlineJson[i].playername+'.json',tttt);
		        var tnow = TimeNow();
		        let rizi = '['+tnow+'] 玩家ID'+OnlineJson[i].playername+'  UUID：'+OnlineJson[i].uuid+'数据保存成功！'
		        fileWriteLine('plugins\\Inventory_Sync\\log.json',rizi)
		        onl[0][OnlineJson[i].playername] = 1;
	            let tickonline = JSON.stringify(onl);
                fileWriteAllText(online+'online.json',tickonline);
		    }
	    }
	}
	let cab = traab["记录玩家数据时间（分）"];
	setTimeout(qingyi_back,60000*cab);
}
setTimeout(qingyi_back,10000);

//后台错误消息拦截
setBeforeActListener('onServerCmdOutput', function (e) {
	let je = JSON.parse(e);
	let cmdout = je.output;
	let outa ='No targets matched selector'
	let outb ='Syntax error: Unexpected "%2$s": at "%1$s>>%2$s<<%3$s"'
	let outc =cmdout.indexOf('Could not find player')
	if(cmdout == outa||cmdout == outb||outc !=-1){
	return false;
	}
});

function qingyi_kick_q(je){
	let online1 = fileReadAllText(online+'online.json');
	let onl = JSON.parse(online1);
	if(onl[0][je.playername] == 1){
		runcmd('kick "'+je.playername+'"多服在线限制登陆！')
	}
}

setBeforeActListener('onPlayerLeft',qingyi_transferb_left);
setBeforeActListener('onInputCommand', qingyi_transfer_command);
setAfterActListener('onLoadName', qingyi_transfer_loadname);
setAfterActListener('onStopOpenChest', qingyi_inventory_chesr);

setTimeout(function(){
let pre = getShareData("_PluginCheck")
let name='Inventory_Sync'
let version = '1.0.5'
pre(name,version)
let cada = getShareData("_Register")
let command = 'trs'
let explain = '保存背包数据'
cada(command,explain)
},3000);