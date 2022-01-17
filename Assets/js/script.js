// Pseudocode
    // Make dashboard in HTML
        // input for my location
        // search(submit button)
            // fetch info from api
            // take the input value
            // use an if statement to change color of the UV index depending on conditions
            
    // 8e7deb96b85c9cfd811e749262bcb2c2 API key

var submit = document.getElementById("submit");
var input = document.getElementById("input");
var apiKey = "8e7deb96b85c9cfd811e749262bcb2c2";
var longitude = "";
var latitude = "";
var search = "";
var title = document.getElementById("title1");
var today = moment().format("l");
var date0 = moment(today).add(1, "days").format("l")
var date1 = moment(today).add(2, "days").format("l")
var date2 = moment(today).add(3, "days").format("l")
var date3 = moment(today).add(4, "days").format("l")
var date4 = moment(today).add(5, "days").format("l")


$("#date0").text(date0);
$("#date1").text(date1);
$("#date2").text(date2);
$("#date3").text(date3);
$("#date4").text(date4);

submit.addEventListener("click", function(event){
  event.preventDefault();
  console.log("Input ", input.value);
  getLocation();
});

function getLocation() {
  
  var search = input.value;

  localStorage.setItem("search", search)
  var pastSearches = JSON.parse(localStorage.getItem("pastSearches"));
  if (pastSearches == null) {
    pastSearches = [];
  }
  // if (pastSearches.lenght = 10){
//  set limit on how many past searches you have
  // }
  pastSearches.unshift(search);
  localStorage.setItem("pastSearches", JSON.stringify(pastSearches));


  title.textContent = search +" "+ today;
  console.log(search)
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+search+"&appid="+ apiKey;
  console.log(requestUrl)

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      latitude = data.coord.lat
      longitude = data.coord.lon
      console.log("Longitude: " + longitude)
      console.log("latitude: " + latitude)
      getApi()
    });
}

function getApi() {

  var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude+"&lon="+ longitude+"&appid="+ apiKey;
  console.log(requestUrl)

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      $("#temp").text("Temp: " + Math.floor((data.current.temp - 273.15)* 9 / 5 + 32) + " °F");
      $("#wind").text("Wind: " + data.current.wind_speed + " MPH")
      $("#humid").text("Humidity: " + data.current.humidity + "%")
      $("#uvi").text("UV Index: " + data.current.uvi + "%")
      if (data.current.uvi < 2){
        $("#uvi").addClass("bg-success")
      } else if (data.current.uvi >= 2 && data.current.uvi < 4){
        $("#uvi").addClass("bg-warning")
      } else {
        $("#uvi").addClass("bg-danger")
      }
      console.log(data)

      for(i = 0 ; 1 < 5 ; i++){
        
      }
    });
}