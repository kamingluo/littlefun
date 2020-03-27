<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Indexminiappad
{


    public function data()
    {

    	$data=db('index_miniapp_ad')->order('id asc')->select();
        $state=['state'   => '200','message'  => "首页小程序推广配置数据查询成功" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
	}
 
	public function deletedata(Request $request)
    {

    	$data=db('index_miniapp_ad')-> where('id', $request->param("id"))->delete();
        $state=['state'   => '200','message'  => "删除成功" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
    }



    public function addandupdate(Request $request)
    {
		$id=$request->param("id");
		$newid=$request->param("newid");
    	$name=$request->param("name");
    	$appid=$request->param("appid");
    	$Jump=$request->param("Jump");
    	$extradata=$request->param("extradata");
    	$describe=$request->param("describe");
    	$imgurl=$request->param("imgurl");
    	$type=$request->param("type");
    	$score=$request->param("score");
    	$playtime=$request->param("playtime");
    	$open=$request->param("open");
    	if($id){
			if($newid){
				$dbreturn= db('index_miniapp_ad')->where('id',$id)->update(['id' =>$newid,'name' =>$name,'appid' =>$appid,'Jump' =>$Jump,'extradata' =>$extradata,'describe' => $describe,'imgurl' =>$imgurl,'type' =>$type,'score' =>$score,'playtime' =>$playtime,'open' =>$open]);
    		    return ['state'   => '200','message'  => "更新配置数据"] ;
			}
			else{
				$dbreturn= db('index_miniapp_ad')->where('id',$id)->update(['name' =>$name,'appid' =>$appid,'Jump' =>$Jump,'extradata' =>$extradata,'describe' => $describe,'imgurl' =>$imgurl,'type' =>$type,'score' =>$score,'playtime' =>$playtime,'open' =>$open]);
    		    return ['state'   => '200','message'  => "更新配置数据"] ;
			}
    	}else{

        	 $dbdata = ['id'=>'','name' =>$name,'appid' =>$appid,'Jump' =>$Jump,'extradata' =>$extradata,'describe' => $describe,'imgurl' =>$imgurl,'type' =>$type,'score' =>$score,'playtime' =>$playtime,'open' =>$open];
        	 $dbreturn=db('index_miniapp_ad')->insert($dbdata);
             return ['state'   => '200','message'  => "添加配置数据"] ;
    	}
    	
    }


    
}
