(function updateWeather() {   // funtion to update weather
 	setTimeout(function() { // timer function
 		$.ajax( { 
			 url:'weather.json',  // file name
			 type: 'GET',         
			 dataType: 'json',    
			 success: function(response){
				 var sTxt = '<table><tr><th>City</th><th>Conditions</th><th>Temperature</th> <th>Wind Speed</th> <th>Wind Direction</th> <th>Wind Chill Factor</th></tr>'; //defining table
				 $('#weatherContainer').html(' ');

			   $.each(response.weather, function(index) { //retrieving data
             var icon;
             switch (response.weather[index].currentConditions) {  //switch case for weather icons
              case "Cloud":
                  icon = '<img src="./weather_icons/cloud.png" alt="cloud" width="22px"/>';
                  break;
               case "Hail":
                  icon = '<img src="./weather_icons/hail.png" alt="hail" width="22px"/>';
                  break;
               
             }

      			 
			 },

		   error: function() {
			 $('#infoContainer').html(' <p>An error has occurred while retriving the data</p>');//display error if fail to retrieve data
			}
    });
	}, 250); // timer
})();