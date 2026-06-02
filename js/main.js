"use strict";
const input = document.querySelector('input');
const button = document.querySelector('button');
const firstDayCard = document.querySelector('.first-day');
const secondDayCard = document.querySelector('.second-day');
let currentLocation; // Make Cairo as a default...
let locationDetails = [];
let today;
let secondDay;
let arrToday;
let arrSecondDay;


// Input value
button.addEventListener("click", function () {
    currentLocation = input.value;
    fetchData();
});

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        button.click();
    }
});


// Fetch data from API
const fetchData = async () => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a5255ab1b8c04f1e9eb205856262905&q=${currentLocation}&days=7`);
    let data = await response.json();
    locationDetails = data;

    let dateFormatter = new Intl.DateTimeFormat("en-GB", {dateStyle: "full"});
    today = new Date(locationDetails.location.localtime);
    secondDay = new Date(locationDetails.forecast.forecastday[1].date);
    today = dateFormatter.format(today);
    secondDay = dateFormatter.format(secondDay);
    arrToday = today.split(",");
    arrSecondDay = secondDay.split(",");
    console.log(arrSecondDay);
    displayData();
}


// Display data
const displayData = () => {
    firstDayCard.innerHTML = `
    <div class="title">
        <p>${arrToday[0]}</p>
        <p class="date">${arrToday[1]}</p>
    </div>
    <div class="details">
        <p>${locationDetails.location.name}</p>
        <h1>${locationDetails.current.temp_c}°C</h1>
        <div class="logo">
            <img src="https:${locationDetails.current.condition.icon}" alt="Logo">
        </div>
        <p>${locationDetails.current.condition.text}</p>
        <div class="status">
            <div>
                <i class="fa-solid fa-umbrella"></i>
                ${locationDetails.current.chance_of_rain}%
            </div>
            <div>
                <i class="fa-solid fa-wind"></i>
                ${locationDetails.current.wind_kph}km/h
            </div>
            <div>
                <i class="fa-solid fa-compass"></i>
                ${locationDetails.current.wind_dir}
            </div>
        </div>
    </div>
    `

    secondDayCard.innerHTML = `
    <div class="title">
        <p>${arrSecondDay[0]}</p>
    </div>
    <div class="details">
        <div class="logo">
            <img src="https:${locationDetails.forecast.forecastday[1].day.condition.icon}" alt="Logo">
        </div>
        <h2>${locationDetails.forecast.forecastday[1].day.maxtemp_c}°C</h2>
        <p>${locationDetails.forecast.forecastday[1].day.mintemp_c}°</p>
        <p>${locationDetails.forecast.forecastday[1].day.condition.text}</p>
    </div>
    `
}


