window.onload=function (){
	//取得页面中的元素
	if(!document.getElementsByClassName){//如果document没有getelementbyclassname的方法，新建一个方法
		document.getElementsByClassName=function (obj){
			var oAllElement=document.getElementsByTagName("*");
			var arr=[];
			for(var i=0,len=oAllElement.length;i<len;i++){
				if(oAllElement[i].className==obj){//修复=的bug
					arr.push(oAllElement[i]);
				}
			}
			return arr;
		}
	}
	var EventUtil={
		addHandler:function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}
			else{
				element.attachEvent("on"+type,handler);
			}
		},
		removeHandler:function(element,type,handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false);
			}
			else{
				element.detachEvent("on"+type,handler);
			}
		}
	}
	var oImg2=document.getElementById("img2");
	var oZoom=document.getElementById("zoom");
	var oScale=document.getElementsByClassName("scale");
	EventUtil.addHandler(oZoom,"mousedown",zoomClick);
	setPos(oZoom);
	for(var i=0;i<oScale.length;i++){//给每一个小图标添加点击事件
		oScale[i].index=i;
		EventUtil.addHandler(oScale[i],"mousedown",startChange);
	}
	function setPos(obj){//用js遍历设置8个点的定位
		for(var i=0,j=1,k=2,len=oScale.length;i<len;i+=3,j+=3,k+=3){
			oScale[i].style.left=0;
			oScale[j].style.left="50%";
			oScale[k].style.left="100%";
		}
		for(var i=0,len=oScale.length;i<len;i++){
			if(i<3){
				oScale[i].style.top=0;
			}
			else if(i<6){
				oScale[i].style.top="50%";
			}
			else{
				oScale[i].style.top="100%";
			}
		}
		oScale[4].style.display="none";//去掉中间的一个点
	}
	function zoomClick(e){//点击浮动框事件
		var oEvent=e||event;
		var disX=oEvent.clientX-oZoom.offsetLeft;
		var disY=oEvent.clientY-oZoom.offsetTop;
		var oEvent=e||event;
		EventUtil.addHandler(document,"mousemove",zoomMove);//移动事件加到document上面，防止移动过快逝去焦点问题
		EventUtil.addHandler(document,"mouseup",zoomClear);//添加鼠标松开，解除绑定事件
		function zoomMove(e){
			var oEvent=e||window.event;
			oZoom.style.left=oEvent.clientX-disX+"px";
			oZoom.style.top=oEvent.clientY-disY+"px";
			if(oZoom.offsetLeft<0){
				oZoom.style.left=0;
			}
			else if(oZoom.offsetLeft>oImg2.offsetWidth-oZoom.offsetWidth){
				oZoom.style.left=oImg2.offsetWidth-oZoom.offsetWidth+"px";
			}
			if(oZoom.offsetTop<0){
				oZoom.style.top=0;
			}
			else if(oZoom.offsetTop>oImg2.offsetHeight-oZoom.offsetHeight){//修复图片变大过后不能到底部的bug
				oZoom.style.top=oImg2.offsetHeight-oZoom.offsetHeight+"px";
			}
			//设置img2的剪切
			oImg2.style.clip="rect("+oZoom.offsetTop+"px,"+(parseInt(oZoom.offsetLeft)+parseInt(zoom.offsetWidth))+"px,"+(parseInt(zoom.offsetHeight)+parseInt(zoom.offsetTop))+"px,"+zoom.offsetLeft+"px)";
		}
		function zoomClear(){//移除事件函数，防止内存遗留
			EventUtil.removeHandler(document,"mousemove",zoomMove);
			EventUtil.removeHandler(document,"mouseup",zoomClear);
		}
	}
	function startChange(e){
		var oEvent=e||event;
		var beforeX=oEvent.clientX;
		var beforeY=oEvent.clientY;
		var beforeLeft=zoom.offsetLeft;
		if(oEvent.preventDefault){
			oEvent.preventDefault();
		}else{
			oEvent.returnValue=false;
		}
		// oEvent.preventDefault();//阻止默认事件，防止选中其他图片
		for(var i=0,j=2;i<oScale.length;i+=3,j+=3){
			if(this.index==i){
				EventUtil.addHandler(document,"mousemove",changeLeftWidth);
				EventUtil.addHandler(document,'mouseup',clearLeftWidth);
			}
			else if(this.index==j){
				EventUtil.addHandler(document,"mousemove",changeRightWidth);
				EventUtil.addHandler(document,'mouseup',clearRightWidth);
			}
		}
		for(var i=0,j=3,k=6;i<oScale.length/3;i++,j++,k++){
			if(this.index==i){
				EventUtil.addHandler(document,"mousemove",changeTopHeight);
				EventUtil.addHandler(document,'mouseup',clearTopHeight);
			}
			else if(this.index==k){
				EventUtil.addHandler(document,"mousemove",changeBottomHeight);
				EventUtil.addHandler(document,'mouseup',clearBottomHeight);
			}
		}
		function changeLeftWidth(e){
			var oEvent=e||window.event;
			oZoom.style.width=oZoom.offsetWidth-2+(beforeX-oEvent.clientX)+"px";
			oZoom.style.left=oZoom.offsetLeft-(beforeX-oEvent.clientX)+"px";
			beforeX=oEvent.clientX;
			oImg2.style.clip="rect("+oZoom.offsetTop+"px,"+(parseInt(oZoom.offsetLeft)+parseInt(oZoom.offsetWidth))+"px,"+(parseInt(oZoom.offsetHeight)+parseInt(oZoom.offsetTop))+"px,"+oZoom.offsetLeft+"px)";
		}
		function clearLeftWidth(){//移除事件
			EventUtil.removeHandler(document,"mousemove",changeLeftWidth);
			EventUtil.removeHandler(document,"mouseup",clearLeftWidth);
		}
		function changeRightWidth(e){
			var oEvent=e||window.event;
			oZoom.style.width=oZoom.offsetWidth-2-(beforeX-oEvent.clientX)+"px";
			beforeX=oEvent.clientX;
			oImg2.style.clip="rect("+oZoom.offsetTop+"px,"+(parseInt(oZoom.offsetLeft)+parseInt(oZoom.offsetWidth))+"px,"+(parseInt(oZoom.offsetHeight)+parseInt(oZoom.offsetTop))+"px,"+oZoom.offsetLeft+"px)";
		}
		function clearRightWidth(){//移除事件
			EventUtil.removeHandler(document,"mousemove",changeRightWidth);
			EventUtil.removeHandler(document,"mouseup",changeRightWidth);
		}
		function changeTopHeight(e){
			var oEvent=e||window.event;
			zoom.style.height=zoom.offsetHeight-2+(beforeY-oEvent.clientY)+"px";
			zoom.style.top=zoom.offsetTop-(beforeY-oEvent.clientY)+"px";
			beforeY=oEvent.clientY;
			oImg2.style.clip="rect("+oZoom.offsetTop+"px,"+(parseInt(oZoom.offsetLeft)+parseInt(oZoom.offsetWidth))+"px,"+(parseInt(oZoom.offsetHeight)+parseInt(oZoom.offsetTop))+"px,"+oZoom.offsetLeft+"px)";
		}
		function clearTopHeight(){//移除事件
			EventUtil.removeHandler(document,"mousemove",changeTopHeight);
			EventUtil.removeHandler(document,"mouseup",clearTopHeight);
		}
		function changeBottomHeight(e){
			var oEvent=e||window.event;
			zoom.style.height=zoom.offsetHeight-2-(beforeY-oEvent.clientY)+"px";
			beforeY=oEvent.clientY;
			oImg2.style.clip="rect("+oZoom.offsetTop+"px,"+(parseInt(oZoom.offsetLeft)+parseInt(oZoom.offsetWidth))+"px,"+(parseInt(oZoom.offsetHeight)+parseInt(oZoom.offsetTop))+"px,"+oZoom.offsetLeft+"px)";
		}
		function clearBottomHeight(){//移除事件
			EventUtil.removeHandler(document,"mousemove",changeBottomHeight);
			EventUtil.removeHandler(document,"mouseup",changeBottomHeight);
		}
		if(oEvent.stopPropagation){
			oEvent.stopPropagation();//重要：阻止事件冒泡，防止事件触发oZoom的点击事件
		}
		else{
			oEvent.cancelBubble=true;
		}

	}
}

