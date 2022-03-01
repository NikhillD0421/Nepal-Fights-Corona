<!DOCTYPE html>
<html>

<head>
    <title>
        Html CRUD with Pure JavaScript
    </title>
    <link rel="stylesheet" href="style/styles2.css">
    <!-- <script> window.onload = extract_data;</script> -->
</head>

<body>
<?php 
    include "loader.php";
    ?>

    <table>
        <tr>
            <td>
                <form onsubmit="event.preventDefault(); onFormSubmit();" id="myform" autocomplete="off">
                    <div>
                        <label>Name*</label><label class="validation-error hide" id="fullNameValidationError">This field is required.</label>
                        <input type="text" name="name" id="name">
                    </div>
                    <div>
                        <label>Active_cases</label>
                        <input type="text" name="Active_cases" id="Active_cases">
                    </div>
                    <div>
                        <label>Recovered</label>
                        <input type="text" name="Recovered" id="Recovered">
                    </div>
                    <div>
                        <label>Deaths</label>
                        <input type="text" name="Deaths" id="Deaths">
					</div>
					<div>
                        <label>coordinates</label>
						<input type="text" name="coordinates.lat" id="coordinates_lat" placeholder="Enter latitutde">
						<input type="text" name="coordinates.long" id="coordinates_long" placeholder="Enter longitude">
                    </div>
                    <div  class="form-action-buttons">
                        <input type="submit" value="Submit">
                    </div>
                </form>
            </td>
            <td>
                <table class="list" id="employeeList">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>EMP Code</th>
                            <th>Salary</th>
                            <th>City</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </td>
        </tr>
    </table>
	<script src="js/district.js"></script>
</body>

</html>