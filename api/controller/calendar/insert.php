<?php
// $dir=glob("../../models/calendar.php");
// echo json_encode($dir);
// die();

require_once '../../models/calendar.php';


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/x-www-form-urlencoded');

$calData=json_decode(file_get_contents("php://input"));

if(
    !empty($calData->date) &&
    !empty($calData->type)
)
{
    if(!isset($calData->description))
        $calData->description="null";
    $insertData=Calendar::insertCalendar($calData->date,$calData->type,$calData->description);
    
    echo json_encode($insertData);
    http_response_code(200);
}else{
    echo json_encode("Podaci nisu validni");
    http_response_code(404);
}

?>