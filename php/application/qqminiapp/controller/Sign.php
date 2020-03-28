<?php
namespace app\qqminiapp\controller;
use think\Db;
use think\Request;
use think\Config;

class Sign
{
    public function index()
    {

    	return  "签到接口模块" ;
    }
    
    //判断用户今日有没有签到
    public function whethersign(Request $request)
    {
       $wxcode =$request->param("code");
    	$openid=openid($wxcode);
        $dbnum =db('sign')->where('openid',$openid)->whereTime('create_time', 'today')->count();
        if($dbnum>=1){
         $state=['state'=> '400','message'  => "用户今天已经签到" ];
         $resdata=array_merge($state,array('whether'=>true));
         return $resdata;
        }
        else{
         $state=['state'   => '200','message'  => "用户今天还没有签到" ];
         $resdata=array_merge($state,array('whether'=>false));
         return $resdata;
        }
    }

    //用户签到
     public function signin(Request $request)
    {
    	$data =$request->param();
        $wxcode =$request->param("code");
    	$openid=openid($wxcode);
        $dbnum =db('sign')->where('openid',$openid)->whereTime('create_time', 'today')->count();
        if($dbnum>=1){
         $resdata=['state'   => '400','message'  => "你已经签到了" ];
         return $resdata;
        }
        else{
          $time =date('Y-m-d H:i:s',time());//获取当前时间
          $dbdata = ['id'=>'','openid' =>$openid,'channel' =>$request->param("channel"),'score' =>$request->param("score"),'create_time' =>$time];
          $signres=db('sign')->insert($dbdata);
          $explain="每日签到";
          $increasedata=increase($openid,$data,$explain);
          if($increasedata==1&&$signres==1)
          {
          	$resdata=['state'   => '200','message'  => "签到成功","signin"=>'success' ];
            return $resdata;
          }
          else{
          	$resdata=['state'   => '400','message'  => "签到失败","signin"=>'fail' ];
            return $resdata;
          }
        }
    }

    //签到加倍
    public function signdouble(Request $request)
    {
    	$wxcode =$request->param("code");
    	$openid=openid($wxcode);
    	$dbscore =db('sign')->where('openid',$openid)->whereTime('create_time', 'today')->value('score');
    	$time =date('Y-m-d H:i:s',time());//获取当前时间
    	if($dbscore==null){
    		$resdata=['state'   => '400','message'  => "今日未签到","signdouble"=>'fail' ];
            return $resdata;
    	}
    	else{
    		 $addscore= db('user')->where('openid',$openid)->setInc('score',$dbscore);
        	 $dbdata = ['id'=>'','openid' =>$openid,'score' =>$dbscore,'explain' =>"签到翻倍",'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'state' =>0,'create_time' =>$time];
        	 $dbreturn=db('score_record')->insert($dbdata);
        	 $resdata=['state'   => '200','message'  => "加倍成功","signdouble"=>'success' ];
            return $resdata;
    	}
    }


}
