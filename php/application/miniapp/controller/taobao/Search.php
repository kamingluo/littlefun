<?php
namespace app\miniapp\controller\taobao;
use think\Request;
use think\Config;

class Search
{

  public function test(Request $request){
    $data=[
      'state'=>1,
      'msg'=>'更新成功'
  ];
  echo json_encode($data);
   return "淘宝测试接口";
  }


  public function goodssearch(Request $request)
  {
      $keyword=$request->param("keyword");//查询关键字
      $page=$request->param("page");//查询页数
      if($page==null){
       $page=1;
      }
      $page_size=20;//每页查询多少条
      $method="taobao.tbk.dg.material.optional";//查询的接口
      $adzone_id=Config('taobao_adzone_id');
      $data=array(
        "q"=>$keyword,
        "page_no"=>$page,
        "adzone_id"=>$adzone_id,
        "page_size"=>$page_size,
        "method"=>$method
      );
      $goodslist=taobaorequest($data);
      $resdata = ['state' => '200','message' => "搜索淘宝商品列表成功",'goodslist'=>$goodslist];
      return  $resdata ;
  }


  public function tpwdcreate(Request $request)
  {
      $url=$request->param("url");//查询关键字
      $newurl="https:".$url;//淘宝返回的链接没有https:开头会生成不了口令
      $text="群记分小程序推广";//弹框说明
      $method="taobao.tbk.tpwd.create";//查询的接口
      $data=array(
        "url"=>$newurl,
        "text"=>$text,
        "logo"=>'https://material.gzywudao.top/image/group/groupicon.png',
        "method"=>$method
      );
      $tpwddata=taobaorequest($data);
      $resdata = ['state' => '200','message' => "淘口令生成",'tpwddata'=>$tpwddata];
      return  $resdata ;
  }

  public function goodsdetail(Request $request)
  {
      $num_iids=$request->param("num_iids");//商品id
      $activity_id=$request->param("activity_id");//优惠券id(可以为空)
      $method="taobao.tbk.item.info.get";//查询的接口
      $data=array(
        "num_iids"=>$num_iids,
        "method"=>$method
      );
      $goodsdetail=taobaorequest($data);

      $getcoupon=array(
        "item_id"=>$num_iids,
        "activity_id"=>$activity_id,
        "method"=>'taobao.tbk.coupon.get'
      );
      $coupondata=taobaorequest($getcoupon);

      $resdata = ['state' => '200','message' => "淘宝客商品详情",'goodsdetail'=>$goodsdetail,'coupondata'=>$coupondata,'activity_id'=>$activity_id];
      return  $resdata ;
  }


  //淘宝客物料精选（material_id：官方的物料Id(详细物料id见：https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html#/detail/10628875?_k=gpov9a)）
  public function optimusmaterial(Request $request)
  {
      $material_id=$request->param("material_id");//物料id
      $page=$request->param("page");//查询页数
      if($page==null){
       $page=1;
      }
      $page_size=20;//每页查询多少条
      $adzone_id=Config('taobao_adzone_id');
      $method="taobao.tbk.dg.optimus.material";//查询的接口
      $data=array(
        "material_id"=>$material_id,
        "page_no"=>$page,
        "page_size"=>$page_size,
        "adzone_id"=>$adzone_id,
        "method"=>$method
      );
      $goodsdata=taobaorequest($data);
      $resdata = ['state' => '200','message' => "淘宝客物料精选",'goodsdata'=>$goodsdata];
      return  $resdata ;
  }



    
   
}
