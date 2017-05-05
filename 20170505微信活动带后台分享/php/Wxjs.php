<?php
include "function.php";
define('PHP_PATH',dirname(__FILE__));

class Auth
{
    const SCOPE_BASE = 'snsapi_base';       # 无授权页面,只能获取到openid
    const SCOPE_INFO = 'snsapi_userinfo';   # 有授权页面 ， 可获取accesstoken openid

    private $AccessTokenCache;
    private $TicketCache;

    private $accessToken;
    private $ticket;
    private $openId;
    public $Appid;
    private $Appsecret;

    /**
     * 加载配置，使用WAP微信号
     * @access public
     * @author xiezc
     * @since
     * @abstract
     */
    public function __construct()
    {
        $this->Appid = "wxb7d14dc2a7c5daff";
        $this->Appsecret = "4913771eafa1fa0e46311757eb92dd73";
        $this->datatime = time();
        $this->randstr = rand_str(8);
        $this->AccessTokenCache = PHP_PATH.DIRECTORY_SEPARATOR.'AccessTokenCache.txt';
        $this->TicketCache = PHP_PATH.DIRECTORY_SEPARATOR.'TicketCache.txt';

    }

    /**
     * ajax返回
     * @access public
     * @author xiezc
     * @param $ret 数据
     * @since
     * @abstract
     */
    protected function _ajaxExit($ret)
    {
        echo json_encode($ret, JSON_UNESCAPED_UNICODE);
        exit();
    }

    /**
     * ajax成功返回
     * @access public
     * @author xiezc
     * @param string $msg 消息内容
     * @param array $data 返回数据
     * @since
     * @abstract
     */
    public function _ajaxSuccess($msg = '操作成功', array $data = array())
    {
        $ret = array('status' => 1, 'info' => $msg, 'data' => $data);
        $this->_ajaxExit($ret);
    }

    /**
     * ajax错误返回
     * @access public
     * @author xiezc
     * @param string $msg 消息内容
     * @param array $data 返回数据
     * @since
     * @abstract
     */
    public function _ajaxFailure($msg = '操作失败', array $data = array())
    {
        $ret = array('status' => 0, 'info' => $msg, 'data' => $data);
        $this->_ajaxExit($ret);
    }

    /**
     * jssdk签名方法
     * @access private
     * @author xiezc
     * @param $url      页面URL
     * @param $time     时间戳
     * @param $randstr  随机数
     * @return string   签名
     * @since
     * @abstract
     */
    public function getSign($url, $time, $randstr)
    {
        #获取token
        $json = file_get_contents($this->AccessTokenCache);
        $json = json_decode($json,TRUE);
        $this->accessToken = $json['data'];
        if (empty($this->accessToken) OR time() > $json['time']) {
            $getTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' . $this->Appid . '&secret=' . $this->Appsecret;
            $json = file_get_contents($getTokenUrl);
            $json = json_decode($json, TRUE);
            if (empty($json['access_token'])) {
                return $json['errmsg'] ? $json['errmsg'] : '获取access_token为空';
            }
            $this->accessToken = $json['access_token'];
            $data = json_encode(array(
                'data'=>$this->accessToken,
                'time'=>time()+3600
            ));
            file_put_contents($this->AccessTokenCache,$data);
        }

        $json = file_get_contents($this->TicketCache);
        $json = json_decode($json,TRUE);
        $this->ticket = $json['data'];
        #获取ticket
        if (empty($this->ticket)  OR time() > $json['time']) {
            $getUrl2 = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' . $this->accessToken . '&type=jsapi';
            $json = file_get_contents($getUrl2);
            $json = json_decode($json, TRUE);
            if (empty($json['ticket'])) {
                return $json['errmsg'] ? $json['errmsg'] : '获取ticket为空';
            }
            $this->ticket = $json['ticket'];
            $data = json_encode(array(
                'data'=>$this->ticket,
                'time'=>time()+3600
            ));
            file_put_contents($this->TicketCache,$data);
        }

        $data = array(
            'jsapi_ticket' => $this->ticket,
            'timestamp' => $time,
            'noncestr' => $randstr,
        );
        ksort($data);
        $str = http_build_query($data);
        $str = $str . '&url=' . $url;
        $sign = sha1($str);
        return $sign;
    }
}

$url = isset($_POST['url']) ? $_POST['url'] : "";
$datatime = time();
$randstr = rand_str(8);
$url = urldecode($url);
$class = new Auth();

$datatime = '1493951672';
$randstr = 'n0FsKWzo';
$sign = $class->getSign($url,$datatime,$randstr);
if($sign){
    $data = array(
        'datatime' => $datatime,
        'randstr' => $randstr,
        'sign' => $sign,
        'appId' => $class->Appid
    );
    $class->_ajaxSuccess('签名成功',$data);
}else{
    $class->_ajaxFailure('获取签名失败');
}

