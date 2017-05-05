function wx_share(option){
	var ua = navigator.userAgent.toLowerCase();  
	if(ua.match(/MicroMessenger/i)!="micromessenger") {  
        return false;  
    }
	var win_host = window.location.host;
	var win_url = window.location.href;
	var opt = {
		ajaxurl : '/weixin/php/Wxjs.php',
		title:"一条男生不敢转发的H5",
		desc:'神准的辨渣男公式，听说女生们都在转',
		imgurl:'http://'+win_host+'/weixin/img/share.jpg'
	};
	opt = $.extend(opt,option);
	$.ajax({
	    type : "post",
	    data:{url : encodeURIComponent(win_url)},
	    url : opt.ajaxurl,
	    dataType : "json",
	    success : function(data){
	        if(data.status == 1){
	            wx.config({
	                appId: data.data.appId,
	                timestamp: data.data.datatime,
	                nonceStr: data.data.randstr,
	                signature: data.data.sign,
	                jsApiList: [
	                    "onMenuShareTimeline", //分享给好友
	                    "onMenuShareAppMessage", //分享到朋友圈
	                    "onMenuShareQQ",  //分享到QQ
	                    "onMenuShareWeibo" //分享到微博
	                ]
	            });
	            wx.ready(function (){
	                var shareData = {
	                    title: opt.title,
	                    desc: opt.desc,
	                    link: win_url,
	                    imgUrl: opt.imgurl
	                };
	                wx.onMenuShareAppMessage(shareData);
	                wx.onMenuShareTimeline(shareData);
	                wx.onMenuShareQQ(shareData);
	                wx.onMenuShareWeibo(shareData);
                });
	        }else{
	            alert("获取失败");
	        }
	    }
	});
}
