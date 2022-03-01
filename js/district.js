
var date= new Date();
var update_log=[];

function onFormSubmit() {
  
        var formData = readFormData();
        if(validate(formData)){
        append_Data(formData);
    }
    document.getElementById("myform").reset();
    // removedistrict();
    // test();
}
//read data from input form
 function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["Active_cases"] = parseInt(document.getElementById("Active_cases").value);
    formData["Recovered"] = parseInt(document.getElementById("Recovered").value);
    formData["coordinates"]={"longitude":parseFloat(document.getElementById("coordinates_long").value)
    , "latitude": parseFloat(document.getElementById("coordinates_lat").value) };
    formData["Deaths"]= parseInt(document.getElementById("Deaths").value);
    formData["Total_cases"]= formData.Active_cases + formData.Recovered + formData.Deaths;
    return formData;           
}


//validation of input
function validate(formData) {
    isValid = true;
    if (formData.name == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } 
    else if(formData.Deaths<0||isNaN(formData.Deaths)){
        alert("Deaths cannot be negative/empty");
        isValid = false;
        
    }else if(formData.Recovered <0||isNaN(formData.Recovered)){
        alert("Recovered cannot be negative");
        isValid = false;

    }else if(formData.Active_cases<0 || isNaN(formData.Active_cases)){
        alert("Active Cases cannot be negative");
        isValid = false;

    }else if(isNaN(parseFloat(document.getElementById("coordinates_long").value)) || isNaN(parseFloat(document.getElementById("coordinates_lat").value))){
        alert("ENter proper coordinates");
        isValid = false;
    }
        else{
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

//add the data
function append_Data(formData){
    // console.log(district2);
    if(district2==null){
        var myJSON = JSON.stringify(formData);
    }else{
        console.log(formData);
        district2.push(formData);
        console.log(district2);
        var myJSON = JSON.stringify(district2);}
        window.location.href = "add_data2.php?w1=" + myJSON;

}

function update(name){
    // console.log(name);
    var i=0;
    for(var j=0; j<districts.length; j++){
        if(districts[j].name==name){
            i=j;
            break;
        }
        }
         var updateData={};
        updateData= updateFormData();

        // console.log(districts);
            if(i<43){
            var name =district1[i].name;
            var TC =district1[i].Total_cases;
            var AC =district1[i].Active_cases;
            var RC = district1[i].Recovered;
            var D = district1[i].Deaths;

            if(validate_update(updateData,AC,RC,D)){
                update_log.push(date);
                update_log.push(name);
                update_log.push(updateData);
                var myJSON2 = JSON.stringify(update_log);
            district1[i].Active_cases=district1[i].Active_cases+updateData.Active_cases-updateData.Recovered-updateData.Deaths;
            district1[i].Recovered=district1[i].Recovered+updateData.Recovered;
            district1[i].Deaths=district1[i].Deaths+updateData.Deaths;
            district1[i].Total_cases=district1[i].Active_cases + district1[i].Recovered + district1[i].Deaths;

            var myJSON = JSON.stringify(district1);
            // console.log(myJSON);
            window.location.href = "add_data.php?w1=" + myJSON + "&w2=" + myJSON2;
            
            }else{
                alert("Input Valid Update!!");
            }}
            else if(i>=43){
                i=i-43;
                var name =district2[i].name;
                var TC =district2[i].Total_cases;
                var AC =district2[i].Active_cases;
                var RC = district2[i].Recovered;
                var D = district2[i].Deaths;
    
                if(validate_update(updateData,AC,RC,D)){
                    update_log.push(date);
                    update_log.push(name);
                    update_log.push(updateData);
                    var myJSON2 = JSON.stringify(update_log);
                district2[i].Active_cases=district2[i].Active_cases+updateData.Active_cases-updateData.Recovered-updateData.Deaths;
                district2[i].Recovered=district2[i].Recovered+updateData.Recovered;
                district2[i].Deaths=district2[i].Deaths+updateData.Deaths;
                district2[i].Total_cases=district2[i].Active_cases + district2[i].Recovered + district2[i].Deaths;
                var myJSON = JSON.stringify(district2);
                // console.log(myJSON);
                window.location.href = "add_data2.php?w1=" + myJSON +"&w2=" + myJSON2;
            }
   
}
}

function updateFormData(){
    var formData={};
    formData["Active_cases"] = parseInt(document.getElementById("Active_cases").value);
    formData["Recovered"] = parseInt(document.getElementById("Recovered").value);
    formData["Deaths"]= parseInt(document.getElementById("Deaths").value);
    return formData;
}

function validate_update(updateData,AC,RC,D){
    isValid = true;
        if(updateData.Active_cases+AC < 0){
            alert("Your Acive case update is not accurate")
            isValid = false;
        }
        if(updateData.Recovered+RC < 0){
            alert("Your Recovery update is not accurate")
            isValid = false;
        }
        if(updateData.Deaths+D < 0){
            alert("Your Death update is not accurate")
            isValid = false;
        }
        return isValid;
    }
    



// function removedistrict(){
//     console.log("ready to delete");
//     // console.log(district1);
//     district1=district1.splice(0,district1.length-1);
//     var myJSON = JSON.stringify(district1);
        
//     window.location.href = "add_data.php?w1=" + myJSON;
//     console.log(district1);
// }

// to delete object in array
//  Data=Data.splice(0,1)