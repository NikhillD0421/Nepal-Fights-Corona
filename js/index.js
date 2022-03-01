var map;
var markers = [];
var infoWindow;
var locationSelect;
var height = (window.innerheigth > 0) ? window.innerheigth : screen.height;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;


function initMap() {
    var mapcenter = {
        lat: 29.043845, 
        lng: 81.534181
        };
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapcenter,
        zoom: 7,
        mapTypeId: 'roadmap',
    });
    infoWindow = new google.maps.InfoWindow();
    searchDistrict();
    displayDistricts();
    setONClickListner();
    showDistrictMarkers();
}

function displayDistricts(districts){ 
    console.log(district1);
    console.log(district2);
    var districtsHtml= '';
    districts.forEach(function(district, index){

        var name =district.name;
        var TC =district.Total_cases;
        var AC =district.Active_cases;
        var RC = district.Recovered;
        var D = district.Deaths;
        if(district.Total_cases!=0){
        var rec = Math.round((district.Recovered/district.Total_cases)*100);
            if(isNaN(rec)){
                rec=0;
            }}else{
                var rec=0;
            }

        districtsHtml +=`
                    <div class="store-container">
                    <div class="store-container-background">
                        <div class="store-info-container">
                            <div class="district-name">${name}</div>
                            <div class="district-stat">
                                    <span>Total cases: ${TC}</span>
                                    <span>Active Cases: ${AC}</span>
                                    <span>Recovered: ${RC}</span>
                                    <span>Deaths: ${D}</span>
                                    <span>Recovery ratio: ${rec}%</span>
                            </div>
                    </div>
                    <div class="store-number-container">
                        <div class="district-number">${index+1}</div>
                    </div>
                </div>
            </div>
        `

    });
document.querySelector('.district-list').innerHTML=districtsHtml;
console.log("displayTotal");
displayTotal();
}

function displayTotal(){
var totalHtml='';
var all_total_cases=0;
var all_total_recovery=0;
var all_total_death=0;
var all_total_active=0;

for(var i=0; i<76 ; i++){
    all_total_cases = all_total_cases + districts[i].Total_cases;
    all_total_recovery = all_total_recovery + districts[i].Recovered;
    all_total_death = all_total_death + districts[i].Deaths;
    all_total_active = all_total_active + districts[i].Active_cases;
}

totalHtml +=
`<div class="total-list">
<span>Confirmed Cases: ${all_total_cases} </span>
<span>Current Active Cases: ${all_total_active}</span>
<span>Total Recovered: ${all_total_recovery}</span>
<span>Total Deaths: ${all_total_death}</span>
</div>
`
document.querySelector('.total-list-container').innerHTML=totalHtml;
    
}

function setONClickListner(){
        var storeElements = document.querySelectorAll('.store-container');
        storeElements.forEach(function(elem, index){
            elem.addEventListener('click', function(){
                new google.maps.event.trigger(markers[index], 'click');
            })
        })

    }

function searchDistrict(){
    var foundDistrict = [];
    var inputName= document.getElementById('input-district-name').value;
    var l = inputName.length;
    if(inputName){
        districts.forEach(function(district, index){
            var districtName = district.name.substring(0,l);
            inputName=inputName.toLowerCase();
            districtName=districtName.toLowerCase();
            if(districtName == inputName ){
                foundDistrict.push(district);
            }
        })
        if(foundDistrict.length == 0){
            alert("Please enter valid name!!");
            document.getElementById('input-district-name').value = "";
            foundDistrict=districts;
        }
    }
    else{
        foundDistrict=districts;
    }
    if(foundDistrict==districts){
    clearLocations();
    displayDistricts(foundDistrict);
    setONClickListner();
    }else{
        clearLocations();
    displayDistricts(foundDistrict);
    showDistrictMarkers(foundDistrict);
    setONClickListner();
    }
}
//Map functions below 
function showDistrictMarkers(districts){
    var bounds = new google.maps.LatLngBounds();
    districts.forEach(function(district, index){
        var latlng = new google.maps.LatLng(
            district.coordinates.latitude,
            district.coordinates.longitude);
            var latlng2 = new google.maps.LatLng(
                district.coordinates.latitude +0.2,
                district.coordinates.longitude -0.2 );
            var name = district.name;                           //initialize statictics from store
            var totalCase = district.Total_cases;
            var recovered=district.Recovered;
            var activeCases=district.Active_cases;
            var deaths= district.Deaths;
            if(district.Total_cases!=0){
                var rec = Math.round((district.Recovered/district.Total_cases)*100);
                    if(isNaN(rec)){
                        rec=0;
                    }}else{
                        var rec=0;
                    }
            createMarker(latlng, name, totalCase, recovered , activeCases , deaths, index, rec);
            bounds.extend(latlng);
            bounds.extend(latlng2);

    })
    map.fitBounds(bounds);
}

function createMarker(latlng, name , totalCase,recovered, activeCases, deaths, index, recovery_ratio){
    var tc = "Total cases: ";
    var ac = "Active cases: ";
    var rc = "Recovered cases: ";
    var d = "Deaths: ";
    var r = "Recovery rate: ";
    var p= " %";
    var html = "<b>" + name + "</b> <br/>"+ tc + + totalCase + "<br/>" + ac + +activeCases+ "<br/>" + rc + +recovered+ "<br/>" + d + + deaths + "<br/>"+ r + + recovery_ratio+"<b>"+ p;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label:`${index+1}`
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }


