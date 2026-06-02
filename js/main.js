"use strict";
const input = document.querySelector('input');
const button = document.querySelector('button');
const firstDayCard = document.querySelector('.first-day');
let currentLocation; // Make Cairo as a default...
let locationDetails = [];
let today;
let arrToday;


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
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=a5255ab1b8c04f1e9eb205856262905&q=${currentLocation}`);
    let data = await response.json();
    locationDetails = data;
    today = new Date(locationDetails.location.localtime);
    let dateFormatter = new Intl.DateTimeFormat("en-GB", {dateStyle: "full"});
    today = dateFormatter.format(today);
    arrToday = today.split(",");
    console.log(arrToday);
    displayData();
}


// Display data
const displayData = () => {
    firstDayCard.innerHTML =`
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
}


