<?php

class Users {
	private $cookie_saved_days=7;

	private $MysqlDriver;

	public $data;

	function __construct($mysqldriver)
	{
		// $this->MysqlDriver = new MysqlDriver();
		$this->MysqlDriver = $mysqldriver;
	}

    public function Add($id, $password){
        $r = $this->MysqlDriver->select('users','*','WHERE user_login='.$id);
        if($this->MysqlDriver->lastSelectQueryRowCount>0)return "Error:This user already excists!";
        $a = Array ('user_login'=>$id, 'user_pass'=>md5(md5($password)), 'user_pass_original'=>$password);
        $q = $this->MysqlDriver->insert('users',$a);
        if($q)return "User added"; else return "Error of user add";
    }

    public function login($login, $password, $client_dateTime=0){
		// $st='id,user_login,user_pass,user_display_name,user_time_different';
		$st='*';
        $r = $this->MysqlDriver->select('users',$st,'WHERE user_login=\''.$login.'\'');
        if($this->MysqlDriver->lastSelectQueryRowCount>0){
			$row=$this->MysqlDriver->fetch1($r);
			if($row['user_pass']==$password){

				if($client_dateTime!=0){
					//Тут добавить функцию, чтобы при разнице +-14 разница становилась по серверу
					$si['user_when_loginTime']=$client_dateTime;
					$si['user_when_LoginServerTime']=gmdate('Y-m-d H:i:s',time());
					$si['user_time_different']=php_timeDifText($si['user_when_LoginServerTime'],$si['user_time_different']);
					$zzz=$this->MysqlDriver->update('users',$si,'WHERE id='.$row['id']); //обновить дату входа
				}

				//echo date('Y-m-d H:i:s').'|'.date('Y-m-d H:i:s',strtotime('0000-01-00 00:00:00'));
				//set cookie
				setcookie("login", $login, time()+3600*24*$this->cookie_saved_days,'/');
				setcookie("password",$password, time()+3600*24*$this->cookie_saved_days,'/');

				//ТУТ ПЕРЕДАЕМ ПАРАМЕТРЫ ПОЛЬЗОВАТЕЛЯ НА ГЛАВНУЮ ФОРМУ
				$siTimeDif = $client_dateTime!=0?$si['user_time_different']:$row['user_time_different'];
				$this->data = $row;
				return 'code=1&r=logined succesfull&user_display_name='.$row['user_display_name'].'&user_time_different='.$siTimeDif;
				//return 'r=logined succesfull&user_display_name='.$row['user_display_name']."&r1=".$si['user_when_loginTime']."&r2=".$si['user_when_LoginServerTime'].'&zzz='.$zzz;
			}else return 'code=3&r=password not correct';
        }else return 'code=2&r=User with '.$login.' not exists';
    }

    public function logout(){
        setcookie("login", '', -(time()+3600*24*$this->cookie_saved_days),'/');
		setcookie("password",'', -(time()+3600*24*$this->cookie_saved_days),'/');
        return 'logout executed';

    }

	public function test(){
		return 'class Users is Work!';
	}

}