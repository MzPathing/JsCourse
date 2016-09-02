window.onload=function (){
	var oImg=document.getElementsByTagName("img");
	var nowIndex=2;
	var oPos=[];
	(function getPos(){//得到每张图片的初始位置
		for(var i=0;i<oImg.length;i++){
			oImg[i].index=i;
			oPos[i]={left:oImg[i].offsetLeft,top:oImg[i].offsetTop};
		}
		for(var i=0;i<oPos.length;i++){
			oImg[i].style.left=oPos[i].left+"px";
			oImg[i].style.top=oPos[i].top+"px";
			oImg[i].style.position="absolute";
			oImg[i].style.zIndex=1;
			oImg[i].onmousedown=drag;
		}
	})();
	function drag(e){//设置鼠标拖拽移动图片事件
		var oEvent=e||event;
		var _that=this;
		var disX=oEvent.clientX-this.offsetLeft;
		var disY=oEvent.clientY-this.offsetTop;
		_that.style.zIndex=nowIndex++;
		var minObj,minDis;
		clearInterval(_that.timer);
		document.onmousemove=function (e){
			var oEvent=e||window.event;
			minDis=9999;
			minObj=null;//距离重置，这两段代码应该放在移动时重置，防止 minDis被后续函数改变，后面距离必须小于最开始的值才能设置class
			_that.style.left=oEvent.clientX-disX+"px";
			_that.style.top=oEvent.clientY-disY+"px";
			for(var i=0;i<oImg.length;i++){
				oImg[i].className="";
				if(_that==oImg[i]) continue;
				else{
					if(checkImpact(_that,oImg[i])){
						var dis=getDis(_that,oImg[i]);
						if(dis<minDis){
							minDis=dis;
							minObj=oImg[i];
						}
					}
				}
			}
			if(minObj){//这一串代码，用于判断所有循环结束过后是否存在图片碰撞，如果存在，设置最近的图片class
				minObj.className="nearest";
			}
			if(oEvent.preventDefault){
				oEvent.preventDefault();
			}
			else{
				oEvent.returnValue=false;
			}
		}
		document.onmouseup=function (){
			if(minObj){
				minObj.className="";//清空样式
				move(_that,oPos[minObj.index]);
				move(minObj,oPos[_that.index]);
				var temp=null;
				temp=_that.index;
				_that.index=minObj.index;
				minObj.index=temp;
			}
			else{
				move(_that,oPos[_that.index]);
			}
			document.onmousemove=null;//解除事件，防止垃圾遗留
			document.onmouseup=null;
		}
		if(oEvent.preventDefault){
			oEvent.preventDefault();
		}
		else{
			oEvent.returnValue=false;
		}
	}
	function checkImpact(obj1,obj2){//检查两张图片是否产生了碰撞
		var t1=obj1.offseTop;
		var l1=obj1.offsetLeft;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var b1=obj1.offsetTop+obj1.offsetHeight;
		var t2=obj2.offsetTop;
		var l2=obj2.offsetLeft;
		var r2=obj2.offsetLeft+obj2.offsetWidth;
		var b2=obj2.offsetTop+obj2.offsetHeight;
		if(t1>b2||b1<t2||l1>r2||r1<l2){
			return false;
		}
		else return true;
	}
	function getDis(obj1,obj2){
		var disA=obj1.offsetLeft-obj2.offsetLeft;
		var disB=obj1.offsetTop-obj2.offsetTop;
		return Math.sqrt(Math.pow(disA,2)+Math.pow(disB,2));
	}
	function getStyle(obj,name){//不同浏览器取得样式方法，防止兼容问题
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else{
			return getComputedStyle(obj,false)[name];
		}
	}
	function move(obj,json){//物体运动
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			for(var attr in json){
				if(attr=="opacity"){
				var value=getStyle(obj,attr)*100;//100
				}
				else{
					var value=parseInt(getStyle(obj,attr));
				}
				var speed=(json[attr]-value)/10;//(100-30)/10=7
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(attr=="opacity"){
					obj.style.filter="alpha(opacity="+(speed+value)+")";
					obj.style.opacity=(value+speed)/100;
				}
				else{
					obj.style[attr]=speed+value+"px";
				}
			}
			
		},30)
	}
}