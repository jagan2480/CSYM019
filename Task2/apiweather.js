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

	
  
});