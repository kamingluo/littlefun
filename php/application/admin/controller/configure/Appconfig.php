<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Appconfig
{
   

   public function configdata(){
        $sql= "SELECT value FROM config2 ORDER BY id asc ;";
        $data = Db::query($sql); //拿到数据
        $sql2="SELECT id,name FROM config2 ORDER BY id asc ;";
        $data2 = Db::query($sql2); //拿到数据
        $count =db('config2')->count();
        $configdata=array();
        for ($x=0; $x<$count; $x++) {
           array_push($configdata,['id' =>$data2[$x]['id'],'name' =>$data2[$x]['name'],'value' =>json_decode($data[$x]['value'])]);
         } 
         $state=['state'   => '200','message'  => "小程序配置数据" ];
         $resdata=array_merge($state,array('configdata'=>$configdata));
        return $resdata;
    }


    public function test(){
        $data=db('config2')->select();
        return $data;
    }


    public function addorupdate(Request $request) //增加或者更新config,一般不会去删除也不会更改id
    {
         $dbnum=db('config2')->where('id',$request->param("id"))->count();
         if($dbnum == 1){ //更新
         	$value=$request->param("value/a");
         	$dareturn=db('config2')->where('id',$request->param("id"))->update(['name' => $request->param("name"),'value' => json_encode($value,JSON_UNESCAPED_UNICODE)]);
         	$state=['state'   => '200','message'  => "更新配置成功" ];
            return $state;
         }else{ //添加
        $value=$request->param("value/a");
        $dbdata = ['id'=>$request->param("id"),'name' =>$request->param("name"),'value' =>json_encode($value,JSON_UNESCAPED_UNICODE)];
        $dbreturn=db('config2')->insert($dbdata);
        $state=['state'   => '200','message'  => "添加配置成功" ];
        return $state;
         }
    }
   




}