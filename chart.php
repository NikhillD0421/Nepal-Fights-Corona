<!DOCTYPE HTML>
<html>
<head>
    <?php
        include("loader.php");
    ?>
<script>
    let dataP=[];
    let data={};
     for(var i=0; i<76 ; i++){
         if(districts[i].Active_cases!=0){
         data ={y: districts[i].Active_cases , label:districts[i].name}
         dataP.push(data);
     }}
     console.log(dataP);
    
window.onload = function() {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: "Active Cases:"
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##0",
        indexLabel: "{label} {y}",
        dataPoints :dataP
        }]
});
chart.render();
}
</script>
</head>
<body>
<div class="col-md-8 offset-md-2  my-5" >
<div id="chartContainer">
</div>
</div>
<button type="button" class="back-btn" onclick="window.location.href = 'index.php'">Go back</button>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>