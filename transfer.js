setTimeout(function(){
let pre = getShareData("_PluginCheck")
let name='transfer'
let version = '0.2.0'
pre(name,version)
let cada = getShareData("_Register")
let command = 'tr'
let explain = '查看跨服面板'
cada(command,explain)
},3000);

    var have = fileReadAllText('plugins\\transfer\\uuid.json');
    if(have == null) {
       var normal = [{},{},{},{}];
	   var Json = JSON.stringify(normal);
       fileWriteAllText('plugins\\transfer\\uuid.json',Json);
    }
	let haveq = fileReadAllText('plugins\\transfer\\transfer.json');
    if(haveq == null) {
        var normal = {"content":"服务器列表","buttons":[{"image":{"type":"path","data":"textures/items/book_writable.png"},"text":"XXX服务器"},{"image":{"type":"path","data":"textures/items/iron_sword.png"},"text":"ZZZ服务器"},{"text": "§c关闭"}],"type":"form","title":"跨服传送"};
        var Json = JSON.stringify(normal, null, "\t");
        fileWriteAllText('plugins\\transfer\\transfer.json',Json);
        var button = [{"method":"cmd","data":"第一个服务器ip","cata":"端口"},{"method":"cmd","data":"第二个服务器ip","cata":"端口"},{"method":"custom_cmd","data":".","cata":"."}];
        var Json = JSON.stringify(button, null, "\t");
        fileWriteAllText('plugins\\transfer\\transfer_cmd.json',Json);
    }
    let trcomm = fileReadAllText('plugins\\transfer\\transfer_onandoff.json');
    if(trcomm == null) {
        var normalc = {"title":"on_off命令方块跨服功能，ping为面板显示服务器详情开关。true为开启","on_off":"true","ping":"true","name":"传送大使","提示":"name后面为npc名字"};
        var Json = JSON.stringify(normalc, null, "\t");
        fileWriteAllText('plugins\\transfer\\transfer_onandoff.json',Json);
    }

        QYignfile = fileReadAllText('plugins\\transfer\\uuid.json');
        QYJson = JSON.parse(QYignfile);
	    var tr = null;
	    var t = null;
        var ccbb =null;	
		var GUILIST={};

function qingyi_transfer_loadname(e) {
        var je = JSON.parse(e);
	if(QYJson[0][je.playername] == null){
		QYJson[0][je.playername] = je.uuid;
		var input = JSON.stringify(QYJson);
        fileWriteAllText('plugins\\transfer\\uuid.json',input);
	}
}

function ccaa(file,je){
		var uuid = QYJson[0][je.playername];
		let t = runcmdAs(uuid, '/trs')
        var tr = sendCustomForm(uuid,file);
    GUILIST[tr]=function(e){
		var je=JSON.parse(e);
		let trcomme = fileReadAllText('plugins\\transfer\\transfer_onandoff.json');
        var traab = JSON.parse(trcomme);
		var cab = traab["ping"];
	if(cab == "true"){
	    if(je.selected==null)
		return false;
        let Buttons = fileReadAllText('plugins\\transfer\\transfer_cmd.json');
        var ButtonsJson = JSON.parse(Buttons);
        var method = ButtonsJson[je.selected]["method"];
        var data = ButtonsJson[je.selected]["data"];
		var cata = ButtonsJson[je.selected]["cata"];
		var nn = cata.toString()
            if(method == "cmd") {
              QYJson[1][je.playername] = data;
              QYJson[2][je.playername] = nn;
		      var input = JSON.stringify(QYJson);
              fileWriteAllText('plugins\\transfer\\uuid.json',input);
              var bdba = 'ip='+data+'&port='+nn
              var url = 'http://motd.qingyimc.cn/api.php'
     	      request(url, 'GET', bdba, function (ccl){
              var bba = JSON.parse(ccl);
              var online = bba["online"];
              var mac = bba["max"];
              var sta = bba["status"];
              var version = bba["version"];
              var selay = bba["motd"];
              runcmd('title '+je.playername+' title 获取服务器信息中！请稍后');
              var ccbb = sendModalForm(uuid,'服务器信息','服务器状态：'+sta+'\n服务器最大人数：'+mac+'\n当前在线：'+online+'\n服务器版本：'+version+'\nmotd：\n'+selay, "前往服务器", "返回服务器列表")
	            GUILIST[ccbb]=function(e){
		          var je=JSON.parse(e);
	                if(je.selected==null)
		              return false;
                        if(je.selected == 'true') {
                          var ipp = QYJson[1][je.playername];
                          var duanko = QYJson[2][je.playername];
                          let t = transferserver(je.uuid,ipp,duanko);
                        }else if(je.selected=='false'){
		              ccaa(file,je)		
		            }
	            }
	            setTimeout(function(){
		          delete GUILIST[ccbb]
		          releaseForm(ccbb);
	            },60*1000);
	        })
	    }
	}else{
		let Buttons = fileReadAllText('plugins\\transfer\\transfer_cmd.json');
        var ButtonsJson = JSON.parse(Buttons);
        var method = ButtonsJson[je.selected]["method"];
        var data = ButtonsJson[je.selected]["data"];
		var cata = ButtonsJson[je.selected]["cata"];
		var nn = cata.toString()
		if(data == '.'){
			return false;
		}else{
		let t = transferserver(je.uuid,data,nn);
		log(je.uuid)
		}
	}
	setTimeout(function(){
		delete GUILIST[tr]
		releaseForm(tr);
	},60*1000);

	}
   }

function qingyi_transfer_command(e) {
	let je = JSON.parse(e);
	let file = fileReadAllText('plugins\\transfer\\transfer.json');
	if(je.cmd=='/tr'){
     ccaa(file,je)
	return false;
  }
}

function qingyi_transfer_pop(e) {
        var je=JSON.parse(e);
	if(GUILIST[je.formid]!=null){
		GUILIST[je.formid](e)
		delete GUILIST[je.formid];
	}
}

function qingyi_transfer_commchat(e) {
	    var je = JSON.parse(e);
        let trcomme = fileReadAllText('plugins\\transfer\\transfer_onandoff.json');
        var traab = JSON.parse(trcomme);
		var caa = traab["on_off"];
		var bbd = traab["name"]
	if(caa == 'true' && je.chatstyle == "tell") {
        var cbb = je.target;
        var msg = je.msg;
        var comm = je.playername;
        var ccc = msg.split(' ');
        var ccd = ccc[0];
    if(ccd == 'tr' && comm == "!\u00a7r"||comm == bbd){
        var cca = ccc[1];
        var ccb = ccc[2];
        var uuid = QYJson[0][cbb];
		let t = runcmdAs(uuid, '/trs')
		t = transferserver(uuid,cca,ccb);
      }
	}
}

setAfterActListener('onChat', qingyi_transfer_commchat);
setBeforeActListener('onFormSelect', qingyi_transfer_pop);
setBeforeActListener('onInputCommand', qingyi_transfer_command);
setAfterActListener('onLoadName', qingyi_transfer_loadname);

