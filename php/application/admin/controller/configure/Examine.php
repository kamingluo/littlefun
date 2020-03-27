<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Examine
{
    public function exchangedata(Request $request) //兑换列表查询
    {
        $pages=$request->param("pages");
        $countnumber=db('exchange_record')->count();
        if($pages == 1 || $pages==null  ){
          $data=db('exchange_record')->order('id desc')->limit(0,10)->select();
          $state=['state'   => '200','message'  => "兑换列表查询成功" ];
          $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
          return $resdata ;
        }
        else{
          $number=($pages - 1)*10 ;
          $data=db('exchange_record')->order('id desc')->limit($number,10)->select();
          $state=['state'   => '200','message'  => "兑换列表查询成功" ];
          $resdata=array_merge($state,array('countnumber'=>$countnumber),array('data'=>$data));
          return $resdata ;
        }
        
        
	}
    
    public function sendrewards(Request $request) //发放奖励修改状态
    {
        $id=$request->param("id");//数据id
        $state=$request->param("state");
        $dbreturn= db('exchange_record')->where('id',$id)->update(['state' => $state]);
        $resdata=['state'   => '200','message'  => "修改状态成功" ];
        return $resdata ;    
	}



     public function sendtemmsg(Request $request) //兑换成功发送小程序推送
    {
        // $id=$request->param("id");//数据id
        $state=$request->param("state");
        $openid=$request->param("openid");
        if($state== 1){
          //奖励发放成功，推送消息
        set_time_limit(0);//设置超时时间
         $data['appid']=Config('appid');
         $data['secret']= Config('secret');
         $data['grant_type']= 'client_credential';
         $api = "https://api.weixin.qq.com/cgi-bin/token";//拿token接口
         $str = http($api, $data,'GET');
         $token = json_decode($str,true);
         $access_token=$token['access_token'];//拿到token

         $dataformid=db('formid')->where('openid',$openid)->find();
         $formid= $dataformid['formid']; //拿到formid

         $temid = 'kL3XH4frsBfGQoQsXTsBCb57YSkpePRTaLrXttiQI-c';
         $page = 'pages/index/index';

         $goodname=$request->param("goodsName");

        //if(!$formid)die('failed!');//openid有出现等于0的情况，所以不判断了
           $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token;
           $data = array(//这里一定要按照微信给的格式
           "touser"=>$openid,
           "template_id"=>$temid,
           "page"=>$page,
           "form_id"=>$formid,
           "data"=>array(
            "keyword1"=>array(
                "value"=> $goodname,
                "color"=>"#173177"
            ),
            "keyword2"=>array(
                "value"=>"支付宝余额",
                "color"=>"#173177"
            ),
            "keyword3"=>array(
                "value"=>"奖励已经下发成功！",
                "color"=>"#173177"
            ),
            "keyword4"=>array(
                "value"=>"请到你的支付宝查看余额，有问题请联系客服！",
                "color"=>"#173177"
            )
           ),
           "emphasis_keyword"=>"keyword5.DATA",//需要进行加大的消息
           );
           $res = postCurl($url,$data,'json');//将data数组转换为json数据
           if($res){
                $deletedata=db('formid')-> where('formid', $formid)->delete();
              return ['state'   => '200','message'  => "推送成功" ];
           // echo json_encode(array('state'=>4,'msg'=>$res));
           }else{
              $deletedata=db('formid')-> where('formid', $formid)->delete();
              return ['state'   => '200','message'  => "推送失败" ];
           // echo json_encode(array('state'=>5,'msg'=>$res));
           }

        }
        else
        {
          return ['state'   => '200','message'  => "发放失败不推送" ];
        }

  }






    
}
