<?php
namespace app\miniapp\controller;
use think\Db;
use think\Request;
use think\Config;

class Index
{
    public function index(Request $request)
    {

    	return  "一点好玩" ;
    }

    
    //首页下面第三方小程序广告配置列表
    public function miniappad()
    {
       $dbdata=db('index_miniapp_ad')->where('open',0)->order('id asc')->select();
        $state=['state'   => '200','message'  => "miniappad列表查询成功" ];
        $resdata=array_merge($state,array('miniappdata'=>$dbdata));
        return $resdata ;
    }

    //首页顶部轮播图和豆腐块配置数据
     public function indexdata()
    {
        $swiperdata=db('index_swiper')->where('open',0)->order('id asc')->select();//查询轮播图配置信息
        $informationdata=db('index_information')->where('open',0)->order('id asc')->select();//查询轮播图配置信息
        $state=['state'   => '200','message'  => "首页配置数据查询成功" ];
        $resdata=array_merge($state,array('swiperdata'=>$swiperdata),array('informationdata'=>$informationdata));
        return $resdata ;
    }

    public function indexconfig(){
        $data = db('config')->where('id', 1)->value('value');
        $adconfig=json_decode($data);
        // return $data ;  json_encode() 和 json_decode()
        $state=['state'   => '200','message'  => "微信小程序indexconfig" ];
        $resdata=array_merge($state,array('indexconfig'=>$adconfig));
        return $resdata ;
    }

}
