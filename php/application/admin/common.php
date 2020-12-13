<?php
// +----------------------------------------------------------------------
// | wxcarminiapp公共方法
// +----------------------------------------------------------------------

use think\Log;
use phpmailer\phpmailer;


//测试方法
function test(){
    return "test";

}


/**
   * 调取微信接口获取openid
   * 传入值code从小程序login API获取
   * @return string
*/
function openid($wxcode){
    if($wxcode == 'kaming'){
        $openid='o3XMA0enuFRZsOCOCeqjB70exjr4';
        return $openid;

    }
    $url = 'https://api.weixin.qq.com/sns/jscode2session';
    $data['appid']=Config('appid');
    $data['secret']= Config('secret');
    $data['js_code']= $wxcode;
    $data['grant_type']= 'authorization_code';
    $wxopenid = http($url, $data, 'GET');
    $openiddata=json_decode($wxopenid,true);
    $rest=array_key_exists("errcode",$openiddata);//判断返回值存在errcode证明code有误
        if($rest){ 
             Log::record('code错误或者过期了！传入微信code-->'.$wxcode,'error');
            echo  json_encode(['state'   => '400','message'  => "code错误或者过期了！" ] ) ;
            die ();
        }
        else{
        	$openid=$openiddata['openid'];
        	return $openid;
        }
}



function signtemMsg($formid,$openid,$access_token)
{
    $formid = $formid;
    $temid = 'iClWDGVGgzkixCkJPeaZ5iqPkJfHzgapJ8oA7A6wTRQ';
    $page = 'pages/index/index?ald_media_id=20276&ald_link_key=e2f83910477fd11f';
    $openid =$openid;
    if(!$formid)die('failed!');//openid有出现等于0的情况，所以不判断了
    $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token;
    $data = array(//这里一定要按照微信给的格式
        "touser"=>$openid,
        "template_id"=>$temid,
        "page"=>$page,
        "form_id"=>$formid,
        "data"=>array(
            "keyword1"=>array(
                "value"=>"每日签到",
                "color"=>"#173177"
            ),
            "keyword2"=>array(
                "value"=>"轻轻一点签到既有奖励，更多任务奖励等你来领取！",
                "color"=>"#173177"
            ),
            "keyword3"=>array(
                "value"=>"点击进入签到>>>",
                "color"=>"#173177"
            ),
            "keyword4"=>array(
                "value"=>"未签到！",
                "color"=>"#930000"
            )
        ),
        "emphasis_keyword"=>"keyword5.DATA",//需要进行加大的消息
    );
    $res = postCurl($url,$data,'json');//将data数组转换为json数据
    if($res){
        echo "1";
       // echo json_encode(array('state'=>4,'msg'=>$res));
    }else{
         echo "222";
        // echo json_encode(array('state'=>5,'msg'=>$res));
    }
}




function profit($formid,$openid,$access_token)
{
    $formid = $formid;
    $temid = 'LtBmBA2Q6NrFzpz4fvl_pkRUzwKRJUkJ64T4P1X5vHE';
    $page = 'pages/index/index?ald_media_id=20276&ald_link_key=e2f83910477fd11f';
    $openid =$openid;
    if(!$formid)die('failed!');//openid有出现等于0的情况，所以不判断了
    $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token;
    $data = array(//这里一定要按照微信给的格式
        "touser"=>$openid,
        "template_id"=>$temid,
        "page"=>$page,
        "form_id"=>$formid,
        "data"=>array(
            "keyword1"=>array(
                "value"=>"一点好玩",
                "color"=>"#173177"
            ),
            "keyword2"=>array(
                "value"=>"100金币！",
                "color"=>"#173177"
            ),
            "keyword3"=>array(
                "value"=>"新增添加客服任务，100金币快速到手，更多任务等你来！",
                "color"=>"#173177"
            ),
            "keyword4"=>array(
                "value"=>"常规任务！",
                "color"=>"#930000"
            )
        ),
        "emphasis_keyword"=>"keyword5.DATA",//需要进行加大的消息
    );
    $res = postCurl($url,$data,'json');//将data数组转换为json数据
    if($res){
        echo "1";
       // echo json_encode(array('state'=>4,'msg'=>$res));
    }else{
         echo "222";
        // echo json_encode(array('state'=>5,'msg'=>$res));
    }
}



function postCurl($url,$data,$type)
{
    if($type == 'json'){
        $data = json_encode($data);//对数组进行json编码
        $header= array("Content-type: application/json;charset=UTF-8","Accept: application/json","Cache-Control: no-cache", "Pragma: no-cache");
    }
    $curl = curl_init();
    curl_setopt($curl,CURLOPT_URL,$url);
    curl_setopt($curl,CURLOPT_POST,1);
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,false);
    if(!empty($data)){
        curl_setopt($curl,CURLOPT_POSTFIELDS,$data);
    }
    curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($curl,CURLOPT_HTTPHEADER,$header);
    $res = curl_exec($curl);
    if(curl_errno($curl)){
        echo 'Error+'.curl_error($curl);
    }
    curl_close($curl);
    return $res;
}





/*
 * 发送邮件
 * @param $to string
 * @param $title string
 * @param $content string
 * @return bool
 * */
function sendMail($to, $title, $content) {
 // Vendor('PHPMailer.PHPMailerAutoload');
  Vendor('phpmailer.phpmailer'); 
 $mail = new PHPMailer(); //实例化
 $mail->IsSMTP(); // 启用SMTP
 $mail->Host='smtp.163.com'; //smtp服务器的名称（这里以QQ邮箱为例）
 $mail->SMTPAuth = true; //启用smtp认证
 $mail->Username ='kaming_001@163.com'; //发件人邮箱名
 $mail->Password = 'a123456'; //163邮箱发件人授权密码
 $mail->From ='kaming_001@163.com'; //发件人地址（也就是你的邮箱地址）
 $mail->FromName = 'kaming'; //发件人姓名
 $mail->AddAddress("954087620@qq.com");
 $mail->WordWrap = 50; //设置每行字符长度
 $mail->IsHTML(true); // 是否HTML格式邮件
 $mail->CharSet='utf-8'; //设置邮件编码
 $mail->Subject =$title; //邮件主题
 $mail->Body = $content; //邮件内容
 $mail->AltBody = "这是一个纯文本的身体在非营利的HTML电子邮件客户端"; //邮件正文不支持HTML的备用显示
 return($mail->Send());
}
