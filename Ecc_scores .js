
/*********配置文件生成*********/
var path ='plugins\\Ecc_scores\\Ecc_scores.json';
if (fileReadAllText(path) == null) {
    logout('cf plugins\\Ecc_scores')
    let norma = {"游戏内计分板名称":"money","游戏内计分板显示名称":"金币","是否有人正在转账":"false","后台监听1":"false","提示":"请勿修改后台监听和是否有人正在转账的设置"};
    let Json = JSON.stringify(norma, null, "\t");
    fileWriteAllText(path, Json);
	let normal = [{},{},{},{}];
	let newkijk = JSON.stringify(normal);
    fileWriteAllText('plugins\\Ecc_scores\\Ecc_scorespl.json',newkijk);
}

/*********设置全局变量*********/

Buttonsa = fileReadAllText('plugins\\Ecc_scores\\Ecc_scores.json');
bcca = JSON.parse(Buttonsa);
Buttonsapl = fileReadAllText('plugins\\Ecc_scores\\Ecc_scorespl.json');
bccapl = JSON.parse(Buttonsapl);
var idd = {};

/*********执行函数*********/

function qingyi_money_zhuanzhang(){
	bcca["是否有人正在转账"] = "false"
	bcca["后台监听1"] = "false"
    let Json = JSON.stringify(bcca, null, "\t");
    fileWriteAllText('plugins\\Ecc_scores\\Ecc_scores.json',Json);
}

// 玩家输入指令回调
function qingyi_money_comm(e) {
	let je = JSON.parse(e);
	let Buttonsa = fileReadAllText('plugins\\Ecc_scores\\Ecc_scores.json');
    let bcca = JSON.parse(Buttonsa);
	let zhuanz = bcca["是否有人正在转账"]
	if(je.cmd == '/ecc') {
		if(zhuanz == 'false'){
			bcca["是否有人正在转账"] = "true"
		    let Json = JSON.stringify(bcca, null, "\t");
            fileWriteAllText('plugins\\Ecc_scores\\Ecc_scores.json',Json);
		    qingyi_money_scores(je)
		}else{
			let uuid = qingyi_money_getUuid(je.playername);
			let ecc1id = sendModalForm(uuid, '转账', '有玩家正在操作请稍后！！', '听听歌', '关闭')
			idd[ecc1id]=function (e){
				let je = JSON.parse(e);
				if(je.selected == 'true'){
					runcmd('playsound record.wait '+je.playername);
		            runcmd('tellraw '+je.playername+' { "rawtext" : [{ "text" : "即将为您播放唱片!" }]}');
				}else{
					return false;
				}
			}
		}
		return false;
	}else if(je.cmd == '/ecc reset'){
		var name = je.playername;
		var xuid = qingyi_money_getXuid(name);
		let vc = fileReadAllText('permissions.json');
        let vcc = JSON.parse(vc);
        for(var i = 0; i < vcc.length; i++) {
            if(vcc[i].permission == 'operator') {
				if(vcc[i].xuid == xuid) {
					qingyi_money_zhuanzhang()
					runcmd('tellraw "'+name+'" {"rawtext":[{"text":"重置成功！！！"}]}')
				}
			}
		}
		return false;
	}
}

//玩家选择面板
function qingyi_money_scores(je){
	let name = je.playername;
	let uuid = qingyi_money_getUuid(name);
	let moneya = getShareData('Econ_GetMoney');
	let money = moneya(name)
	let fid = sendSimpleForm(uuid, '转账选项', '请选择：', '["经济转计分板","计分板转经济","关闭"]')
	idd[fid]=function (e){
		let je = JSON.parse(e);
	    if(je.selected != 'null') {
			if(je.selected == 0){
				qingyi_money_ecc(uuid,name)
			}else if(je.selected == 1){
				qingyi_money_score(uuid,e,name)
			}else if(je.selected == 2){
				qingyi_money_zhuanzhang()
				let r = releaseForm(fid)
			}
		}
		else{
			qingyi_money_zhuanzhang()
		}
	}	
}

