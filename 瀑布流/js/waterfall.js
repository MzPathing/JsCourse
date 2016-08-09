window.onload=function (){
    if(!document.getElementsByClassName){
        document.getElementsByClassName=function (cla){
            var oClass=document.getElementsByTagName("*");
            var arrClass=[];
            for(var i=0;i<oClass.length;i++){
                if(oClass[i].className==cla){
                    arrClass.push(oClass[i]);
                }
            }
            return arrClass;
        }
    }
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};

    waterfall();//排列照片位置
    window.onscroll=function (){
        getPic();//获取dataInt传过来的照片
    }
     var oClientHeight=document.body.clientHeight||document.documentElement.clientHeight;
    console.log(oClientHeight);
}
function waterfall(){
    oMain=document.getElementById("main");
    oPin=document.getElementsByClassName("pin");
    oClientWidth=document.body.clientWidth||document.documentElement.clientWidth;
    oPinWidth=oPin[0].offsetWidth;
    oCols=Math.floor(oClientWidth/oPinWidth);
    arr=[];
    oWidth=parseInt(oCols*oPinWidth)+"px";//保存main盒子的宽度
    oMain.style.cssText="margin:0 auto;width:"+oWidth;//设置main盒子居中和宽度
    for(var i=0;i<oPin.length;i++){
        if(i<oCols){//把第一排的高度添加到数组里面
            arr.push(oPin[i].offsetHeight);
        }
        else{
            var min=Math.min.apply(this,arr);//取最低的高度
            var index=arr.indexOf(min);
            oPin[i].style.position="absolute";//设置下一张图片的位置
            oPin[i].style.left=oPin[index].offsetLeft+"px";
            oPin[i].style.top=arr[index]+"px";
            arr[index]+=oPin[i].offsetHeight;//重置数组
        }
    }
}
function getPic(){
    var oLastTop=oPin[oPin.length-1].offsetTop;//取得最后一张图片的top
    var oLastHeight=oPin[oPin.length-1].offsetHeight;//取得最后一张图片的高度
    var oScrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var oClientHeight=document.body.clientHeight||document.documentElement.clientHeight;
    if(oLastHeight/2+oLastTop<oClientHeight+oScrollTop){
        console.log(oLastHeight/2);
        console.log(oLastTop);
        console.log(oClientHeight);
        console.log(oScrollTop);
    }
}