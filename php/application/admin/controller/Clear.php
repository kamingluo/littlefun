<?php


namespace app\admin\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;
use think\cache\driver\Redis;
class Clear
{
    //定时清理
    public function timingclear()
    {

        // return  "定时清理" ;
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        $weekend=date("Y-m-d H:i:s", strtotime('-3 days'));//获取三天时间


        $seven=date("Y-m-d H:i:s", strtotime('-7 days'));//获取三天时间

        //清理积分增加减少7天前的记录
        $score=db('score_record')-> where('create_time','< time', $seven)->delete();

        //广点通广告7天数据清理
        $gdt=db('gdt_ad_record')-> where('create_time','< time', $seven)->delete();

        //微量广告7天数据清理
        $wl=db('wl_ad_record')-> where('create_time','< time', $seven)->delete();


        //miniappad广告7天数据清理
        $miniapp=db('miniapp_ad_record')-> where('create_time','< time', $seven)->delete();

         //签到七天数据清理
        $sign=db('sign')-> where('create_time','< time', $seven)->delete();
         //分享七天数据清理
        $share=db('share_record')-> where('create_time','< time', $seven)->delete();

        if($miniapp >= 0&&$score >= 0 && $gdt >=0 && $wl >= 0){
             return " 共清理积分记录-->".$score. "    广点通数据-->" .$gdt ."    微量数据-->" .$wl ."    miniapp数据-->". $miniapp.   "     签到数据-->" .$sign.  "     分享数据-->" .$share ;
        }
        else{
             return "清理失败";
        }

    }


    public function test( Request $request)
    {
        

         $redis = new Redis();  //实例化这个类
          $redis->set('o59ku5SyR4Z7s8zHPw5zI4UYbk84', "womne");
         $data=$redis->get('o59ku5SyR4Z7s8zHPw5zI4UYbk84');
         return $data;


    }





   

}
