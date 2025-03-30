const API_KEY = "86e10104e6f842f585571927253003";
const searchBtn = document.getElementById("searchBtn");
let mode;
searchBtn.addEventListener("click", () => {
  $.ajax({
    method: "GET",
    url: `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${
      document.getElementById("input").value
    }`,
    success,
    error,
  });
});

function success(data) {
  displayData(data.current);
}

function error() {
  const container = document.getElementById("container");
  container.style.height = "400px";
  const input = document.getElementById("input");
  input.addEventListener("focusout", () => {
    container.style.height = "420px";
  });
  input.addEventListener("focusin", () => {
    container.style.height = "90px";
  });
  const bottomCon = document.getElementById("bottomCon");
  bottomCon.style.display = "none";
  const img = document.getElementById("img");
  img.src = "./images/404.png";
  const mainText = document.getElementById("text");
  mainText.innerHTML = `<p class="text-center " style="font-weight: 600; font-size: 21px; margin-bottom: 30px;" id="text">Oops! Location Not Found!</p>`;
  const para = document.getElementById("para");
  para.style.display = "none";
}

function displayData(data) {
  const para = document.getElementById("para");
  para.style.display = "block";
  const temp = data.temp_c;
  const humidity = data.humidity;
  const windSpeed = parseFloat((data.wind_kph * 1.60934).toFixed(2));
  const condition = data.condition;
  const textt = condition.text;
  const text = textt.toLowerCase();

  // Getting Elements
  const img = document.getElementById("img");
  const humVal = document.getElementById("humVal");
  const mainText = document.getElementById("text");
  const windVal = document.getElementById("windVal");
  const tempp = document.getElementById("tempVal");

  // Image
  if (
    text.includes("cloud") ||
    text.includes("cloudy") ||
    text.includes("overcast")
  ) {
    img.src = "./images/modes/cloud.png";
  } else if (text.includes("clear") || text.includes("sunny")) {
    img.src = "./images/modes/clear.png";
  } else if (text.includes("mist")) {
    img.src = "./images/modes/mist.png";
  } else if (text.includes("snow")) {
    img.src = "./images/modes/snow.png";
  } else if (text.includes("rain")) {
    img.src = "./images/modes/rain.png";
  }

  // Displaying Data
  humVal.innerHTML = `<span style="font-size: 18px; font-weight: 500;" id="humVal">${humidity}</span>`;
  mainText.innerHTML = `<p class="text-center" style="font-weight: 600; font-size: 21px; margin-bottom: 30px;" id="text">${text}</p>`;
  windVal.innerHTML = `<span id="windVal" style="font-size: 18px; font-weight: 500;">${windSpeed}Km/h</span>`;
  tempp.innerHTML = `<span id="tempVal">${temp}</span>`;

  // Expand the container
  const container = document.getElementById("container");
  container.style.height = "620px";

  // Height Transition
  input.addEventListener("focusout", () => {
    container.style.height = "600px";
  });
  input.addEventListener("focusin", () => {
    container.style.height = "90px";
  });
}

function theme() {
  let themecontrol = document.getElementById("themecontrol");
  let body = document.querySelector("body");
  if (themecontrol.checked) {
    mode = "dark";
    localStorage.setItem("Mode", mode);
  } else {
    mode = "light";
    localStorage.setItem("Mode", mode);
  }
  mode = localStorage.getItem("Mode");

  switch (mode) {
    case "dark":
      body.style.transition = "1s";

      body.style.transitionDelay = "0.1s";
      body.style.background = "url(./images/DarkBackground.png)";
      body.style.backgroundSize = "cover";
      localStorage.setItem("Mode", mode);
      localStorage.setItem("check", themecontrol.checked);
      break;
    case "light":
      body.style.transition = "2s";

      body.style.transitionDelay = "0.1s";
      body.style.background = "url(./images/background.jpg)";
      body.style.backgroundSize = "cover";
      localStorage.setItem("Mode", mode);
      localStorage.setItem("check", themecontrol.checked);

      break;
    default:
      body.style.background = "url(./images/background.jpg)";
      body.style.backgroundSize = "cover";
      body.style.transition = "0.1s";
      break;
  }
}

function oldTheme() {
  let Mode = localStorage.getItem("Mode");
  let body = document.querySelector("body");
  let themecontrol = document.getElementById("themecontrol");

  console.log(Mode);
  switch (Mode) {
    case "dark":
      body.style.transition = "1s";

      body.style.transitionDelay = "0.1s";
      body.style.background = "url(./images/DarkBackground.png)";
      body.style.backgroundSize = "cover";
      localStorage.setItem("Mode", mode);
      themecontrol.checked = localStorage.getItem("check");
      return mode;
    case "light":
      body.style.transition = "2s";

      body.style.transitionDelay = "0.1s";
      body.style.background = "url(./images/background.jpg)";
      body.style.backgroundSize = "cover";
      localStorage.setItem("Mode", mode);
      themecontrol.checked = false;

      return mode;
    default:
      body.style.transition = "2s";

      body.style.transitionDelay = "0.1s";
      body.style.background = "url(./images/background.jpg)";
      body.style.backgroundSize = "cover";
  }
}
oldTheme();
