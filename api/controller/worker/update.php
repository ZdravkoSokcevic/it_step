<?php
    session_start();
    require_once '../../models/worker.php';
    require_once '../../models/manager.php';
    require_once '../../models/auth.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header('Content-Type: application/x-www-form-urlencoded');


    $updData=$_SESSION['data'];
    unset($_SESSION['data']);
    // echo json_encode($updData);
    // die();

    if(!empty($updData->id) &&
        !empty($updData->first_name) &&
        !empty($updData->last_name) &&
        !empty($updData->username) &&
        !empty($updData->password) &&
        !empty($updData->picture))
        {
            $toUpdate=[
                'id'=>$updData->id,
                'first_name'=>$updData->first_name,
                'last_name'=>$updData->last_name
            ];
            $success=Work::update($toUpdate);

            $toUpd=[
                'id'=>$updData->id,
                'username'=>$updData->username,
                'password'=>$updData->password,
                'picture'=>$updData->picture
            ];
            $success2=Auth::update($toUpd);

            var_dump($success,$success2);
            die();

            if($success && $success2)
            {
                http_response_code(200);
                echo json_encode("Uspjesno ste sacuvali podatke");
            }else{
                http_response_code(505);
                echo json_encode("Podaci nisu validni");
            }
        }else{
            http_response_code(404);
            echo json_encode("Not found");
        }

?>