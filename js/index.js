const firstCard = document.getElementById("firstCard");
const secondCard = document.getElementById("secondCard");
const thirdCard = document.getElementById("thirdCard");
const findBtn = document.getElementById("findBtn");
const inputBox = document.getElementById("inputBox");
let q = "cairo";
let forecastDay = [];
const date = new Date();
const day = date.getDate();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = monthNames[date.getMonth()];

async function getWeather(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8b15fa87b7334e3da64111015232008&q=${country}&days=3`
  );
  let data = await response.json();
  forecastDay = data.forecast.forecastday;
  let current = data.current;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d1 = new Date(forecastDay[0].date);
  const dayName = days[d1.getDay()];
  displayData(
    dayName,
    data.location.name,
    current.temp_c,
    current.condition.text,
    current.condition.icon,
    day,
    month
  );
  const d2 = new Date(forecastDay[1].date);
  const day2Name = days[d2.getDay()];
  displayCard(
    day2Name,
    forecastDay[1].day.condition.icon,
    forecastDay[1].day.maxtemp_c,
    forecastDay[1].day.mintemp_c,
    forecastDay[1].day.condition.text,
    secondCard
  );
  const d3 = new Date(forecastDay[2].date);
  const day3Name = days[d3.getDay()];
  displayCard(
    day3Name,
    forecastDay[2].day.condition.icon,
    forecastDay[2].day.maxtemp_c,
    forecastDay[2].day.mintemp_c,
    forecastDay[2].day.condition.text,
    thirdCard
  );
}
getWeather(q);
function displayData(
  dayName,
  country,
  degree,
  weatherCondition,
  weatherIcon,
  day,
  month
) {
  let cartona = `
    <div class="d-flex justify-content-between align-items-center p-2 cardTitle">
        <p class="mb-0 ">${dayName}</p>
        <p class="mb-0">${day} ${month}</p>
    </div>
    <div class="card-info p-4">
        <p>${country}</p>
       <div class="d-flex justify-content-between align-items-center">
       <div class="degreeFont">${degree} <sup>o</sup> c</div>
       <img src ="${weatherIcon}" width="90px"/>
       </div>
        <p class="text-primary">${weatherCondition}</p>
        <div class="text-white">
        <span class="me-2"><img src="./images/icon-umberella.png" alt="umberella imgage"> 20%</span>
        <span class="me-2"><img src="./images/icon-wind.png" alt="wind imgage"> 18km/h</span>
        <span><img src="./images/icon-compass.png" alt="compass imgage"> East</span>
        </div>
    </div>
    `;
  firstCard.innerHTML = cartona;
}
function displayCard(day, icon, degree, deg, condition, card) {
  let cartona = `
    <div class="text-center p-2 cardTitle">
    <p class="mb-0">${day}</p>
    </div>
    <div class="card-info p-4 text-center">
    <img src="${icon}" alt="notfound">
        <p class="my-1">${degree} <sup>o</sup> c</p>
        <p class="my-1">${deg} <sup>o</sup> </p>
        <p class="my-3 text-primary">${condition}</p>
    </div>
    `;
  card.innerHTML = cartona;
}
findBtn.addEventListener("click", function () {
  q = inputBox.value;
  getWeather(q);
});
