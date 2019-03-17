<?php
    require_once '../models/worker.php';
    require_once '../models/status.php';
    $workers=Work::getWorkers();
    
    // var_dump($workers);
    // die();

    if(isset($_POST['submit']))
    {
        $insertData=Status::updateStatus($_POST['worker_id'],$_POST['day_off'],$_POST['vacation'],$_POST['overwork']);
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Unos statusa</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="main.js"></script>
</head>
<body>
    <form action="insertstatus.php" method="POST">
        Odaberite radnika kojem zelite da azurirate status:
        <select name="worker_id">
            <?php foreach($workers as $worker)
                {
                    echo "<option value=\"".$worker->id."\">".$worker->first_name." ".$worker->last_name."</option>";
                }

            ?>
        </select>
        <br>
        <br>
        Unesite prekovremene sate:
        <input type="text" name="overwork" value="<?php echo $worker->overwork; ?>" required>
        <br>
        <br>
        Unesite slobodne dane:
        <br>
        <input type="text" name="day_off" value="<?php echo $worker->day_off;?>" required>
        <br>
        <br>
        Unesite dane godisnjeg odmora:
        <br>
        <input type="text" name="vacation" value="<?php echo $worker->vacation;?>" required>
        <br>
        <br>
        <input type="submit" name="submit" required>
    </form>
</body>
</html>