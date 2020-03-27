<?php


namespace app\admin\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class Statistics
{
   
    //统计前一天的相关数据，一般是凌晨执行
    public function payscore()
    {

        set_time_limit(0);//设置超时时间


         //所有的支出
        $all=db('score_record')->whereTime('create_time', 'yesterday')->sum('score');

        //签到支出
        $sign=db('sign')->whereTime('create_time', 'yesterday')->sum('score');

         //广点通广告
        $gdtad=db('gdt_ad_record')->whereTime('create_time', 'yesterday')->sum('score');

         //miniapp广告
        $miniappad=db('miniapp_ad_record')->whereTime('create_time', 'yesterday')->sum('score');

         //微量广告
        $wlad=db('wl_ad_record')->whereTime('create_time', 'yesterday')->sum('score');

         //分享
        $share=db('share_record')->whereTime('create_time', 'yesterday')->sum('score');

        //进贡
        $paytribute=db('score_record')-> where('explain',"徒弟进贡")->whereTime('create_time', 'yesterday')->sum('score');

        //骰子赢得
        $dicewin=db('score_record')-> where('explain',"猜大小赢得")->whereTime('create_time', 'yesterday')->sum('score');

        //骰子输了
        $dicelose=db('score_record')-> where('explain',"猜大小输了")->whereTime('create_time', 'yesterday')->sum('score');


        //猜拳赢得
        $caiquanwin=db('score_record')-> where('explain',"猜拳赢得")->whereTime('create_time', 'yesterday')->sum('score');

        //猜拳输了
        $caiquanlose=db('score_record')-> where('explain',"猜拳输了")->whereTime('create_time', 'yesterday')->sum('score');

        //提现金币数
        $exchangecoin=db('score_record')-> where('explain',"金币兑换礼品")->whereTime('create_time', 'yesterday')->sum('score');

         //添加微信客服支出
         $addweixinscore=db('addweixin')->whereTime('create_time', 'yesterday')->sum('score');



         $time =date("Y-m-d H:i:s", strtotime("-1 day"));//获取当前时间的前一天

        if($sign >= 0&&$all >= 0 && $gdtad >=0 && $miniappad >= 0&& $wlad >= 0){

          $dbdata = ['id'=>'','whole' =>$all,'gdtad' =>$gdtad,'wlad' =>$wlad,'miniappad' =>$miniappad,'sign' =>$sign,'share' =>$share,'paytribute' =>$paytribute,'dicewin' =>$dicewin,'dicelose' =>$dicelose,'caiquanwin' =>$caiquanwin,'caiquanlose' =>$caiquanlose,'exchangecoin' =>$exchangecoin,'addweixin' =>$addweixinscore,'create_time' =>$time];
          $resdata=db('statistics')->insert($dbdata);

          return "统计成功(1为成功)-->" . $resdata ;



        }
        else{
        	 return  "统计失败";
        }

    }
   

}
