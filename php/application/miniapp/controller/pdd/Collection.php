<?php
namespace app\miniapp\controller\pdd;
use think\Db;
use think\Request;
use think\Config;

class Collection
{
    //商品收藏模块
 public function test(Request $request){
        return "商品收藏模块";
  }

    //商品收藏模块
    public function goodscollection(Request $request){

        $user_id=$request->param("user_id");//用户id
        $mall_type=$request->param("mall_type");//商城类型，1拼多多2淘宝
        $goods_id=$request->param("goods_id");//商品id
        $search_id=$request->param("search_id");//搜索id
        $goods_image_url=$request->param("goods_image_url");//商品图片链接
        $goods_name=$request->param("goods_name");//商品名称
        $mall_name=$request->param("mall_name");//店铺名称
        $sales_tip=$request->param("sales_tip");//销售量
        $min_group_price=$request->param("min_group_price");//原价
        $coupon_discount=$request->param("coupon_discount");//优惠券价格
        $has_coupon=$request->param("has_coupon");//是否有券
        $time =date('Y-m-d H:i:s',time());

        $dbdata = ['id'=>'','user_id' =>$user_id,'mall_type' => $mall_type,'goods_id' => $goods_id,'search_id' => $search_id,'goods_image_url' => $goods_image_url,'goods_name' => $goods_name,
        'mall_name' => $mall_name,'sales_tip' => $sales_tip,'min_group_price' => $min_group_price,'coupon_discount' => $coupon_discount,'has_coupon' => $has_coupon,'create_time' =>$time];
        $collection_id= db('goods_collection')->insertGetId($dbdata);//返回自增ID
        $state=['state'   => '200','message'  => "商品收藏成功" ];
        $resdata=array_merge($state,array('collection_id'=>$collection_id));
        return $resdata ;
    }

    //用户是否收藏该商品
    public function whethercollection(Request $request){
        $user_id=$request->param("user_id");//用户id
        $goods_id=$request->param("goods_id");//商品id

        $dbnum =db('goods_collection')->where('user_id',$user_id)->where('goods_id',$goods_id)->count();//查询今日点广告数
        if($dbnum > 0){
            $resdata=['state'   => '200','message'  => "查询用户是否收藏","ifcollection"=>true ];
            return $resdata;

        }else{
            $resdata=['state'   => '200','message'  => "查询用户是否收藏","ifcollection"=>false ];
            return $resdata;  
        }
    }

      //用户删除收藏记录
      public function deletecollection(Request $request){
        $user_id=$request->param("user_id");//用户id
        $goods_id=$request->param("goods_id");//商品id
       
        $cleardata=db('goods_collection')->where('user_id',$user_id)-> where('goods_id',$goods_id)->delete();

        if($cleardata ==1){
            $state=['state'   => '200','message'  => "删除成功",'cleardata' => $cleardata];
       }
       else{
            $state=['state'   => '400','message'  => "删除失败",'cleardata' => $cleardata ];
       }
       return  $state;
    }

    //查询用户的收藏商品
    public function usercollection(Request $request){
        $user_id=$request->param("user_id");//用户id
        $pages=$request->param("pages");//页数
        if($pages){
            //有传pages
            $newpages= ($pages-1) * 20;//一页20条
            $goodslist =db('goods_collection')->where('user_id',$user_id)->order('id desc')->limit($newpages,20)->select();
        }
        else{
            //兼容没有传页数，返回全部信息
           $goodslist =db('goods_collection')->where('user_id',$user_id)->order('id desc')->select();
        }
        $count =db('goods_collection')->where('user_id',$user_id)->count();
        $state=['state'   => '200','message'  => "查询用户的收藏商品",'count'=>$count ];
        $resdata=array_merge($state,array('goodslist'=>$goodslist));
        return $resdata ;
    }

   
}
