<?php
    require_once 'entity.php';
    class Allowance extends Entity
    {
        protected static $table='allowance';
        public static function insertAllowance($reqId,$quantity)
        {
            $table=static::$table;
            $query="INSERT INTO {$table} (request_id,price) VALUES ($reqId,$quantity);";
            $queryData=static::runNonSelectedQuery($query);
            // var_dump($queryData);
            // die();
            return $queryData;
        }
    }

?>