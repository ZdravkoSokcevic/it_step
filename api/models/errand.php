<?php
    require_once 'entity.php';
    class Errand extends Entity
    {
        protected static $table='errand';

        public static function insertErrand($reqId,$workerId,$goTime,$backTime,$country,$town)
        {
            $table=static::$table;
            $query="
                    INSERT INTO {$table} (
                                request_id,
                                worker_id,
                                go_time,
                                back_time,
                                country,town
                                ) 
                    VALUES (
                                '$reqId',
                                '$workerId',
                                '$goTime',
                                '$backTime',
                                '$country',
                                '$town'
                            );";
            $queryData=static::runQuery($query);
            return $queryData;
        }

        public static function getErrandDuration($id)
        {
            $table=static::$table;
            $timeQuery="SELECT go_time,back_time FROM $table WHERE id=$id";
            $time=static::runQuery($timeQuery)->fetch(PDO::FETCH_OBJ);
            $query="SELECT TIMESTAMPDIFF(day,'$time->go_time','$time->back_time') as 'duration' FROM $table WHERE id=$id;";
            $queryData=static::runQuery($query);
            return $queryData->fetch();
        }
    }

?>