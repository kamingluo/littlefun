<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Channel
{
    public function channel()
    {

    	$data=db('channel')->order('id asc')->select();
      $state=['state'   => '200','message'  => "渠道数据查询成功" ];
      $resdata=array_merge($state,array('data'=>$data));
      return $resdata ;
	}
	

	 public function deletedata(Request $request)
    {
     
    	  $data=db('channel')-> where('id', $request->param("id"))->delete();
        $state=['state'   => '200','message'  => "删除成功" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
    }



    public function channelupdate(Request $request)
    {
    	$id=$request->param("id");
    	$name=$request->param("name");
    	$channel=$request->param("channel");
    	if($id){
    		$dbreturn= db('channel')->where('id',$id)->update(['name' =>$name,'channel' =>$channel]);
    		return ['state'   => '200','message'  => "更新渠道数据"] ;
 
    	}else{

        	 $dbdata = ['id'=>'','name' =>$name,'channel' =>$channel];
        	 $dbreturn=db('channel')->insert($dbdata);
             return ['state'   => '200','message'  => "添加渠道数据"] ;
    	}
    	
    }


    
}
