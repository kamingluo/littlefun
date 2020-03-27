<?php

// +----------------------------------------------------------------------
// | 积分操作
// +----------------------------------------------------------------------
 

namespace app\miniapp\controller;

use think\Db;
use think\Request;

class Score
{
    //积分增加
    public function increase(Request $request)
    {
    	$wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);
        $dbreturn= db('user')->where('openid',$openid)->setInc('score',$request->param("score"));
        if($dbreturn == 1){
        	 $time =date('Y-m-d H:i:s',time());//获取当前时间
        	 $dbdata = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>$request->param("explain"),'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'state' =>0,'create_time' =>$time];
        	 $dbreturn=db('score_record')->insert($dbdata);
             return ['state'   => '200','message'  => "增加分数成功" ,'score' => $request->param("score")] ;
        }
        else{
        	return ['state'   => '400','message'  => "增加分数失败",'score' => $request->param("score") ] ;
        	 
        }
    }

    //积分减少
    public function reduce(Request $request)
    {
        $wxcode =$request->param("code");
        $openid=openid($wxcode);
        $dbreturn= db('user')->where('openid',$openid)->setDec('score',$request->param("score"));
        if($dbreturn == 1){
        	 $time =date('Y-m-d H:i:s',time());//获取当前时间
        	 $dbdata = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>$request->param("explain"),'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'state' =>1,'create_time' =>$time];
        	 $dbreturn=db('score_record')->insert($dbdata);
             return ['state'   => '200','message'  => "减少分数成功",'score' => $request->param("score") ] ;
        }
        else{
        	return ['state'   => '400','message'  => "减少分数失败" ,'score' => $request->param("score")] ;
        	 
        }
    }


    //查询用户积分记录
    public function userscorerecord(Request $request)
    {
        
        $wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);

        $scorerecord =db('score_record')->where('openid',$openid)->order('create_time desc')-> select();//查询信息
        $state=['state'   => '200','message'  => "获取用户积分操作记录成功" ];
        $resdata=array_merge($state,array('userscorerecord'=>$scorerecord));
        return  $resdata;
    }


    //徒弟进贡
    public function tribute(Request $request){
        $master_id =$request->param("master_id");//接收所有传过来的值
        $score =$request->param("score");
         $date=contribution($master_id, $score);
         return $date;
    }





}
