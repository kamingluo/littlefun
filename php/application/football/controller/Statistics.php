<?php


namespace app\football\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class Statistics
{
   
    //统计某个时间的数据
    public function timeslot(Request $request)
    {
        set_time_limit(0);//设置超时时间
        $day=$request->param("day");
        $time=date('Y-m-d',time());//获取当前时间
        if($day==0){
            //查询今天
            $investment=db('record')->whereTime('create_time', 'today')->sum('money');
            $transport=db('record')->where('state = 4  OR  state = 5')->whereTime('create_time', 'today')->sum('profit');
            $win=db('record')->where('state = 1  OR  state = 2')->whereTime('create_time', 'today')->sum('profit');
        }
        else if($day==1){
            //查询昨天
            $investment=db('record')->whereTime('create_time', 'yesterday')->sum('money');
            $transport=db('record')->where('state = 4  OR  state = 5')->whereTime('create_time', 'yesterday')->sum('profit');
            $win=db('record')->where('state = 1  OR  state = 2')->whereTime('create_time', 'yesterday')->sum('profit');

        }
        else{
            //查询这时间段
            $newday=-$day.' days' ;
            $newtime=date("Y-m-d", strtotime($newday));//计算的时间
            $investment=db('record')-> where('create_time','>= time', $newtime)->sum('money');
            $transport=db('record')->where('state = 4  OR  state = 5')-> where('create_time','>= time', $newtime)->sum('profit');
            $win=db('record')->where('state = 1  OR  state = 2')-> where('create_time','>= time', $newtime)->sum('profit');
        }

        $data['investment']=$investment;
        $data['transport']=$transport;
        $data['win']=$win;
        $state=['state'=> '200','message'  => "查询时间段数据",'data' => $data, ];
        return  $state;
    }


    //统计全部
    public function all(Request $request)
    {
        set_time_limit(0);//设置超时时间
        $investment=db('record')->sum('money');//总投资
        $transport=db('record')->where('state = 4  OR  state = 5')->sum('profit');//输
        $win=db('record')->where('state = 1  OR  state = 2')->sum('profit');//赢
        $data['investment']=$investment;
        $data['transport']=$transport;
        $data['win']=$win;
        $state=['state'=> '200','message'  => "总数据",'data' => $data, ];
        return  $state;
    }
   

}
