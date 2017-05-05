<?php
// +----------------------------------------------------------------------
// | 常用函数库
// +----------------------------------------------------------------------
/**
 * 字符串截取，支持中文和其他编码
 * @static
 * @access public
 * @param string $str 需要转换的字符串
 * @param string $start 开始位置
 * @param string $length 截取长度
 * @param string $charset 编码格式
 * @return string
 */
function msubstr($str, $start=0, $length, $charset="utf-8",$suff=true) {
    if(function_exists("mb_substr"))
        $slice = mb_substr($str, $start, $length, $charset);
    elseif(function_exists('iconv_substr')) {
        $slice = iconv_substr($str,$start,$length,$charset);
    }else{
        $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
        $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
        $re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
        $re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
        preg_match_all($re[$charset], $str, $match);
        $slice = join("",array_slice($match[0], $start, $length));
    }
    if(mb_strlen($str, 'utf8') > $length && $suff){
        return $slice.'...';
    }else{
        return $slice;
    }
}

function clear_tag($str) {
    $str = preg_replace ( '/<t(.+?)>/', '', $str );
    $str = preg_replace ( '/<\/t(.+?)>/', '', $str );
    $str = preg_replace ( '/<iframe(.+?)><\/iframe>/', '', $str );
    $str = preg_replace ( '/<script(.+?)><\/script>/', '', $str );
    $str = preg_replace ( '/<div (.+?)>/', '', $str );
    $str = preg_replace ( '/<a(.+?)>/', '', $str );
    $str = preg_replace ( '/<(.+?)>/', '', $str );
    $str = preg_replace ( '/<img(.+?)>/', '', $str );
    $str = preg_replace ( '/&nbsp;/', '', $str );
    return $str;
}



/**
 * 格式化的打印
 * @param array $arr
 * @return array
 */
function print_g($arr=array(),$is_exit=true)
{
    echo '<pre>';
    print_r($arr);
    echo '</pre>';
    if($is_exit){
        exit;
    }
}


/**
 * 模拟post/get进行url请求
 * 
 * @since 2016-06-03 Fri 09:37:53
 * @author Shaxt
 * @param string $url
 * @param mix $param [array or string]
 * @param bool $is_post [default:post ,false:get]
 * @return string
 * @abstract <pre>
 *      方法说明:为了保证和以前使用方法兼容，故将$is_post默认值为true,如果需要get请求，将其置为false即可
 */
function request_post($url = '', $param = '' , $is_post = true)
{
    $url = trim($url);
    if (empty($url)) {
        return false;
    }
    $queryStr = '';
	if(is_array($param)){
	    foreach($param as $k=>$v){
	        $v = trim($v);
	        if('' === $v) 
	            unset($param[$k]);
	    }
		$queryStr = http_build_query($param); # 代码优化，减少网络开支
	}else{
	    $queryStr = trim($param);
	}
    $ch = curl_init();//初始化curl
    curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
    curl_setopt($ch, CURLOPT_TIMEOUT,8); //执行超时时间 秒
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,8); //链接超时时间 秒
    if($is_post){
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $queryStr);
    }else{
        empty($queryStr) or $url .= '?' . $queryStr;
    }

      # 代理设置：
    if(isset($_GET['proxy']) and in_array(C('ENVIRONMENT'), array('dev','test'))){
        $host = trim($_GET['host'])?:'localhost';
        $port = trim($_GET['port'])?:'7777';

        {curl_setopt($ch,CURLOPT_PROXY,$host);curl_setopt($ch,CURLOPT_PROXYPORT,$port);}
    }
    curl_setopt($ch, CURLOPT_URL,$url);
    $data = curl_exec($ch);//运行curl
    curl_close($ch);
    return $data;
}



/**
 * 随机生成字符串
 * @param int 	$length		生成字符的长度
 * @param string $chars		指定随机生成的字符串
 * @return string
 */
function rand_str($length=32,$chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'){
    $chars_length = (strlen($chars)-1);//Length of character list
    $string = $chars{rand(0, $chars_length)};//Start our string

    //Generate random string
    for($i=1;$i<$length;$i = strlen($string))
    {
        $r = $chars{rand(0,$chars_length)};//Grab a random character from our list
        if ($r != $string{$i - 1}) $string .= $r;//Make sure the same two characters don't appear next to each other
    }
    return $string;//Return the string
}



/**
 * 判断是否是微信内置浏览器打开
 * @return bool
 */
function is_Weixin()
{
    if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {
        return true;
    }
    return false;
}
