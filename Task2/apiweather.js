$(document).ready(function() {
	$("#country").change(function() {
    var cityName;
		var select = $("#country option:selected").val();   //getting selected input value
		switch (select) {  //switch case for countries list
			case "England":
			   cityName = "england";
			   city(cityName);
			   break;
			case "Scotland":
			   cityName = "scotland";
			   city(cityName);
			   break;
			case "Wales":
			   cityName = "wales";
			   city(cityName);
			   break;
			case "Northern Ireland":
			   cityName = "nireland";
			   city(cityName);
			   break;
			default:
			   $("#city").empty();
			break;
		}
	});

	$("#city").change(function() {   //getting city by name
		var cityValue = $("#city").val();
			getWeatherApi(cityValue);
	});

	function city(country) { //getting the html file containing cities
		$("#city").empty();
		$.get(country+"_cities.html", function( cities) {
		$("#city").append(cities);
		});
	}

	
});