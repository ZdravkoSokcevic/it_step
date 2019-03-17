<?php

    require_once 'entity.php';
    require_once 'worker.php';

    class Manager extends Work
    {
        public static function getRequests($id)
        {
            # get all worker id's where is i manager
            $query="SELECT worker.id FROM worker WHERE id_manager='$id';";
            $queryData=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
            
            $reqArray=[];
            // var_dump($queryData);
            // die();
            foreach($queryData as $worker_id)
            {
                // var_dump($worker_id->id);

                $query="SELECT * FROM request WHERE worker_id='$worker_id->id' and decision=1;";
                

                $requestData=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
                $reqArray[]=$requestData;
                foreach($requestData as $request)
                {
                    //var_dump($request->type);
                    
                    switch($request->type)
                    {
                        case 'overwork': $queryData=Overwork::findByAttribute('request_id',$request->id);break;
                        case 'refund': $queryData=Refund::findByAttribute('request_id',$request->id);break;
                        case 'errand': $queryData=Errand::findByAttribute('request_id',$request->id);break;
                        case 'day_off':$queryData=DayOff::findByAttribute('request_id',$request->id);break;
                        case 'allowance': $queryData=Allowance::findByAttribute('request_id',$request->id);break;
                    }
                    var_dump($queryData->fetchAll(PDO::FETCH_OBJ));
                }
                $reqArray[]=1;
            }

            //var_dump($reqArray);
            die();

            $query="SELECT * FROM request where ";
        }

        public static function AllRequests($id)
        {

            $query="SELECT worker.id FROM worker WHERE id_manager='$id';";
            $workers=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
            $allArray=[];
            var_dump($workers);
            foreach($workers as $worker_id)
            {
                $query="SELECT id,type FROM request WHERE worker_id='$worker_id->id' and decision=1;";

                $reqRowId=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);

                //var_dump($reqRowId);

                foreach($reqRowId as $reqId)
                {
                    $query="SELECT *
                            FROM worker,request,$reqId->type
                            WHERE worker.id=request.worker_id and 
                                request.id='$reqId->id' and 
                            $reqId->type.request_id=request.id;";
                    var_dump($query);
                    $allArray[]=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
                }
            }
            var_dump($allArray);
            die();
        }

        public static function getManagers()
        {
            $query="SELECT * FROM worker where type='manager';";
            $qData=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
            if($qData)
            {
                return $qData;
            }
            return false;
        }

        /*    return unique manager for id of worker */
        
        public static function getManager($id)
        {
            return static::findByAttribute('id_manager',$id);
        }
    }


?>