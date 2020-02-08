<doctype !html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Form Feedback</title>
    </head>
    <body>
        <?php # Script 2.2 - handle_form.php
            # Created Feburary 8, 2020
            # Created by Ian Trowbridge
            # Handles and displays the input from form.html
            $name = $_REQUEST['name'];
            $email = $_REQUEST['email'];
            $comments = $_REQUEST['comments'];
            if(isset($_REQUEST['gender'])) {
                $gender = $_REQUEST['gender'];
            } else {
                $gender = NULL;
            }
            echo '<p>Thank you, <strong>' . $name . '</strong>, for the 
            following comments:</p> <pre>' . $comments . '</pre><p>We will 
            reply to you at <em>' . $email . '</em>.</p><br>';
            if($gender == 'M') {
                echo '<p><strong>Good day, Sir!</srong></p>';
            } elseif ($gender == 'F') {
                echo '<p><strong>Good day, Madam!</strong></p>';
            } else {
                echo '<p><strong>You forgot to enter your gender!</strong></p>';
            }
        ?>
    </body>
</html>