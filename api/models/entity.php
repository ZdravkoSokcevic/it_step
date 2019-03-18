<?php
    class Entity{
        protected static $table;
        public function __construct($attributes)
        {
            foreach($attributes as $attribute=>$value)
            {
                $this->$attribute=$value;
            }
        }
        ##########################################
        #        Connection to database          #
        ##########################################
        public static function db_connect()
        {
            $user='zdravko';
            $pass='aptzdravko';
            $db_name='it_step';
            return new PDO("mysql:host=localhost;dbname={$db_name};",$user,$pass,null);
        }

        ##########################################
        #       Executing all queries            #
        ##########################################
        protected static function runQuery($query)
        {
            $pdo=static::db_connect();
            try{
                $stmt=$pdo->prepare($query);
                $stmt->execute();
            }catch(PDOException $e){
                return $e;
            }
            if(($pdo->errorCode())==null)
            {
                echo "usao ovamo:";
                var_dump($pdo->errorCode());
                die();
            }
            return $stmt;
        }

        protected static function runNonSelectedQuery($query)
        {
            return static::runQuery($query)->fetch(PDO::FETCH_OBJ);
        }

        #########################################
        #       Fetch all data from table       #
        #########################################
        public static function getAll()
        {
            $table=static::$table;
            $query="SELECT * from {$table};";
            $queryData=static::runQuery($query)->fetchAll();
            $objarr=[];
            foreach($queryData as $data)
            {
                $objarr[]=new static($data);
            }
            return $objarr;
        }
        
        #########################################
        #   find all datas from table by id     #
        #########################################
        public static function findById($id)
        {
            $table=static::$table;
            $query="SELECT * FROM {$table} WHERE id=$id";
            $Id=static::runQuery($query);
            return $Id->fetch(PDO::FETCH_OBJ);
        }

        public static function findByAttribute($attribute,$value)
        {
            $table=static::$table;
            $query="SELECT * FROM $table WHERE $attribute='$value';";
            $qData=static::runQuery($query);
            return $qData;
        }

        ########################################
        #     Get last inserted Id in table    #
        ########################################
        public static function getLastId()
        {
            $table=static::$table;
            $query="SELECT max(id) as 'id' from {$table};";
            $lastId=static::runQuery($query);
            return $lastId;
        }

        ########################################
        #   Update values in table using id    #
        ########################################
        public static function updateValuesById($id,$attribute,$value)
        {
            $table=static::$table;
            $query="UPDATE {$table} SET $attribute='$value' WHERE id=$id;";
            $queryResult=static::runQuery($query)->fetch(PDO::FETCH_OBJ);
            return $queryResult;
        }

        ########################################
        #    Delete rows by id                 #
        ########################################
        public static function delete($id)
        {
            $table=static::$table;
            $query="DELETE FROM {$table} WHERE id={$id};";
            //var_dump($query);
            $success=static::runQuery($query)->fetch(PDO::FETCH_OBJ);
            // var_dump($success);
            if($success)
                return true;
            return false;
        }

        ##########################################
        #   Update values by array of values     #
        ##########################################
        public static function update($arrData)
        {
            $table=static::$table;
            $id=$arrData['id'];

            // var_dump($id);
            // die();

            unset($arrData['id']);
            $updArray=[];

            // var_dump($arrData);
            // die();

            foreach($arrData as $attribute=>$value)
            {
                $updArray[]="$attribute = '$value'";
            }
            $upd=implode(',',$updArray);

            $query="UPDATE {$table} SET {$upd} WHERE id=$id";

            // var_dump($query);
            // die();

            $success=static::runNonSelectedQuery($query);
            
            return $success;
            // var_dump($query);
            // die();
            // var_dump($upd);

            // var_dump($updArray);
            // die();
        }
    }

?>
