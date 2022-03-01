
<?php

$newdata = $_GET['w1'];

$myfile = fopen("data2.txt", "r+") or die("Unable to open file!");
ftruncate($myfile, 0);
$text = fwrite($myfile,$newdata);
fclose($myfile);


$myfile = fopen("backup_data2.txt", "r+") or die("Unable to open file!");
ftruncate($myfile, 0);
$text = fwrite($myfile,$newdata);
fclose($myfile);

$newdata2=$_GET['w2'];
$myfile = fopen("log.txt", "a") or die("Unable to open file!");
fwrite($myfile,"\n".$newdata2);
fclose($myfile);
header("Location:admin_index.php");
exit();

?>