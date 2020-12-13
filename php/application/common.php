<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
use phpmailer\phpmailer;

/**
 * 发送HTTP请求方法
 * @param  string $url    请求URL
 * @param  array  $params 请求参数
 * @param  string $method 请求方法GET/POST
 * @return array  $data   响应数据
 */
function http($url, $params, $method = 'GET', $header = array(), $multi = false){
    $opts = array(
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTPHEADER     => $header
    );
    /* 根据请求类型设置特定参数 */
    switch(strtoupper($method)){
        case 'GET':
            $opts[CURLOPT_URL] = $url . '?' . http_build_query($params);
            break;
        case 'POST':
            //判断是否传输文件
            $params = $multi ? $params : http_build_query($params);
            $opts[CURLOPT_URL] = $url;
            $opts[CURLOPT_POST] = 1;
            $opts[CURLOPT_POSTFIELDS] = $params;
            break;
        default:
            throw new Exception('不支持的请求方式！');
    }
    /* 初始化并执行curl请求 */
    $ch = curl_init();
    curl_setopt_array($ch, $opts);
    $data  = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    if($error) throw new Exception('请求发生错误：' . $error);
    return  $data;
}


/**
* 发送邮箱
* @param type $data 邮箱队列数据 包含邮箱地址 内容
* 在本地发送不成功，服务器上才行
*/
function sendEmail($data = []) {

  Vendor('phpmailer.phpmailer');
  $mail = new PHPMailer(); //实例化


  $mail->IsSMTP(); // 启用SMTP
  $mail->Host = 'smtp.163.com'; //SMTP服务器 以126邮箱为例子 
  $mail->Port = 994;  //邮件发送端口
  $mail->SMTPAuth = true;  //启用SMTP认证
  $mail->SMTPSecure = "ssl";   // 设置安全验证方式为ssl

  $mail->CharSet = "UTF-8"; //字符集
  $mail->Encoding = "base64"; //编码方式

  $mail->Username = 'kaming_001@163.com';  //你的邮箱 
  $mail->Password = 'a123456';  //你的密码 
  $mail->Subject = '11111'; //邮件标题  

  $mail->From = 'kaming_001@163.com';  //发件人地址（也就是你的邮箱）
  $mail->FromName = 'kaming';  //发件人姓名

  if($data && is_array($data)){
    foreach ($data as $k=>$v){
      $mail->AddAddress($v['user_email'], "亲"); //添加收件人（地址，昵称）
      $mail->IsHTML(true); //支持html格式内容
      $mail->Body = $v['content']; //邮件主体内容

      //发送成功就删除
      if ($mail->Send()) {
        return "success";
      }else{
          return "Mailer Error: ".$mail->ErrorInfo;// 输出错误信息  
      }
    }
  }           
}




// function postCurl($url,$data,$type){
//   if($type == 'json'){
//       $data = json_encode($data);//对数组进行json编码
//       $header= array("Content-type: application/json;charset=UTF-8","Accept: application/json","Cache-Control: no-cache", "Pragma: no-cache");
//   }
//   $curl = curl_init();
//   curl_setopt($curl,CURLOPT_URL,$url);
//   curl_setopt($curl,CURLOPT_POST,1);
//   curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,false);
//   curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,false);
//   if(!empty($data)){
//       curl_setopt($curl,CURLOPT_POSTFIELDS,$data);
//   }
//   curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
//   curl_setopt($curl,CURLOPT_HTTPHEADER,$header);
//   $res = curl_exec($curl);
//   if(curl_errno($curl)){
//       echo 'Error+'.curl_error($curl);
//   }
//   curl_close($curl);
//   return $res;
  
// }




function getcurl($url, $postFields = null)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_FAILONERROR, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt ( $ch, CURLOPT_USERAGENT, "top-sdk-php" );
  //https 请求
  if(strlen($url) > 5 && strtolower(substr($url,0,5)) == "https" ) {
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
  }

  if (is_array($postFields) && 0 < count($postFields))
  {
    $postBodyString = "";
    $postMultipart = false;
    foreach ($postFields as $k => $v)
    {
      if("@" != substr($v, 0, 1))//判断是不是文件上传
      {
        $postBodyString .= "$k=" . urlencode($v) . "&"; 
      }
      else//文件上传用multipart/form-data，否则用www-form-urlencoded
      {
        $postMultipart = true;
        if(class_exists('\CURLFile')){
          $postFields[$k] = new \CURLFile(substr($v, 1));
        }
      }
    }
    unset($k, $v);
    curl_setopt($ch, CURLOPT_POST, true);
    if ($postMultipart)
    {
      if (class_exists('\CURLFile')) {
          curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true);
      } else {
          if (defined('CURLOPT_SAFE_UPLOAD')) {
              curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
          }
      }
      curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    }
    else
    {
      $header = array("content-type: application/x-www-form-urlencoded; charset=UTF-8");
      curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
      curl_setopt($ch, CURLOPT_POSTFIELDS, substr($postBodyString,0,-1));
    }
  }
  $reponse = curl_exec($ch);
  
  if (curl_errno($ch))
  {
    throw new Exception(curl_error($ch),0);
  }
  else
  {
    $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if (200 !== $httpStatusCode)
    {
      throw new Exception($reponse,$httpStatusCode);
    }
  }
  curl_close($ch);
  return $reponse;
}

