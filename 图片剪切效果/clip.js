window.onload=function (){
	//取得页面中的元素
	var oImg2=document.getElementById("img2");
	var oZoom=document.getElementById("zoom");
	var oScale=document.getElementsByClassName("scale");
	zoom.addEventListener("mousedown",zoomClick,null);
	setPos(oZoom);
	for(var i=0;i<oScale.length;i++){//给每一个小图标添加点击事件
		oScale[i].index=i;
		oScale[i].addEventListener('mousedown',startChange,null);
	}
	function setPos(obj){//用js遍历设置8个点的定位
		var oZoomWidth=obj.offsetWidth;
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
		var disX=oEvent.clientX-this.offsetLeft;
		var disY=oEvent.clientY-this.offsetTop;
		var oEvent=e||event;
		document.addEventListener("mousemove",zoomMove,null);//移动事件加到document上面，防止移动过快逝去焦点问题
		document.addEventListener("mouseup",zoomClear,null);//添加鼠标松开，解除绑定事件
		oEvent.preventDefault();
		function zoomMove(e){
			var oEvent=e||event;
			zoom.style.left=oEvent.clientX-disX+"px";
			zoom.style.top=oEvent.clientY-disY+"px";
			if(zoom.offsetLeft<0){
				zoom.style.left=0;
			}
			else if(zoom.offsetLeft>oImg2.offsetWidth-zoom.offsetWidth){
				zoom.style.left=oImg2.offsetWidth-zoom.offsetWidth+"px";
			}
			if(zoom.offsetTop<0){
				zoom.style.top=0;
			}
			else if(zoom.offsetTop>oImg2.offsetHeight-zoom.offsetWidth){
				zoom.style.top=oImg2.offsetHeight-zoom.offsetWidth+"px";
			}
			//设置img2的剪切
			oImg2.style.clip="rect("+zoom.offsetTop+"px,"+(parseInt(zoom.offsetLeft)+parseInt(zoom.offsetWidth))+"px,"+(parseInt(zoom.offsetHeight)+parseInt(zoom.offsetTop))+"px,"+zoom.offsetLeft+"px)";
		}
		function zoomClear(){//移除事件函数，防止内存遗留
			document.removeEventListener("mousemove",zoomMove,null);
			document.removeEventListener("mouseup",zoomClear,null);
		}
	}
	function startChange(e){
		var oEvent=e||event;
		var beforeX=oEvent.clientX;
		var beforeY=oEvent.clientY;
		var beforeLeft=zoom.offsetLeft;
		oEvent.preventDefault();//阻止默认事件，防止选中其他图片
		for(var i=0,j=2;i<oScale.length;i+=3,j+=3){
			if(this.index==i){
				document.addEventListener('mousemove',changeLeftWidth,null);
				document.addEventListener('mouseup',clearLeftWidth,null);
			}
			else if(this.index==j){
				document.addEventListener('mousemove',changeRightWidth,null);
				document.addEventListener('mouseup',clearRightWidth,null);
			}
		}
		for(var i=0,j=3,k=6;i<oScale.length/3;i++,j++,k++){
			if(this.index==i){
				document.addEventListener('mousemove',changeTopHeight,null);
				document.addEventListener('mouseup',clearTopHeight,null);
			}
			else if(this.index==k){
				document.addEventListener('mousemove',changeBottomHeight,null);
				document.addEventListener('mouseup',clearBottomHeight,null);
			}
		}
		function changeLeftWidth(e){
			var oEvent=e||event;
			zoom.style.width=zoom.offsetWidth-2+(beforeX-oEvent.clientX)+"px";
			zoom.style.left=zoom.offsetLeft-(beforeX-oEvent.clientX)+"px";
			beforeX=oEvent.clientX;
			oImg2.style.clip="rect("+zoom.offsetTop+"px,"+(parseInt(zoom.offsetLeft)+parseInt(zoom.offsetWidth))+"px,"+(parseInt(zoom.offsetHeight)+parseInt(zoom.offsetTop))+"px,"+zoom.offsetLeft+"px)";
		}
		function clearLeftWidth(){//移除事件
			document.removeEventListener('mousemove',changeLeftWidth,null);
			document.removeEventListener('mouseup',clearLeftWidth,null);
		}
		function changeRightWidth(e){
			var oEvent=e||event;
			zoom.style.width=zoom.offsetWidth-2-(beforeX-oEvent.clientX)+"px";
			beforeX=oEvent.clientX;
			oImg2.style.clip="rect("+zoom.offsetTop+"px,"+(parseInt(zoom.offsetLeft)+parseInt(zoom.offsetWidth))+"px,"+(parseInt(zoom.offsetHeight)+parseInt(zoom.offsetTop))+"px,"+zoom.offsetLeft+"px)";
		}
		function clearRightWidth(){//移除事件
			document.removeEventListener('mousemove',changeRightWidth,null);
			document.removeEventListener('mouseup',changeRightWidth,null);
		}
		function changeTopHeight(e){
			var oEvent=e||event;
			zoom.style.height=zoom.offsetHeight-2+(beforeY-oEvent.clientY)+"px";
			zoom.style.top=zoom.offsetTop-(beforeY-oEvent.clientY)+"px";
			beforeY=oEvent.clientY;
			oImg2.style.clip="rect("+zoom.offsetTop+"px,"+(parseInt(zoom.offsetLeft)+parseInt(zoom.offsetWidth))+"px,"+(parseInt(zoom.offsetHeight)+parseInt(zoom.offsetTop))+"px,"+zoom.offsetLeft+"px)";
		}
		function clearTopHeight(){//移除事件
			document.removeEventListener('mousemove',changeTopHeight,null);
			document.removeEventListener('mouseup',clearTopHeight,null);
		}
		function changeBottomHeight(e){
			var oEvent=e||event;
			zoom.style.height=zoom.offsetHeight-2-(beforeY-oEvent.clientY)+"px";
			beforeY=oEvent.clientY;
			oImg2.style.clip="rect("+zoom.offsetTop+"px,"+(parseInt(zoom.offsetLeft)+parseInt(zoom.offsetWidth))+"px,"+(parseInt(zoom.offsetHeight)+parseInt(zoom.offsetTop))+"px,"+zoom.offsetLeft+"px)";
		}
		function clearBottomHeight(){//移除事件
			document.removeEventListener('mousemove',changeBottomHeight,null);
			document.removeEventListener('mouseup',changeBottomHeight,null);
		}

		oEvent.stopPropagation();//重要：阻止事件冒泡，防止事件触发zoom的点击事件

	}

}

