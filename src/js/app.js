// Get DOM elts
const mainTemp = document.querySelector("#main span");
const min = document.querySelector("#min span");
const max = document.querySelector("#max span");
const form = document.querySelector("form");
const cityElt = document.getElementById("city");

let city = "";
const isOk = (response) =>
  response.ok
    ? response.json()
    : Promise.reject(new Error("Failed to load data from server"));
const apiKey = "a1765436a53fce9de8bc00af314f1102";

form.addEventListener("submit", (e) => {
  const { search } = form.elements;
  city = search.value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then(isOk) // <= Use `isOk` function here key a1765436a53fce9de8bc00af314f1102
    .then((data) => {
      const { main, sys } = data;

      mainTemp.textContent = main.temp;
      min.textContent = main.temp_min;
      max.textContent = main.temp_max;
      cityElt.textContent = `${city}, ${sys.country}`;

      console.log(data); // Prints result from `response.json()`
    })
    .catch((error) => console.error(error));

  e.preventDefault();
});
