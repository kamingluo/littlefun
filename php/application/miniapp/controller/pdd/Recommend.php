<?php
namespace app\miniapp\controller\pdd;
use think\Db;
use think\Request;
use think\Config;

class Recommend
{
    //多多客获取爆款排行商品接口
    public function goodspopular(Request $request){
      $pages=$request->param("pages");//商品id
      if(!$pages){
        $pages=0;
      }
      $offset=$pages*20;
      $type="pdd.ddk.top.goods.list.query";//查询的接口
      $p_id=Config('pdd_p_id');
      $data=array(
          "limit"=>20,
          "p_id"=>$p_id,
          "offset"=>$offset,
          "type"=>$type
      );
      $goodspopulardata=computeSignature($data);
      $resdata = ['state' => '200','message' => "多多客获取爆款排行商品查询成功",'goodspopulardata'=>$goodspopulardata];
      return  $resdata ;

  }

  //运营频道商品查询API：pdd.ddk.goods.recommend.get
  //参数channel_type:0-1.9包邮, 1-今日爆款, 2-品牌好货,3-相似商品推荐,4-猜你喜欢,5-实时热销,6-实时收益,7-今日畅销,8-高佣榜单，默认1
  //参数cat_id,猜你喜欢场景的商品类目，20100-百货，20200-母婴，20300-食品，20400-女装，20500-电器，20600-鞋包，20700-内衣，20800-美妆，20900-男装，21000-水果，21100-家纺，21200-文具,21300-运动,21400-虚拟,21500-汽车,21600-家装,21700-家具,21800-医药
public function recommend(Request $request){
      $pages=$request->param("pages");//页数
      $channel_type=$request->param("channel_type");//类型1
      $cat_id=$request->param("cat_id");//类型2
      if(!$pages){
        $pages=0;
      }
      if(!$channel_type){
        $channel_type=1;
      }
      $offset=$pages*20;
      $type="pdd.ddk.goods.recommend.get";//查询的接口
      $p_id=Config('pdd_p_id');
      $data=array(
          "limit"=>20,
          "cat_id"=>$cat_id,
          "channel_type"=>$channel_type,
          "p_id"=>$p_id,
          "offset"=>$offset,
          "type"=>$type
      );
      $recommenddata=computeSignature($data);
      $resdata = ['state' => '200','message' => "运营频道商品查询成功",'recommenddata'=>$recommenddata];
      return  $resdata ;

  }
   
}
