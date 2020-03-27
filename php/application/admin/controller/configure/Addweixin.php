<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Addweixin
{
   
   public function addweixin(Request $request){
    $userid=$request->param("userid");
    $time =date('Y-m-d H:i:s',time());//获取当前时间
    $count = db('addweixin')->where('userid', $userid)->count();
    $score = 100; //设置金币
    if($count > 0){
      //已经完成过了
      $resdata=['state' => '200','message'  => "已经完成过任务了，添加不成功" ];
      return $resdata ;
    }
    else{
      //还没完成

      //拿到用户记录
      $userdata=db('user')->where('id', $userid)->find();
      $channel=$userdata['channel'];
      $openid=$userdata['openid'];
      $master_id=$userdata['master_id'];
      
      //给用户添加积分
      $addscore= db('user')->where('openid',$openid)->setInc('score',$score);

      //添加积分操作记录
      $recordres = ['id'=>'','openid' =>$openid,'score' =>$score,'explain' =>"添加客服微信",'channel' =>$channel,'master_id' => $master_id,'state' =>0,'create_time' =>$time];
      $addrecord=db('score_record')->insert($recordres);

      //添加记录
      $dbdata = ['id'=>'','userid' =>$userid,'score' => $score ,'create_time' =>$time];
      $dbreturn=db('addweixin')->insert($dbdata);



      $resdata=['state' => '200','message'  => "添加成功"];
      return $resdata ;
    }


    }



}