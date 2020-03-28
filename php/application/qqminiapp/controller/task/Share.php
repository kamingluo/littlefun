<?php
namespace app\qqminiapp\controller\task;
use think\Db;
use think\Request;
use think\Config;

class Share
{
    public function index(Request $request)
    {

    	return  "分享任务" ;
    }
    
    //查询用户今日分享数
    public function todaysharenumber(Request $request)
    {
       $wxcode =$request->param("code");
    	$openid=openid($wxcode);
        $dbnum =db('share_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询今日点广告数
        $state=['state'   => '200','message'  => "用户todaysharenumber" ];
        $resdata=array_merge($state,array('todaysharenumber'=>$dbnum));
        return $resdata;
    }

    //用户完成分享任务
     public function sharesuccess(Request $request)
    {
        $wxcode =$request->param("code");
		$openid=openid($wxcode);
    	$time =date('Y-m-d H:i:s',time());//获取当前时间
    	$dbnum =db('share_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询今日点广告数
    	if($dbnum >= 1){
    		$resdata=['state'   => '400','message'  => "你今天已经完成过分享任务","sharesuccess"=>'fail' ];
            return $resdata;
    	}
    	else{
    		$addscore= db('user')->where('openid',$openid)->setInc('score',$request->param("score"));
    		$adres = ['id'=>'','openid' =>$openid,'channel' =>$request->param("channel"),'master_id' =>$request->param("master_id"),'score' =>$request->param("score"),'create_time' =>$time];
    	    $addata=db('share_record')->insert($adres);
    	    $datares = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>"分享任务",'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"), 'state' =>0,'create_time' =>$time];
        	$data=db('score_record')->insert($datares);
        	if($addscore==1&&$addata==1&&$data==1){
        	     $resdata=['state'   => '200','message'  => "完成分享任务","lookvideoad"=>'success' ];
                 return $resdata;
        	}
        	else{
        		$resdata=['state'   => '400','message'  => "分享任务失败","lookvideoad"=>'fail' ];
                 return $resdata;
        	}
    	}
    }
}
