<?php
    require_once("../models/worker.php");
    $workers=Work::getAll();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Festival</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="../style/main.css" />
    <script src="main.js"></script>
</head>
<body>
    <div class="navbar">
        <ul>
            <li><a href="view_nastup.php"><p>Pregled nastupa</p></a></li>
            <li><a href="insert_nastup.php"><p>Unos nastupa</p></a></li>
            <li><a href="insert_bina.php"><p>Unos bina</p></a></li>
            <li><a href="insert_izvodjac.php"><p>Unos izvodjaca</p></a></li>
            <li><a href="festival_insert.php"><p>Unos festivala</p></a></li>
        </ul>
    </div>
    <div class="container">
        <div class="left"></div>
        <div class="card-form">

            <form name="worker" method="POST" target="../controller/insert.php" action="../controller/insert.php">
                <label for="">Unesite Ime:</label>
                    <br/>
                    <br>
                <input type="text" name="firstname" required>
                    <br/>
                    <br>
                <label for="">Unesite Prezime:</label>
                    <br>
                    <br>
                <input type="text" name="lastname" required>
                    <br>
                    <br>
                <label for="">Unesite Email:</label>
                    <br>
                    <br>
                <input type="email" name="email" required>
                    <br>
                    <br>
                <label for="">Unesite username:</label>
                    <br>
                    <br>
                <input type="text" name="username" required>
                    <br>
                    <br>
                <label for="">Unesite password:</label>
                    <br>
                    <br>
                <input type="password" name="pass" required>
                    <br>
                    <br>
                <inpit name="type" type="text" value="worker" hidden>
                <br>
                <br>
                <label for="">Odaberite profilnu sliku:</label>
                    <br>
                    <br>
                <input type="file" name="image" type="multipart/data">
                    <br/>
                <input type="submit" name="submitworker" value="Potvrdi">
                <input type="reset" value="Obrisi">
            </form>
            </div>
        </div>
    </div>
</body>
</html>