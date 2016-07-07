$(function(){
        var musics=[
         {src:"./music/爱情的海洋.mp3",name:"爱情的海洋",arit:"SHE",time:"3:52"},
         {src:"./music/农贸市场十四行.mp3",name:"农贸市场十四行",arit:"陈建斌",time:"5:23"},
         {src:"./music/候鸟.mp3",name:"候鸟",arit:"SHE",time:"4:44"},
         {src:"./music/落大雨.mp3",name:"落大雨",arit:"SHE",time:"4:12"},
         {src:"./music/美丽新世界.mp3",name:"美丽新世界",arit:"SHE",time:"4:26"},
         {src:"./music/热带雨林.mp3",name:"热带雨林",arit:"SHE",time:"4:47"},
         {src:"./music/夏天的微笑.mp3",name:"夏天的微笑",arit:"SHE",time:"4:47"},
         {src:"./music/一起开始的旅程.mp3",name:"一起开始的旅程",arit:"SHE",time:"4:01"},
         {src:"./music/中国话.mp3",name:"中国话",arit:"SHE",time:"3:14"},
         {src:"./music/紫藤花.mp3",name:"紫藤花",arit:"SHE",time:"4:01"}
        ];
        $(musics).each(function(index,value){
        	$("<li class='song' date-id="+index+"><span class='ygc'>"+value.name+"</span><span class='author'>"+value.arit+"</span><span class='time'>"+value.time+"</span><div class='opration'><span class='like'></span><span class='share'></span><span class='shoucang'></span><span class='delete'></span></div></li>").appendTo(".player .player-body")
        });
        var currentIndex;
        $(".player-body li").on("click",function(){
        	currentIndex=parseInt($(this).attr("date-id"));
            audio.src=musics[currentIndex].src;
            audio.play();
            
        })
		var audio=$("#audio").get(0);
		var $audio=$("#audio");
		// 播放暂停键：
		var $play=$(".player-bottom .three .te2");
		$play.on("click",function(){
			if(audio.paused){
				audio.play();
			}else{
				audio.pause();
			}
		})
		$audio.on("play",function(){
			$play.addClass("playing");
			$(".player-body li").removeClass("green").eq(currentIndex).addClass("green");
			var aaa=musics[currentIndex];
			$('.psc').text(aaa.name);
			$('.dc').text(aaa.arit);
			 $('.time2').text(aaa.time);
		})
		$audio.on("pause",function(){
			$play.removeClass("playing");
		})
		var $volume=$(".player-bottom .three .volume .volume-1");
		var $volumep=$(".player-bottom .three .volume .volume-p");
		var $volume2=$(".player-bottom .three .volume .volume-p .volume-2");
		var $volume3=$(".player-bottom .three .volume .volume-p .volume-3");
		$volume.on("click",function(){
			if(!$(this).attr("ov")){
				$(this).attr("ov",audio.volume);
				audio.volume=0;
			}else{
				audio.volume=$(this).attr("ov")
				$(this).removeAttr("ov");
			}
		})
		$volumep.on("click",function(e){
			    audio.volume=e.offsetX/$(this).width();
		})    
        $volume3.on("mousedown",function(e){
        	     e.stopPropagation(); 
           $(document).on("mousemove",function(e){
                var left=e.pageX-$volumep.offset().left;
                var v=left/$volumep.width();
                audio.volume=v;
           })
        })
        $(document).on("mouseup",function(){
        	$(document).off("mousemove");
        })
		$audio.on("volumechange",function(e){
			if(audio.volume===0){
				$volume.addClass("stop");
			}else{
				$volume.removeClass("stop");
			}
           var w=$volumep.width()*audio.volume;
           $volume2.width(w);
           $volume3.css({left:w-$volume3.width()/2})
		})

//音乐时间

       $('.going').on('click',function(e){
           
            audio.currentTime=e.offsetX/$(this).width()*audio.duration;
       })
      
        $('.going2').on('mousedown',function(e){
              e.stopPropagation();
           $(document).on('mousemove',function(e){

            var t=(e.pageX-$('.going').offset().left)/$('.going').width();

             audio.currentTime=audio.duration*t;
              // console.log( audio.currentTime)
           })
        })

         $(document).on('mouseup',function(){
            $(document).off('mousemove');
        })

       $audio.on('timeupdate',function(){
           var s=$('.going').width()*(audio.currentTime/audio.duration);

           $('.going1').width(s)
           $('.going2').css({left:s-$('going2').width()/2-4})
       })
        
    $('.going2').on('click',function(e){
         e.stopPropagation();
       })
       var  huandiao=function(shijian){
           shijian=parseInt(shijian);
           var min=parseInt(shijian/60);
           min=(min<10)?("0"+min):min;
           var second=parseInt(shijian%60);
           second=(second<10)?("0"+second):second;
           return min+':'+second;
       }



     $('.going').on('mouseover',function(e){

        var tu=e.pageX-$(this).offset().left;
      
        // $('.time').css({display:"block",left:tu+150});
        var shijian=tu/$(this).width()*audio.duration;
        $('.time').find('span').html(huandiao(shijian))

        $('.going').on('mousemove',function(e){
        var tu1=e.pageX-$(this).offset().left;
         var tu=e.pageX-$(this).offset().left;
        $('.time').css({left:tu1+150})
        var shijian=tu/$(this).width()*audio.duration;
        $('.time').find('span').html(huandiao(shijian))
    
        })
     })
      $(document).on('mouseout',function(){
        $('.time').css({display:'block'})  
        $('.going').off('mousemove')
      })
// 左右歌曲切换
  $('.te1').on('click',function(){
  	
  	 if(currentIndex==undefined){
  	 	currentIndex=0;
  	 }else{
  	 	 currentIndex-=1;
  	 }
  	 if(currentIndex<0){
  	 	currentIndex= musics.length-1;
  	 }
  	 audio.src=musics[currentIndex].src;
  	 audio.play();
  })
  $('.te3').on('click',function(){
  	 
  	 if(currentIndex==undefined){
  	 	currentIndex=0;
  	 }else{
  	 	currentIndex+=1;
  	 }
  	 if(currentIndex>=musics.length){
  	 	currentIndex=0;
  	 }
  	 audio.src=musics[currentIndex].src;
  	 audio.play();

  })
//清空
$('.play-delete').on('click',function(){
	$('.player-body').empty();
})
//歌曲数量
var shuliang=$('.player-body li').length;
$('.sum').text(shuliang);
	})