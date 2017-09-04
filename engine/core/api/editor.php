<?php

global $core, $api;

$action = empty($_POST['action'])?'':$_POST['action'];

switch ($action) {
    case 'save':
    case 'add':
        try{
            $api->Ok();
            $post = $_POST['post'];
            if($action=='save')
                $result = $core->db->Save_post($post);
            else 
                $result = $core->db->Add_post($post);
            if($result){
                $lastId = $core->db->LastAddedPostId();
                if($action=='save')
                    $api->Ok();
                else
                    $api->Retry(array('result' => 'ok', 'newid' => $lastId));
            }
            else 
                $api->Error($result);
        } catch(Exception $ex){
            $api->Error($ex->getMessage());
        }
    break;

    case 'delete':
        try{
            if(empty($_POST['id'])) $api->Error('no have ID');

            $id = $_POST['id'];
            
            $arr = array( 'id' => $id);
            $result = $core->db->Delete_post($arr);

            if($result)
                $api->Ok();
            else 
                $api->Error($result);
        } catch(Exception $ex){
            $api->Error($ex->getMessage());
        }
    break;
}

