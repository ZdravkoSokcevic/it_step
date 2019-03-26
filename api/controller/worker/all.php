<?php

    require_once '../../models/worker.php';
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header('Content-Type: application/x-www-form-urlencoded');

    $workers=Work::getWorkers();

    if(isset($workers))
    {
        echo json_encode($workers);
        http_response_code(200);
    }
    http_response_code(404);
    echo "nije pronadjen niti jedan radnik";

?>