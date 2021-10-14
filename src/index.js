import "./styles/styles.css";
import markup from "./js/markup";
import {
  handleClick,
  getWeather,
  getLocalStorage,
  getMapCity,
  dataViewer,
  wrongCity,
} from "./js/functions";
import { getCurrentLocation } from "./js/getCurrentLocation";

function startFunction() {
  const app = document.getElementById("app");
  markup(app);

  (async function getCity() {
    getWeather(await getCurrentLocation());
    getLocalStorage();
  })();

  function getHandleClick() {
    const input = document.getElementById("input");
    const city = document.getElementById("city");
    const result = handleClick();
    if (result !== "error") {
      getMapCity(result);
      dataViewer("data", "flex");
      city.textContent = input.value;
    } else {
      wrongCity(true);
    }
  }

  const button = document.getElementById("button");
  button.addEventListener("click", getHandleClick);
  document.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
      getHandleClick();
    }
  });
}

document.addEventListener("DOMContentLoaded", startFunction());
