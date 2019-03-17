<?php
    header("Content-Type:application/x-www-form-urlencoded");
    #######################################
    #       finding a worker with GET     #
    #######################################
    
    require_once '../models/worker.php';
    if(isset($_GET['id']))
    {
        $id=$_GET['id'];
        $worker=Work::findById($id);
        if(is_object($worker))
        {
            echo json_encode($worker);
            http_response_code(200);
        }else{
            echo json_encode("Radnik ne postoji");
            http_response_code(404);
        }
    }else{
        echo json_encode("Doslo je do greske");
        http_response_code(503);
    }
    echo false;



?>