<?php
namespace app\miniapp\controller\Ad;
use think\Db;
use think\Request;
use think\Config;
use think\Exception;

class Xmad
{
	public function index()
	{

		return  "小盟广告" ;
	}	
 
      //小盟广告配置
    public function xmadconfig()
    {
    	$dbdata=db('xmad_config')->find();//查询小盟广告配置信息
    	$state=['state'   => '200','message'  => "小盟广告配置查询成功" ];
        $resdata=array_merge($state,array('xmaddata'=>$dbdata));
    	return $resdata ;
    }

	
    
    
}
