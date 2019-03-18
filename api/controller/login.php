<?php
require_once '../models/auth.php';
require_once '../models/worker.php';

##############################################
#       Required headers                     #
##############################################
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/x-www-form-urlencoded');

##############################################
#      With POST username and password to    #
#       127.0.0.1/controller/login.php       #
##############################################

$auth=json_decode(file_get_contents("php://input"));
echo json_encode($auth);
if(isset($auth->username)&&
    isset($auth->password))
    {
        $user=$auth->username;
        $pass=$auth->password;
        $success=Auth::matchLogin($user,$pass);
       
        if($success)
        {
            $worker=Work::findById($success);
            echo json_encode($worker);
        }else{
            echo json_encode("Username or password doesn't match");
        }
    }
    echo false;

?>