<!DOCTYPE HTML>
<html>
<head>
    <?php
        include("loader.php");
    ?>
<script>
    let dataP=[];
    let data={};
    var total_active=0;
    var total_recovery=0;
    var total_death=0;
     for(var i=0; i<76 ; i++){
    total_active= total_active + districts[i].Active_cases;
    total_death= total_death + districts[i].Deaths;
    total_recovery = total_recovery + districts[i].Recovered;
     }
     if(isNaN(total_death)){
         total_death=0;
     }
    data ={y: total_active , label:'Active Cases', color : "#8B0000"}
    dataP.push(data);
    data ={y: total_death , label:'Death Cases', color:"#808080" }
    dataP.push(data);
    data ={y: total_recovery , label:'Recovered Cases', color:"#00FF00" }
    dataP.push(data);
    console.log(dataP);
    
window.onload = function() {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: "Total Status :"
	},
	data: [{
		type: "pie",
		startAngle: 300,
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