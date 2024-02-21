// const apiKey = "dffccf6fd8a6fae9c9485eb52f0c6382";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");
// const weatherIcon = document.querySelector(".weather-icon");


// async function chkWeather(city){
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);// as per line no - 02

//     if(response.status == 404){
//        document.querySelector(".error").style.display="block";
//        document.querySelector(".weather").style.display = "none";
//        document.querySelector(".greet").style.display = "none";
//     }
//     else{
//         // var data = await response.json();
//         const data = await response.json();

//         console.log(data.weather[0].icon);
//         console.log(data);

//         document.querySelector(".city").innerHTML = data.name;
//         document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `°C`;
//         document.querySelector(".humidity").innerHTML = data.main.humidity + ` %`;
//         document.querySelector(".wind").innerHTML = data.wind.speed + ` km/hr`;
        
//         weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
//         // weatherIcon.style.height = "20%";
//         // weatherIcon.style.width = "50%";

//         // if(data.weather[0].main == "Clouds"){
//         //     weatherIcon.src = "images/clouds.png";
//         // }
//         // else if(data.weather[0].main == "Clear"){
//         //     weatherIcon.src = "images/clear.png";
//         // }
//         // else if(data.weather[0].main == "Rain"){
//         //     weatherIcon.src = "images/rain.png";
//         // }
//         // else if(data.weather[0].main == "Mist"){
//         //     weatherIcon.src = "images/mist.png";
//         // }
//         // else if(data.weather[0].main == "Drizzle"){
//         //     weatherIcon.src = "images/drizzle.png";
//         // }
//         // else if(data.weather[0].main == "Snow"){
//         //     weatherIcon.src = "images/snow.png";
//         // }

//         document.querySelector(".weather").style.display = "block";
//         document.querySelector(".greet").style.display = "none";
//         document.querySelector(".error").style.display="none";

//     }
    
// }

// searchBtn.addEventListener("click",()=>{
//     chkWeather(searchBox.value);
// })

// //chkWeather(searchBox.value);





//import mysql from 'mysql';
// import dotenv from 'dotenv'
// dotenv.config()


//import axios from 'axios';
//import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.mjs';
//const apiKey = "dffccf6fd8a6fae9c9485eb52f0c6382";
//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//const axios = require('axios');
//const express = require('express');
console.log("hello")
//var mysql = require('mysql');
//const cors = require('cors');
//const mysql = require('mysql2');
// const app = express();
// app.use(cors());


// var dbConnection =  mysql.createConnection({
//     host: 'localhost',
//     //port:'3306',
//     user: 'root',
//     password: '',
//     database: 'weather'
// }).promise();

//app.listen(3000);

// dbConnection.connect(function(err){
//     if(err)throw err;
//     console.log("Conection established successfully");
// });



const apiKey = "dffccf6fd8a6fae9c9485eb52f0c6382";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function chkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".greet").style.display = "none";
    } else {
      const data = await response.json();

      console.log(data.weather[0].icon);
      console.log(data);

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `°C`;
      document.querySelector(".humidity").innerHTML = data.main.humidity + ` %`;
      document.querySelector(".wind").innerHTML = data.wind.speed + ` km/hr`;

      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".greet").style.display = "none";
      document.querySelector(".error").style.display = "none";

      // Sending data to the backend using Fetch API
      fetch("/submit-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
        }),        
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data sent to backend successfully");
        })
        .catch((error) => {
          throw error;
        });
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  chkWeather(searchBox.value);
});



