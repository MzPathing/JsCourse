$(document).ready(function(){
	$(".tab-item").each(function (n){
		$(this).click(function(){
			$(".scroll-cont").each(function(){
				$(".tab-item").each(function(){
					$(this).removeClass("select");//每个元素点击的时候移除所有元素的select属性
				})
				$(this).css("display","none");//设置每个块级隐藏
			})
			$(".scroll-cont").eq($(this).index()).css("display","block");//设置对应块级显示
			$(".tab-item").eq($(this).index()).addClass("select");//给当前点击的元素添加select属性
		})
	});
	$(".scroll-block").mousedown(function(e){
		var disY=e.clientY-$(this).offset().top;
		$(document).on("mousemove",function(e){
			var dis=e.clientY-disY;
   			$(".scroll-block").offset({top:dis});
		})
	})
})