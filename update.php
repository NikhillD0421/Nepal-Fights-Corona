
<html>
    <head>

    <link rel = "stylesheet" href="style/style.css">
    </head>
<?php
$name = $_GET['name'];
?>

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
  console.log(districts);
</script>
<script src="js/district.js"></script>
<script src="js/admin_index.js"></script>

<div class="updateBlock">
<table>
    <div class="update_title">
        <span>You are modifying data for <?php echo $name ?></span>
</div>
<span id="description"> Input changed number of cases </span> 
        <tr>
            <td>
                <form onsubmit="event.preventDefault(); update(<?php echo $name ?>);" id="updateform" autocomplete="off">
                    <div class="updateBlock-component">
                        <label>Active_cases</label>
                        <input type="text" name="Active_cases" id="Active_cases"   value="0">
                    </div>
                    <div class="updateBlock-component">
                        <label>Recovered</label>
                        <input type="text" name="Recovered" id="Recovered" value="0" >
                    </div>
                    <div class="updateBlock-component">
                        <label>Deaths</label>
                        <input type="text" name="Deaths" id="Deaths" value="0">
                    </div>
                    <div class="updateBlock-component">
                    <div  class="form-action-buttons">
                        <input type="Submit" value="Submit">
                    </div></div>
                </form>
</td>
</tr>
</table>
</div>
</html>