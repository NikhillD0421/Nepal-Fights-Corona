


<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Covid-19 Static viewer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Untitled</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="style/style.css">
</head>

<?php
$myfile = fopen("data.txt", "r+") or fopen("backup_data.txt", "r+");
$text1 = fread($myfile,filesize("data.txt"));
fclose($myfile);

$myfile = fopen("data2.txt", "r+") or fopen("backup_data2.txt", "r+");
$text2 = fread($myfile,filesize("data2.txt"));
fclose($myfile);
?> 
  <script> 
  let district1=[];
  let district2=[];
  district1 = <?php echo $text1;?>;
  district2 = <?php echo $text2;?>;
  
    let districts=district1.concat(district2);
//   districts.push(district);
</script>
