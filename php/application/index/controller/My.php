<?php
namespace app\index\controller;



class My
{ 
	//转义
    public function index()
    {
       $a="{\"msg\":\"\",\"success\":true,\"FinancialProductList\":[],\"price\":28.14,\"status\":100}";
       $b=stripslashes($a);
       echo $b;
       //return  "index模块下的my控制器my类index方法11111111" ;
    }
    
    //发送请求
    public function province()
    {
       // //初始化  
       $curl = curl_init();  
      //设置抓取的url  
      curl_setopt($curl, CURLOPT_URL, 'http://v.juhe.cn/usedcar/province?dtype=&key=d26555c5f122f182cb078ab804786329');  
      //设置头文件的信息作为数据流输出  
      //curl_setopt($curl, CURLOPT_HEADER, 1);  
      //设置获取的信息以文件流的形式返回，而不是直接输出。  
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
      //执行命令  
      $data = curl_exec($curl);  
      //echo curl_getinfo($curl,CURLINFO_HTTP_CODE); //输出请求状态码  
      //关闭URL请求  
      curl_close($curl);  
      //显示获得的数据  
      print_r($data);

    }
    
}