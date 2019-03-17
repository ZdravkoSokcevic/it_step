<?php
    require_once 'controller/WorkerController.php';

    $workers=Work::getWorkers();

    var_dump($workers);
    die();

?>