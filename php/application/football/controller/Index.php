<?php
namespace app\football\controller;
use think\Db;
use think\Config;、
use think\Request;

class Index
{

    public function usersdata()
    {

       $sql = "select count(1) as count,b.* from record a,user b where a.user=b.id group by a.user ORDER BY count DESC;";
        $userdata = Db::query($sql); //拿到数据
        //$userdata =db('user')->order('id desc')-> select();//查询信息
        $state=['state'   => '200','message'  => "用户列表" ];
        $resdata=array_merge($state,array('userdata'=>$userdata));
        return  $resdata;
    }
}
