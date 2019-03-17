<?php
    require_once '../models/request.php';
    require_once '../models/manager.php';
    $decision=1;
    $id=57;

    $data=Request::updateDecision($id,$decision);
    var_dump($data);
    die();

    #   get the duration 

    // require_once '../models/errand.php';
    // $duration=Errand::getErrandDuration(3);
    
    // var_dump($duration);
    // die();

    // $data=Request::findRequestByWorker(2);
    
    // $manager=Manager::getRequests(1);
    $data=Manager::AllRequests(1);

    var_dump($data);
    die();

?>