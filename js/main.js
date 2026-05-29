"use strict";
const input = document.querySelector('input');
const button = document.querySelector('button');
const weatherCards = document.querySelector('.weather-cards');

async function getData() {
    const response = await fetch("http://api.weatherapi.com/v1/search.json?key=a5255ab1b8c04f1e9eb205856262905&q=Cairo");
    console.log(response);
}

getData();
