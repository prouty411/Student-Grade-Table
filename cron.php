<?php
    $restfile = file_get_contents('studentReset.sql');
    require_once('mysql_connect.php');
    mysqli_multi_query($conn,$restfile);



?>