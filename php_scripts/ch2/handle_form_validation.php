<doctype !html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Form Feedback</title>
        <style type="text/css">
            .error{
                font-weight: bold;
                color: #C00;
            }
        </style>
    </head>
    <body>
        <?php # Script 2.3 - handle_form.php
            # Created Feburary 9, 2020
            # Created by Ian Trowbridge
            # Handles and displays the input from form.html and checks for valid
            # inputs
            if(!empty($_REQUEST['name'])) {
                $name = $_REQUEST['name'];
            } else {
                $name = NULL;
                echo '<p class="error">You forgot to enter your name !</p>';
            }
            if(!empty($_REQUEST['email'])) {
                $email = $_REQUEST['email'];
            } else {
                $email = NULL;
                echo '<p class="error">You forgot to enter your email !</p>';
            }
            if(!empty($_REQUEST['comments'])) {
                $comments = $_REQUEST['comments'];
            } else {
                $comments = NULL;
                echo '<p class="error">You forgot to enter your comments !</p>';
            }
            if(isset($_REQUEST['gender'])) {
                $gender = $_REQUEST['gender'];
            } else {
                $gender = NULL;
            }
            if($gender == 'M') {
                $greeting = '<p><strong>Good day, Sir!</srong></p>';
            } elseif ($gender == 'F') {
                $greeting = '<p><strong>Good day, Madam!</strong></p>';
            } else {
                echo '<p class="error">Gender should be either "M" or "F"!</p>';
            }
            if($name && $email && $gender && $comments) {
                echo '<p>Thank you, <strong>' . $name . '</strong>, for the 
                following comments:</p> <pre>' . $comments . '</pre><p>We will 
                reply to you at <em>' . $email . '</em>.</p><br>';
                echo $greeting;
            } else { // Missing form value
                echo '<p class="error">Please go back and fill out the form
                again.</p>';
            }
        ?>
    </body>
</html>