<?php
namespace app\qqminiapp\controller\Ad;
use think\Db;
use think\Request;
use think\Config;
use think\Exception;

class Miniappad
{
	public function index()
	{

		return  "自己接的小程序广告" ;
	}	
    //点击banner广告成功记录
	public function clickminiappad(Request $request)
	{
		$wxcode =$request->param("code");
		$openid=openid($wxcode);
    	$time =date('Y-m-d H:i:s',time());//获取当前时间

    	$dbnum =db('miniapp_ad_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询今日点广告数
    	if($dbnum >= 3){
    		$resdata=['state'   => '400','message'  => "你今天小程序广告点击已经三次了","clickminiappad"=>'fail' ];
            return $resdata;
    	}
    	else{
        $clickadname =db('miniapp_ad_record')->where('openid',$openid)->where('adname',$request->param("adname"))->whereTime('create_time', 'today')->count();//查询今日点广告数
        if($clickadname >= 1){
          $resdata=['state'   => '400','message'  => "你今天完成过这个小程序的任务了！","clickminiappad"=>'fail' ];
          return $resdata;

        }else{
          //自己加积分
    		$addscore= db('user')->where('openid',$openid)->setInc('score',$request->param("score"));
    		//增加点击广告记录
    		$adres = ['id'=>'','openid' =>$openid,'channel' =>$request->param("channel"),'master_id' =>$request->param("master_id"),'adid' =>$request->param("adid"),'adname' =>$request->param("adname"),'score' =>$request->param("score"),'create_time' =>$time];
    	    $addata=db('miniapp_ad_record')->insert($adres);
    	    //增加积分变化记录
    	    $datares = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>"点击小程序广告",'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'state' =>0,'create_time' =>$time];
        	$data=db('score_record')->insert($datares);

            $contribution=contribution($request->param("master_id"),$openid,$request->param("score"));//徒弟进贡

        	if($addscore==1&&$addata==1&&$data==1){
        	     $resdata=['state'   => '200','message'  => "点击小程序广告成功","clickminiappad"=>'success' ];
                 return $resdata;
        	}
        	else{
        		$resdata=['state'   => '400','message'  => "点击小程序广告失败","clickminiappad"=>'fail' ];
                 return $resdata;
          }

        }
    		
    	}
	}


      //用户今日点击小程序跳转广告数量
    public function todayclickminiappnumber(Request $request)
    {
    	$wxcode =$request->param("code");
    	$openid=openid($wxcode);
        $dbnum =db('miniapp_ad_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询今日点广告数
        $state=['state'   => '200','message'  => "todayclickminiappnumber" ];
        $resdata=array_merge($state,array('clickminiappnumber'=>$dbnum));
        return $resdata;
    }

    //单个推广页面的数据
    public function extension()
    {
      $data =db('extension')->where('open',0)->order('id asc')->find();
      $state=['state'   => '200','message'  => "extension" ];
      $resdata=array_merge($state,array('extensiondata'=>$data));
      return $resdata;
      # code...
    }

	
    
    
}
