var map;
var markers = [];
var infoWindow;
var locationSelect;

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
    var districtsHtml= '';
    districts.forEach(function(district, index){

        var name =district.name;
        var TC =district.Total_cases;
        var AC =district.Active_cases;
        var RC = district.Recovered;
        var D = district.Deaths;

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
                            </div>
                    </div>
                    <div class="store-number-container">
                    <a role="button" href="update.php?name='${name}'" data-toggle="modal" ><div class="btn_update"><i class="fas fa-edit"></i> </div></a>    
                                                                                                                                    
                    </div>
                </div>
            </div>
        `

    });
document.querySelector('.district-list').innerHTML=districtsHtml;
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
                foundDistrict=districts;
            }
        }
        else{
            foundDistrict=districts;
        }
        if(width<550 && foundDistrict==districts){
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
            district.coordinates.longitude -0.2);  
            var name = district.name;                           //initialize statictics from store
            var totalCase = district.Total_cases;
            var recovered=district.Recovered;
            var activeCases=district.Active_cases;
            var deaths= district.Deaths;
            createMarker(latlng, name, totalCase, recovered , activeCases , deaths, index);
            bounds.extend(latlng);
            bounds.extend(latlng2);

    })
    map.fitBounds(bounds);
}

function createMarker(latlng, name , totalCase,recovered, activeCases, deaths, index){
    var tc = "Total cases: ";
    var ac = "Active cases: ";
    var rc = "Recovered cases: ";
    var d = "Deaths: ";
    var html = "<b>" + name + "</b> <br/>"+ tc + + totalCase + "<br/>" + ac + +activeCases+ "<br/>" + rc + +recovered+ "<br/>" + d + + deaths + "<br/>";
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

