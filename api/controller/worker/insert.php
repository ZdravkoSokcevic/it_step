<?php

    session_start();
    require_once '../../models/worker.php';
    require_once '../../models/auth.php';
    require_once '../../models/status.php';
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
    #      With JSON username and password to    #
    #       127.0.0.1/controller/login.php       #
    ##############################################

    
    //$worker=json_decode(file_get_contents("../routing.php"));
    $worker=$_SESSION['data'];
    unset($_SESSION['data']);
    // echo json_encode($worker);
    // die();
    if(isset($worker->picture))
    {
        $arr=$worker->picture;
            $extension=array_pop(explode("/",$arr));
            $lastId=Work::getLastId()->fetch(PDO::FETCH_OBJ);
            $id=$lastId->id+1;
            $file_name=$id.".".$extension;
            $imagePath="../api/assets/pictures/".$file_name;
            $imageMove="../assets/pictures/".$file_name;

            //$worker->picture=$imagePath;
            move_uploaded_file($arr['tmp_name'],$imageMove);
    }else{
        $worker->picture=null;
    }
    $lastId=Work::addWorker(
                            $worker->firstname,
                            $worker->lastname,
                            $worker->type,
                            $worker->manager,
                            $worker->username,
                            $worker->email,
                            $worker->password,
                            $worker->picture
                        );
                        
    $statusData=Status::intializeStatus($lastId[0]);
    $authData=Auth::insertAuth($lastId[0],$worker->username,$worker->email,$worker->password,null);
    if(isset($authData) && isset($lastId))
    {
        echo json_encode("Radnik uspesno kreiran");
        http_response_code(200);
    }
    else {
        echo "Doslo je do greske,pokusajte ponovo";
        http_response_code(404);
    };


?>