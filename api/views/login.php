<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    Ulogujte se da biste nastavili:
    <form action="/controller/insert.php" method="POST">
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
        <input type="submit" value="Potvrdi" name="login"required>
    </form>
</body>
</html>