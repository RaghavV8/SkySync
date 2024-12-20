// Initialized Variables for api keys and Seach box and button DOM Selector variables.
//Add Your API Key to the apiKey variable
let apiKey = " ";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let searchbox = document.querySelector("#input");
let searchBtn = document.querySelector(".search-btn");
let weatherimg = document.querySelector(".weather-img");
let branding=document.querySelector(".branding");

branding.addEventListener("click",()=>{
    // window.href="https://github.com/RaghavV8/SkySync";
    window.open('https://github.com/RaghavV8/SkySync','_blank');
    newTab.opener = null;
})

// Started the Asynchronus Function. 
async function checkWeather(city) {
    // Fetching Response from the OpenWeather App API 
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    console.log(data);

    // Editing the Google Maps Navbar Link to show the City being Searched By the User. 
    let mapslink=document.querySelector("#maps");
    mapslink.href="https://www.google.com/maps/search/'"+`${data.name}`+"'";
    
    //Editing the Forecast NavBar Link to show Future Forecast of a City using openweather org website
    let forecast=document.querySelector("#forec");
    forecast.href="https://openweathermap.org/city/"+`${data.id}`;

    // Code Block for User Enter the Wrong City Name 
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".card").style.display = "none";
        document.querySelector(".local-time").style.display="none";
        document.querySelector(".Welcome").style.display="none";
    }
    
    // Time Calculation using UTC 
    // First We get the time difference between the UTC and the searched City from the API stored in the  timezoneoffset variable
    let timezoneoffset = data.timezone;
    // Now We use the nowUTC to calculate the UTC timezone currently by accessing the Time of our computer and performing caluclations to find the UTC 
    // Time by either Reducing or Adding the timezoneoffset into the Computers' local TIme.
    let nowUTC= new Date().getTime()+ new Date().getTimezoneOffset()*60000;
    let localtime=new Date(nowUTC + timezoneoffset*1000);
    
    // Formatting the Time into the proper format to be displayed in the DOM 
    let formattime = localtime.toLocaleDateString();
    let hours= localtime.getHours();
    let minutes= localtime.getMinutes();
    
    //Edits the HTML Element .local-time to display date and time of the searched city. 
    document.querySelector(".local-time").innerHTML= `Date: ${formattime} | Time: ${hours < 10 ? '0'+ hours:hours}:${minutes < 10 ? '0' + minutes:minutes}`;
    
// Editing the HTML Elements to dynamically show the Temperature Humidity and all the Data according to the APi fetched for the User
// Requested City.
    document.querySelector(".City").innerHTML = data.name;
    document.querySelector(".data").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".data1").innerHTML = data.main.humidity + "%";
    document.querySelector(".data2").innerHTML = Math.round(data.wind.speed) + " Km/h";

    // Initialized Variables for background and image which will change according to the conditions given below.
    let background="";
    let img="";
 
    // Setting Conditions for the Image and Backgroudn to change according to the Weather Conditions.
    //Misty Weather
    if (data.weather[0].description.toLowerCase().includes("mist")) {
        img = "images/mist.png";
        background="linear-gradient(135deg, rgb(1, 76, 137),rgb(2, 49, 83)";
    }//Clear Weather
    else if (data.weather[0].description.toLowerCase().includes("clear")) {
        img = "images/clear.png";
        background = "linear-gradient(135deg, rgb(0, 127, 230),rgb(181, 199, 212) )";
    }//Light Rain
    else if (data.weather[0].description.toLowerCase().includes("light rain")) {
        img = "images/drizzle.png";
        background ="linear-gradient(135deg, #2E4A6D 60%, #748DA6, #AABBD3)";
    }//Rainy Weather
    else if (data.weather[0].main = "Rain") {
        img = "images/rain.png";
        background="linear-gradient(135deg, rgb(7, 36, 104),rgb(102, 112, 174)";
    }//Snowy Weather
    else if (data.weather[0].main = "Snow") {
        img = "images/snow.png";
        background="linear-gradient(135deg, rgba(98, 141, 226, 0.863), #d2e3f4)";
    }//Cloudy Weather
    else if (data.weather[0].main = "Clouds") {
        img = "images/clouds.png";
        background = "linear-gradient(135deg,rgb(207, 204, 204), rgb(106, 104, 104) )";
    }
    
    //Setting Conditions to show different backgrounds if the weather is clear but the temperature is in either of the two extremes.
    if(data.main.temp>=35 && data.weather[0].description.toLowerCase().includes("clear")){
        background = "linear-gradient(135deg,rgba(254, 38, 0, 0.888), rgb(255, 221, 0) )";
    }
    else if(data.main.temp <=5 && data.weather[0].description.toLowerCase().includes("clear")){
        background="linear-gradient(135deg, rgba(98, 141, 226, 0.863), #d2e3f4)";
    }


    if (localtime.getHours() < 6 || localtime.getHours() >= 19) {
    background = "rgba(0, 0, 102, 0.8)";
    }

    // Implementing the Conditions for image and background
    weatherimg.src=img;
    document.body.style.background = background;

    // Implementing the condition when the User Enters the Correct
    document.querySelector(".error").style.display = "none";
    document.querySelector(".card").style.display = "block";
    document.querySelector(".local-time").style.display="block";
}

let hamburger =document.querySelector(".hamburger");
let navMenu=document.querySelector(".nav-menu");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})
document.querySelectorAll(".nav-link").forEach(n =>n.addEventListener("click",()=>{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

//Event Listeners for User Either clicking the search button or Pressing Enter key to search for Weather
searchBtn.addEventListener("click", () => {
    checkWeather(searchbox.value);   
    document.querySelector(".Welcome").style.display="none";
});
searchbox.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        checkWeather(searchbox.value);
        document.querySelector(".Welcome").style.display="none";
    }
});