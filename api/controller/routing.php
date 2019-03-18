<?php

//require_once '../helpers/autoload.php';
session_start();
require_once '../models/manager.php';
require_once '../models/request.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/x-www-form-urlencoded');

$uri=$_SERVER['REQUEST_URI'];
$self=$_SERVER['PHP_SELF'];
//$uri=file_get_contents("php://input");
//echo $uri."     ".$self;


$table=$_GET['table'];
$action=$_GET['action'];

// echo json_encode($table);
// echo json_encode($action);

#files which arrive with htpp request
$files=json_decode(file_get_contents("php://input"));

// echo json_encode($files);
// die();

if(!is_null(file_get_contents("php://input")))
{
    $_SESSION['data']=$files;
}
switch($table)
{
    case 'workers':
    {
        switch($action)
        {
            case 'insert': {header("Location: worker/insert.php");}break;
            case 'all': require 'WorkerController.php';break;
            case 'getOne':
            {
                header("Location: worker/find?id=".$_GET['id']);
            };break;
            case 'delete':
            {
                $id=$_GET['id'];
                $success=Work::delete($id);
                if($success)
                    echo json_encode(true);
                else echo json_encode(false);
            };break;
            case 'update':
            {
                header("Location: worker/update.php");
            };break;
        }
    };break;
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    case 'manager':
    {
        switch($action)
        {
            case 'getWorkers':
            {
                $id=$_GET['id'];
                if(Work::isManager($id))
                {
                    $manager=Manager::getManager($id)->fetchAll(PDO::FETCH_OBJ);
                    echo json_encode($manager);
                }else{
                    echo json_encode("radnik nije manager");
                }
            };break;
        }
    };break;
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    case 'request':
    {
        switch($action)
        {
            case 'delete':
            {
                $id=$_GET['id'];
                $success=Request::delete($id);
                if($success)
                    echo json_encode(true);
                else echo json_encode(false);
            };break;
        }
    }
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    case 'calendar':
    {
        switch($action)
        {
            case 'insert':
            {
                require_once 'calendar/insert.php';
            };break;
            
            case 'update':
            {

            }
        }
    }
}

//    if($_REQUEST['get'])
//     header("Location: ../return.php");


?>