<?php
    // $path=$_SERVER['DOCUMENT_ROOT'];
    // $path.="/models/worker.php";
    // require_once($path);
    // $path=$_SERVER['DOCUMENT_ROOT'];
    // $path.="/models/auth.php";
    // require_once($path);
    // $path=$_SERVER['DOCUMENT_ROOT'];
    // $path.="/models/status.php";
    // require_once($path);

    require_once '../../helpers/autoload.php';

    //require_once '../../models/worker.php';
    //require_once '../../models/auth.php';
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

    $worker=json_decode(file_get_contents("php://input"));
    // echo json_encode("usao ovasmo");
    // die();
    if(!empty($worker->firstname) &&
        !empty($worker->lastname) &&
        !empty($worker->type) &&
        !empty($worker->manager) &&
        !empty($worker->username) &&
        !empty($worker->email) &&
        !empty($worker->password)
    )
    {
        if(isset($worker->picture))
        {
            $arr=$worker->picture;
                $extension=array_pop(explode("/",$arr));
                $lastId=Work::getLastId()->fetch(PDO::FETCH_OBJ);
                $id=$lastId->id+1;
                $file_name=$id.".".$extension;
                $imagePath="../assets/pictures/".$file_name;
                $imageMove="../assets/pictures/".$file_name;

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
            echo json_encode($lastId);
        }
        else echo "Doslo je do greske,pokusajte ponovo";
    }
    else{
        echo json_encode("Podaci nisu validni");
    }

    // {
    //     "firstname":"Vladislav",
    //     "lastname":"Cosic",
    //     "type":"admin",
    //     "username":"coske123",
    //     "email":"coske@gmail.com",
    //     "password":"12345"
    //     "manager":"2"
    // }

?>
