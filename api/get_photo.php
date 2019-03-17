<?php
    require_once 'models/worker.php';
    require_once 'models/auth.php';
    $id=68;
    if(isset($_POST['submit']))
    {
        $extension=array_pop(explode("/",$_FILES['picture']['type']));
        $image=$_FILES['picture']['tmp_name'];

        $destination='assets/pictures/';
        $destination.="$id.";
        $destination.=$extension;


        //var_dump($destination);

        move_uploaded_file($image,$destination);
        $success=Auth::uploadPhoto($id,$destination);
        // var_dump($image);
        // die();
    }
    $worker=Work::findById($id);
    $del=Work::delete(1);
    //var_dump($worker);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Upload</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css">
    <script src="main.js"></script>
</head>
<body>
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="file" name="picture">
        <br>
        <input type="submit" name="submit">
    </form>
    <?php if(isset($worker->picture)): ?>
        <img src="<?php echo $worker->picture; ?>" alt="agfaf" width="400px">
    <?php endif ?>
</body>
</html>