<?php
namespace app\miniapp\controller;
use think\Db;
use think\Request;
use think\Config;

class Friends
{
    public function Friends(Request $request)
    {

    	return  "我的好友" ;
    }
    
    //首页下面第三方小程序广告配置列表
    public function friendslist(Request $request)
    {
       // $dbdata=db('tribute_table')->where('master_id',$request->param("userid"))->order('pay_tribute desc')->limit(20)->select();
       $dbdata=db('tribute_table')->where('master_id',$request->param("userid"))->order('pay_tribute desc')->select();
       //进贡总数
        $scoresum=db('tribute_table')-> where('master_id',$request->param("userid"))->sum('pay_tribute');
        $state=['state'   => '200','message'  => "friendslist列表查询成功",'scoresum'  => $scoresum ];
        $resdata=array_merge($state,array('friendsdata'=>$dbdata));
        return $resdata ;
    }

}
