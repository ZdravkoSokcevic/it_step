<?php

require_once 'models/calendar.php';
    if(isset($_POST['submit']))
    {
        $date=$_POST['date'];
        $type=$_POST['type'];
        $desc=$_POST['description'];
        $succ=Calendar::insertCalendar($date,$type,$desc);
    }

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Calendar</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css">
    <script src="main.js"></script>
</head>
<body>
        <form action="" method="POST">
            <input type="date" name="date">
            <select name="type">
                <option value="working">Radni</option>
                <option value="free">Slobodan</option>
            </select>
            <textarea name="description" cols="30" rows="10" placeholder="desc">

            </textarea>
            <br>
            <input type="submit" name="submit" value="Potvrdi">
        </form>
</body>
</html>