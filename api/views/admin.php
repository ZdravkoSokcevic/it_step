<?php
    require_once '../models/worker.php';
    $admins=Work::getByType('manager');
    var_dump($admins);
    die();

?>