<?php
namespace app\football\controller;
use think\Db;
use think\Config;、
use think\Request;

class Index
{

    public function usersdata()
    {
        $userdata =db('user')->order('id desc')-> select();//查询信息
        $state=['state'   => '200','message'  => "用户列表" ];
        $resdata=array_merge($state,array('userdata'=>$userdata));
        return  $resdata;
    }
}
