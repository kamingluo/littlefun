<?php
namespace app\miniapp\controller;
use think\Db;
use think\Request;
use think\Config;

class Exchange
{
    public function index(Request $request)
    {

    	return  "商品兑换模块" ;
    }
    
    //商品兑换列表
    public function goodslist()
    {
        $dbdata1=db('exchange_goods')->order('id asc')->where('goodsType','0')->select();
        $dbdata2=db('exchange_goods')->order('id asc')->where('goodsType','1')->select();
        $state=['state'   => '200','message'  => "商品兑换列表查询成功" ];
        $resdata=array_merge($state,array('goodslist1'=>$dbdata1),array('goodslist2'=>$dbdata2));
        return $resdata ;
    }

    //用户兑换记录
     public function exchangelist(Request $request)
    {
        $wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);
        $dbdata=db('exchange_record')->where('openid',$openid)->order('id desc')->select();
        $state=['state'   => '200','message'  => "用户兑换列表查询成功" ];
        $resdata=array_merge($state,array('exchangelist'=>$dbdata));
        return $resdata ;
    }

    //用户兑换
    public function userexchange(Request $request){
    	$wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);

         $time =date('Y-m-d H:i:s',time());//获取当前时间

        //用传过来的商品ID拿到商品信息
        $goodsdata=db('exchange_goods')->where('id',$request->param("goodsid"))->find();

         //拿到用户的积分信息
          $userdata=db('user')->where('openid',$openid)->find();

        
        if($userdata['score'] < $goodsdata['goodsPrice']){
        	 $state=['state'   => '400','message'  => "兑换失败，用户积分不足" ];
        	 $resdata=array_merge($state,array('exchange'=>'fail'));
             return $resdata ;
        }
        else{

        	//扣除用户金币
        	$reducescore= db('user')->where('openid',$openid)->setDec('score',$goodsdata['goodsPrice']);

        	//积分记录记录
        	 $recorddata= ['id'=>'','openid' =>$openid,'score' =>$goodsdata['goodsPrice'],'explain' =>"金币兑换礼品",'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'state' =>1,'create_time' =>$time];
        	 $scorerecord=db('score_record')->insert($recorddata);

        	//增加兑换记录
        	 $changedata= ['id'=>'','openid' =>$openid,'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"), 'goodsName' =>$goodsdata['goodsName'],'goodsPrice' =>$goodsdata['goodsPrice'],'goodsType' =>$goodsdata['goodsType'],'alipayName' =>$request->param("alipayName"),'alipayNumber' =>$request->param("alipayNumber"),'state' =>0,  'create_time' =>$time];
        	 $change=db('exchange_record')->insert($changedata);


        	 if($reducescore==1&&$scorerecord==1&&$change==1){
        	 	$state=['state'   => '200','message'  => "兑换成功" ];
        	    $resdata=array_merge($state,array('exchange'=>'success'));
                return $resdata ;
        	 }
        	 else{
        	 	$state=['state'   => '400','message'  => "兑换失败" ];
        	    $resdata=array_merge($state,array('exchange'=>'fail'));
                return $resdata ;
        	 }
        }


    }



}
