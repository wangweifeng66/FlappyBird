(function(){
	//大地类
	var Land = window.Land = function(){
		//自己的背景
		this.image = game.R.land;
		//图片的位置
		this.x = 0;
		this.y = game.canvas.height * 0.78;
		//png图片的宽度
		this.w = 336;
	}
	//更新
	Land.prototype.update = function(){
		 this.x -= 2;
		 if(this.x < -this.w){
		 	this.x = 0;
		 }
	}
	//渲染
	Land.prototype.render = function(){
		game.ctx.drawImage(this.image, this.x,this.y);
		game.ctx.drawImage(this.image, this.x + this.w,this.y);
		game.ctx.drawImage(this.image, this.x + this.w * 2,this.y);
		//猫腻的矩形
		game.ctx.fillStyle = "#DED895";
		game.ctx.fillRect(0,this.y + 112,game.canvas.width,game.canvas.height * 0.25 - 112);
	}
})();