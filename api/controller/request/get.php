<?php
    session_start();
    require_once '../../models/manager.php';
    require_once '../../models/request.php';
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header('Content-Type: application/x-www-form-urlencoded');
    
    /**********************************************************/
    /*      This file get all requests for manager            */
    /**********************************************************/

    if(isset($_SESSION['data']))
    {
        $manager=$_SESSION['data'];
        $reqInProcess=Manager::getRequests($manager->id);
        if(is_object($reqInProcess))
        {
            http_response_code(200);
            echo $reqInProcess;
        }else{
            http_response_code(422);
        }
    }else{
        http_response_code(404);
    }

?>