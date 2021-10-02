import "./styles/styles.css";
import markup from "./js/markup.js";
import { handleClick, getCurrentLocation } from "./js/functions.js";

function startFunction() {
  markup();
  getCurrentLocation();
  const button = document.getElementById("button");
  button.addEventListener("click", handleClick);
  document.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
      handleClick();
    }
  });
}

document.addEventListener("DOMContentLoaded", startFunction());
