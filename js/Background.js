(function(){
	//背景类
	var Background = window.Background = function(){
		//自己的背景
		this.image = game.R.bg_day;
		//自己的x、y
		this.x = 0;
		this.y = 0.75 * game.canvas.height - 396;
		//自己图片的尺寸，定死的，png就是这个尺寸。
		this.w = 288;
		this.h = 512;
		//速度
		this.speed = 1;
	}
	//更新
	Background.prototype.update = function(){
		this.x-= this.speed;
		//跑马灯原理，克隆图片，等克隆的图片左边到达边线，瞬间拉回
		if(this.x < -this.w){
			this.x = 0;
		}
	}
	//渲染
	Background.prototype.render = function(){
		//渲染图片，因为图片不够宽，所以我们采用无缝连续滚动的套路
		//克隆图片，等克隆的图片左边到达边线，瞬间拉回。
		game.ctx.drawImage(this.image, this.x, this.y);
		game.ctx.drawImage(this.image, this.x + this.w, this.y);
		game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
		//渲染天空猫腻矩形
		game.ctx.fillStyle = "#4EC0CA"
		game.ctx.fillRect(0,0,game.canvas.width,this.y + 1);
	}

})();