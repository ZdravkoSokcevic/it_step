<?php

    require_once '../models/calendar.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header('Content-Type: application/x-www-form-urlencoded');

    $updCal=json_decode(file_get_contents("php://input"));

    if(is_object($updCal))
    {
        if(!empty($updCal->date) ||
            !empty($updCal->type) || 
            !empty($updCal->description))
        {
            $cal=Calendar::findByAttribute('date',$updCal->date)->fetch(PDO::FETCH_OBJ)->id;
            if(is_obj($cal))
            {
                $updData=[
                    'id'=>$cal->id,
                    'date'=>$updCal->date,
                    'type'=> $updCal->type,
                    'description'=>$updCal->description
                ];
                $updSucc=Calendar::update($updData);
                if($updSucc)
                {
                    http_response_code(200);
                }else{
                    http_response_code(404);
                }
            }else{
                if(!isset($updCal->description))
                    $updCal->description="null";
                Calendar::insertCalendar($updCal->date,$updCal->type,$updCal->description);
                http_response_code(200);
            }
        }
    }else{
        http_response_code(501);
    }

?>