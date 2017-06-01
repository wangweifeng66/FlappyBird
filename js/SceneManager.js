(function(){
	var SceneManager = window.SceneManager = function(){
		//1表示欢迎屏幕，2表示教程，3表示游戏内容，3表示GameOver
		this.sceneNumber = 1;
		//场景管理器负责实例化东西
		game.bg = new Background();
		game.land = new Land();
		game.bird = new Bird();

		//logo的y值
		this.logoY = -48;
		//button_play的y值
		this.button_playX = game.canvas.width / 2 - 58;
		this.button_playY = game.canvas.height;

		//添加监听
		this.bindEvent();
	}
	SceneManager.prototype.update = function(){
		switch(this.sceneNumber){
			case 1 :
				//让logo进行移动 
				this.logoY += 10;
				if(this.logoY > 120){
					this.logoY = 120;
				}
				//让按钮移动
				this.button_playY -= 16;
				if(this.button_playY < 360){
					this.button_playY = 360;
				}
				break;
			case 2 :
				//小鸟扑打翅膀
				game.bird.wing();
				//改变透明度 
				this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.1 : 0.1;
				//如果到头了，反过来
				if(this.tutorialOpacity < 0.1 || this.tutorialOpacity > 0.9){
					this.tutorialOpacityIsDown = !this.tutorialOpacityIsDown;
				}

				break;

			case 3 :
				//小鸟更新
				game.bird.update();
				//背景和大地更新
				game.bg.update();
				game.land.update();
				//管子的实例化
				game.fno % 150 == 0 && (new Pipe());
				//渲染所有管子
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].update();
				}
				break;
			case 4 : 
				if(game.bird.y > game.canvas.height * 0.78 - 17){
					this.isBirdLand = true;
				}
				this.birdfno++;
				//鸟是否落地
				if(!this.isBirdLand){
					game.bird.y += 1.4 * this.birdfno;
				}else{
					//爆炸序列
					game.fno % 4 == 0 && this.bombStep ++;
				}

				//白屏要慢慢缓缓的变回来
				this.maskOpacity -= 0.1;
				if(this.maskOpacity < 0){
					this.maskOpacity = 0;
				}

		}
	}

	SceneManager.prototype.render = function(){		
		//根据当前是第几个场景，来决定做什么
		switch(this.sceneNumber){
			case 1 : 
				//渲染背景
				game.bg.render();
				//渲染大地
				game.land.render();
				//渲染小鸟
				game.bird.render();
				game.bird.x = game.canvas.width / 2;
				game.bird.y = 260;
				//画logo
				game.ctx.drawImage(game.R["logo"],game.canvas.width / 2 - 89,this.logoY);
				//画按钮
				game.ctx.drawImage(game.R["button_play"],this.button_playX,this.button_playY);
				break;
			case 2 : 
				//渲染背景
				game.bg.render();
				//渲染大地
				game.land.render();
				//渲染小鸟
				game.bird.render();
				

				//画教程小图
				game.ctx.save();
				game.ctx.globalAlpha = this.tutorialOpacity;  //透明度
				game.ctx.drawImage(game.R["tutorial"] , game.canvas.width / 2 - 57 , 280);
				game.ctx.restore();
				break;

			case 3: 
				//渲染背景
				game.bg.render();
				//渲染大地
				game.land.render();
				//渲染小鸟
				game.bird.render();
				//渲染管子
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render();
				}

				//打印当前分数
				//当前分数的位数，比如66分就是2位
				var scoreLength = game.score.toString().length;
				//循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
				for(var i = 0 ; i < scoreLength ; i++ ){
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
				}
 				break;
			case 4: 
				//渲染背景
				game.bg.render();
				//渲染大地
				game.land.render();
				//渲染小鸟
				if(!this.isBirdLand){
					game.bird.render();
				}else{
					//渲染爆炸特效
					if(this.bombStep <= 11){
						game.ctx.drawImage(game.R["b" + this.bombStep],game.bird.x - 24 - 36, game.bird.y - 24 - 60);
					}else{
						this.enter(5);
					}
				}
				//渲染管子
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render();
				}
				//渲染大白屏
				game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
				game.ctx.fillRect(0,0,game.canvas.width , game.canvas.height);

				

				//打印当前分数
				//当前分数的位数，比如66分就是2位
				var scoreLength = game.score.toString().length;
				//循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
				for(var i = 0 ; i < scoreLength ; i++ ){
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
				}
				break;
			case 5: 
				//渲染背景
				game.bg.render();
				//渲染大地
				game.land.render();
				 
				//渲染管子
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render();
				}
			 
				//打印当前分数
				//当前分数的位数，比如66分就是2位
				var scoreLength = game.score.toString().length;
				//循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
				for(var i = 0 ; i < scoreLength ; i++ ){
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
				}

				//渲染重新再来
				game.ctx.drawImage(game.R["text_game_over"],game.canvas.width / 2 - 102 , 200);
		}
	}

	//进入某个场景要做的事情
	SceneManager.prototype.enter = function(number){
		this.sceneNumber = number;
		switch(this.sceneNumber){
			case 1 : 
				//进入1号场景这一瞬间要做的事情
				this.logoY = -48;
				this.button_playY = game.canvas.height;
				game.bird = new Bird();
				game.score = 0;
				break;
			case 2:
				game.bird.y = 150;
				//tutorial的透明度0~1
				this.tutorialOpacity = 1;
				this.tutorialOpacityIsDown = true;
				break;
			case 3 : 
				//管子数组清空
				game.pipeArr = new Array();
				break;
			case 4 :
				//死亡动画，游戏界面白一下
				this.maskOpacity = 1;
				//小鸟是否已经触底
				this.isBirdLand = false; 
				//小帧编号
				this.birdfno = 0;
				//爆炸动画
				this.bombStep = 0;

				break;
			case 5 :
				break;
		}
	}

	//添加监听
	SceneManager.prototype.bindEvent = function(){
		var self = this;
		game.canvas.onclick = function(event){
			clickHandler(event.clientX , event.clientY);
		};


		function clickHandler(mousex,mousey){
			//点击的时候判断当前是第几个场景
			switch(self.sceneNumber){
				case 1 : 
 					//进入1号场景这一瞬间要做的事情
					if(mousex > self.button_playX && mousex < self.button_playX + 116 && mousey > self.button_playY && mousey < self.button_playY + 70){
						//说明用户点击到了按钮上
						self.enter(2);	//去2号场景
					}
					break;
				case 2 : 
					self.enter(3);	//去3号场景
					break;
				case 3 : 
					game.bird.fly();
					break;
				case 5 : 
					self.enter(1);
					break;
			}
		}
	}
})();