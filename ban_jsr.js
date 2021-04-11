var idd = {};

let haveq = fileReadAllText('plugins\\ban_player\\playerlist.json');
if (haveq == null) {
    let normal = {};
    let Json = JSON.stringify(normal, null, "\t");
    fileWriteAllText('plugins\\ban_player\\playerlist.json', Json);
}

// 玩家输入指令回调
setBeforeActListener('onInputCommand', function (e) {
    let je = JSON.parse(e);
    if (je.cmd == '/ban on') {
        let xuid = qingyi_getXuid(je.playername);
        if (OP(xuid)) {
            let uuid = qingyi_getUuid(je.playername);
            qingyi_GUI(uuid)
            return false;
        }
    } else if (je.cmd == '/ban of') {
        let xuid = qingyi_getXuid(je.playername);
        if (OP(xuid)) {
            let uuid = qingyi_getUuid(je.playername);
            qingyi_tc1(uuid);
            return false;
        }
    } else if (je.cmd.indexOf('ban jie') != -1) {
        let xuid = qingyi_getXuid(je.playername);
        if (OP(xuid)) {
            let cmd = je.cmd;
            let asa1 = cmd.replace(/\//g, '')
            if (cmd.indexOf('"') != -1) {
                let asz = asa1.split('"')
                let nameq = asz[1];
                qingyi_ban_jie(je, nameq);
            } else {
                let asz = asa1.split(" ")
                let nameq = asz[2];
                qingyi_ban_jie(je, nameq);
            }
            return false;
        }
    } else if (je.cmd.indexOf('ban cha') != -1) {
        let cmd = je.cmd;
        let asa1 = cmd.replace(/\//g, '')
        if (cmd.indexOf('"') != -1) {
            let asz = asa1.split('"')
            let nameq = asz[1];
            qingyi_ban_cha(je, nameq);
        } else {
            let asz = asa1.split(" ")
            let nameq = asz[2];
            qingyi_ban_cha(je, nameq);
        }
        return false;
    }
});

// 玩家重生回调
setAfterActListener('onRespawn', function (e) {
    let je = JSON.parse(e);
    let pei = fileReadAllText('plugins\\ban_player\\playerlist.json');
    let name = je.playername;
    if (pei.indexOf(name) != -1) {
        let assas = JSON.parse(pei)
        qingyi_ban_kick(name, assas[name])
    }
});

//获取xuid函数
function qingyi_getXuid(name) {
    let on = getOnLinePlayers();
    if (on != null) {
        let onl = JSON.parse(on);
        if (onl != null) {
            for (let i = 0; i < onl.length; i++) {
                let online = onl[i];
                if (online.playername == name) {
                    return online.xuid;
                }
            }
        }
    }
    return null;
}

//获取uuid函数
function qingyi_getUuid(name) {
    let on = getOnLinePlayers();
    if (on != null) {
        let onl = JSON.parse(on);
        if (onl != null) {
            for (let i = 0; i < onl.length; i++) {
                let online = onl[i];
                if (online.playername == name) {
                    return online.uuid;
                }
            }
        }
    }
    return null;
}

//获取OP函数
function OP(xuid) {
    let fa = fileReadAllText('permissions.json');
    let F = JSON.parse(fa);
    let tmp = false;
    for (var i = 0; i < F.length; i++) {
        if (F[i].permission == 'operator' && F[i].xuid == xuid) {
            tmp = true;
        }
    }
    return tmp;
}

//离线封禁弹窗
function qingyi_tc1(uuid) {
    let fid = sendCustomForm(uuid, '{"content":[{"placeholder":"玩家名称","default":"","type":"input","text":""},{"placeholder":"封禁原因","default":"","type":"input","text":""}], "type":"custom_form","title":"BAN离线玩家页面"}')
    idd[fid] = function (e) {
        let je = JSON.parse(e);
        if (je.selected != '"[null,\\"\\",\\"\\"]"' && je.selected != "null") {
            let Buttons = fileReadAllText('plugins\\ban_player\\playerlist.json');
            let bcc = JSON.parse(Buttons);
            let sele = je.selected;
            let change = '/\\"/g';
            let xname = sele.replace(eval(change), '"');
            let sass = JSON.parse(xname)
            let aname = sass[0];
            let yya = sass[1];
            bcc[aname] = yya;
            let asa = JSON.stringify(bcc, null, "\t")
            fileWriteAllText('plugins\\ban_player\\playerlist.json', asa);
            qingyi_ban_kick(aname, yya)
            runcmd('tellraw "' + je.playername + '" {"rawtext":[{"text":"§6玩家 ' + aname + ' 已成功加入黑名单！"}]}')
        }
    }
}

//在线玩家弹窗
function qingyi_GUI(uuid) {
    let OnlinePlayers = getOnLinePlayers();
    let OnlineJson = JSON.parse(OnlinePlayers);
    let OnlinePlayersText = JSON.stringify(OnlinePlayers);
    let OnlineNum = (OnlinePlayersText.split('playername')).length - 1;
    let list = ""
    for (i = 0; i < OnlineNum; i++) {
        list += '"' + OnlineJson[i].playername + '"';
    }
    choose = list.replace(/""/g, '","');
    let qylist = sendSimpleForm(uuid, 'BAN——player', '请选择玩家：', '[' + choose + ']')
    idd[qylist] = function (e) {
        let je = JSON.parse(e);
        if (je.selected != "null") {
            let player = choose.split(',');
            let fstchose = player[je.selected];
            let change = '/"/g';
            let xname = fstchose.replace(eval(change), '');
            let xuan2 = sendCustomForm(uuid, '{"content":[{"placeholder":"封禁原因","default":"","type":"input","text":""}], "type":"custom_form","title":"' + xname + '"}')
            idd[xuan2] = function (e) {
                let je = JSON.parse(e);
                if (je.selected != ' "[\\"\\"]"' && je.selected != null) {
                    let Buttons = fileReadAllText('plugins\\ban_player\\playerlist.json');
                    let bcc = JSON.parse(Buttons);
                    let change = '/\\"/g';
                    let sele1 = je.selected;
                    let xname1 = sele1.replace(eval(change), '"');
                    let sass1 = JSON.parse(xname1)
                    let yya1 = sass1[0];
                    bcc[xname] = yya1;
                    let asa = JSON.stringify(bcc, null, "\t")
                    fileWriteAllText('plugins\\ban_player\\playerlist.json', asa);
                    qingyi_ban_kick(xname, yya1)
                    runcmd('tellraw "' + je.playername + '" {"rawtext":[{"text":"§6玩家 ' + xname + ' 已成功加入黑名单！"}]}')
                }
            }
            setTimeout(function () {
                delete idd[qylist]
                releaseForm(qylist);
            }, 30 * 1000);
        }
    }
    setTimeout(function () {
        delete idd[qylist]
        releaseForm(qylist);
    }, 30 * 1000);
}

//解封玩家
function qingyi_ban_jie(je, nameq) {
    let Buttons = fileReadAllText('plugins\\ban_player\\playerlist.json');
    let bcc = JSON.parse(Buttons);
    if (Buttons.indexOf(nameq) != -1) {
        delete bcc[nameq];
        delete bcc.nameq;
        let asa = JSON.stringify(bcc, null, "\t")
        fileWriteAllText('plugins\\ban_player\\playerlist.json', asa);
        runcmd('tellraw "' + je.playername + '" {"rawtext":[{"text":"§6玩家 ' + nameq + ' 解除黑名单成功！！"}]}')
    } else {
        runcmd('tellraw "' + je.playername + '" {"rawtext":[{"text":"§6玩家 ' + nameq + ' 没有在黑名单内！！！"}]}')
    }
}

//查询黑名单
function qingyi_ban_cha(je, nameq) {
    let Buttons = fileReadAllText('plugins\\ban_player\\playerlist.json');
    let bcc = JSON.parse(Buttons);
    if (Buttons.indexOf(nameq) != -1) {
        runcmd('tellraw "' + je.playername + '" {"rawtext":[{"text":"§6玩家 ' + nameq + ' 被封禁原因： ' + bcc[nameq] + ' "}]}')
    } else {
        runcmd('tellraw "' + je.playername + '" {"rawtext":[{"text":"§6玩家 ' + nameq + ' 没有在黑名单内！！！"}]}')
    }
}

// 玩家选择GUI菜单回调
setBeforeActListener('onFormSelect', function (e) {
    let je = JSON.parse(e);
    if (idd[je.formid] != null) {
        idd[je.formid](e);
        delete idd[je.formid];
    }
});

//踢人函数
function qingyi_ban_kick(name, ky) {
    runcmd('kick "' + name + '" ' + ky);
    setTimeout(function () {
        let onlinelist = getOnLinePlayers();
        let result = onlinelist.indexOf(name);
        if (result != -1) {
            qingyi_ban_kick(name, ky)
        }
    }, 3000)
}

//获取时间
function time_nian() {
    var date = new Date();
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    var curHours = date.getHours();
    var curMinutes = date.getMinutes();
    var Seconds = date.getSeconds();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    if (curMinutes < 10) {
        curMinutes = "0" + curMinutes;
    }
    if (Seconds < 10) {
        Seconds = "0" + Seconds;
    }
    return (myyear + "-" + mymonth + "-" + myweekday + " " + curHours + ":" + curMinutes + ":" + Seconds);
}

setTimeout(function () {
    let nian = time_nian()
    log('[' + nian + ' INFO] [BAN-jsr版]》》插件加载成功，当前版本：0.0.2')
}, 5000)

setTimeout(function () {
    let pre = mc.getShareData("_PluginCheck")
    let name = 'ban'
    let version = '0.0.2'
    pre(name, version)
}, 3000);