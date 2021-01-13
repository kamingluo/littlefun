<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Adstatistics
{
   //广告总数统计
  public function alladnumber(Request $request){
    

    $allloadbanner=db('gdt_ad_load')-> where('adtype',1)->whereTime('create_time', 'today')->count();//今天加载banner广告总数
    $allloadmoban=db('gdt_ad_load')-> where('adtype',5)->whereTime('create_time', 'today')->count();//今天加载模板广告总数
    $loadbanner=db('gdt_ad_load')-> where('adtype',1)-> where('state',0)->whereTime('create_time', 'today')->count();//今天加载banner广告成功数
    $loadmoban=db('gdt_ad_load')-> where('adtype',5)-> where('state',0)->whereTime('create_time', 'today')->count();//今天加载模板广告成功数

    $clickmoban=db('click_gdt_ad')-> where('adtype',5)->whereTime('create_time', 'today')->group("user_id")->count();//今天点击模板去重广告数
    $clickbanner=db('click_gdt_ad')-> where('adtype',1)->whereTime('create_time', 'today')->group("user_id")->count();//今天点击banner去重广告数

    $bannerproportion=round($loadbanner/$allloadbanner*100,2)."％";//加载banner广告成功率

    $mobanproportion=round($loadmoban/$allloadmoban*100,2)."％";//加载模板广告成功率
    
    $data = ['allloadbanner' =>$allloadbanner,'allloadmoban'=>$allloadmoban,'loadbanner'=>$loadbanner,'loadmoban'=>$loadmoban,'clickmoban'=>$clickmoban,'clickbanner'=>$clickbanner,'bannerproportion'=>$bannerproportion,'mobanproportion'=>$mobanproportion];
    $state=['state'   => '200','message'  => "广告总数统计" ];
    $resdata=array_merge($state,array('data'=>$data));
    return $resdata;
   
  }

  public function channeladclick(Request $request)
  {

    $sql = "select count(1) as count,a.channel,b.name from click_gdt_ad a,channel b where a.channel=b.channel and  to_days(a.create_time) = to_days(now())  group by a.channel ORDER BY count DESC;";
    $data = Db::query($sql); //拿到数据
    $allnumber=db('click_gdt_ad')->whereTime('create_time', 'today')->count();//总点击数
    $state=['state'   => '200','message'  => "广告点击渠道数" ];
    $resdata=array_merge($state,array('allusersnumber'=>$allnumber),array('data'=>$data));
    return $resdata;
  }

  public function channeladclickdetails(Request $request)
  {
    $channel=$request->param("channel");
    $allloadbanner=db('gdt_ad_load')-> where('adtype',1)-> where('channel',$channel)->whereTime('create_time', 'today')->count();//今天加载banner广告总数
    $allloadmoban=db('gdt_ad_load')-> where('adtype',5)-> where('channel',$channel)->whereTime('create_time', 'today')->count();//今天加载模板广告总数
    $loadbanner=db('gdt_ad_load')-> where('adtype',1)-> where('state',0)-> where('channel',$channel)->whereTime('create_time', 'today')->count();//今天加载banner广告成功数
    $loadmoban=db('gdt_ad_load')-> where('adtype',5)-> where('state',0)-> where('channel',$channel)->whereTime('create_time', 'today')->count();//今天加载模板广告成功数
    $clickmoban=db('click_gdt_ad')-> where('adtype',5)-> where('channel',$channel)->whereTime('create_time', 'today')->group("user_id")->count();//今天点击模板去重广告数
    $clickbanner=db('click_gdt_ad')-> where('adtype',1)-> where('channel',$channel)->whereTime('create_time', 'today')->group("user_id")->count();//今天点击banner去重广告数
    // $bannerproportion=round($loadbanner/$allloadbanner*100,2)."％";//加载banner广告成功率
    // $mobanproportion=round($loadmoban/$allloadmoban*100,2)."％";//加载模板广告成功率
    $bannerproportion=0;//加载banner广告成功率
    $mobanproportion=0;//加载模板广告成功率
    $data = ['加载banner广告数' =>$allloadbanner,'加载模版广告数'=>$allloadmoban,'banner广告加载成功数'=>$loadbanner,'模板广告加载成功数'=>$loadmoban,'点击模板广告数(去重)'=>$clickmoban,'点击banner广告数(去重)'=>$clickbanner,'banner广告加载成功率'=>$bannerproportion,'模板广告加载成功率'=>$mobanproportion];
    $state=['state'   => '200','message'  => "广告总数统计" ];
    $resdata=array_merge($state,array('data'=>$data));
    return $resdata;
  }







   
  

}