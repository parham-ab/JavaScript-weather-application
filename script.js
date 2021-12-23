// Elements
const form = document.querySelector(".form");
const input = document.querySelector(".form input");
const list = document.querySelector(".cities");
// API
const apiKey = "a96370fc68b837af41891380246f1463";
// main code
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      //   icon's url
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <h2 class="city-name" data-name=${name}, ${sys.country}>
        <span>${name}</span>, 
        <span class="country-badge">${sys.country}</span>
      </h2>
    <div class="city-temp">${Math.round(main.temp)}°C</div>
    <figure>
        <img class="city-icon" src=${icon} alt="city"/>
        <figurecaption>${weather[0]["description"]}</figurecaption>
    </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    // Undefined city name error handle
    .catch(() => {
      alert("City Not Found !");
    });
  // clear input value after submit
  input.value = "";
});
