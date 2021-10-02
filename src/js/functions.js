function getSign(value) {
  if (value > 0) {
    return `+${value}`;
  }
  return value;
}

function dataViewer(block, type) {
  const el = document.getElementById(block);
  el.style.display = type;
}

function getData(city) {
  const APIkey = "2f3499bf11f061c267af42038ae180bc";
  // eslint-disable-next-line max-len
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
}

function getTemperature(city, id) {
  const url = getData(city);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const memory = document.getElementById("memory");
      const block = document.createElement("div");
      memory.appendChild(block).setAttribute("class", "block");
      const param = document.createElement("div");
      block.appendChild(param).setAttribute("id", id);
      block.appendChild(param).setAttribute("class", "label btn");
      param.innerHTML = city;
      const prop = document.createElement("div");
      block.appendChild(prop).setAttribute("class", "value");
      if (data.cod === 200) {
        prop.innerHTML = getSign(data.main.temp.toFixed());
      } else {
        prop.innerHTML = "data not found";
      }
      memory.style.display = "block";
    });
}

function getMap(latitude, longitude) {
  const myLatLng = { lat: latitude, lng: longitude };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myLatLng,
  });
  // eslint-disable-next-line no-new
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Your location",
  });
}

function dateConvert(value) {
  const hour = Math.trunc(value);
  let min = 60 * (value - hour);
  min = min.toFixed();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
}

function timeTranslater(value, delim, fixed, minutes) {
  if (minutes) {
    return (value * delim).toFixed(fixed);
  }
  return (value / delim).toFixed(fixed);
}

function getLengthDay(sunset, sunrise) {
  const lengthDay = timeTranslater(sunset - sunrise, 3600, 2, false);
  const hours = Math.floor(lengthDay);
  const mins = timeTranslater(lengthDay - hours, 60, 0, true);
  return `${hours}:${mins}`;
}

function getPressure(value) {
  return (value * 0.750064).toFixed(0);
}

function getTimeStamp() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d = startOfDay / 1000;
  return d;
}

function getDirectionWind(deg) {
  let wind;
  switch (deg.toFixed()) {
    case deg > 338 && deg <= 23:
      wind = "N";
      break;
    case deg > 23 && deg <= 68:
      wind = "NE";
      break;
    case deg > 68 && deg <= 113:
      wind = "E";
      break;
    case deg > 113 && deg <= 158:
      wind = "SE";
      break;
    case deg > 158 && deg <= 203:
      wind = "S";
      break;
    case deg > 203 && deg <= 248:
      wind = "SW";
      break;
    case deg > 248 && deg <= 293:
      wind = "W";
      break;
    default:
      wind = "NW";
  }
  return wind;
}

export function getWeather(city) {
  const url = getData(city);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("city").innerHTML = data.name;
      // eslint-disable-next-line max-len
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const cityBlock = document.getElementById("cityBlock");
      const icon = document.getElementById("icon");
      const styles = `background-image: url("${iconUrl}");`;
      cityBlock.appendChild(icon).setAttribute("style", styles);
      cityBlock
        .appendChild(icon)
        .setAttribute("title", data.weather[0].description);
      document.getElementById("wind").innerHTML = data.wind.speed.toFixed();
      document.getElementById("directionWind").innerHTML = getDirectionWind(
        data.wind.deg
      );
      document.getElementById("pressure").innerHTML = getPressure(
        data.main.pressure
      );
      document.getElementById("temp").innerHTML = getSign(
        data.main.temp.toFixed()
      );
      document.getElementById("feelsLike").innerHTML = getSign(
        data.main.feels_like.toFixed()
      );
      document.getElementById("humidity").innerHTML = data.main.humidity;
      document.getElementById("sunrise").innerHTML = dateConvert(
        timeTranslater(data.sys.sunrise - getTimeStamp(), 3600, 2, false)
      );
      document.getElementById("sunset").innerHTML = dateConvert(
        timeTranslater(data.sys.sunset - getTimeStamp(), 3600, 2, false)
      );
      document.getElementById("lengthDay").innerHTML = getLengthDay(
        data.sys.sunset,
        data.sys.sunrise
      );

      getMap(data.coord.lat, data.coord.lon);
    });
  dataViewer("data", "flex");
}

function getClicker() {
  setTimeout(() => {
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        getWeather(e.target.innerText);
      });
    });
  }, 2000);
}

function getLocalStorage() {
  const localStor = localStorage.weatherForecast;
  if (typeof localStor === "undefined") {
    dataViewer("memory", "none");
    dataViewer("plugList", "block");
  } else {
    const memory = document.querySelectorAll("#memory > div");
    for (let j = 0; j < memory.length; j += 1) {
      memory[j].remove();
    }
    const arr = localStor.split(",");
    for (let i = 0; i < arr.length; i += 1) {
      getTemperature(arr[i], i);
    }
    dataViewer("memory", "block");
    dataViewer("plugList", "none");
    getClicker();
  }
}

export function getCurrentLocation() {
  const location = "http://ip-api.com/json/";
  fetch(location)
    .then((response) => response.json())
    .then((data) => {
      getWeather(data.city);
      getLocalStorage();
    });
}

function wrongCity(value) {
  const input = document.getElementById("input");
  const data = document.getElementById("data");
  if (value) {
    input.classList.add("wrong");
    dataViewer("plugWeather", "flex");
    dataViewer("weather", "none");
    dataViewer("cityBlock", "none");
    dataViewer("map", "none");
    dataViewer("plugImage", "flex");
    data.classList.add("empty");
  } else {
    input.classList.remove("wrong");
    dataViewer("weather", "block");
    dataViewer("cityBlock", "flex");
    dataViewer("plugWeather", "none");
    dataViewer("map", "block");
    dataViewer("plugImage", "none");
    data.classList.remove("empty");
  }
}

function saveCity(city) {
  const localStor = localStorage.weatherForecast;
  if (typeof localStor === "undefined") {
    localStorage.setItem("weatherForecast", city);
  } else {
    const arr = localStor.split(",");
    if (arr.indexOf(city) === -1) {
      if (arr.length === 10) {
        arr.shift();
      }
      const cityUpper = city[0].toUpperCase() + city.substring(1);
      arr.push(cityUpper);
      const string = arr.join();
      localStorage.setItem("weatherForecast", string);
    }
  }
  getLocalStorage();
}

function getMapCity(value) {
  const key = "AIzaSyB6Y7wf4TCspmqw-ndjkh9yjWk1EW_Eubs";
  const str = encodeURIComponent(value.trim());
  // eslint-disable-next-line max-len
  const location = `https://maps.googleapis.com/maps/api/geocode/json?address=${str}&language=en&key=${key}`;
  fetch(location)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        let city = data.results[0].address_components[0].long_name;
        if (city === "" || Number.isInteger(+city)) {
          city = value;
        }
        getWeather(city);
        wrongCity(false);
        saveCity(city);
      } else {
        wrongCity(true);
      }
    });
}

export function handleClick() {
  const input = document.getElementById("input");
  const city = document.getElementById("city");
  const regexp = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/gi;
  if (regexp.test(input.value)) {
    getMapCity(input.value);
    dataViewer("data", "flex");
    city.textContent = input.value;
  } else {
    wrongCity(true);
  }
}
