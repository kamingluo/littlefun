<?php
namespace app\miniapp\controller;
use think\Db;
use think\Request;
use think\Config;

class Statistics
{
    public function statistics(Request $request)
    {
        set_time_limit(0);//设置超时时间
        $registerusers=db('user')->whereTime('create_time', 'today')->count();//今天注册用户数
        $activeusers=db('user')->whereTime('update_time', 'today')->count();//今天活跃用户数
        $builtcrowd=db('crowd')->whereTime('create_time', 'today')->count();//今天创建群数量
        $joincrowd=db('user_crowd')->where('user_type',0)->whereTime('create_time', 'today')->count();//今天加入群人数，去除创建的
        $crowd_news=db('crowd_news')->whereTime('create_time', 'today')->count();//今天发布新闻数量
        $task_record=db('task_record')->whereTime('create_time', 'today')->count();//今天上传任务兑换商品发布新闻数量
        $sigin=db('signin_user_data')->whereTime('create_time', 'today')->count();//今日签到用户次数
        $lottery=db('lottery_partake_list')->whereTime('create_time', 'today')->count();//今日抽奖用户次数
        
        $data = ['registerusers' =>$registerusers,'activeusers'=>$activeusers,'builtcrowd'=>$builtcrowd,'joincrowd'=>$joincrowd,'crowd_news'=>$crowd_news,
        'sigin'=>$sigin,'lottery'=>$lottery,'task_record'=>$task_record];
        $state=['state'   => '200','message'  => "常规数据" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata;
    }


    //商品推广统计，拼多多成功跳转，淘宝复制淘口令
    public function commercestatistics(Request $request)
    {
        $user_id=$request->param("user_id");//用户id
        $channel=$request->param("channel");//用户id
        $mall_type=$request->param("mall_type");//商城类型，1拼多多2淘宝
        $goods_name=$request->param("goods_name");//商品名称
        $goods_image_url=$request->param("goods_image_url");//商品图片链接
        $sales_tip=$request->param("sales_tip");//销售量
        $min_group_price=$request->param("min_group_price");//原价
        $coupon_discount=$request->param("coupon_discount");//优惠券价格
        $time =date('Y-m-d H:i:s',time());

        $dbdata = ['id'=>'','user_id' =>$user_id,'channel' => $channel,'mall_type' => $mall_type,'goods_image_url' => $goods_image_url,'goods_name' => $goods_name,
        'sales_tip' => $sales_tip,'min_group_price' => $min_group_price,'coupon_discount' => $coupon_discount,'create_time' =>$time];
        $statistics_id= db('e_commerce_statistics')->insertGetId($dbdata);//返回自增ID
        $state=['state'   => '200','message'  => "商品推广统计成功" ];
        $resdata=array_merge($state,array('statistics_id'=>$statistics_id));
        return $resdata ;
    }









    
}
