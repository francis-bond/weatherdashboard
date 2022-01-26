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
var pastSearches = JSON.parse(localStorage.getItem("pastSearches"));
console.log("Past searches " +pastSearches);

$("#list-group-item").html("");
if(pastSearches !== null){
  pastSearches.forEach(function(item){
    $("#list-group-item").prepend('<li><button type="submit" class="btn btn-secondary text-light my-3 pastSearch" style="width: 100%">'+ item +'</button></li>');
  })
}

submit.addEventListener("click", function(event){
  event.preventDefault();
  console.log("Input ", input.value);
  search = input.value;
  getLocation();
  $("#list-group-item").html("");
  pastSearches.forEach(function(item){
    $("#list-group-item").prepend('<li><button type="submit" class="btn btn-secondary text-light my-3 pastSearch" style="width: 100%">'+ item +'</button></li>');
  })
});

document.querySelectorAll(".pastSearch").forEach( item =>{
  item.addEventListener("click", event1 => {
    event1.preventDefault();
    search = item.textContent;
    getLocation();
    $("#list-group-item").html("");
  pastSearches.forEach(function(item){
    $("#list-group-item").prepend('<li><button type="submit" class="btn btn-secondary text-light my-3 pastSearch" style="width: 100%">'+ item +'</button></li>');
  })
})
})

function getLocation() {

  localStorage.setItem("search", search)
  if (pastSearches == null) {
    pastSearches = [];
  }
  
  if (pastSearches.length == 8) {
    pastSearches.pop();
  }
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
        $("#uvi").addClass("bg-success").removeClass("bg-warning").removeClass("bg-danger")
      } else if (data.current.uvi > 4){
        $("#uvi").addClass("bg-danger").removeClass("bg-warning").removeClass("bg-success")
      } else {
        $("#uvi").addClass("bg-warning").removeClass("bg-success").removeClass("bg-danger")
      }
      console.log(data)

      $("#temp0").text("Temp: " + Math.floor((data.daily[0].temp.day - 273.15)* 9 / 5 + 32) + " °F");
      $("#wind0").text("Wind: " + data.daily[0].wind_speed + " MPH")
      $("#humid0").text("Humidity: " + data.daily[0].humidity + "%")

      $("#temp1").text("Temp: " + Math.floor((data.daily[1].temp.day - 273.15)* 9 / 5 + 32) + " °F");
      $("#wind1").text("Wind: " + data.daily[1].wind_speed + " MPH")
      $("#humid1").text("Humidity: " + data.daily[1].humidity + "%")

      $("#temp2").text("Temp: " + Math.floor((data.daily[2].temp.day - 273.15)* 9 / 5 + 32) + " °F");
      $("#wind2").text("Wind: " + data.daily[2].wind_speed + " MPH")
      $("#humid2").text("Humidity: " + data.daily[2].humidity + "%")

      $("#temp3").text("Temp: " + Math.floor((data.daily[3].temp.day - 273.15)* 9 / 5 + 32) + " °F");
      $("#wind3").text("Wind: " + data.daily[3].wind_speed + " MPH")
      $("#humid3").text("Humidity: " + data.daily[3].humidity + "%")

      $("#temp4").text("Temp: " + Math.floor((data.daily[4].temp.day - 273.15)* 9 / 5 + 32) + " °F");
      $("#wind4").text("Wind: " + data.daily[4].wind_speed + " MPH")
      $("#humid4").text("Humidity: " + data.daily[4].humidity + "%")
      
    });
}