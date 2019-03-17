<?php
    session_start();
    if(isset($_SESSION['workerId']))
    {
        unset($_SESSION['workerId']);
        header("Location: login.php");
    }

?>