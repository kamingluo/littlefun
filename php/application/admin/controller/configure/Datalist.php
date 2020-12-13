<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Datalist
{
   //加载广告列表
  public function loadadlist(Request $request){
    
    $pages=$request->param("pages");
    if($pages == 1 || $pages==null  ){
      $number=0;
    }
    else{
      $number=($pages - 1)*10 ;
    }
  
     $countnumber=db('click_gdt_ad')->count();
     $data=db('gdt_ad_load')->order('id desc')->limit($number,10)->select();
    $state=['state'   => '200','message'  => "加载广告列表查询成功" ];
    $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
    return $resdata ;
   
}


    //点击广告列表
    public function clickadlist(Request $request){
    
      $pages=$request->param("pages");
      if($pages == 1 || $pages==null  ){
        $number=0;
      }
      else{
        $number=($pages - 1)*10 ;
      }
    
       $countnumber=db('click_gdt_ad')->count();
       $data=db('click_gdt_ad')->order('id desc')->limit($number,10)->select();
      $state=['state'   => '200','message'  => "点击广告列表查询成功" ];
      $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
      return $resdata ;
     
  }
    

   


}