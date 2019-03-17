<?php
    require_once 'models/calendar.php';

    $update=$_GET['id'];
    $calendar=Calendar::findById($update);
    if(isset($_POST['submit']))
    {
        $updData=[
            'id'=>Calendar::findByAttribute('date',$_POST['date'])->fetch(PDO::FETCH_OBJ)->id,
            'date'=>$_POST['date'],
            'type'=> $_POST['type'],
            'description'=>$_POST['description']
        ];
        $updSucc=Calendar::update($updData);
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
            <input type="date" name="date" value="<?php echo $calendar->date ?>">
            <select name="type">
                <option value="working">Radni</option>
                <option value="free">Slobodan</option>
            </select>
            <textarea name="description" cols="30" rows="10" placeholder="desc">
                <?php echo $calendar->description ?>
            </textarea>
            <br>
            <input type="submit" name="submit" value="Potvrdi">
        </form>
</body>
</html>