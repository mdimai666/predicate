<?php

global $core, $api;

$action = empty($_POST['action'])?'':$_POST['action'];

switch ($action) {
    case 'test':
        $api->Ok('test');
        break;

    case 'loginname':
        $api->Ok($core->user->Login());
        break;

    case 'ajax_logout':    
        $result = $core->db->Logout();
        if($result)
            $api->Ok($result);
        else
            $api->Error($result);
        break ;
}
