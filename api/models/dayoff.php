<?php
    require_once 'entity.php';
    class DayOff extends Entity
    {
        protected static $table='day_off';
        
        public static function insertDayOff($requestId,$num)
        {
            $table=static::$table;

            $query="INSERT INTO {$table} (request_id,number) VALUES ($requestId,$num);";
            $queryData=static::runQuery($query);
            return $queryData->fetch();
        }


    }

?>