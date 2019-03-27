<?php

    session_start();

    require_once '../../models/request.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header('Content-Type: application/x-www-form-urlencoded');

    // echo json_encode($_SESSION['data']);
    // die();
    if (isset($_SESSION['data'])) 
    {
        $reqData=$_SESSION['data'];
        if(
            !empty($reqData->type) &&
            !empty($reqData->typeValue) &&
            !empty($reqData->idWorker)
        )
        {
            switch($reqData->type)
            {
            
                case 'day_off':
                {
                    $number=2;
                    $success=Request::insertRequest( 
                                            $reqData->type,
                                            $reqData->typeValue,
                                            'DEFAULT',
                                            $reqData->idWorker,
                                            $reqData->description,
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
                    if(!empty($reqData->reason))
                    {
                        $success=Request::insertRequest(
                                                $reqData->type,
                                                $reqData->typeValue,
                                                'DEFAULT',
                                                $reqData->idWorker,
                                                null,
                                                null,
                                                $reqData->reason,
                                                null,
                                                null,
                                                null,
                                                null
                                            );
                    }else{
                        $success=false;
                    };break;
                }
                case 'allowance':
                {
                    if(!empty($reqData->reason))
                    {
                        $success=Request::insertRequest(
                                                $reqData->type,
                                                $reqData->typeValue,
                                                'DEFAULT',
                                                $reqData->idWorker,
                                                null,
                                                null,
                                                $reqData->reason,
                                                null,
                                                null,
                                                null,
                                                null
                                                );
                    }else{
                        $success=false;
                    };break;
                }
                case 'errand':
                {
                    // echo json_encode($reqData);
                    // die();
                    if(
                        !empty($reqData->time_go) &&
                        !empty($reqData->time_back) &&
                        !empty($reqData->country) &&
                        !empty($reqData->town) &&
                        !empty($reqData->reason) )
                        {
                            $success=Request::insertRequest(
                                                    $reqData->type,
                                                    $reqData->typeValue,
                                                    'DEFAULT',
                                                    $reqData->idWorker,
                                                    $reqData->desc,
                                                    null,
                                                    $reqData->reason,
                                                    $reqData->time_go,
                                                    $reqData->time_back,
                                                    $reqData->country,
                                                    $reqData->town
                                                    );
                        }else{
                            $success=false;
                        }break;
                }
                case 'refund':
                {
                    if(!empty($reqData->picture) &&
                        !empty($reqData->reason) &&
                        !empty($reqData->number)
                    )
                    {
                        $success=Request::insertRequest(
                            $reqData->type,
                            $reqData->typeValue,
                            'DEFAULT',
                            $reqData->idWorker,
                            null,
                            $reqData->picture,
                            $reqData->reason,
                            null,
                            null,
                            null,
                            null
                        );
                    }else{
                        $success=false;
                    };break;
                }
            }
            if($success){
                http_response_code(200);
                echo json_encode("Uspesno poslan zahtev");
            }else{
                http_response_code(503);
                echo json_encode("Greska");
            } 
    
        }else{
            http_response_code(503);
            echo json_encode("Podaci nisu validni");
        }
    
        // $data=Request::findAllAllowedRequest();
        // var_dump($data);
        // die();
    }else{
        http_response_code(404);
    }
?>