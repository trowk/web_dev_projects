<doctype !html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Calendar</title>
    </head>
    <body>
        <form action="calendar.pup" method="post">
            <?php # Script 2.5 - calendar.php
                # Created Feburary 9, 2020
                # Created by Ian Trowbridge
                # Uses array to represent the months of the year
                $months = [1 => 'January', 'February', 'March', 'April', 'May',
                'June', 'July', 'August', 'September', 'October', 'November',
                'December'];
                echo '<select name="month">';
                foreach($months as $key => $value) {
                    echo "<option value=\"$key\">$value</option>";
                }
                echo '</select>';
                echo '<select name="day">';
                for ($day=1; $day<32; ++$day) {
                    echo "<option value=\"$day\">$day</option>";
                }
                echo '</select>';
                echo '<select name="year">';
                for($year=1; $year<2028; ++$year) {
                    echo "<option value=\"$year\">$year</option>";
                }
                echo '</select>';
            ?>
        </form>
    </body>
</html>