<doctype !html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Predefined Variables</title>
    </head>
    <body>
        <?php # Script 1.5- predefined.php
            # Created Feburary 7, 2020
            # Created by Ian Trowbridge
            # This script plays with predefined variables.
            $file = $_SERVER['SCRIPT_FILENAME'];
            $user = $_SERVER['HTTP_USER_AGENT'];
            $server = $_SERVER['SERVER_SOFTWARE'];
            echo "<p>You are running the file:<br />
            <strong>$file</strong>.</p>\n";
            echo "<p>You are viewing this page using:<br />
            <strong>$user</strong>.</p>\n";
            echo "<p>This server is running:<br />
            <strong>$server</strong>.</p>";
        ?>
    </body>
</html>