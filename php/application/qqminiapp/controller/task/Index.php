<?php
namespace app\qqminiapp\controller\task;
use think\Db;
use think\Request;
use think\Config;

class Index
{
    public function index(Request $request)
    {

    	return  "任务页面" ;
    }
    
    //查询任务完成数量
    public function todaytask(Request $request)
    {
       $wxcode =$request->param("code");
    	$openid=openid($wxcode);
        $share =db('share_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询用户分享任务数
        $gdtbanner =db('gdt_ad_record')->where('openid',$openid)->where('adtype',1)->whereTime('create_time', 'today')->count();//查询点击广点通banner广告数
        $gdtvideo =db('gdt_ad_record')->where('openid',$openid)->where('adtype',2)->whereTime('create_time', 'today')->count();//查询点击广点通视频广告数
        $miniappad =db('miniapp_ad_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询点击跳转小程序广告数
        $wlad =db('wl_ad_record')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询微量广告数
        $sign =db('sign')->where('openid',$openid)->whereTime('create_time', 'today')->count();//查询用户签到数

        $state=['state'   => '200','message'  => "用户各task数量" ];
        $resdata=array_merge($state,array('share'=>$share,'gdtbanner'=>$gdtbanner,'gdtvideo'=>$gdtvideo,'miniappad'=>$miniappad,'wlad'=>$wlad,'sign'=>$sign));
        return $resdata;
    }

     public function taskconfig(){
        $data = db('config')->where('id', 2)->value('value');
        $adconfig=json_decode($data);
        // return $data ;  json_encode() 和 json_decode()
         $state=['state'   => '200','message'  => "taskconfig" ];
        $resdata=array_merge($state,array('taskconfig'=>$adconfig));
        return $resdata ;
    }
    
    //查询用户有没有做添加微信客服任务
    public function addweixin(Request $request){
      $userid =$request->param("userid");
      $count = db('addweixin')->where('userid', $userid)->count();
      if($count > 0){
        //已经完成过了
        $resdata=['state' => '200','message'  => "已经添加微信" ,'addweixin' => false  ];
        return $resdata ;
      }
      else{
        //还没完成
        $resdata=['state' => '200','message'  => "未添加微信",'addweixin' => true ];
        return $resdata ;
      }
      
  }






}
