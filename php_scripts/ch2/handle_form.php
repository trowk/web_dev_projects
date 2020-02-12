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
        <?php # Script 2.4 - handle_form.php
            # Created Feburary 9, 2020
            # Created by Ian Trowbridge
            # Uses arrays to store and process data from the html form
            if(!empty($_POST['name']) && !empty($_POST['email'])
            && !empty($_POST['comments'])) {
                echo "<p>Thank you, <strong>{$_POST['name']}</strong>,
                for the following comments:</p> <pre>{$_POST['comments']}
                </pre><p>We will reply to you at <em>{$_POST['email']} 
                </em>.</p><br>";
            } else { // Missing form value
                echo '<p class="error">Please go back and fill out the form
                again.</p>';
            }
        ?>
    </body>
</html>