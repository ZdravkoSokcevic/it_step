<?php
    require_once '../models/manager.php';
    // require_once '../helpers/autoload.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header('Content-Type: application/x-www-form-urlencoded');

    $Managers=Manager::getManagers();
    if($Managers)
    {
        http_response_code(200);
        echo json_encode($Managers);
    }else {
        http_response_code(404);
        echo "Nije pronadjen niti jedan menager";
    }
?>