
<?php # Script 3.4 - index.php
    # Created Feburary 10, 2020
    # Created by Ian Trowbridge
    # Works with html files to create a more modularized website
    $page_title = 'Welcome to this Site!';
    include('includes/header.html');
?>
<div class="page-header">
    <h1>Content Header</h1>
</div>
<p>
    This is where the page-specific content goes. This section and the 
    corresponding headers will change from one page to the next.
</p>
<?php
    include('includes/footer.html')
?>