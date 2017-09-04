<?php
//PHP config
//error_reporting(E_ERROR | E_WARNING | E_PARSE);
error_reporting(E_ALL);
// error_reporting(E_ERROR );
ini_set('always_populate_raw_post_data','-1');


//DB config
$cfg['host'] = '127.0.0.1';
$cfg['user'] = 'root';
$cfg['password'] = '';
$cfg['db_name'] = 'predicate';
$cfg['root'] = '';//$_SERVER['DOCUMENT_ROOT'].'/ipi/';

//SMTP cfg
$cfg['mail_host'] = 'ssl://smtp.mail.ru';
$cfg['mail_host_port'] = 465;
$cfg['mail_user'] = 'mdimai@mail.ru';
$cfg['mail_pass'] = 'ggxxrr71773941';


//callback param
$cfg['callback_name'] = 'Predicate LTD';
$cfg['callback_subject'] = 'callback form';
$cfg['callback_main'] = 'mdimai@mail.ru';


$cfg['js'] = array(
  'js_show_errors' => true
);

//параметры сервера php
date_default_timezone_set('Asia/Tokyo');

/*
установить часовой пояс сервера в цифрах
$sm="+4";
  $time=strtotime("now".$sm." hour");
  echo date('H:i:s d.m.Y',$time);
  */
?>
