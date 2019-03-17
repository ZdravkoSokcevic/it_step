<?php

require_once 'worker.php';

class Calendar extends Entity
{
    protected static $table='calendar';

    public static function insertCalendar($date,$type,$description)
    {
        $table=static::$table;
        if(!isset($description))
        {
            $query="INSERT INTO {$table} (date,type,description) VALUES ('$date','$type',DEFAULT);";
        }
        $query="INSERT INTO {$table} (date,type,description) VALUES ('$date','$type','$description');";
        // var_dump($query);
        // die();
        $success=static::runQuery($query)->fetch(PDO::FETCH_OBJ);
        return $success;
    }
}



?>
