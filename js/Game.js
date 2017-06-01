(function(){
	var Game = window.Game = function(params){
		//得到画布
		this.canvas = document.querySelector(params.canvasid);
		//上下文
		this.ctx = this.canvas.getContext("2d");
		//资源文件地址
		this.Rjsonurl = params.Rjsonurl;
		//帧编号
		this.fno = 0;
		//设置画布的宽度和高度
		this.init();
		//分数
		this.score = 0;
		//读取资源
		var self = this;
		//读取资源是一个异步函数，所以我们不知道什么时候执行完毕。但是其他的事情必须等到他完毕之后再执行，必须用回调函数。
		this.loadAllResource(function(){
			//我们封装的回调函数，这里表示全部资源读取完毕
			self.start();
		});
	}
	//初始化，设置画布的宽度和高度
	Game.prototype.init = function(){
		//读取视口的宽度和高度，
		var windowW = document.documentElement.clientWidth;
		var windowH = document.documentElement.clientHeight;
		//验收
		if(windowW > 414){
			windowW = 414;
		}else if(windowW < 320){
			windowW = 320;
		}
		//736
		if(windowH > 736){
			windowH = 736;
		}else if(windowH < 500){
			windowH = 500;
		}
		//让canvas匹配视口
		this.canvas.width = windowW;
		this.canvas.height = windowH;
	}

	//读取资源
	Game.prototype.loadAllResource = function(callback){
		//准备一个R对象
		this.R = {};
		var self = this;	//备份
		//计数器
		var alreadyDoneNumber = 0;
		//发出请求，请求JSON文件。
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				var Robj = JSON.parse(xhr.responseText);
				//遍历数组
				for (var i = 0; i < Robj.images.length; i++) {
					//创建一个同名的key
					self.R[Robj.images[i].name] = new Image();
					//请求
					self.R[Robj.images[i].name].src = Robj.images[i].url;
					//监听
					self.R[Robj.images[i].name].onload = function(){
						alreadyDoneNumber++;
						//清屏
						self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
						//提示文字
						var txt = "正在加载资源" + alreadyDoneNumber + "/" + Robj.images.length + "请稍后";
						//放置居中的位置，屏幕的黄金分割点
						self.ctx.textAlign = "center";
						self.ctx.font = "20px 微软雅黑";
						self.ctx.fillText(txt, self.canvas.width / 2 ,self.canvas.height * (1 - 0.618));
						//判断是否已经全部加载完毕
						if(alreadyDoneNumber == Robj.images.length){
							callback();
						}
					}
				};
			}
		}
		xhr.open("get",this.Rjsonurl,true);
		xhr.send(null);
	}
	//开始游戏
	Game.prototype.start = function(){
		//实例化自己的场景管理器
		this.sm = new SceneManager();

		var self = this;
		//设置定时器
		this.timer = setInterval(function(){
			//清屏
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
			//帧编号
			self.fno ++;
			// 场景管理器的渲染和更新
			self.sm.update();
			self.sm.render();

			//打印帧编号
			self.ctx.font = "16px consolas";
			self.ctx.textAlign = "left";
			self.ctx.fillStyle = "black";
			self.ctx.fillText("FNO:" + self.fno , 10 ,20);
			self.ctx.fillText("场景号:" + self.sm.sceneNumber , 10 ,40);
		},20);
	}
 
})();