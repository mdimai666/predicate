<?php

class MysqlDriver
{
    //stripslashes
    public $lastSelectQueryRowCount = 0;
    public $connect;
    private $res;
    private $mysqli;

    function __construct()
    {
        $this->connect = $this->connect();
    }

    public function test()
    {
        return "MysqlDriver is Work!";
    }

    private function connect()
    {
        global $cfg;
        if (!(@$this->mysqli = mysqli_connect($cfg['host'], $cfg['user'], $cfg['password']))) {
                return "Error: not to MySQL host connect";
        }
        mysqli_query($this->mysqli, "SET NAMES 'utf8'");
        mysqli_query($this->mysqli, "SET CHARACTER SET 'utf8'");
        mysqli_query($this->mysqli, "SET SESSION collation_connection = 'utf8_general_ci'");
        
        if (!mysqli_select_db($this->mysqli, $cfg['db_name'])) {
            return "Error: DataBase connection failed. Check auth cfg";
        }
        return "Connected!";
        //return true;
    }

    public function createDB($DBname)
    {
        $q=mysqli_query($this->mysqli, "CREATE DATABASE ".$DBname) or die(mysqli_error());
        if ($q) {
            return "DataBase was created";
        } else {
            return "DataBase create operation failed";
        }
    }

    public function createTable($tableName)
    {
        $q=mysqli_query($this->mysqli, "CREATE TABLE ".$tableName. "
            (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pass VARCHAR(30)
            )
            ENGINE = InnoDB
            DEFAULT CHARACTER SET = utf8
            COLLATE = utf8_general_ci");
        if ($q) {
            return "Table was created";
        } else {
            return "Table create operation failed";
        }
    }
        //full_trim(strip_tags(
        //$pp = array_map('trim',explode(',',$data[7]));

    public function insert($table, $valuerarray)
    {
// return text message
        foreach ($valuerarray as $key => $value) {
            $qkey []=$key;
            $qval []=$this->escape($value);
        }
        $q=mysqli_query($this->mysqli, "INSERT INTO ".$table." (".implode(',', $qkey).") VALUES ('".implode('\',\'', $qval)."');");// or die(mysql_error());
        return $q;
    }

    public function update($table, $valuerarray, $where)
    {
// return text message
        foreach ($valuerarray as $key => $value) {
            $value = $this->escape($value);
            $qkeyval []=$key.'=\''.($value).'\'';
        }
        $q=mysqli_query($this->mysqli, "UPDATE ".$table." SET ".implode(',', $qkeyval)." ".$where.";");// or die(mysql_error());
        return $q;
    }

    public function updateInc($table, $field, $where)
    {
        return mysqli_query($this->mysqli, "UPDATE ".$table." SET ".$field."=".$field."+1 ".$where.";");// or die(mysql_error());
    }

    public function delete($table, $where)
    {
// return text message
        $q=mysqli_query($this->mysqli, "DELETE FROM ".$table." ".$where.";");// or die(mysql_error());
        return $q;
    }

    public function select($tables, $select, $where)
    {
 //return as res array
        $q = "SELECT ".$select." FROM ".$tables." ".$where;
        unset($this->res);
        $this->res=mysqli_query($this->mysqli, $q);// or die(mysqli_error());
        if ($this->res===false) {
            $this->lastSelectQueryRowCount = 0;
        } else {
            $this->lastSelectQueryRowCount = mysqli_num_rows($this->res);
        }

        return $this->res;
    }

    public function fetchFirst()
    {
        //mysql_data_seek($this->res,0);
        return mysqli_fetch_array($this->res);
    }

    public function fetchNext()
    {
        return mysqli_fetch_array($this->res);
    }

    public function fetch1()
    {
        //mysql_data_seek($this->res,0);
        if (!$this->res) {
            return null;
        } else {
            return mysqli_fetch_assoc($this->res);
        }
    }

    public function mysqli_fetch_assoc()
    {
        //mysql_data_seek($this->res,0);
        return mysqli_fetch_assoc($this->res);
    }

    public function mysqli_insert_id()
    {
        return mysqli_insert_id($this->mysqli);
    }

    public function escape($value)
    {
        if (phpversion() >= '4.3.0') {
            $value = mysqli_real_escape_string($this->mysqli, $value);
        } else {
            $value = mysqli_escape_string($this->mysqli, $value);
        }
        return $value;
    }
}
