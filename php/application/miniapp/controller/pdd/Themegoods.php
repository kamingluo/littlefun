<?php
namespace app\miniapp\controller\pdd;
use think\Db;
use think\Request;
use think\Config;

class Themegoods
{
    //多多进宝主题商品查询
    public function themegoodssearch(Request $request){
      $theme_id=$request->param("theme_id");//商品id
      $type="pdd.ddk.theme.goods.search";//查询的接口
      $data=array(
          "theme_id"=>$theme_id,
          "type"=>$type
      );
      $goodsdata=computeSignature($data);
      $resdata = ['state' => '200','message' => "多多进宝主题商品查询",'goodsdata'=>$goodsdata];
      return  $resdata ;

  }

  //多多进宝主题列表查询
public function themelistget(Request $request){
      $type="pdd.ddk.theme.list.get";//查询的接口
      $data=array(
          "type"=>$type
      );
      $themelists=computeSignature($data);
      $resdata = ['state' => '200','message' => "多多进宝主题列表查询",'themelists'=>$themelists];
      return  $resdata ;

  }

  //生成多多进宝频道推广
  //本接口用于进行平台大促活动（如618、双十一活动）、平台优惠频道转链（电器城、限时秒杀等）
public function resourceurlgen(Request $request){
    $type="pdd.ddk.resource.url.gen";//查询的接口
    $resource_type=$request->param("resource_type");//（入参resource_type：4-限时秒杀,39997-充值中心, 39998-转链type，39996-百亿补贴）
    $p_id=Config('pdd_p_id');
    $data=array(
        "generate_we_app"=>"true",
        "type"=>$type,
        "resource_type"=>$resource_type,
        "pid"=>$p_id
    );
    $resourceurldata=computeSignature($data);
    $resdata = ['state' => '200','message' => "生成多多进宝频道推广",'resourceurldata'=>$resourceurldata];
    return  $resdata ;

}
   
}
