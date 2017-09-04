<?php
    global $core, $api;//set to global;

class API
{
    private $ret;
    private $sysarray;

    public function __construct(){

    }

    public function SendRetrive(){
        $array = array('sys'=> $this->sysarray, 'data' => $this->ret);
        echo json_encode($array);
    }

    public function Retry($array){
        $this->ret = $array;
    }

    public function SysRetry($array){
        $this->sysarray = $array;
    }

    public function Error($message='')
    {
        $this->Retry(array('result' => 'error', 'message' => $message));
    }

    public function Ok($message='')
    {
        $this->Retry(array('result' => 'ok', 'message' => $message));
    }

    public function test(){
        return "api is work!";
    }

    function apiInclude($path, $isIncludeOnce = true) {
        try {
            if ($isIncludeOnce) {
                include_once $path;
            } else {
                include $path;
            }
        } catch (ErrorException $exception) {
            if ($exception->getFile() !== __FILE__) {
                // Ошибка в подключённом файле.
                throw $exception;
            } else {
                // Файл не был подключён.
                return false;
            }
        }
        
        // Файл подключён успешно.
        return true;
    }
}

header('Content-Type: application/json');
$api = new API();

function api_run()
{
    global $core, $api;
    $sys = array();
    $controller = $core->Uri(1);

    if (empty($controller)) {
        echo "error: ".$controller;
        return;
    }
    $filename = 'api/'.$controller.'.php';
    if(@($api->apiInclude($filename)) === false){
        // $sys[] = 'API: '.$ex->getMessage()
        $sys['apiInclude'] = 'failed!';
    }

    if(!empty(error_get_last()))
        $sys['phper']=error_get_last();

    if(!empty(mysql_error()))
        $sys['sqler']=mysql_error();

    $api->SysRetry($sys);
    $api->SendRetrive();
}


api_run();
exit();