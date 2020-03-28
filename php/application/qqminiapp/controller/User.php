<?php
// +----------------------------------------------------------------------
// | 用户信息操作
// +----------------------------------------------------------------------
 

namespace app\miniapp\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class User
{
    /** 用户注册 */
    public function register(Request $request){
        // return "test";
        $data = $request->param();//接收所有传过来的post值
        $wxcode =$request->param("code");
        $openid=openid($wxcode);
        $scene=$request->param("scene");
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        $dbnum =db('user')->where('openid',$openid)->find();//查询用户信息
        if($dbnum==null){
                $channel=$data["channel"];
                $master_id=$data["master_id"];
                $dbdata = ['id'=>'','openid' =>$openid,'channel' => $channel,'scene' => $scene,'score' => 0,'tribute' => 0,'master_id' => $master_id,'create_time' =>$time ,'updata_time' =>$time];
                $userId= db('user')->insertGetId($dbdata);//返回自增ID
                $userdata=['id'=>$userId,'openid' =>$openid,'channel' => $channel,'scene' => $scene,'score' => 0,'tribute' => 0,'master_id' => $master_id,'create_time' =>$time ,'updata_time' =>$time];

                $tribute=tribute($master_id,$userId,$channel);//进贡表增加数据

                $state=['state'   => '200','message'  => "注册成功" ];
                $resdata=array_merge($state,array('userdata'=>$userdata));
                return $resdata;
            }
        else{
                 //更新信息
                $dbreturn= db('user')->where('openid',$openid)->update(['updata_time' => $time,'scene' => $scene]);
                if($dbreturn==1){
                     $dbnum =db('user')->where('openid',$openid)->find();//查询用户信息
                    $state=['state'   => '200','message'  => "用户信息更新成功" ];
                    
                    $resdata=array_merge($state,array('userdata'=>$dbnum));
                // // $dbnum =db('user')->where('openid',$openid)->find();
                    return $resdata;
                }
                else{
                     $dbreturn=['state'   => '400','message'  => "用户信息更新失败" ];
                    return $dbreturn;
                }
            }
    }


     //请求获取openid
    public function obtainopenid(Request $request)
    {
        $wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);
        $state=['state'   => '200','message'  => "获取用户openid成功" ];
        $resdata=array_merge($state,array('openid'=>$openid));
        return $resdata;
    }

        //用户信息
    public function userdata(Request $request)
    {
        $wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);
        $dbnum =db('user')->where('openid',$openid)->find();//查询用户信息
        $state=['state'   => '200','message'  => "获取用户信息成功" ];
        $resdata=array_merge($state,array('userdata'=>$dbnum));
        return $resdata;
    }

}
