var oDiv1=document.getElementById("div1");
		var timer=null;
		function getStyle(obj,name){
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}
			else{
				return getComputedStyle(obj,false)[name];
			}
		}
		function move(obj,json){
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