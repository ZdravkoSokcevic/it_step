<?php
    require_once '../helpers/date.php';
    if(isset($_POST['submit']))
    {

        $dat1=date($_POST['dat1']);
        $dat2=$_POST['dat2'];
        $hours=hour_calc($dat1,$dat2);
        var_dump($hours);
        die();
    }

?>
<!DOCTYPE html>
<head>
    <title></title>
</head>
<body>
    <form method="POST">
        Date1:<input type="date" name="dat1">
        <br>
        Date2:<input type="date" name="dat2">
        <br>
        <input type="submit" name="submit">
    </form>

</body>
