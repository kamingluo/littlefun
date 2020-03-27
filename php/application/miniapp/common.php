<?php
// +----------------------------------------------------------------------
// | wxcarminiapp公共方法
// +----------------------------------------------------------------------

use think\Log;
use think\Db;
use think\Request;

use think\Controller;



//测试方法
function test(){
    return "test";

}


/**
   * 调取微信接口获取openid
   * 传入值code从小程序login API获取
   * @return string
*/
function openid($wxcode){
    if($wxcode == 'kaming'){
        $openid='o3XMA0enuFRZsOCOCeqjB70exjr4';
        return $openid;

    }
    $url = 'https://api.weixin.qq.com/sns/jscode2session';
    $data['appid']=Config('appid');
    $data['secret']= Config('secret');
    $data['js_code']= $wxcode;
    $data['grant_type']= 'authorization_code';
    $wxopenid = http($url, $data, 'GET');
    $openiddata=json_decode($wxopenid,true);
    $rest=array_key_exists("errcode",$openiddata);//判断返回值存在errcode证明code有误
        if($rest){ 
             Log::record('code错误或者过期了！传入微信code-->'.$wxcode,'error');
            echo  json_encode(['state'   => '400','message'  => "code错误或者过期了！" ] ) ;
            die ();
        }
        else{
        	$openid=$openiddata['openid'];
        	return $openid;
        }
}



/**
   * 增加积分方法
   * $explain 增加积分说明
*/
function increase($openid,$data,$explain){
    $dbreturn= db('user')->where('openid',$openid)->setInc('score',$data['score']);
    // return $dbreturn;
    if($dbreturn == 1){
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        $dbdata = ['id'=>'','openid' =>$openid,'score' =>$data['score'],'explain' =>$explain,'channel' =>$data['channel'],'master_id' => $data['master_id'],'state' =>0,'create_time' =>$time];
        $dbreturn=db('score_record')->insert($dbdata);
        return 1;
        }
        else{
            return 0;    
        }

}

/**
   * 进贡表增加数据
   * tribute_table
*/
function tribute($master_id,$userId,$channel){
  if($master_id == 0){
    return ;
}
    $time =date('Y-m-d H:i:s',time());//获取当前时间
    $record = ['id'=>'','master_id' =>$master_id,'apprenticeid' =>$userId,'pay_tribute' => 0 ,'channel' =>$channel,'reward' =>0,'create_time' =>$time];
    $data=db('tribute_table')->insert($record);
    return $data;

}


/**
   * 徒弟进贡
*/
function contribution($master_id,$openid,$score){
    if($master_id == 0){
        return ;
    }
    
    $dbdata=db('user')->where('id',$master_id)->find();//查询师傅信息
    $score=$score * 0.2;
     $sql = "UPDATE user SET score =score + :score , tribute = tribute+ :tribute WHERE id = :id;";   //同时加两个字段的金额，thinkphp5方法特别麻烦
    $affected = Db::execute($sql,['score'=>$score,'tribute'=>$score,'id'=>$master_id]); //给师傅加完金币
     
    $apprenticeid =db('user')->where('openid',$openid)->value('id');//拿到徒弟id
    $tributereturn= db('tribute_table')->where('apprenticeid',$apprenticeid)->setInc('pay_tribute',$score);//更改进贡表数据

    // return        $affected; 
    $time =date('Y-m-d H:i:s',time());//获取当前时间
    $record = ['id'=>'','openid' =>$dbdata['openid'],'score' =>$score,'explain' =>"徒弟进贡",'channel' =>$dbdata['channel'],'master_id' => $dbdata['master_id'],'state' =>0,'create_time' =>$time];
    $dbreturn=db('score_record')->insert($record);
     if ($affected==1&&$dbreturn==1) {
         return ['state'   => '200','message'  => "进贡成功" ,'score' => $score] ;
     }
     else{
         return ['state'   => '200','message'  => "进贡失败" ,'score' => $score] ;
     }
   
}




/**
   * 徒弟完成任务奖励师傅100金币
*/
function reward($master_id,$openid){
    //师傅id为0直接跳出
    if($master_id == 0){
        return ;
    }
    
    $apprenticeid =db('user')->where('openid',$openid)->value('id');//拿到徒弟id

    $rewardif=db('tribute_table')->where('apprenticeid',$apprenticeid)->value('reward');//拿到是否奖励过的值，0是没1是有

    if($rewardif == 1){
        //已经奖励过了
        return ['state'   => '200','message'  => "已经奖励过了" ] ;
    }
    else{

    $dbdata=db('user')->where('id',$master_id)->find();//查询师傅信息
    $score=100; //写死100金币

     $sql = "UPDATE user SET score =score + :score , tribute = tribute+ :tribute WHERE id = :id;";   //同时加两个字段的金额，thinkphp5方法特别麻烦
    $affected = Db::execute($sql,['score'=>$score,'tribute'=>$score,'id'=>$master_id]); //给师傅加完金币
     
    $tributereturn= db('tribute_table')->where('apprenticeid',$apprenticeid)->setInc('pay_tribute',$score);//更改进贡表数据
    $tributereturn2= db('tribute_table')->where('apprenticeid',$apprenticeid)->update(['reward' => 1]);//更改进贡表数据

    // return        $affected; 
    $time =date('Y-m-d H:i:s',time());//获取当前时间
    $record = ['id'=>'','openid' =>$dbdata['openid'],'score' =>$score,'explain' =>"徒弟进贡",'channel' =>$dbdata['channel'],'master_id' => $dbdata['master_id'],'state' =>0,'create_time' =>$time];
    $dbreturn=db('score_record')->insert($record);
     if ($affected==1&&$dbreturn==1) {
         return ['state'   => '200','message'  => "进贡成功" ,'score' => $score] ;
     }
     else{
         return ['state'   => '200','message'  => "进贡失败" ,'score' => $score] ;
     }

    }

   
}

