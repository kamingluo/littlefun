<?php


namespace app\admin\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class Temmsg
{
   
    
    public function signmsg(Request $request) //签到推送
    {
    	set_time_limit(0);//设置超时时间
      $data['appid']=Config('appid');
      $data['secret']= Config('secret');
      $data['grant_type']= 'client_credential';
      $api = "https://api.weixin.qq.com/cgi-bin/token";//拿token接口
      $str = http($api, $data,'GET');
      $token = json_decode($str,true);
      $access_token=$token['access_token'];//拿到token
      // return $access_token;

      $sql = "Select formid.* from formid,(Select openid,min(id) as id from formid GROUP BY openid )  a  where formid.openid=a.openid and formid.id=a.id;";
      $msgdata = Db::query($sql); //拿到数据
      $count = count($msgdata);//拿到数值条数
      //return  $msgdata;

      
      foreach($msgdata as $count  => $data){
         $resdata=signtemMsg($data["formid"],$data["openid"],$access_token);
         $clear=db('formid')-> where('formid', $data["formid"])->delete();
       }
        // $emaildata=sendEmail([['user_email'=>'954087620@qq.com','content'=>'签到推送完毕']]); //想推送不知道为啥不行
        return  "签到推送成功";

    }

    public function clearformid()
    {

       $day=date("Y-m-d H:i:s", strtotime('-6 days'));//获取6天时间
       $clearformid=db('formid')-> where('create_time','< time', $day)->delete();
       return "共清理过期formid数量-->" .$clearformid ;

    }




    public function profit(Request $request) //签到推送
    {
      set_time_limit(0);//设置超时时间
      $data['appid']=Config('appid');
      $data['secret']= Config('secret');
      $data['grant_type']= 'client_credential';
      $api = "https://api.weixin.qq.com/cgi-bin/token";//拿token接口
      $str = http($api, $data,'GET');
      $token = json_decode($str,true);
      $access_token=$token['access_token'];//拿到token
      // return $access_token;

      $sql = "Select formid.* from formid,(Select openid,min(id) as id from formid GROUP BY openid )  a  where formid.openid=a.openid and formid.id=a.id;";
      $msgdata = Db::query($sql); //拿到数据
      $count = count($msgdata);//拿到数值条数
      //return  $msgdata;

      
      foreach($msgdata as $count  => $data){
         $resdata=profit($data["formid"],$data["openid"],$access_token);
         $clear=db('formid')-> where('formid', $data["formid"])->delete();
       }
        // $emaildata=sendEmail([['user_email'=>'954087620@qq.com','content'=>'签到推送完毕']]); //想推送不知道为啥不行
        return  "签到推送成功";

    }










   

}
