"use strict";
const input = document.querySelector('input');
const button = document.querySelector('button');
const firstDayCard = document.querySelector('.first-day');
let currentLocation; // Make Cairo as a default...
let locationDetails = [];
let today;


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
    let dateFormatter = new Intl.DateTimeFormat("en-GB", {dateStyle: "full"})
    today = dateFormatter.format(today);
    console.log(today);
    displayData();
}


// Display data
const displayData = () => {
    firstDayCard.innerHTML =`
    <div class="title">
        // <p>${today}</p>
        // <p>Tuesday</p>
        // <p class="date">May 26</p>
    </div>
    <div class="details">
        <p>${locationDetails.location.name}</p>
        <h1>22.1oC</h1>
        <!-- <img src="" alt="Logo"> -->
        <p>Clear</p>
        <div class="status">
            <div>
                <i class="fa-solid fa-umbrella"></i>
                20%
            </div>
            <div>
                <i class="fa-solid fa-wind"></i>
                18km/h
            </div>
            <div>
                <i class="fa-solid fa-compass"></i>
                East
            </div>
        </div>
    </div>
    `
}


