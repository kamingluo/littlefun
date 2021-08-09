<?php


namespace app\football\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class Statistics
{
   
    //统计前一天的相关数据，一般是凌晨执行
    public function payscore(Request $request)
    {

        set_time_limit(0);//设置超时时间
        return  "统计失败";
    }
   

}
