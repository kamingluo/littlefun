<?php
namespace app\football\controller;
use think\Db;
use think\Config;
use think\Request;

class Record
{

    public function recorddata(Request $request)
    {
        $user_id=$request->param("user_id");
        $investment=db('record')->where('user',$user_id)->sum('money');//总投资
        $transport=db('record')->where('user',$user_id)->where('state = 4  OR  state = 5')->sum('profit');//输
        $win=db('record')->where('user',$user_id)->where('state = 1  OR  state = 2')->sum('profit');//赢
        $data =db('record') ->where('user',$user_id)->order('id desc')->limit(0,30)->select();//查询信息
        $investmentnum=db('record')->where('user',$user_id)->count();//总次数
        $transportnum=db('record')->where('user',$user_id)->where('state = 4  OR  state = 5')->count();//输的次数
        $winnum=db('record')->where('user',$user_id)->where('state = 1  OR  state = 2')->count();//赢的次数
        $state=['state'=> '200','message'  => "该博主近30条记录",'investment' =>$investment,'investmentnum' =>$investmentnum,'transport' => $transport,'win' => $win,'transportnum' => $transportnum,'winnum' => $winnum ];
        $resdata=array_merge($state,array('data'=>$data));
        return  $resdata;
    }


    public function recentlist(Request $request)
    {
        //$recentlist =db('record')->order('id desc')->limit(0,30)->select();//查询信息，更新信息
        $sql="select a.name,b.* from user a,record b where a.id=b.user ORDER BY b.id DESC LIMIT 0,30;";
        $recentlist = Db::query($sql); //拿到数据
        $state=['state'   => '200','message'  => "记录列表近30条记录" ];
        $resdata=array_merge($state,array('recentlist'=>$recentlist));
        return  $resdata;
    }

    public function add(Request $request)
    {
        $user=$request->param("user");
        $odds=$request->param("odds");
        $state=$request->param("state");
        $money=$request->param("money");
        $remarks=$request->param("remarks");
        $profit=0;
        // $create_time =date('Y-m-d H:i:s',time());//获取当前时间
        $create_time =$request->param("date");//获取当前时间
        if($state != 0){
            if($state==1){
                $profit=$money*$odds;
            }
            elseif($state==2){
                $profit=$money*($odds/2);
            }
            elseif($state==4){
                $profit=$money*0.5;
                
            }
            elseif($state==5){
                $profit=$money;
            }
            else{
                $profit=0;
            }
        }
        $adres = ['id'=>'','user' =>$user,'odds' =>$odds,'state' =>$state,'money' =>$money,'profit' =>$profit,'remarks' =>$remarks,'create_time' =>$create_time];
        $addata=db('record')->insert($adres);
        $state=['state'   => '200','message'  => "新增记录成功" , 'addata'=>$addata];
        return  $state;
    }

    public function update(Request $request)
    {
        $id=$request->param("id");
        $user=$request->param("user");
        $odds=$request->param("odds");
        $state=$request->param("state");
        $money=$request->param("money");
        $remarks=$request->param("remarks");
        $profit=0;
        $create_time =date('Y-m-d H:i:s',time());//获取当前时间
        if($state != 0){
          if($state==1){
              $profit=$money*$odds;
          }
          elseif($state==2){
              $profit=$money*($odds/2);
          }
          elseif($state==4){
              $profit=$money*0.5;
              
          }
          elseif($state==5){
              $profit=$money;
          }
          else{
              $profit=0;
          }
      }
        $updatedata= db('record')->where('id',$id)->update(['user' => $user,'odds' => $odds,'state' => $state,'money' => $money,'remarks' =>$remarks,'profit' => $profit]);
        $state=['state'   => '200','message'  => "更新记录成功" , 'updatedata'=>$updatedata];
        return  $state;
    }




}
