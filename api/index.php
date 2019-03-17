<?php
    require_once 'models/worker.php';
    session_start();
    if(isset($_SESSION['workerId']))
    {
        $worker=Work::getLoggedIn();
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Overview nastup</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="style/main.css" />
    <script src="view.js"></script>
</head>
<body>
    <div class="navbar">
        <ul>
            <li><a href="/views/login.php"><p>Login</p></a></li>
            <li><a href="/views/register.php"><p>Register</p></a></li>

        </ul>
    </div>
    <div class="container">
        <div class="left"></div>
        <div class="center">
            <div class="card">
                <div class="element">
                    <?php if(isset($_SESSION['workerId']))
                    {
                        echo "<p> Dobrodosli ".$worker->first_name." ".$worker->last_name." </p>";
                        echo "<a href=\"/views/logout.php\">Odjavite se</a>";
                    } else{
                        
                        echo "<a href=\"/views/login.php\">Ulogujte se</a>";
                        echo "<br><br>";
                        echo "<a href=\"/views/register.php\">Registrujte se</a>";
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</body>
</html>