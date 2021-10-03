import "./styles/styles.css";
import markup from "./js/markup";
import { handleClick, getCurrentLocation } from "./js/functions";

function startFunction() {
  const app = document.getElementById("app");
  markup(app);
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
