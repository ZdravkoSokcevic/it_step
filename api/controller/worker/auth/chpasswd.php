<?php
require_once '../models/worker.php';
require_once '../models/auth.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/x-www-form-urlencoded');

$updData=$_SESSION['data'];
if(isset($updData))
{
    $success=Auth::matchLogin($updData->username,$updData->password);
    if($success)
    {
        $update=Auth::updateValuesById($success,'password',password_hash($updData->newPassword,PASSWORD_BCRYPT));
        echo json_encode("Lozinka uspjesno promenjena");
        http_response_code(200);
    }else{
        echo json_encode("Lozinka se ne poklapa");
    }
}else{
    echo json_encode("Doslo je do greske, pokusajte ponovo");
    http_response_code(404);
}


?>


/*


    requires json object with next attributes :

    object.username,
    object.password,
    
*/