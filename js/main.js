"use strict";
const input = document.querySelector('input');
const button = document.querySelector('button');
const weatherCards = document.querySelector('.weather-cards');
let currentLocation;


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
    const data = await response.json();
    console.log(data);
}

