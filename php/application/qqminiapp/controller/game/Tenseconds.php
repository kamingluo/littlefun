<?php
namespace app\miniapp\controller\game;
use think\Db;
use think\Request;
use think\Config;
use think\cache\driver\Redis;

class Tenseconds
{
    public function index(Request $request)
    {

    	return  "十秒挑战" ;
    }


     public function usertensecondsdata(Request $request)
    {
    	  $wxcode =$request->param("code");
		  $openid=openid($wxcode);
    	  $redis = new Redis();  //实例化这个类
          
           $score=$redis->get("tengamescore"); //拿设置的金币缓存
           if( $score == false){

              $score = 100; //如果没有就100金币
           }

          $todaynum =db('ten_seconds_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询今天观看视频次数

          $gamenum=$redis->get($openid);
          if( $gamenum == false){
          	 //缓存不存在
          	$redis->set($openid, 0); //存入缓存，
          	$gamenum =0; //下发为0 
          	$state=['state'   => '200','message'  => "查询用户十秒挑战次数" ];
            $resdata=array_merge($state,array('gamenumber'=>$gamenum),array('todaynum'=>$todaynum),array('score'=>$score));
            return  $resdata;
          	
          }else{
          	 //缓存存在
          	 $newgame= $gamenum+0;
          	 $state=['state'   => '200','message'  => "查询用户十秒挑战次数" ];
             $resdata=array_merge($state,array('gamenumber'=>$newgame),array('todaynum'=>$todaynum),array('score'=>$score));
             return  $resdata;
          }
        
    }



    public function add(Request $request)
    {
    	  $wxcode =$request->param("code");
    	  $channel =$request->param("channel");
		  $openid=openid($wxcode);

		  $dbnum =db('ten_seconds_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询添加次数
		  if($dbnum >= 10){
		  	$resdata=['state'   => '400','message'  => "今天已经看了10次视频了，不能再看了" ];
            return $resdata;
		  }
		  	else{
                 $time =date('Y-m-d H:i:s',time());//获取当前时间
                 $dbdata = ['id'=>'','openid' =>$openid,'channel' =>$channel,'create_time' =>$time]; 
                 $add=db('ten_seconds_record')->insert($dbdata);//添加记录
                 $redis = new Redis();  //实例化这个类
                 $gamenum=$redis->get($openid);
                 $newgame =$gamenum + 1 ;
                 $redis->set($openid,$newgame); //存入缓存，
                 $state=['state'   => '200','message'  => "增加十秒挑战次数" ];
                 $todaynum =  $dbnum+1; //增加一次
                 $resdata=array_merge($state,array('gamenumber'=>$newgame),array('todaynum'=>$todaynum));
                 return  $resdata;
		  }
    }




    public function addscore(Request $request)
    {
    	  $wxcode =$request->param("code");
		    $openid=openid($wxcode);

         $todayaddscorenum=db('score_record')->where('openid',$openid)->whereTime('create_time', 'today')->where('explain',"十秒挑战奖励")->count();
         if($todayaddscorenum > 5 ){
            return ['state'   => '400','message'  => "刷太多了，歇会吧!" ] ;
         }

    	  $redis = new Redis();  //实例化这个类
        $score=$redis->get("tengamescore"); //拿设置的金币缓存
        if( $score == false){
              $score = 100; //如果没有就100金币
        }
        $userdata=db('user')->where('openid',$openid)->find();//查询用户信息
        $dbadd= db('user')->where('openid',$openid)->setInc('score',$score);
        if($dbadd == 1){
           $time =date('Y-m-d H:i:s',time());//获取当前时间
           $dbdata = ['id'=>'','openid' =>$openid,'score' =>$score,'explain' =>"十秒挑战奖励",'channel' =>$userdata['channel'],'master_id' => $userdata['master_id'],'state' =>0,'create_time' =>$time];
           $dbreturn=db('score_record')->insert($dbdata);
           return ['state'   => '200','message'  => "增加十秒挑战奖励成功" ,'score' => $score] ;
        }
        else{
           return ['state'   => '400','message'  => "增加十秒挑战奖励失败" ,'score' => $score] ;
        }
    }





  public function reduce(Request $request)
    {
      $wxcode =$request->param("code");
      $openid=openid($wxcode);
      $redis = new Redis();  //实例化这个类
      $gamenum=$redis->get($openid);
          if( $gamenum == false){
            $state=['state'   => '400','message'  => "已经等于0了不能再减了" ];
            return $state;
          }
          else{
             $newgame =$gamenum - 1 ;
             $redis->set($openid,$newgame); //存入缓存，
             $state=['state'   => '200','message'  => "减少十秒挑战次数" ];
             $resdata=array_merge($state,array('gamenumber'=>$newgame));
             return  $resdata;
          }
        
    }


   

 
}
