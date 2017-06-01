(function(){
	var Bird = window.Bird = function(){
		//随机一个小鸟的颜色0、1、2
		this.color = parseInt(Math.random() * 3);
		//决定用图，小鸟有3个翅膀状态
		this.imageArr = [
			game.R["bird" + this.color + "_0"] ,
			game.R["bird" + this.color + "_1"] ,
			game.R["bird" + this.color + "_2"] 
		];
		//翅膀状态
		this.wingStep = 0;
		//小鸟的位置（注意，这个位置是真实物理位置，并且是小鸟中心点的位置)
		//图片宽度是48,24是半个图片宽度
		this.x = game.canvas.width * (1 - 0.618) - 24;
		this.y = 100;
		//鸟自己的帧，用于下落、上升算法
		this.fno = 0;
		//角度
		this.d = 0;
		//是否拥有能量
		this.hasEnergy = false;
	}
	Bird.prototype.update = function(){
		//翅膀状态，每固定帧数扑打一次
		this.wing();

		//算法要掉落
		if(!this.hasEnergy){
			this.y += parseInt(this.fno * 0.53);
		}else{
			//有能量
			this.y -= parseInt((20 - this.fno) * 0.51);
			//20帧之后，没有能量
			if(this.fno > 20){
				this.hasEnergy = false;
				this.fno = 0;
			}
		}
		this.d += 0.04;
		this.fno++;

		//验收，天护板
		if(this.y < 0){
			this.y = 0;
		}

		//计算自己的四个碰撞检测值
		this.T = this.y - 12; //12是图片的上面空隙
		this.R = this.x + 17; 
		this.B = this.y + 12;
		this.L = this.x - 17;

		//验证是否落地
		if(this.B > game.canvas.height * 0.78){
			//死亡就去场景4
			game.sm.enter(4);
		}
	}
	Bird.prototype.render = function(){
		game.ctx.save();
		//将坐标系拉到小鸟的中心点
		game.ctx.translate(this.x , this.y);
		//旋转
		game.ctx.rotate(this.d);
		//绘制
		game.ctx.drawImage(this.imageArr[this.wingStep],-24,-24);
		//打印数值
		game.ctx.restore();
		//测试
		// game.ctx.fillStyle = "black";
		// game.ctx.fillText(this.T,this.x,this.y - 20);
		// game.ctx.fillText(this.R,this.x + 20,this.y);
		// game.ctx.fillText(this.B,this.x,this.y + 20);
		// game.ctx.fillText(this.L,this.x - 20,this.y);
	}
	//飞
	Bird.prototype.fly = function(){
		this.hasEnergy = true;
		this.d = -0.6;
		this.fno = 0;
	}
	//扑打翅膀
	Bird.prototype.wing = function(){
		game.fno % 3 == 0 && this.wingStep++;
		if(this.wingStep > 2){
			this.wingStep = 0;
		}
	}
})();