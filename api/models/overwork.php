<?php
    require_once 'entity.php';
    class Overwork extends Entity
    {
        protected static $table='overwork';
        public static function insertOverwork($request_id,$number,$reason)
        {
            $query="INSERT INTO overwork (request_id,number,reason) VALUES ('$request_id','$number','$reason');";
            $data=static::runQuery($query);
            
            return $data;
        }
    }

?>