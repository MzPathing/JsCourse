window.onload=function (){
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var aRet=[];
            var aTag=document.getElementsByTagName("*");
            for(var i=0;i<aTag.length;i++){
                if(aTag[i].className==cls
                    ||aTag[i].className.indexOf(" "+cls)>-1
                    ||aTag[i].className.indexOf(" "+cls+" ")>-1
                    ||aTag[i].className.indexOf(cls+" ")>-1){
                    aRet.push(aTag[i]);
                }
            }
            return aRet;//return应该在for循环完过后才返回，放在for循环之内会导致只返回一个元素的错误
        }
    }
    var oCheckAll=document.getElementsByClassName("check-all");
    var oCheckOne=document.getElementsByClassName("check-one");
    var oPrice=document.getElementsByClassName("price");
    var oCounts=document.getElementsByClassName("count-input");
    var oSubtotal=document.getElementsByClassName("subtotal");
    var oSelectedTotal=document.getElementById("selectedTotal");
    var oPriceTotal=document.getElementById("priceTotal");
    var oSelectedViewList=document.getElementById("selectedViewList");
    var oSelectedview=document.getElementsByClassName("selected-view");
    var oUp=document.getElementsByClassName("up");
    var oDown=document.getElementsByClassName("down");
    var oDeleteList=oSelectedViewList.getElementsByTagName("span");
    var oRows=document.getElementById("cartTable").tBodies[0].rows;
    var oAdd=document.getElementsByClassName("add");
    var oReduce=document.getElementsByClassName("reduce");
    var oAll=function (){//这个返回值本身没有意义，作为判断是否全选
        return false;
    }
    for(var i=0;i<oCheckAll.length;i++){//全选按钮点击全选
        oCheckAll[i].onclick=function (){
            if(this.checked){
                for(var j=0;j<oCheckAll.length;j++){
                    oCheckAll[j].checked=true;
                }
                for(var j=0;j<oCheckOne.length;j++){
                    oCheckOne[j].checked=true;
                }
            }
            else{
                for(var j=0;j<oCheckAll.length;j++){
                    oCheckAll[j].checked=false;
                }
                for(var j=0;j<oCheckOne.length;j++){
                    oCheckOne[j].checked=false;
                }
            }
            sum();
            addDelete();
        }
    }
//判断单选框是不是全部选中，如果是，选择全选框，否则取消全选框
    for(var i=0;i<oCheckOne.length;i++){
        oCheckOne[i].onclick=function (){
            oAll=function (){
                for(var j=0;j<oCheckOne.length;j++){
                    if(!oCheckOne[j].checked){
                        return false;
                    }
                }
                return true;
            }
            for(var j=0;j<oCheckAll.length;j++){
                oCheckAll[j].checked=oAll();
            }
            sum();
            addDelete();
        }
    }

//计算总价和总数量
    var sum=function(){
        for(var i=0;i<oPrice.length;i++){
            var allPirce=parseFloat(oCounts[i].value*oPrice[i].innerHTML);
            oSubtotal[i].innerHTML=allPirce.toFixed(2);
        }
        var allCount=0;
        for(var i=0;i<oPrice.length;i++){//计算所有选择中的文本框，计算他们数量和
            if(oCheckOne[i].checked){
                allCount+=parseInt(oCounts[i].value);
            }
            oSelectedTotal.innerHTML=allCount;
        }
        var allPrice=0;
        for(var i=0;i<oPrice.length;i++){//计算所有选中的价格
            if(oCheckOne[i].checked){
                allPrice+=parseFloat(oSubtotal[i].innerHTML);
            }
            oPriceTotal.innerHTML=allPrice.toFixed(2);
        }
        oSelectedViewList.innerHTML="";//设置div的初始内容为空，防止重复添加
        for(var i=0;i<oPrice.length;i++){//添加列表子元素
            if(oCheckOne[i].checked){
            var oDiv=document.createElement("div");
            oDiv.innerHTML="<img src='images/"+(i+1)+".jpg'><span index="+(i+1)+">取消选择</span>"
            oSelectedViewList.appendChild(oDiv);
            }
        }
    }
    oUp[0].onclick=function(){//添加按钮变换效果
        oSelectedViewList.style.display="block";
        oSelectedview[0].style.display="block";
        this.style.display="none";
        oDown[0].style.display="inline-block";
    }
    oDown[0].onclick=function(){
        oSelectedViewList.style.display="none";
        oSelectedview[0].style.display="none";
        this.style.display="none";
        oUp[0].style.display="inline-block";
    }
    function addDelete(){//添加移除图片效果
        for(var j=0;j<oDeleteList.length;j++){
            oDeleteList[j].onclick=function (){
                var index=this.getAttribute("index");
                oCheckOne[index-1].checked=false;
                oSelectedViewList.removeChild(this.parentNode);
                sum();
                for(var j=0;j<oCheckAll.length;j++){
                    oCheckAll[j].checked=oAll();
                }
                addDelete();
            }
        }
    }
    function deleteproduction(){//添加删除事件
        for(var i=0;i<oRows.length;i++){
            var oDelete=document.getElementsByClassName("delete");
                oDelete[0].onclick=function(){
                var ret=confirm("是否删除？");
                if(ret){
                    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                    sum();
                }
            }
        }
    }

    function add(){//添加添加数量事件
        for(var i=0;i<oAdd.length;i++){
            oAdd[i].index=i;
            oAdd[i].onclick=function(){
                oReduce[this.index].innerHTML="-";
                oCounts[this.index].value++;
                sum();
            }
        }
    }
    function reduce(){//添加减少商品数量事件，并改变按钮样式
        for(var i=0;i<oReduce.length;i++){
            oReduce[i].index=i;
            oReduce[i].onclick=function(){
                this.innerHTML="";
                if(oCounts[this.index].value>2){
                    oCounts[this.index].value--;
                    this.innerHTML="-";
                    sum();
                }
                else if(oCounts[this.index].value=2){
                    oCounts[this.index].value--;
                    this.innerHTML="";
                }
                else{
                    this.innerHTML="";
                    return;
                }
            }
        }
    }
    deleteproduction();
    sum();
    add();
    reduce();
}