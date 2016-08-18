window.onload=function (){
	if(!document.getElementsByClassName){
		document.getElementsByClassName=function(obj){
			var arrAll=document.getElementsByTagName("*");
			var arry=[];
			for(var i=0,len=arrAll.length;i<len;i++){
				if(arrAll[i].className==obj){
					arry.push(arrAll[i]);
				}
			}
			return arry;
		}
	}
    var oItem=document.getElementsByClassName("item");
    var oContent=document.getElementsByClassName("nav-content");
    var oClose=document.getElementsByClassName("nav-con-close");
    var oCloseBar=document.getElementById("closeBar");
    var jsonHidden={left:-120,opacity:0};
    var jsonShow={left:0,opacity:100};
    var hidden={marginLeft:-100};
    var show={marginLeft:0};
    var icongo={marginLeft:200};
    var timer=null;
    var ifshow=true;
    var now=2;
    var deg=0;
    var oSideBar=document.getElementById("sidebar");
    oCloseBar.onclick=function (){
        if(ifshow){
            for(var i=0,len=oClose.length;i<len;i++){
                move(oContent[i],jsonHidden);
            }
            move(oSideBar,hidden);
            move(oCloseBar,icongo);
            var timer=setInterval(function (){
                if(parseInt(oCloseBar.style.marginLeft)>=200){
                    clearInterval(timer);
                }
                rotate(oCloseBar);
            },100);
            ifshow=false;
        }
        else{
            move(oItem[0].parentNode.parentNode,show);
            move(oCloseBar,show);
            var timer=setInterval(function (){
                if(parseInt(oCloseBar.style.marginLeft)<=0){
                    clearInterval(timer);
                }
                rotate(oCloseBar);
            },100);
            ifshow=true;
        }  
    }
    for(var i=0,len=oItem.length;i<len;i++){
        oItem[i].index=i;
        oItem[i].onclick=function (){
            now++;
            move(oContent[this.index],jsonShow);
            oContent[this.index].style.zIndex=now;
        }
    }
    for(var i=0,len=oClose.length;i<len;i++){
        oClose[i].index=i;
        oClose[i].onclick=function (){
            for(var j=0,len=oClose.length;j<len;j++){
                move(oContent[j],jsonHidden);
            }
        }
    }
    function rotate(obj){
        deg=deg+45;
        obj.style.transform="rotate("+deg+"deg)";
    }
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
                if(speed==0){
                	clearInterval(obj.timer);
                }
                else{
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
	                if(attr=="opacity"){
	                    obj.style.filter="alpha(opacity="+(speed+value)+")";
	                    obj.style.opacity=(value+speed)/100;
	                }
	                else{
	                    obj.style[attr]=speed+value+"px";
	                }
                }
                
            }    
        },30)
    }
}
        