<?php
    require_once '../models/auth.php';

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header('Content-Type: application/x-www-form-urlencoded');

    $picture=json_decode("php://input");

    $extension=array_pop(explode("/",$picture->type));
    $id=$picture->id;
    $file_name=$picture->id.".".$extension;
    $imagePath="../assets/pictures/".$file_name;
    $imageMove="/assets/pictures/".$file_name;

    move_uploaded_file($picture->image['tmp_name'],$imageMove);
    $uploadSuccess=Auth::uploadPhoto($picture->id,$imageMove);
    if($uploadSuccess)
        {
            echo json_decode("slika je uspjesno uploadovana");
            http_response_code(200);
        }
    else http_response_code(404);
    echo json_decode("sliku nije moguce uploadovati");




?>