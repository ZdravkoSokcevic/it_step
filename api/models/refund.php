<?php
    require_once 'entity.php';
    class Refund extends Entity
    {
        public static function insertRefund($request_id,$worker_id,$picture,$reason)
        {
            $refund='refund';
            if($picture==null)
            {
                $picture='DEFAULT';
            }
            $query="INSERT INTO {$refund} (request_id,id_worker,picture,reason) VALUES ('$request_id','$worker_id',$picture,'$reason');";
            $data=static::runQuery($query);
            return $data;
        }
    }


?>