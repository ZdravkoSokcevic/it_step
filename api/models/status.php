<?php
require_once 'worker.php';
    class Status extends Work
    {
        protected static $table='status';
        public $id,$dayOff,$free,$overwork;

        public function __construct($attributes)
        {
        
        }

        public static function intializeStatus($id)
        {
            $table=static::$table;
            $query="INSERT INTO {$table} (id) VALUES ('$id');";
            
            // var_dump($query);
            // die();

            $queryData=static::runQuery($query)->fetch(PDO::FETCH_OBJ);
        }

        public static function insertStatus($id,$day_off,$free_days,$overwork)
        {
            $table=static::$table;
            $query="INSERT INTO {$table} (id,day_off,overwork,vacation) VALUES ('$id','$day_off','$free_days','$overwork');";
            
            // var_dump($query);
            // die();

            $queryData=static::runQuery($query)->fetch(PDO::FETCH_OBJ);
            return $queryData;
        }
        
        public static function getStatus($id)
        {
            $table=static::$table;
            $query="SELECT * FROM {$table} WHERE id=$id;";
            $userStatus=static::runQuery($query)->fetch(PDO::FETCH_OBJ);
            return $userStatus;
        }
        
        public static function updateStatus($id,$day_off,$free_days,$overwork)
        {
            $table=static::$table;
            $query="UPDATE {$table} SET day_off='$day_off',overwork='$free_days',vacation='$overwork' WHERE id='$id';";
            $queryData=static::runQuery($query)->fetch(PDO::FETCH_OBJ);
            return $queryData;
        }
        
    }