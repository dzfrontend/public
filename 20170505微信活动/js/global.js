$.extend({
    gameForProblem:function(config){
        var correctList=[
            {res:'A'},
            {res:'B'},
            {res:'A'},
            {res:'A'},
            {res:'A'},
            {res:'A'},
            {res:'B'},
            {res:'A'}
        ];
        var resultList=[
            {resultImg:'result/1-2.jpg',counselImg:'counsel/1-1.png',iconImg:'counsel/2-1.png'},
            {resultImg:'result/2-2.jpg',counselImg:'counsel/1-2.png',iconImg:'counsel/2-2.png'},
            {resultImg:'result/3-2.jpg',counselImg:'counsel/1-3.png',iconImg:'counsel/2-3.png'},
            {resultImg:'result/4-2.jpg',counselImg:'counsel/1-4.png',iconImg:'counsel/2-4.png'},
            {resultImg:'result/5-2.jpg',counselImg:'counsel/1-5.png',iconImg:'counsel/2-5.png'}
        ];
        var ohtml='';
        //随机出题
        $.each(itemNum,function(a,b){
            ohtml+='<li class="swiper-answer swiper-slide disabled-next disabled-prev" data-id="'+(b-1)+'" id="slide_'+(a+4)+'">';
            ohtml+='<div class="answerAsk">';
            ohtml+='<img src="'+setHost+'items/'+b+'-1.jpg" class="ani askqustion" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.5s">';
            ohtml+='<div class="askOption ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="1s" swiper-animate-delay="0.9s">';
            ohtml+='<img src="'+setHost+'items/'+b+'-2.png" width="86%" data-qid="A"><span></span><img src="'+setHost+'items/'+b+'-3.png" data-qid="B"></div>';
            ohtml+='</div>';

            ohtml+='<div class="answerFt ani" swiper-animate-effect="bounceInUp" swiper-animate-duration="1s" swiper-animate-delay="0">';
            ohtml+='<img src="'+setHost+'items/'+b+'-4.png" class="footerPic">';
            ohtml+='</div>';
            ohtml+='</li>';
        })
        $('#slide_3').after(ohtml);
        // $('#slide_4').after(ohtml);
        
        $('.swiper-answer').each(function(){
            var dataId = $(this).data('id');
            if(dataId === 0){
                $(this).find('.answerFt').append('<img src="./img/itemsAdd/1-1.png" alt="" class="mytada" style="position: absolute;right: 2rem;bottom: 10.75rem;width: 3.325rem;height: 4.9rem;z-index: 2"><img src="./img/itemsAdd/1-2.png" alt="" style="position: absolute;width: 1.35rem;height: 1.9rem;right: 1.825rem;bottom: 6.6rem;z-index: 1;" class="rotateLeft"><img src="./img/itemsAdd/1-3.png" alt="" style="position: absolute;width: 1.55rem;height: 1.15rem;right: 3.5rem;bottom: 7.3rem;z-index: 2" class="rotateRight">');
            }
            if(dataId === 1){
                $(this).find('.answerFt').append('<img src="./img/itemsAdd/2-1.png" alt="" class="mytada" style="position: absolute;left: 3.1rem;bottom: 7.45rem;width: 4.6rem;height: 6.125rem;z-index: 2"><img src="./img/itemsAdd/2-2.png" alt="" style="position: absolute;width: 100%;left: 0;bottom: 1.5rem;z-index: 1;" class="blowup"><img src="./img/itemsAdd/2-3.png" alt="" style="position: absolute;width: 3rem;height: 3rem;right: 3.1rem;bottom: 9.85rem;z-index: 2" class="rotateRight">');
            }
            if(dataId === 2){
                $(this).find('.answerFt').append('<img src="./img/itemsAdd/3-1.png" alt="" class="mytada" style="position: absolute;right: 2.1rem;bottom: 9rem;width: 3.475rem;height: 4.7rem;z-index: 2"><img src="./img/itemsAdd/3-2.png" alt="" style="position: absolute;width: 1.15rem;height:1.15rem;right: 4rem;bottom: 6.8rem;z-index: 2;" class="redshake"><img src="./img/itemsAdd/3-3.png" alt="" style="position: absolute;width: 1.6rem;height: 1.77rem;left: 1.55rem;bottom: 9rem;z-index: 2" class="rotateRight"><img src="./img/itemsAdd/2-2.png" alt="" style="position: absolute;width: 100%;left: 0;bottom: 1.5rem;z-index: 1;" class="blowup">');
            }
            if(dataId === 3){
                $(this).find('.answerFt').append('<img src="./img/itemsAdd/3-1.png" alt="" class="mytada" style="position: absolute;right: 2.1rem;bottom: 9.9rem;width: 3.475rem;height: 4.7rem;z-index: 2">');
            }
            if(dataId === 4){
                $(this).find('.answerFt').append('<img src="./img/itemsAdd/3-1.png" alt="" class="mytada" style="position: absolute;right: 2rem;bottom: 9.6rem;width: 3.475rem;height: 4.7rem;z-index: 2"><img src="./img/itemsAdd/3-2.png" alt="" style="position: absolute;width: 1.15rem;height:1.15rem;right: 4rem;bottom: 7rem;z-index: 2;" class="redshake"><img src="./img/itemsAdd/2-2.png" alt="" style="position: absolute;width: 100%;left: 0;bottom: 1.5rem;z-index: 1;" class="blowup"><img src="./img/itemsAdd/2-3.png" alt="" style="position: absolute;width: 3rem;height: 3rem;left: 3.1rem;bottom: 9.85rem;z-index: 2" class="rotateRight">');
            }
            if(dataId === 5){
                $(this).find('.answerFt').append('<img src="./img/itemsAdd/6-1.png" alt="" class="mytada" style="position: absolute;left: 2rem;bottom: 9.7rem;width: 3.8rem;height: 4.82rem;z-index: 2"><img src="./img/itemsAdd/6-2.png" alt="" style="position: absolute;width:6.525rem;height:2.25rem;right: 2.5rem;bottom: 9.15rem;z-index: 1;" class="rotateRight">');
            }
            if(dataId === 6){
                $(this).find('.answerFt').append('<img src="./img/itemsAdd/2-1.png" alt="" class="mytada" style="position: absolute;left: 2.4rem;bottom: 9.3rem;width: 3.8rem;height: 4.82rem;z-index: 2"><img src="./img/itemsAdd/2-2.png" alt="" style="position: absolute;width:92%;left: 0;bottom: 1.5rem;z-index: 1;" class="blowup"><img src="./img/itemsAdd/7-1.png" alt="" style="position: absolute;width:100%;left: 0;bottom: 6.3rem;z-index: 1;" class="myshake">');
            }
        })

        var swiperTime;
        var bannerSlide = new Swiper('.banner', {
            direction:'vertical',
            noSwiping : true,
            //noSwipingClass:'disabled-slide',
            mousewheelControl:true,
            // annimatejs
            onInit: function(swiper){
                swiperAnimateCache(swiper);
                swiperAnimate(swiper);
            },
            onSlideChangeEnd: function(swiper){
                swiperAnimate(swiper);
            },
            onTransitionEnd: function(swiper){
                swiperAnimate(swiper);
            },
            // 控制翻页
            onSlideChangeEnd:function(swiper){
                console.log(swiper.activeIndex);
                if(swiper.activeIndex ===11){
                    setTimeout(function(){
                        $('.packet').show();
                    }, 1000);
                    
                }
            },
            onSlideChangeStart:function(swiper){
                // console.log(swiper.activeIndex);
                changeFun(swiper);
                clearTimeout(swiperTime);
            }
        });
        // bannerSlide.slideTo(9);
        function changeFun(obj){
            var num=obj.activeIndex;
            var active=$('#answerMain li:nth-child('+(num+1)+')');
            if(active.hasClass('disabled-next')){
                bannerSlide.lockSwipeToNext();
            }else{
                bannerSlide.unlockSwipeToNext();
            }
            if(active.hasClass('disabled-prev')){
                bannerSlide.lockSwipeToPrev();
            }else{
                bannerSlide.unlockSwipeToPrev();
            }
        }


        $('.actionPic img,.askOption img').click(function(){
            $('#yinxiao').get(0).play();
            var obj=$(this);
            obj.addClass('imgScale');
            // bannerSlide.slideNext(); //不加这个有问题
            bannerSlide.unlockSwipeToNext();
            swiperTime=setTimeout(function(){
                bannerSlide.slideNext();
                obj.removeClass('imgScale');
            },500);
        });

        $('.publishLinck').click(function(){
            bannerSlide.unlockSwipeToNext();
            bannerSlide.slideNext();
        });

        $('.packet').click(function(){
            $(this).addClass('redshake');
        })

        var resNum=0;
        $('.swiper-answer .askOption img').click(function(){
            answerFun($(this));
        })
        // 答题函数
        function answerFun(obj){
            if(!obj.hasClass('disabled')){
                var box=obj.parents('.swiper-answer');
                var id=box.data('id');
                var qid=obj.data('qid');

                if(qid==correctList[id].res){
                    resNum++;
                }
                console.log(resNum);
                box.find('.askOption img').addClass('disabled');
                // bannerSlide.unlockSwipeToNext();
                // swiperTime=setTimeout(function(){
                //     bannerSlide.slideNext();
                // },2000);
                // 这里判断最后一次时，开始计算结果
                var boxid=box.attr('id');
                if(boxid=='slide_8'){
                    countResult(resNum-1);
                }
            }
        }
        // 答题出结果
        function countResult(n){
            var uid= n;
            $('.publishTxt').attr('src',setHost+''+resultList[uid].resultImg);
            $('.counsel_text').attr('src',setHost+''+resultList[uid].counselImg);
            $('.counsel_eat').attr('src',setHost+''+resultList[uid].iconImg);
        };

        $(".music").click(function(){
            if($(".icon-music").attr("num") == "1"){
                $(".icon-music").removeClass("open");
                $(".icon-music").attr("num","2");
                $(".icon-music").hide();
                $(".music-span").show();
                document.getElementById("aud").pause();
                $(".music_text").html("关闭");
                $(".music_text").addClass("show_hide");
                setTimeout(musicHide,2000);
            }else{
                $(".icon-music").attr("num","1");
                $(".icon-music").addClass("open");
                $(".icon-music").show();
                $(".music-span").hide();
                document.getElementById("aud").play();
                $(".music_text").html("开启");
                $(".music_text").addClass("show_hide");
                setTimeout(musicHide,2000);
            }
            function musicHide(){
                $(".music_text").removeClass("show_hide");
            }
        });

    }

});