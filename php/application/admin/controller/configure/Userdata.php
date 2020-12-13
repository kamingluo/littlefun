<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;

class Userdata
{
   
    //用户列表页面
   public function userlist(Request $request){
     $id=$request->param("id");
     if($id){
        //根据id查询的
        $data=db('user')->where('id',$id)->select();
        $countnumber=1;
        $state=['state'   => '200','message'  => "用户查询成功" ];
        $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
        return $resdata ;
     }
     $pages=$request->param("pages");
     if($pages == 1 || $pages==null  ){
       $number=0;
     }
     else{
       $number=($pages - 1)*10 ;
     }
     $countnumber=db('user')->count();
     $data=db('user')->order('id desc')->limit($number,10)->select();
     $state=['state'   => '200','message'  => "用户列表查询成功" ];
     $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
     return $resdata ;
    }

   //删除用户
   public function deleteuser(Request $request){
        $data=db('user')-> where('id', $request->param("id"))->delete();
        $state=['state'   => '200','message'  => "用户删除成功" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
   }



}