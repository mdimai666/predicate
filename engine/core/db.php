<?php

require_once "cfg.php";
require_once "core_class/class_Tools.php";
require_once "db_class/ClassMySQLDriverLi.php";
require_once "db_class/ClassNews.php";
require_once "db_class/ClassUsers.php";

class DB_controller
{
    //private
    private $isConnected = false;
    private $mysql;
    private $users;
    private $news;
    public $connectionMessage;


    public function __construct()
    {
        $this->mysql = new MySQLDriver();
        $this->connectionMessage = $this->mysql->connect;
        $this->users = new Users($this->mysql);
        $this->news = new News($this->mysql, '+10');
    }
    
    public function test()
    {
        
        echo 'db->'."db is Work!".'<br/>';
        echo 'sqldriver->'.$this->mysql->test().'<br/>';
        echo 'news->'.$this->news->test().'<br/>';
        echo 'users->'.$this->users->test().'<br/>';
    }

//------------------------------------------
//News
//------------------------------------------

    public function NewsFeed($count = 9)
    {
        //id,post_title,post_content,post_date,post_seen_count,post_comment_count
        return $this->news->getZ($count);
    }

    public function NewsFeed_ajax($count = 9, $less_last_id = -1)
    {
        return $this->news->getZ($count, 'post', true, $less_last_id);
    }

    public function NewsOnMain($count = 3)
    {
        //id,post_title,post_content,post_date,post_seen_count,post_comment_count
        return $this->news->getZ_onMain($count);
    }

    public function PostList($count = 20, $type = "post", $publishedOnly = true)
    {
        return $this->news->getZ($count, $type, $publishedOnly);
    }

    public function PostById($id)
    {
        //id,post_title,post_content,post_date,post_seen_count,post_comment_count

        return $this->news->getI($id);
    }

    public function Save_post($post)
    {
        return $this->news->post_update($this->GetUserData()['user_login'], $post);
    }

    public function Add_post($post)
    {
        return $this->news->post_insert($this->GetUserData()['user_login'], $post);
    }

    public function Delete_post($post)
    {
        return $this->news->post_delete($this->GetUserData()['user_login'], $post);
    }

    public function LastAddedPostId()
    {
        return $this->news->post_last_add_id();
    }

//------------------------------------------
//Users
//------------------------------------------    

    public function Login($login = '', $pass = '')
    {

        if (empty($login) || empty($pass)) {
            $login=empty($_POST['login'])?'':$_POST['login'];
            $pass=empty($_POST['pass'])?'':$_POST['pass'];
            $pass = md5(md5($pass));
        }

        return $this->users->login($login, $pass);
    }

    public function Logout()
    {
        return $this->users->logout();
    }

    public function GetUserData()
    {
        return $this->users->data;
    }
}
