<?php

    require_once 'models/request.php';
    
    $idWorker=3;

    $date=date("F d, Y h:m");

    $typeValue=180;

    $thirdPerson=null;
    
    $description='slobodan dan';

    
    $type='refund';


    switch($type)
    {
        case 'day_off':
        {
            $number=2;
            Request::insertRequest( 
                                    $type,
                                    $typeValue,
                                    'DEFAULT',
                                    $idWorker,
                                    $description,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                );
        break;
        }
        case 'overwork':
        {
            $reason='razlog1';
            Request::insertRequest(
                                    $type,
                                    $typeValue,
                                    'DEFAULT',
                                    $idWorker,
                                    null,
                                    null,
                                    $reason,
                                    null,
                                    null,
                                    null,
                                    null
                                );
            break;
        }
        case 'allowance':
        {
            Request::insertRequest(
                                    $type,
                                    $typeValue,
                                    'DEFAULT',
                                    $idWorker,
                                    null,
                                    null,
                                    $reason,
                                    null,
                                    null,
                                    null,
                                    null
                                    );
        break;
        }
        case 'errand':
        {
            $time_go=date("Y-m-d h:m");
            $time_back=date("Y-m-d h:m");
            $country='china';
            $town='ghuandzou';
            $reason='dej off';
            Request::insertRequest(
                                    $type,
                                    $typeValue,
                                    'DEFAULT',
                                    $idWorker,
                                    $desc,
                                    null,
                                    $reason,
                                    $time_go,
                                    $time_back,
                                    $country,
                                    $town
                                    );
        break;
        }
        case 'refund':
        {
            $picture=null;
            $reason='vanredno';
            $number=200;
            Request::insertRequest(
                                    $type,
                                    $typeValue,
                                    'DEFAULT',
                                    $idWorker,
                                    null,
                                    $picture,
                                    $reason,
                                    null,
                                    null,
                                    null,
                                    null
                                );
        break;
        }

    }


    // $data=Request::findAllAllowedRequest();
    var_dump($data);
    die();
?>