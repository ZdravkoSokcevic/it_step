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


    ///To do: odluka se ne smije donijeti ako je proslo vise od 24h od slanja zahtjeva

    if(isset($_SESSION['data']))
    {
        $updData=$_SESSION['data'];
        if(!empty($updData->id) &&
            !empty($updData->decision)&&
            ($updData->decision==0 ||
            $updData->decision==1)
            )
        {
            $success=Request::updateDecision($updData->id,$updData->decision);
            if($success)
            {
                http_response_code(200);
                echo json_encode("Odluka je donesena");
            }else{
                http_response_code(422);
                echo json_encode("Nije moguce promjeniti odluku");
            }
        }
    }else{
        http_response_code(422);
    }

?>