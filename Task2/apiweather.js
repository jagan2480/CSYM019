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

	function getWeatherApi(cityValue){ //getting API data by cityname
		var apiKey = '0ee4a1779ebfaaca0280417a1ea584ab';  // API key got from openweathermap website
		$.ajax( {
				 url:'http://api.openweathermap.org/data/2.5/weather?q='+cityValue+'&APPID='+apiKey ,
				 type: 'GET' ,
				 dataType: 'json' ,
				 success: function(response){
					 var sTxt = '' ;
					 var cond;
					 var temp ;
					 var windSpeed;
					 var windDeg;
					 var apiDate;
					 var name;
           			 var icon;

				 $.each(response.weather, function(index, value) { // fetching required json data
				       cond = response.weather[index].main;

               switch (cond) { //switch case for weather icons
                 case "Clouds":
                    icon = '<img src="./weather_icons/cloud.png" alt="cloud"/>';
                    break;
                 case "Hail":
                    icon = '<img src="./weather_icons/hail.png" alt="hail"/>';
                    break;
                 case "Heavy Cloud":
                    icon = '<img src="./weather_icons/heavycloud.png" alt="heavy-clouds"/>';
                    break;
                 case "Heavy Rain":
                    icon = '<img src="./weather_icons/heavyrain.png" alt="heavy-rain"/>';
                    break;
                 case "Mist":
                    icon = '<img src="./weather_icons/mist.png" alt="mist" />';
                    break;
                 case "Rain":
                    icon = '<img src="./weather_icons/rain.png" alt="rain" />';
                    break;
                 case "Sleet":
                    icon = '<img src="./weather_icons/sleet.png" alt="sleet" />';
                    break;
                 case "Snow":
                    icon = '<img src="./weather_icons/snow.png" alt="snow" />';
                    break;
                 case "Sun":
                    icon = '<img src="./weather_icons/sun.png" alt="sun" />';
                    break;
                 case "Sun and Clouds":
                    icon = '<img src="./weather_icons/sunandcloud.png" alt="sun-cloud" />';
                    break
                 case "Thunderstorm":
                    icon = '<img src="./weather_icons/thunderstorm.png" alt="thunderstorm" />';
                    break;
				 default:
					 icon = '';
					 break;
               }
				 });

				 //assigning API to local vars

				 $.each(response.main, function(index, value) {
				       temp = response.main.temp;
				           return false;
				 });

				 $.each(response.wind, function(index, value) {
				       windSpeed = response.wind.speed;
				       windDeg = response.wind.deg;
				       return false;
				 });

				 $.each(response, function(index) {
				       apiDate = response.dt ;
				       name = response.name;
				       return false;
				 });
				
				 // Appending data into the required fields

				 $('#temp').empty().append(icon);
				 $('.condition').empty().append(cond);
				 $('.location').empty().append(name+" ,UK");
				 $('.degrees').empty().append(toCelsius(temp));
				 $('.windSpeed').empty().append("Wind Speed: "+toMph(windSpeed)+" mph"+" ( "+Math.round(1.60934 * toMph(windSpeed))+" kph )");
				 $('.windDir').empty().append("Wind Direction: "+degConv(windDeg)+" ( "+windDeg+"<span>&#176</span>)");
				 $('.date').empty().append(unixToDate(apiDate));
				 $('.fahrenheit').empty().append(cToF(toCelsius(temp))+"<span></span>");
				 

				 if(toCelsius(temp)>35 || toCelsius(temp)<-5 || toMph(windSpeed)>50){ // Checking Severe Weather Conditions
				 	$("#message").empty().append("<p>Warning Severe Weather</p>");
				 }else{
				 	$("#message").empty();
				 }

				},
				
				 error: function() { //Error Function, Display Error if fail to retrieve data
				 $('#info').html(' <h1>An error has occurred while retriving the data</h1>');
				 $('.main-weather-display').empty();
				 $('#message').empty();

				}
  		});


  }
});