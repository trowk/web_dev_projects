<doctype !html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Numbers</title>
</head>
<body>
    <?php # Script 1.7- numbers.php
        # Created Feburary 8, 2020
        # Created by Ian Trowbridge
        # This script plays with creating and assigning number variables.
        $quantity = 30;
        $tax_rate = 0.05;
        $price = 119.95;
        $total = $quantity * $price;
        $total = $total + ($total * $tax_rate);
        $total = number_format($total, 2);
        echo '<p>You are purchasing <strong>' . $quantity . '</strong> widget(s)
        each at a cost of <strong>' . $price . '</strong> each. With tax, the
        total comes to <strong>' . $total . '</strong>.</p>';
    ?>
</body>
</html>