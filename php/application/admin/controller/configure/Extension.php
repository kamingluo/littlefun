<?php
namespace app\admin\controller\configure;
use think\Db;
use think\Request;
use think\Config;

class Extension
{
    public function extension()
    {

    	$data=db('extension')->order('id asc')->select();
        $state=['state'   => '200','message'  => "单页推广页配置数据查询成功" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
	}
	

	public function deletedata(Request $request)
    {

    	$data=db('extension')-> where('id', $request->param("id"))->delete();
        $state=['state'   => '200','message'  => "删除成功" ];
        $resdata=array_merge($state,array('data'=>$data));
        return $resdata ;
    }



    public function addandupdate(Request $request)
    {
    	$id=$request->param("id");
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
    	$onshowjump=$request->param("onshowjump");
    	if($id){
    		$dbreturn= db('extension')->where('id',$id)->update(['name' =>$name,'appid' =>$appid,'Jump' =>$Jump,'extradata' =>$extradata,'describe' => $describe,'imgurl' =>$imgurl,'type' =>$type,'score' =>$score,'playtime' =>$playtime,'open' =>$open,'onshowjump' =>$onshowjump]);
    		return ['state'   => '200','message'  => "更新单页推广页配置数据"] ;
 
    	}else{

        	 $dbdata = ['id'=>'','name' =>$name,'appid' =>$appid,'Jump' =>$Jump,'extradata' =>$extradata,'describe' => $describe,'imgurl' =>$imgurl,'type' =>$type,'score' =>$score,'playtime' =>$playtime,'open' =>$open,'onshowjump' =>$onshowjump];
        	 $dbreturn=db('extension')->insert($dbdata);
             return ['state'   => '200','message'  => "添加单页推广页配置数据"] ;
    	}
    	
    }


    
}
