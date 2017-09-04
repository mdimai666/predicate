<?php

class News
{
    
    private $mysql;
    private $client_timeDiff;
    
    public $count;
    
    function __construct($mysqldriver, $timeDiff = '')
    {
        // $this->mysql = new MySQLDriver;
        $this->mysql = $mysqldriver;// is MySQLDriver class
        $this->client_timeDiff = $timeDiff;
    }
    
    private function selectLast($table = 'posts', $count = 3, $cols = 'id,post_title', $where = '', $innerJoin = '')
    {

        $wt=substr($table, 0, -1);
        $where=(empty($where)?'':' WHERE('.$where.')');
        $this->mysql->select($table.' '.$innerJoin, $cols, $where.' ORDER by '.$wt.'_date DESC LIMIT '.$count);
        $this->count=$this->mysql->lastSelectQueryRowCount;
    }
    /*
	private function selectFirst($table = 'posts', $count = 3, $cols = 'id,post_title', $status = 'publish'){
		$wt=substr($table,0,-1);
		$this->mysql->select($table,$cols,'WHERE '.$wt.'_status="'.$status.'" ORDER by '.$wt.'_date DESC LIMIT '.$count);
		$this->count=$this->mysql->lastSelectQueryRowCount;
	}*/
    
    private function selectId($table = 'posts', $id = 1, $cols = 'id,post_title')
    {
        $wt=substr($table, 0, -1);
        //, $status = 'publish'
        // $q=$this->mysql->select($table, $cols, 'WHERE id='.$id.'&& '.$wt.'_status="'.$status.'"');
        $q=$this->mysql->select($table, $cols, 'WHERE id='.$id);
        if ($q) {
            $this->count=$this->mysql->lastSelectQueryRowCount;
        }
        return $q;
    }
    
    public function getZ($count = 10, $type = 'post', $publishedOnly = true, $before_lastId = -1)
    {
 //get news feed

        $l1 = '';
        if($before_lastId>-1){
            $l1 = ' and (id < '.$before_lastId.')';
        }

        $w2 = '';
        if ($publishedOnly) {
            $w2 = " and (post_status='publish')";
        }

        $this->selectLast('posts', $count, '*',
            "(post_type='$type')".$w2.$l1);
        //$b[] = Array('title'=>'123','content'=>'2a');

        // return $this->mysql->mysqli_fetch_assoc();
        $a = $this->mysql->fetch1();
        if (empty($a)) {
            return false;
        }
        do {
            $a['post_date']=dtf(php_timeFromDifText($a['post_date'], $this->client_timeDiff));
            $a['post_modified']=dtf(php_timeFromDifText($a['post_modified'], $this->client_timeDiff));
            $b[]=$a;
        } while ($a = $this->mysql->fetch1());
        return $b;

        return $a;
    }


    
    public function getI($id)
    {
 // get single news by Id
        // $cols = 'id,post_title,post_content,post_date,post_seen_count,post_comment_count,post_status,post_images,post_source';
        $cols = '*';
        $q=$this->selectId('posts', $id, $cols);
        $a = $this->mysql->fetch1();
        $a['post_date']=dtf(php_timeFromDifText($a['post_date'], $this->client_timeDiff));
        $a['post_modified']=dtf(php_timeFromDifText($a['post_modified'], $this->client_timeDiff));
        if ($q) {
            $this->mysql->updateInc('posts', 'post_seen_count', 'WHERE id='.$id); //обновить кол-во просмотров
        }
        return $a;
    }
    
    public function getC($id, $_fromDate = 0)
    {
 //get comments
        $fromDate = ($_fromDate==0)?'':'&&(comment_date>"'.$_fromDate.'")';
        $innerJoin = ' INNER JOIN users ON (comments.comment_author_id = users.id) ';
        $selCols = 'comments.id,comment_author_id,comment_date,comment_content,comment_news_id,comment_karma,user_display_name';
        $this->selectLast('comments', 10, $selCols, '(comment_news_id="'.$id.'")'.$fromDate, $innerJoin);
        $b['count']=$this->count;
        //$t=date('Y-m-d H:i:s');
        $a = $this->mysql->fetch1();
        do {
            $a['comment_date']=dt(php_timeFromDifText($a['comment_date'], $this->client_timeDiff));
            $b[]=$a;
        } while ($a = $this->mysql->fetch1());
        return $b;
    }
    
