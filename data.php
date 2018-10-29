<?php
require('mysql_connect.php');
define('fromData',true);
if(empty($_GET['action'])){
	exit('no action specified');
}
$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]
];
switch($_GET['action']){
	case 'readAll':
        include('dataApi/read.php');
		break;
	case 'insert':
        include('dataApi/insert.php');
		break;
	case 'delete':
        include('dataApi/delete.php');
		break;
	case 'update':
        include('dataApi/update.php');
		break;
}
$outputJSON = json_encode($output);
print_r($outputJSON);
?>