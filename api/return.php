<?php
    header("Content-Type: application/x-www-form-urlencoded");
    require_once 'models/worker.php';
    header("get:getUser");
    $id=$_REQUEST['get'];
    $workers=Work::findById($id);
    
    echo json_encode($workers);



?>