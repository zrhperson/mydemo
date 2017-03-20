$(function(){
    var flag=true;
    window.onresize=function() {
        var clientH = $(window).height();
        var clientW = $(window).width();
        $(".menu").css("height", clientH);
        if(clientW>765){
            $(".menu").css("display","none");
            flag=true;
            $(".line1").css({
                transform:"translate(0,0px) rotate(0deg)"
            })
            $(".line2").css({
                transform:"translate(0,0px) rotate(0deg)"
            })
        }
    }
    window.onresize();


    $(".small .con .btn").click(function(){
            if(flag){
                $(".line1").css({
                    transform:"translate(0,5px) rotate(45deg)"
                })
                $(".line2").css({
                    transform:"translate(0,-3px) rotate(-45deg)"
                })

                flag=false

            }else{
                $(".line1").css({
                    transform:"translate(0,0px) rotate(0deg)"
                })
                $(".line2").css({
                    transform:"translate(0,0px) rotate(0deg)"
                })

                flag=true
            }


            $(".menu").slideToggle(1000);
    })

// 轮播图

    var times=3000;
    var currentNum=0;
    var nextNum=0;

    var currentTime=0;

    var flag=true;
    var t1,t2;
    //自动轮播
    t1=setInterval(auto,times)
    function auto(){
        nextNum++;
        if(nextNum>$(".wheel-list").length-1){
            nextNum=0;

        }

       //当前这一张

        $(".wheel-list").eq(currentNum).animate({
            width:"80%",height:"80%"
        })

       //下一张的运动方式
       $(".wheel-list").eq(nextNum).animate({
           left:0
       },function(){
           $(".wheel-list").eq(currentNum).css({
               width:"100%",height:"100%",left:"100%"
           })
           if(nextNum==0){
               flag=false;
           }

           currentNum=nextNum;
           currentTime=0;

       }).css("zIndex",1);

    }

    //按钮的进度条

    t2=setInterval(progress,50);

    function progress(){
        currentTime+=50;
        var bili=currentTime/times;
        if(bili>1){
            bili=1;
        }
        $(".progress").eq(currentNum).css("width",bili*100+"%");


        if(!flag){
            $(".progress").css("width",0);
            flag=true;
        }

    }


    //点击按钮操作轮播图


    $(".btns .btn").click(function(){
        var index=$(this).index(".btns .btn");
        nextNum=index;
        stop();
    })

    function stop(){
        clearInterval(t1);
        clearInterval(t2);

        $(".btns .btn .progress").css("width",0).eq(nextNum).css("width","100%");

        if(currentNum<nextNum){
            //当前这一张

            $(".wheel-list").eq(currentNum).animate({
                width:"80%",height:"80%"
            })

            //下一张的运动方式
            $(".wheel-list").eq(nextNum).animate({
                left:0
            },function(){
                $(".wheel-list").eq(currentNum).css({
                    width:"100%",height:"100%",left:"100%"
                })
                if(nextNum==0){
                    flag=false;
                }

                currentNum=nextNum;
                currentTime=0;

            }).css("zIndex",1);
        }else{

           $(".wheel-list").eq(currentNum).animate({left:"100%"}).css("z-index",1);

            $(".wheel-list").eq(nextNum).css({
                left:0,top:0,width:"80%",height:"80%"
            }).animate({width:"100%",height:"100%"},function(){
                currentNum=nextNum;
            })


        }

    }


    $(".leftBtn").click(function(){
        nextNum--
        if(nextNum==-1){
            nextNum=$(".wheel-list").length-1;
        }
        stop();
    })

    $(".rightBtn").click(function(){
        nextNum++
        if(nextNum>$(".wheel-list").length-1){
            nextNum=0;
        }
        stop();
    })



})