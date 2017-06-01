(function(){
	var Pipe = window.Pipe = function(){
		this.imageDown = game.R["pipe_down"];
		this.imageUp = game.R["pipe_up"];

		//管子的位置，是屏幕的最右边
		this.x = game.canvas.width;

		//上面管子的高度
		this.height1 = 100 + parseInt(Math.random() * 221);
		//间隙
		this.interspace = 160;
		//下面管子的高度就可以计算出来了
		this.height2 = game.canvas.height * 0.78 - this.interspace - this.height1;
		//是否已经成功通过
		this.alreadyPass = false;
		//将自己放入数组
		game.pipeArr.push(this);
	}
	Pipe.prototype.update = function(){
		this.x -= 2;
		//碰撞检测，检查自己有没有撞到小鸟
		if(game.bird.R > this.x && game.bird.L < this.x + 52){
			if(game.bird.T < this.height1 || game.bird.B > this.height1 + this.interspace){
         		//死亡就进入场景4
         		game.sm.enter(4);
     		}
		}
		//加分
		if(game.bird.R > this.x + 52 && !this.alreadyPass){
			//顺利通过了
			game.score ++;	
			//标记为已经通过了
			this.alreadyPass = true;
		}

		//检测这个管子是不是已经出了视口，如果是，要从数组中删除这个管子
		if(this.x < -52){
			for (var i = 0; i < game.pipeArr.length; i++) {
				if(game.pipeArr[i] === this){
					game.pipeArr.splice(i,1);
				}
			}
		}
	}
	Pipe.prototype.render = function(){
		game.ctx.drawImage(this.imageDown,0,320-this.height1,52,this.height1,this.x,0,52,this.height1);
		game.ctx.drawImage(this.imageUp,0,0,52,this.height2,this.x,this.height1+this.interspace,52,this.height2);
		 
		//打印自己的数值
		// game.ctx.fillStyle = "black";
		// game.ctx.fillText(this.x , this.x , 100);
		// game.ctx.fillText(this.height1 , this.x + 30, this.height1);
		// game.ctx.fillText(this.height1 + this.interspace , this.x + 30, this.height1 + this.interspace);
	}
})();