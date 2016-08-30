$(document).ready(function(){
	console.log($(".scroll-block").offset().top);
	$(".tab-item").each(function (n){
		$(this).click(function(){
			$(".scroll-cont").each(function(){
				$(".tab-item").each(function(){
					$(this).removeClass("select");//每个元素点击的时候移除所有元素的select属性
				})
				$(this).removeClass("now");
				$(this).css("display","none");//设置每个块级隐藏
			})
			$(".scroll-cont").eq($(this).index()).css("display","block");//设置对应块级显示
			$(".scroll-cont").eq($(this).index()).addClass("now");
			$(".tab-item").eq($(this).index()).addClass("select");//给当前点击的元素添加select属性
		})
	});
	$(".scroll-block").mousedown(function(e){
		e.preventDefault();
		var disY=e.clientY-$(this).position().top;
		$(document).on("mousemove",function (e){
			var dis=e.clientY-disY;
			if(dis<=0){
   				$(".scroll-block").css("top",0);
			}
			else if(dis>=$(".scroll-area").height()-$(".scroll-block").height()){
   				$(".scroll-block").css("top",$(".scroll-area").height()-$(".scroll-block").height());
			}
			else{
   				$(".scroll-block").css("top",dis);
			}
			//设置根据滑块调节页面滚动的距离
			// console.log($(".now").height()-$(".scroll-wrap").height());
			// console.log($(".now").height());
			var scrollY=$(".scroll-block").position().top/($(".scroll-area").height()-$(".scroll-block").height())*($(".now").height()-$(".scroll-wrap").height());
			console.log(scrollY);
			$(".scroll-content").scrollTop(scrollY);
		})
		$(document).on("mouseup",function (){//移除绑定事件
			$(document).off("mousemove");
			$(document).off("mouseup");

		})
	})
})