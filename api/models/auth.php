<?php
    require_once("entity.php");
    require_once("worker.php");
    class Auth extends Work
    {
        public $id,$username,$email,$password,$picture;
        protected static $table='auth';
        public static function insertAuth($id,$username,$email,$password,$picture)
        {
            $table=static::$table;
            $pass=password_hash($password,PASSWORD_BCRYPT);
            $query="INSERT INTO {$table} (id,username,email,password,picture) VALUES ('$id','$username','$email','$pass','$picture');";
            $queryData=static::runQuery($query);
            return static::getLastId();
        }
        public static function getAuthById($id)
        {
            $query="SELECT * FROM auth WHERE id='$id';";
            $authData=Entity::runQuery($query);
            var_dump($authData);
        }

        public static function matchLogin($user,$pass)
        {
            $table=static::$table;
            $pass=trim($pass);
            $username=trim($user);
            $query="SELECT username,password from {$table}";
            $userInfo=static::runQuery($query)->fetchAll(PDO::FETCH_OBJ);
            foreach($userInfo as $user)
            {
                $wPass=password_verify($pass,$user->password);
                if(($username==$user->username) && $wPass)
                {
                    $query="SELECT id FROM {$table} WHERE username='$user->username';";
                    $userId=static::runQuery($query)->fetch(PDO::FETCH_OBJ);
                }
            }
            if(isset($userId))
            {
                Auth::loginWorker($userId->id);
                return $userId->id;
            }
            return false;
        }

        public static function uploadPhoto($id,$imagePath)
        {
            $worker=Work::findById($id);

            #   if picture is not null then we had to upload new
            if(is_object($worker))
            {
                $updateVal=Auth::updateValuesById($id,'picture',$imagePath);
                return $updateVal;
            }
            else return false;
        }
    }
?>