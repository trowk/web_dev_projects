<doctype !html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Multidimensional Arrays</title>
    </head>
    <body>
        <?php # Script 2.6 - multi.php
            # Created Feburary 9, 2020
            # Created by Ian Trowbridge
            # Plays with multidimensional arrays
            echo '<p>Some North American States, Provinces, and Territories
            </p>';
            $mexico = [
                'YU' => 'Yucatan',
                'BC' => 'Baja California',
                'OA' => 'Oaxaca'
            ];
            $us = [
                'MD' => 'Maryland',
                'IL' => 'Illinois',
                'PA' => 'Pennsylvania',
                'IA' => 'Iowa'
            ];
            $canada = [
                'QC' => 'Quebec',
                'NB' => 'Alberta',
                'AT' => 'Northwest Territories',
                'YT' => 'Yukon',
                'PE' => 'Prince Edward Island'
            ];
            $n_america = [
                'Mexico' => $mexico,
                'United States' => $us,
                'Canada' => $canada
            ];
            foreach($n_america as $country => $list) {
                echo "<h2>$country</h2><ul>";
                foreach($list as $k => $v) {
                    echo "<li>$k - $v</li>\n";
                }
                echo '</ul>';
            }
        ?>
    </body>
</html>