//经济转计分板
function qingyi_money_ecc(uuid,e,name){
	let eccid = sendCustomForm(uuid, '{"content":[{"placeholder":"请输入1-10000的整数","default":"","type":"input","text":""}], "type":"custom_form","title":"请输入金额"}')
	idd[eccid]=function (e){
		let je = JSON.parse(e);
		let name = je.playername;
		let shu = je.selected;
		let shu1 = shu.replace(/\["/g,'')
		let shu2 = shu1.replace(/\"]/g,'')
        let jiance = /[0-9]/
		let jieguo = jiance.test(shu2)
		if(je.selected == null)
		    return false;
		if(jieguo == true){
		    if(shu2>=1&&shu2<=10000){
				let moneyb = getShareData("Econ_ChangeMoney");
				let moneya = getShareData('Econ_GetMoney');
				let money = moneya(name);
				let money1 = parseFloat(money)
			    let shu3 = parseFloat(shu2)
				if(money1>=shu3){
				    moneyb(name,"Deduct",shu2);
			        let mc = bcca["游戏内计分板名称"]
			        runcmd('scoreboard objectives add '+mc+' dummy 金币')
			        runcmd('scoreboard players add "'+name+'" '+mc+' '+shu2)
					let ecc1id = sendModalForm(uuid, '转账', '转账成功，请选择', '继续转账', '关闭')
				    idd[ecc1id]=function (e){
					    let je = JSON.parse(e);
					    if(je.selected == 'true'){
						    qingyi_money_scores(je)
					    }else{
						    qingyi_money_zhuanzhang()
					    }
				    }
				}else{
					let ecc1id = sendModalForm(uuid, '转账', '余额不足，请选择', '重新输入', '关闭')
				    idd[ecc1id]=function (e){
					    let je = JSON.parse(e);
					    if(je.selected == 'true'){
						    qingyi_money_scores(je)
					    }else{
						    qingyi_money_zhuanzhang()
					    }
				    }
					
				}
		    }else{
				let ecc1id = sendModalForm(uuid, '转账', '输入超限，请选择', '重新输入', '关闭')
				idd[ecc1id]=function (e){
					let je = JSON.parse(e);
					if(je.selected == 'true'){
						qingyi_money_scores(je)
					}else{
						qingyi_money_zhuanzhang()
					}
				}
			}
		}else{
			let ecc2id = sendModalForm(uuid, '转账', '输入非法内容，请选择', '重新输入', '关闭')
			idd[ecc2id]=function (e){
				let je = JSON.parse(e);
				if(je.selected == 'true'){
					qingyi_money_scores(je)
				}else{
					qingyi_money_zhuanzhang()
				}
			}
		}
	}
}

//计分板转经济
function qingyi_money_score(uuid,e,name){
	let ecc4id = sendCustomForm(uuid, '{"content":[{"placeholder":"请输入1-10000的整数","default":"","type":"input","text":""}], "type":"custom_form","title":"计分板转经济-请输入金额"}')
	idd[ecc4id]=function (e){
		let je = JSON.parse(e);
		let name = je.playername;
		let shu = je.selected;
		let shu1 = shu.replace(/\["/g,'')
		let shu2 = shu1.replace(/\"]/g,'')
        let jiance = /[0-9]/
		let jieguo = jiance.test(shu2)
		if(je.selected == null)
		    return false;
		if(jieguo == true){
		    if(shu2>=1&&shu2<=10000){
				bcca["后台监听1"] = "true"
		        let Json = JSON.stringify(bcca, null, "\t");
                fileWriteAllText('plugins\\Ecc_scores\\Ecc_scores.json',Json);
	            bccapl[0][name] = 1;
				bccapl[1][name] = shu2;
		        let inpuqt = JSON.stringify(bccapl);
                fileWriteAllText('plugins\\Ecc_scores\\Ecc_scorespl.json',inpuqt);
	            runcmd('scoreboard players list "'+name+'"')
			}else{
				let ecc51id = sendModalForm(uuid, '转账', '输入超限，请选择', '重新输入', '关闭')
				idd[ecc51id]=function (e){
					    let je = JSON.parse(e);
					if(je.selected == 'true'){
						qingyi_money_scores(je)
					}else{
						qingyi_money_zhuanzhang()
					}
				}
			}
		}else{
			let ecc6id = sendModalForm(uuid, '转账', '输入非法内容，请选择', '重新输入', '关闭')
			idd[ecc6id]=function (e){
				let je = JSON.parse(e);
				if(je.selected == 'true'){
				    qingyi_money_scores(je)
				}else{
				    qingyi_money_zhuanzhang()
				} 
			}
		}
	}
}

//调用uuid
function qingyi_money_getUuid(name) {
	let on = getOnLinePlayers();
	if (on != null) {
		let onl = JSON.parse(on);
		if (onl != null) {
			for (let i = 0; i < onl.length; i++) {
				let online = onl[i];
				if (online.playername == name)	// 找到
					return online.uuid;
            }
        }
	}
	return null;
}

//调用xuid
function qingyi_money_getXuid(name) {
	let on = getOnLinePlayers();
	if (on != null) {
		let onl = JSON.parse(on);
		if (onl != null) {
			for (let i = 0; i < onl.length; i++) {
				let online = onl[i];
				if (online.playername == name)	// 找到
					return online.xuid;
            }
        }
	}
	return null;
}

//弹窗回调
function qingyi_money_FormSelect(e) {
    let je = JSON.parse(e);
    if(idd[je.formid]!=null){
		idd[je.formid](e);
		delete idd[je.formid];
	}
}

//后台监听
function qingyi_money_cmd(e) {
	let je = JSON.parse(e);
	let Buttonsa = fileReadAllText('plugins\\Ecc_scores\\Ecc_scores.json');
    let bcca = JSON.parse(Buttonsa);
	let cac = bcca["后台监听1"]
	let cav = bcca["游戏内计分板显示名称"]
	let cae = bcca["游戏内计分板名称"]
	let aba = je.output;
	let abb = aba.indexOf("\u00a7a\u6b63\u5728\u4e3a")
	if(cac == 'true'){
		if(abb != -1){
			bcca["后台监听1"] = "false"
	        let Json = JSON.stringify(bcca, null, "\t");
            fileWriteAllText('plugins\\Ecc_scores\\Ecc_scores.json',Json);
			var cc = je.output;
	        let ac = cc.indexOf("%");
	        ac+=1;
	        let bc = cc.indexOf(" \u663e");
	        let ec = cc.substring(ac,bc);
	        var name = ec;
	        var mc3 = bccapl[0][name];
	        var uuid = qingyi_money_getUuid(name);
		}else{
	        bcca["后台监听1"] = "false"
	        let Json = JSON.stringify(bcca, null, "\t");
            fileWriteAllText('plugins\\Ecc_scores\\Ecc_scores.json',Json);
	        var cc = je.output;
	        let ac = cc.indexOf("%");
	        ac+=1;
	        let bc = cc.indexOf(":\n-");
	        let ec = cc.substring(ac,bc);
	        var name = ec;
	        var mc3 = bccapl[0][name];
	        var uuid = qingyi_money_getUuid(name);
		}
	    if(mc3 == 1){
	    	bccapl[0][name] = 0;
	    	let inpuqt = JSON.stringify(bccapl);
            fileWriteAllText('plugins\\Ecc_scores\\Ecc_scorespl.json',inpuqt);
		    let ca = cc.indexOf(cav);
	        ca+=4;
	        let cb = cc.indexOf(" ("+cae+")");
	        let ce = cc.substring(ca,cb);
		    let mc4 = bccapl[1][name];
			let mc5 = parseFloat(ce)
			let mc6 = parseFloat(mc4)
		    if(mc5>=mc6){
				let Buttonsa = fileReadAllText('plugins\\Ecc_scores\\Ecc_scores.json');
                let bcca = JSON.parse(Buttonsa);
		    	let mc = bcca["游戏内计分板名称"];
			    runcmd('scoreboard players remove "'+name+'" '+mc+' '+mc4);
			    let moneyb = getShareData("Econ_ChangeMoney");
			    let cx = moneyb(name,"Add",mc4);
			    let ecc91id = sendModalForm(uuid, '转账', '转账成功，请选择', '继续转账', '关闭')
				idd[ecc91id]=function (e){
					let je = JSON.parse(e);
					if(je.selected == 'true'){
				        qingyi_money_scores(je)
					}else{
						qingyi_money_zhuanzhang()
					}
				}
		    }else{
			    let ecc71id = sendModalForm(uuid, '转账', '余额不足，请选择', '重新输入', '关闭')
			    idd[ecc71id]=function (e){
				    let je = JSON.parse(e);
				    if(je.selected == 'true'){
				    	qingyi_money_scores(je)
				    }else{
					    qingyi_money_zhuanzhang()
				    }
			    }	
		    }
	    }
	}
}

setTimeout(function(){
let pre = getShareData("_PluginCheck")
let name='Ecc_scores'
let version = '0.0.5'
pre(name,version)
let cada = getShareData("_Register")
let command = 'ecc'
let explain = '经济和计分板互转（不支持多玩家同时操作）'
cada(command,explain)
},3000);

/*********监听及重置*********/
qingyi_money_zhuanzhang()
setBeforeActListener('onServerCmdOutput', qingyi_money_cmd)
setBeforeActListener('onInputCommand', qingyi_money_comm)
setBeforeActListener('onFormSelect', qingyi_money_FormSelect)