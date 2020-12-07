<?php
namespace app\miniapp\controller\pdd;
use think\Request;
use think\Config;

class Search
{

  public function test(Request $request){
   return "测试接口";
  }


  public function goodssearch(Request $request)
  {
      $keyword=$request->param("keyword");//查询关键字
      $page=$request->param("page");//查询页数
      if($page==null){
       $page=1;
      }
      $page_size=20;//每页查询多少条
      $type="pdd.ddk.goods.search";//查询的接口
      $p_id=Config('pdd_p_id');
      $custom_parameters="{'new':1}";
      $data=array(
        "custom_parameters"=>$custom_parameters,
        "keyword"=>$keyword,
        "page"=>$page,
        "page_size"=>$page_size,
        "p_id"=>$p_id,
        "type"=>$type
      );
      $goodslist=computeSignature($data);
      $resdata = ['state' => '200','message' => "查询商品列表成功",'goodslist'=>$goodslist];
      return  $resdata ;
  }


  //生成多多客链接
  public function goodspromotion(Request $request){
      $goods_id=$request->param("goods_id");//商品id，传入形式要['54546566']
      $search_id=$request->param("search_id");//商品id
      if(!$search_id){
        $search_id=$goods_id;
      }
      $type="pdd.ddk.goods.promotion.url.generate";//查询的接口
      $p_id=Config('pdd_p_id');
      $data=array(
          "goods_id_list"=>$goods_id,
          "search_id"=>$search_id,
          "p_id"=>$p_id,
          "generate_we_app"=>"true",
          "type"=>$type
      );
      $goodsurldata=computeSignature($data);
      $resdata = ['state' => '200','message' => "多多客链接生成成功",'goodsurldata'=>$goodsurldata];
      return  $resdata ;

  }


    //商品详情查询
    public function goodsdetail(Request $request){
      $goods_id=$request->param("goods_id");//商品id
      $type="pdd.ddk.goods.detail";//查询的接口
      $data=array(
          "goods_id_list"=>$goods_id,
          "type"=>$type
      );
      $goodsdetails=computeSignature($data);
      $resdata = ['state' => '200','message' => "商品详情查询成功",'goodsdetails'=>$goodsdetails];
      return  $resdata ;

  }
    
   
}
