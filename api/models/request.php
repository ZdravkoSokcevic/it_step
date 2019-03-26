<?php
    require_once 'entity.php';
    require_once 'worker.php';
    require_once 'errand.php';
    require_once 'refund.php';
    require_once 'overwork.php';
    require_once 'allowance.php';
    require_once 'dayoff.php';
    require_once 'status.php';
    class Request extends Entity
    {
        private $date,$thirdPerson,$decision,$type,$day_off,$overwork,$approveDate,$dayPay;
        protected static $table='request';
        protected static $requestType;

        public static function insertRequest($type,$typeValue,$thirdPerson,$idWorker,$description,$picture,$reason,$time_go,$time_back,$country,$town)
        {
            $table=static::$table;
            $now_date=date("Y/m/d h:i");
            $quertData="nesto";
            $query="
                INSERT INTO {$table} (  
                    send_date,
                    type,
                    decision_date,
                    third_person,
                    worker_id,
                    description
                    ) VALUES (
                        '$now_date',
                        '$type',
                         null,
                         default,
                        '$idWorker',
                        '$description'
                    );
            ";
            // echo json_encode($query);
            // die();
            $insertData=static::runNonSelectedQuery($query);
            
            // var_dump($insertData);
            // die();

            # getting id and type from inserted row
            $Id=static::getLastId()->fetch();
            $idRequest=$Id[0];

            $workerId=static::findById($idRequest);
            $table1=$type;
            //var_dump($workerId);
            if($insertData && is_object($workerId))
            {
                switch($table1)
                {
                    case 'overwork': $queryData=Overwork::insertOverwork($idRequest,$typeValue,$reason);break;
                    case 'refund': $queryData=Refund::insertRefund($idRequest,$workerId->worker_id,$picture,$reason);break;
                    case 'errand': $queryData=Errand::insertErrand($idRequest,$workerId->worker_id,$time_go,$time_back,$country,$town);break;
                    case 'day_off':$queryData=DayOff::insertDayOff($idRequest,$typeValue);break;
                    case 'allowance': $queryData=Allowance::insertAllowance($idRequest,$typeValue);break;
                    default: break;
                }   
                return $queryData;
            }else{
                return false;
            }
            //die();
        }

        public static function updateDecision($id,$decision)
        {
            $table=static::$table;
            # updatin decision in request and set date to now

            # here we must find out does he have privilegies to request
            ##########

            $updateData=static::updateValuesById($id,'decision',$decision);
            $date_dec=date("Y-m-d");
           // var_dump($date_dec);
            $updateData=static::updateValuesById($id,'decision_date',$date_dec);

            #   searching decision value in request

            $decisionQuery="SELECT * from $table WHERE id='$id';";
            $rowData=static::runQuery($decisionQuery)->fetch(PDO::FETCH_OBJ);
            
            // var_dump($rowData);
            // die();
            
            # if decision is 1 we need to update values
             # first we have to get type of request
             # requestType is the new table to update
            self::$requestType=$rowData->type;
            $getReqInfo="SELECT * from {$rowData->type} 
                            left join $table ON {$rowData->type}.request_id={$table}.id 
                                where $rowData->type.request_id='$id';";
            $reqData=static::runQuery($getReqInfo)->fetch(PDO::FETCH_OBJ);

            // var_dump($reqData->fetch());
            // die();

            #   get old values from status

            // var_dump($rowData);
            // die();

            if($rowData->type=='day_off' || 
            $rowData->type=='overwork' || 
                $rowData->type=='errand')
            {
                $oldDataQuery="SELECT * from status where id='$rowData->worker_id';";
                $oldData=static::runQuery($oldDataQuery)->fetch(PDO::FETCH_OBJ);
                
                // echo "row data je :".$rowData->type;
                // die();

                // var_dump($oldData);
                // die();

                switch($rowData->type)
                {
                    case 'day_off':
                    {
                        #### to do: update unworking days

                        # we must select overwork hours
                        $oldOverworkValue=$oldData->overwork;
                        $requestDays=$reqData->number;
                        # if he has 
                        if(($oldOverworkValue/8)>=$requestDays)
                        {
                            $oldReqDays=$oldData->day_off;
                            $newOverwork=$oldOverworkValue%(8*$requestDays);
                            Status::updateValuesById($reqData->worker_id,'day_off',$requestDays+$oldReqDays);
                            Status::updateValuesById($reqData->worker_id,'overwork',$newOverwork);
                        }
                        break;
                    } 
                    case 'overwork':
                    {
                        $newoverworkHours=$reqData->number;
                        $oldDataHours=$oldData->overwork;
                        $newData=$newoverworkHours+$oldDataHours;
                        Status::updateValuesById($reqData->worker_id,'overwork',$newData);
                    } 
                    default: break;
                }
            }
            
            // var_dump($reqData);
            // die();
            return $updateData;
        }

        public static function findAllAllowedRequest()
        {
            $table=static::$table;
            $query="SELECT * FROM $table where decision=1;";
            $queryData=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
            return $queryData;
        }

        public static function findRequestByWorker($id)
        {
            $table=static::$table;
            $query="SELECT * FROM $table WHERE worker_id=$id and decision=1;";
            $queryData=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
            
            var_dump($queryData);
            die();

            return $queryData;
        }

    }

?>