<doctype !html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Strings</title>
    </head>
    <body>
        <?php # Script 1.6- strings.php
            # Created Feburary 7, 2020
            # Created by Ian Trowbridge
            # This script plays with creating and assigning strings.
            $first_name = 'Haruki';
            $last_name = "Murakami";
            $author = $first_name . ' ' . $last_name;
            $book = "Kafka on the Shore";
            echo "<p>The book <em>$book</em> was written by $author.</p>"
        ?>
    </body>
</html>