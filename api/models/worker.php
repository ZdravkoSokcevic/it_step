<?php
    require_once("entity.php");

    class Work extends Entity
    {
        public $id,$name,$lname,$type,$manager_id;
        protected static $table='worker';

        // public function __construct($data)
        // {
        //     $dataArray=[];
        //     foreach($data as $worker)
        //     {
        //         $dataArray[]=$worker;
        //     }
        // }

        public static function loginWorker($id)
        {
            session_start();
            $_SESSION['workerId']=$id;
        }

        public static function getLoggedIn()
        {
            session_start();
            if(isset($_SESSION['workerId']))
            {
                $worker=Work::findById($_SESSION['workerId']);
                return $worker;
            }
        return null;
        }

        public static function findByName($arg_name)
        {
            $table=static::$table;
            $name=$arg_name;
            $query="SELECT * FROM $table WHERE first_name='$name';";
            $queryData=Entity::runQuery($query)->fetch();
            return $queryData;
        }

        public static function addWorker($first_name,$last_name,$type,$manager_id,$username,$email,$password,$picture)
        {
            $insertData=static::insertWorker($first_name,$last_name,$type,$manager_id);
                $lastId=static::getLastId()->fetch();
                return $lastId;
        }

        public static function insertWorker($name,$lname,$type,$manager)
        {
            $table=static::$table;
            $query="INSERT INTO {$table} (first_name,last_name,id_manager,type) VALUES ('$name','$lname',$manager,'$type');";
            $objData=static::runQuery($query);
            if(is_object($objData)||is_array($objData))
            {
                return true;
            }
            return false;
        }

        public static function getWorkers()
        {
            $table=static::$table;
            $query="SELECT * FROM {$table},auth,status WHERE $table.id=status.id and $table.id=auth.id;";
            $objData=static::runQuery($query)->fetchAll(PDO::FETCH_ASSOC);
            $worArr=[];
            foreach($objData as $worker)
            {
                $worArr[]=new static($worker);
            }
            if($worArr!==null && is_array($worArr))
                return $worArr;
            return false;
        }

        #   toDo-imamo ovdje jos status da update-ujemo
        ###############################################
                
        public static function updateWorker($id,$fname,$lname,$type,$manager,$username,$email,$password,$picture)
        {
            $table=static::$table;
            $query="UPDATE {$table} SET first_name={$fname},last_name={$lname},type={$type},id_manager={$manager}";
            $qData=static::runQuery($query)->fetch(PDO::FETCH_ASSOC);
            return $qData;
        }

        public static function findById($id)
        {
            $table=static::$table;
            $query="SELECT * FROM {$table},auth,status WHERE $table.id=status.id and $table.id=auth.id and $table.id={$id};";
            $worker=static::runQuery($query)->fetch(PDO::FETCH_OBJ);

            // var_dump($worker);
            // die();

            if(is_object($worker))
            {
                return $worker;
            }
            return false;
        }

        public static function isManager($id)
        {
            $worker=static::findById($id);
            if($worker->type==='manager')
                return true;
            return false;
        }
        
        public static function getByType($type)
        {
            $table=static::$table;
            $query="SELECT * FROM {$table},auth,status WHERE $table.id=auth.id AND $table.id=status.id AND type='$type';";
            $byType=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
            $arr=[];
            foreach($byType as $worker)
            {
                $arr[]=$worker;
            }
            return $arr;
        }

    }
?>