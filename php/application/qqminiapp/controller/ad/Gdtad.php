<?php
namespace app\qqminiapp\controller\Ad;
use think\Db;
use think\Request;
use think\Config;
use think\Exception;

class Gdtad
{
	public function index()
	{

		return  "广点通广告" ;
	}	
    //点击banner广告成功记录
	public function clickbannerad(Request $request)
	{
		$wxcode =$request->param("code");
		$openid=openid($wxcode);
    	$time =date('Y-m-d H:i:s',time());//获取当前时间
    	$dbnum =db('gdt_ad_record')->where('openid',$openid)->where('adtype',1)->whereTime('create_time', 'today')->count();//查询今日点广告数
    	if($dbnum >= 2){
    		$resdata=['state'   => '400','message'  => "你今天banner广告点击已经两次了","clickbannerad"=>'fail' ];
            return $resdata;
    	}
    	else{


    		//自己加积分
    		$addscore= db('user')->where('openid',$openid)->setInc('score',$request->param("score"));
    		//增加点击广告记录
    		$adres = ['id'=>'','openid' =>$openid,'channel' =>$request->param("channel"),'master_id' =>$request->param("master_id"),'adid' =>$request->param("adid"),'adtype' =>1,'score' =>$request->param("score"),'create_time' =>$time];
    	    $addata=db('gdt_ad_record')->insert($adres);
    	    //增加积分变化记录
    	    $datares = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>"点击广告",'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'state' =>0,'create_time' =>$time];
        	$data=db('score_record')->insert($datares);

            $contribution=contribution($request->param("master_id"),$openid,$request->param("score"));//徒弟进贡

        	if($addscore==1&&$addata==1&&$data==1){
        	     $resdata=['state'   => '200','message'  => "点击banner广告成功","clickbannerad"=>'success' ];
                 return $resdata;
        	}
        	else{
        		$resdata=['state'   => '400','message'  => "点击banner广告失败","clickbannerad"=>'fail' ];
                 return $resdata;
        	}
    	}
	}


      //用户今日点击banner广告数量
    public function todayclickbannernumber(Request $request)
    {
    	$wxcode =$request->param("code");
    	$openid=openid($wxcode);
        $dbnum =db('gdt_ad_record')->where('openid',$openid)->where('adtype',1)->whereTime('create_time', 'today')->count();//查询今日点广告数
        $state=['state'   => '200','message'  => "用户todayclickbannernumber" ];
        $resdata=array_merge($state,array('clickbannernumber'=>$dbnum));
        return $resdata;
    }



     //观看视频广告成功记录
	public function lookvideoad(Request $request)
	{
		
		$wxcode =$request->param("code");
		$openid=openid($wxcode);
    	$time =date('Y-m-d H:i:s',time());//获取当前时间
    	$dbnum =db('gdt_ad_record')->where('openid',$openid)->where('adtype',2)->whereTime('create_time', 'today')->count();//查询今日点广告数
    	if($dbnum >= 5){
    		$resdata=['state'   => '400','message'  => "你观看视频广告已经5次了","lookvideoad"=>'fail' ];
            return $resdata;
    	}
    	else{
    		$addscore= db('user')->where('openid',$openid)->setInc('score',$request->param("score"));
    		$adres = ['id'=>'','openid' =>$openid,'channel' =>$request->param("channel"),'master_id' =>$request->param("master_id"),'adid' =>$request->param("adid"),'adtype' =>2,'score' =>$request->param("score"),'create_time' =>$time];
    	    $addata=db('gdt_ad_record')->insert($adres);
    	    $datares = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>"观看视频广告",'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'state' =>0,'create_time' =>$time];
        	$data=db('score_record')->insert($datares);

          $contribution=contribution($request->param("master_id"),$openid,$request->param("score"));//徒弟进贡

        	if($addscore==1&&$addata==1&&$data==1){
        	     $resdata=['state'   => '200','message'  => "观看视频广告成功","lookvideoad"=>'success' ];
                 return $resdata;
        	}
        	else{
        		$resdata=['state'   => '400','message'  => "观看视频广告失败","lookvideoad"=>'fail' ];
                 return $resdata;
        	}
    	}
	}


    //用户今日观看视频广告数量
    public function todaylookvideoadnumber(Request $request)
    {
    	$wxcode =$request->param("code");
    	$openid=openid($wxcode);
        $dbnum =db('gdt_ad_record')->where('openid',$openid)->where('adtype',2)->whereTime('create_time', 'today')->count();//查询今日点广告数
        $state=['state'   => '200','message'  => "用户todaylookvideoadnumber" ];
        $resdata=array_merge($state,array('lookvideoadnumber'=>$dbnum));
        return $resdata;

    }


	public function test(Request $request){
        $master_id =$request->param("master_id");
        $openid =$request->param("openid");

        $reward = reward ($master_id , $openid);

        return $reward ;
		//     	// 获取当日的数据
		// Db::table('table') ->whereTime('times', 'today')->select();
		// // 获取昨天的数据
		// Db::table('table')->whereTime('times', 'yesterday')->select();
		// // 获取本周的数据
		// Db::table('table')->whereTime('times', 'week')->select();   
		// // 获取上周的数据
		// Db::table('table')->whereTime('times', 'last week')->select();    
		// // 获取本月的数据
		// Db::table('table')->whereTime('times', 'month')->select();   
		// // 获取上月的数据
		// Db::table('table')->whereTime('times', 'last month')->select();      
		// // 获取今年的数据
		// Db::table('table')->whereTime('times', 'year')->select();    
		// // 获取去年的数据
		// Db::table('table')->whereTime('times', 'last year')->select();  
    }

    
    
}
