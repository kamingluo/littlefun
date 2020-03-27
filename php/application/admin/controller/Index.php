<?php
namespace app\admin\controller;
use think\Db;
use think\Config;

class Index
{


    public function channeldata()
    {
        $sql = "select count(1) as count,a.channel,b.name from user a,channel b where a.channel=b.channel group by a.channel ORDER BY count DESC;";
        $data = Db::query($sql); //拿到数据
        $allusersnumber=db('user')->count();//总注册用户数
        $state=['state'   => '200','message'  => "渠道注册用户数" ];
        $resdata=array_merge($state,array('allusersnumber'=>$allusersnumber),array('data'=>$data));
        return $resdata;
        
    }

    public function usersdata()
    {
        $allusersnumber=db('user')->count();//总注册用户数
        $todayregisterusersnumber=db('user')->whereTime('create_time', 'today')->count();//今天注册用户数
        $todayactiveusersnumber=db('user')->whereTime('updata_time', 'today')->count();//今天活跃用户数
        $todaypupilnumber=db('tribute_table')->whereTime('create_time', 'today')->count();//今天收徒数
        $yesterdayregisterusersnumber=db('user')->whereTime('create_time', 'yesterday')->count();//昨天注册用户数
        $yesterdayactiveusersnumber=db('user')->whereTime('updata_time', 'yesterday')->count();//昨天活跃用户数
        $yesterdaypupilnumber=db('tribute_table')->whereTime('create_time', 'yesterday')->count();//昨天收徒数
        $data = ['allusersnumber' =>$allusersnumber,'todayregisterusersnumber'=>$todayregisterusersnumber,'todayactiveusersnumber'=>$todayactiveusersnumber,'todaypupilnumber'=>$todaypupilnumber,'yesterdayregisterusersnumber'=>$yesterdayregisterusersnumber,'yesterdayactiveusersnumber'=>$yesterdayactiveusersnumber,'yesterdaypupilnumber'=>$yesterdaypupilnumber];
        $state=['state'   => '200','message'  => "用户数据" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata;
    }



    public function historycoins()
    {
    	$sql = "SELECT SUM(whole)as whole,SUM(gdtad)as gdtad,SUM(wlad)as wlad,SUM(miniappad)as miniappad,SUM(sign)as sign,SUM(share) as share,SUM(addweixin) as addweixin,SUM(paytribute)as paytribute,SUM(dicewin)as dicewin,SUM(dicelose)as dicelose,SUM(caiquanwin)as caiquanwin,SUM(caiquanlose)as caiquanlose,SUM(exchangecoin)as exchangecoin  FROM statistics;";
        $data = Db::query($sql); //拿到数据

        $state=['state'   => '200','message'  => "拿到今天为止所有数据的和" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata;
    }



    //统计今天数据
    public function todaycoins()
    {

        set_time_limit(0);//设置超时时间


         //所有的支出
        $all=db('score_record')->whereTime('create_time', 'today')->sum('score');

        //签到支出
        $sign=db('sign')->whereTime('create_time', 'today')->sum('score');

         //广点通广告
        $gdtad=db('gdt_ad_record')->whereTime('create_time', 'today')->sum('score');

         //miniapp广告
        $miniappad=db('miniapp_ad_record')->whereTime('create_time', 'today')->sum('score');

         //微量广告
        $wlad=db('wl_ad_record')->whereTime('create_time', 'today')->sum('score');

         //分享
        $share=db('share_record')->whereTime('create_time', 'today')->sum('score');

        //进贡
        $paytribute=db('score_record')-> where('explain',"徒弟进贡")->whereTime('create_time', 'today')->sum('score');

        //添加客服微信
        $addweixin=db('addweixin')->whereTime('create_time', 'today')->sum('score');

        //骰子赢得
        $dicewin=db('score_record')-> where('explain',"猜大小赢得")->whereTime('create_time', 'today')->sum('score');

        //骰子输了
        $dicelose=db('score_record')-> where('explain',"猜大小输了")->whereTime('create_time', 'today')->sum('score');


        //猜拳赢得
        $caiquanwin=db('score_record')-> where('explain',"猜拳赢得")->whereTime('create_time', 'today')->sum('score');

        //猜拳输了
        $caiquanlose=db('score_record')-> where('explain',"猜拳输了")->whereTime('create_time', 'today')->sum('score');

        //提现金币数
        $exchangecoin=db('score_record')-> where('explain',"金币兑换礼品")->whereTime('create_time', 'today')->sum('score');


        $data = ['whole' =>$all,'gdtad' =>$gdtad,'wlad' =>$wlad,'miniappad' =>$miniappad,'sign' =>$sign,'share' =>$share,'paytribute' =>$paytribute,'addweixin' =>$addweixin,'dicewin' =>$dicewin,'dicelose' =>$dicelose,'caiquanwin' =>$caiquanwin,'caiquanlose' =>$caiquanlose,'exchangecoin' =>$exchangecoin];

        $state=['state'   => '200','message'  => "拿到今天所有数据的和" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata;

        

    }
      
   
}
