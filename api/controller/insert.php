<?php
    require_once '../models/worker.php';
    require_once '../models/auth.php';
    require_once '../models/status.php';
    ######################
    //  Uploading worker #
    ######################
    session_start();

    // var_dump($_FILES['profile_image']);
    // die();

    if(isset($_POST['submitworker']) && 
        isset($_POST['firstname']) &&
        isset($_POST['email']) &&
        isset($_POST['username']) &&
        isset($_POST['pass']) &&
        isset($_POST['type']) &&
        !isset($_SESSION['userId'])
        )
    {
        require_once("../models/worker.php");
        $name=$_POST['firstname'];
        $lastname=$_POST['lastname'];
        $email=$_POST['email'];
        $username=$_POST['username'];
        $password=$_POST['pass'];
        $type=$_POST['type'];
        $image='null';
        
        $manager='null';

        if(isset($_POST['manager']))
        {
            $manager=$_POST['manager'];
        }
        $image_name=null;
        if(is_array($_FILES['profile_image']))
        {
            $arr=$_FILES['profile_image']['type'];
            $extension=array_pop(explode("/",$arr));

            $image=file_get_contents($_FILES['profile_image']);
            # ps  nesto ne  radi  kako treba sa direktorijumom
            ##################################################
            $lastId=Work::getLastId()->fetch(PDO::FETCH_OBJ);
            $id=$lastId->id+1;
            $file_name=$id.".".$extension;
            $imagePath="../assets/pictures/".$file_name;
            $imageMove="../assets/pictures/".$file_name;

            // var_dump($_FILES['profile_image']['tmp_name']);
            // var_dump($_FILES['profile_image']['name']);

            move_uploaded_file($_FILES['profile_image']['tmp_name'],$imageMove);
            
            // var_dump($file_name);
            // die();

        }
        // var_dump($imagePath);
        // die();

        $lastId=Work::addWorker($name,$lastname,$type,$manager,$username,$email,$password,$imagePath);
        $authData=Auth::insertAuth($lastId[0],$username,$email,$password,$imagePath);
        
        $statusData=Status::intializeStatus($lastId[0]);
        #   User is logged in
        Work::loginWorker($lastId);
        $worker=Work::findById($lastId);
        if(is_object($authData) && $worker->type=='admin')
        {
            header("Location: /admin_panel.php");
            die();
        }
        header("Location: /index.php");
    }

    ##############################
    #            LOGIN           #
    ##############################    
    if(isset($_POST['login']) &&
        isset($_POST['username']) &&
        isset($_POST['pass']) &&
        (!isset($_SESSION['workerId']))
        )
    {
        $username=$_POST['username'];
        $password=$_POST['pass'];
        $workerId=Auth::matchLogin($username,$password);
        $worker=Work::findById($workerId);
        if(!is_null($workerId) && 
            (
                $worker->type==='admin' ||
                $worker->type==='manager'
            )
          )
        {
            //Work::loginWorker($workerId);
            header("Location: /admin_panel.php");
            die();
        }
        if(
            !is_null($workerId) && 
            $worker->type==='worker'
          )
        {
            //Work::loginWorker($workerId);
            header("Location: /index.php");
            die();
        }
    }
    header("Location: /views/logout.php");

?>