    public function comment_insert($login, $news_id, $text)
    {
        $r = $this->getUserArray($login);
        $p['comment_author_id']=$r['id'];
        $p['comment_date']=gmdate('Y-m-d H:i:s');
        $p['comment_content']=$text;
        $p['comment_modified']=$p['comment_date'];
        $p['comment_news_id']=$news_id;
        
        //return var_export($p);
        $q=$this->mysql->insert('comments', $p); //добавить коммент
        if ($q) {
            $this->mysql->updateInc('posts', 'post_comment_count', 'WHERE id='.$news_id); //обновить кол-во комментариев
        }
        
        return $q;
    }
    
    public function getUserArray($login)
    {
        $cols='id,user_time_different';
        $this->mysql->select('users', $cols, 'WHERE user_login='.$login);
        return $this->mysql->fetch1();
    }
    
    public function post_insert($login, $arr)
    {
        //id,post_author,post_date,post_content,post_title,post_excerpt,post_status,post_comment_status,ping_status
        //post_password,post_name,post_modified,post_parent,guid,menu_order,post_type,post_comment_count,post_seen_count
        
        if (empty($arr['post_content'] ) || empty($arr['post_title'])) {
            return false;
        }
        
        // $r = $this->getUserArray($login);
        // $p['post_author_id']=$r['id'];
        $p['post_date']=gmdate('Y-m-d H:i:s');
        $p['post_modified']=$p['post_date'];
        
        
        $p['post_content']  =$arr['post_content'];
        $p['post_title']    =$arr['post_title'];
        $p['post_status']   =def($arr, 'post_status', 'publish');
        $p['post_on_main']   =def($arr, 'post_on_main', true);
        $p['post_source']   =def($arr, 'post_source', '');
        $p['post_images']   =def($arr, 'post_images', '');
        // $p['post_comment_status']=ff($arr['post_comment_status'],'open');
        // $p['ping_status']	=ff($arr['ping_status'],'open');
        // $p['post_parent']	=ff($arr['post_parent'],0);
        // $p['menu_order']	=ff($arr['menu_order'],0);
        $p['post_type']         =def($arr, 'post_type', 'post');
        
        
        //return var_export($p);
        $q=$this->mysql->insert('posts', $p); //добавить пост
        if ($q) {
            return $q;
        } else {             // return $q;
            error_get_last();
        }
    }

    //new
    public function post_update($login, $arr)
    {
        
        if (empty($arr['post_content'] ) || empty($arr['post_title'])) {
            return false;
        }
        
        if (empty($arr['id'])) {
            return false;
        }
        $id = $arr['id'];
        // $r = $this->getUserArray($login);
        // $p['post_author_id']=$r['id'];
        // $p['post_date']=gmdate('Y-m-d H:i:s');
        $p['post_modified']=gmdate('Y-m-d H:i:s');
        
        // throw new Exception('>>'.$p['post_status']);
        
        $p['post_content']  =$arr['post_content'];
        $p['post_title']    =$arr['post_title'];
        $p['post_status']   =def($arr, 'post_status', 'publish');
        $p['post_on_main']   =def($arr, 'post_on_main', 'true')==='true';
        $p['post_source']   =def($arr, 'post_source', '');
        $p['post_images']   =def($arr, 'post_images', '');
        // $p['post_comment_status']=ff($arr['post_comment_status'],'open');
        // $p['ping_status']	=ff($arr['ping_status'],'open');
        // $p['post_parent']	=ff($arr['post_parent'],0);
        // $p['menu_order']	=ff($arr['menu_order'],0);
        $p['post_type']         =def($arr, 'post_type', 'post');


        $q = $this->mysql->update('posts', $p, 'WHERE id='.$id);
        // throw new Exception($arr['']);
        return $q;
    }

    public function post_delete($login, $arr)
    {
        if (empty($arr['id'])) {
            return false;
        }
        $id = $arr['id'];
        return $this->mysql->delete('posts', 'WHERE id='.$id);
    }

    public function post_last_add_id()
    {
        return $this->mysql->mysqli_insert_id();
    }
    
    
    public function test()
    {
        return 'class News is Work!';
    }

    public function getZ_onMain($count = 10)
    {
        $type = 'post';
        $w2 = " and (post_status='publish') and (post_on_main=true)";

        $this->selectLast('posts', $count, '*',
            "(post_type='$type')".$w2);
        //$b[] = Array('title'=>'123','content'=>'2a');

        // return $this->mysql->mysqli_fetch_assoc();
        $a = $this->mysql->fetch1();
        if (empty($a)) {
            return false;
        }
        do {
            // $a['post_date']=dt(php_timeFromDifText($a['post_date'], $this->client_timeDiff));
            $b[]=$a;
        } while ($a = $this->mysql->fetch1());
        return $b;

        return $a;
    }
}
