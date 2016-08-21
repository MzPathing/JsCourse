window.onload=function (){
	var oImg2=document.getElementById("img2");
	var oZoom=document.getElementById("zoom");
	var oScale=document.getElementsByClassName("scale");
	zoom.addEventListener("mousedown",zoomClick,null);
	setPos(oZoom);
	
	for(var i=0;i<oScale.length;i++){
		oScale[i].index=i;
		oScale[i].addEventListener('mousedown',startChange,null);
	}
	function setPos(obj){
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
		oScale[4].style.display="none";
	}
	function zoomClick(e){
		var oEvent=e||event;
		var disX=oEvent.clientX-this.offsetLeft;
		var disY=oEvent.clientY-this.offsetTop;
		var oEvent=e||event;
		this.addEventListener("mousemove",zoomMove,null);
		this.addEventListener("mouseup",zoomClear,null);//添加鼠标松开，解除绑定事件
		this.addEventListener("mouseout",zoomClear,null);//添加移除，解除绑定事件，防止移动过快的bug
		oEvent.preventDefault();
		function zoomMove(e){
			var oEvent=e||event;
			this.style.left=oEvent.clientX-disX+"px";
			this.style.top=oEvent.clientY-disY+"px";
			if(this.offsetLeft<0){
				this.style.left=0;
			}
			else if(this.offsetLeft>oImg2.offsetWidth-this.offsetWidth){
				this.style.left=oImg2.offsetWidth-this.offsetWidth+"px";
			}
			if(this.offsetTop<0){
				this.style.top=0;
			}
			else if(this.offsetTop>oImg2.offsetHeight-this.offsetWidth){
				this.style.top=oImg2.offsetHeight-this.offsetWidth+"px";
			}
			oImg2.style.clip="rect("+this.offsetTop+"px,"+(parseInt(this.offsetLeft)+parseInt(this.offsetWidth))+"px,"+(parseInt(this.offsetHeight)+parseInt(this.offsetTop))+"px,"+this.offsetLeft+"px)";
		}
		function zoomClear(){//移除事件函数
			this.removeEventListener("mousemove",zoomMove,null);
			this.removeEventListener("mouseup",zoomClear,null);
			this.removeEventListener("mouseout",zoomClear,null);
		}
	}
	function startChange(e){
		var oEvent=e||event;
		var disX=oEvent.clientX-oImg2.offsetLeft;
		var disY=oEvent.clientY-oImg2.offsetTop;
		if(this.index%2){
			
		}else{

		}
		// this.addEventListener("mousemove",,null);


	}
	function changeWidth(e){
	}
	function changeHeight(e){
		
	}
}

