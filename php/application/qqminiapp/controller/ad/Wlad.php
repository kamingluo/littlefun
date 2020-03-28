<?php
namespace app\miniapp\controller\Ad;
use think\Db;
use think\Request;
use think\Config;
use think\Exception;

class Wlad
{
	public function index()
	{

		return  "微量广告" ;
	}	
    //点击微量广告广告成功记录
	public function clickwlad(Request $request)
	{
		$wxcode =$request->param("code");
		$openid=openid($wxcode);
    	$time =date('Y-m-d H:i:s',time());//获取当前时间

    	$dbnum =db('wl_ad_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询今日点广告数
    	if($dbnum >= 3){
    		$resdata=['state'   => '400','message'  => "今天点击微量广告3次了","clickwlad"=>'fail' ];
            return $resdata;
    	}
    	else{
    		//自己加积分
    		$addscore= db('user')->where('openid',$openid)->setInc('score',$request->param("score"));
    		//增加点击广告记录
    		$adres = ['id'=>'','openid' =>$openid,'channel' =>$request->param("channel"),'master_id' =>$request->param("master_id"),'adid' =>$request->param("adid"),'adname' =>$request->param("adname"),'score' =>$request->param("score"),'create_time' =>$time];
    	    $addata=db('wl_ad_record')->insert($adres);
    	    //增加积分变化记录
    	    $datares = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>"点击广告",'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'state' =>0,'create_time' =>$time];
        	$data=db('score_record')->insert($datares);

            $contribution=contribution($request->param("master_id"),$openid,$request->param("score"));//徒弟进贡

        	if($addscore==1&&$addata==1&&$data==1){
        	     $resdata=['state'   => '200','message'  => "点击微量告成功","clickwlad"=>'success' ];
                 return $resdata;
        	}
        	else{
        		$resdata=['state'   => '400','message'  => "点击微量广告失败","clickwlad"=>'fail' ];
                 return $resdata;
        	}
    	}
	}


      //用户微量广告数量
    public function todayclickwladnumber(Request $request)
    {
    	// return "111";
    	$wxcode =$request->param("code");
    	$openid=openid($wxcode);
        $dbnum =db('wl_ad_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询今日点广告数
        $state=['state'   => '200','message'  => "todayclickminiappnumber" ];
        $resdata=array_merge($state,array('clickwladnumber'=>$dbnum));
        return $resdata;
    }

	
    
    
}
