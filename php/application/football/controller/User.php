<?php
namespace app\football\controller;
use think\Db;
use think\Config;
use think\Request;

class User
{

    public function usersdata(Request $request)
    {
      $sql = "select count(1) as count,b.* from record a,user b where a.user=b.id group by a.user ORDER BY b.id ASC;";
      $userdata = Db::query($sql); //拿到数据
        //$userdata =db('user')->order('id ASC')-> select();//查询信息
        $state=['state'   => '200','message'  => "用户列表" ];
        $resdata=array_merge($state,array('userdata'=>$userdata));
        return  $resdata;
    }
}
