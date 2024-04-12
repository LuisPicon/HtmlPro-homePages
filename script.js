let idiomas = "";
// Selecciona la etiqueta meta por su atributo name
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const isLightMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

const idiomaUsuario = navigator.languages
  ? navigator.languages[0].split("-")[0]
  : (navigator.language || navigator.userLanguage).split("-")[0];

console.log(isDarkMode, isLightMode);
async function datos() {
  try {
    let res = await fetch("./datos/idiomas.json");
    let json = await res.json();
    if (!res.ok) throw { estado: res.status, estadoTexto: res.statusText };
    idiomas = json;
    translate(localStorage.getItem("htmlProLenguaje"));
  } catch (err) {
    console.error(err);
  }
}
function darkMode(modo) {
  if (modo) {
    document.documentElement.dataset.bsTheme = "dark";
    metaThemeColor.setAttribute("content", "#1D2125");
  } else {
    document.documentElement.dataset.bsTheme = "";
    metaThemeColor.setAttribute("content", "#fff");
  }
}

function darkModeToggle() {
  let mode = document.documentElement.dataset.bsTheme;
  if (mode) {
    localStorage.setItem("htmlProMode", "false");
    darkMode("");
    metaThemeColor.setAttribute("content", "#fff");
  } else {
    localStorage.setItem("htmlProMode", "true");
    darkMode("dark");
    metaThemeColor.setAttribute("content", "#1D2125");
  }
}

function translate(lenguaje) {
  console.log(lenguaje);
  if (lenguaje === "es") {
    localStorage.setItem("htmlProLenguaje", "es");

    for (i in idiomas["ES"]) {
      let $element = document.getElementById(i);
      $element.innerHTML = idiomas["ES"][i];
    }
  }
  if (lenguaje === "en") {
    localStorage.setItem("htmlProLenguaje", "en");
    for (i in idiomas["EN"]) {
      let $element = document.getElementById(i);
      $element.innerHTML = idiomas["EN"][i];
    }
  }
}

function translateInit() {
  if (localStorage.getItem("htmlProLenguaje") === "es") {
    return datos();

    return translate("es");
  } else if (localStorage.getItem("htmlProLenguaje") === "en") {
    return datos();
  }
  //translate
  if (idiomaUsuario === "es" || idiomaUsuario === "en") {
    localStorage.setItem("htmlProLenguaje", idiomaUsuario);
    datos();
  } else {
    localStorage.setItem("htmlProLenguaje", "en");
    datos();
  }
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".dark-mode")) {
    darkModeToggle();
  }
  if (e.target.matches("#ES")) translate("es");
  if (e.target.matches("#EN")) translate("en");
});
document.addEventListener("DOMContentLoaded", () => {
  translateInit();

  if (localStorage.getItem("htmlProMode") === "true") {
    return darkMode("dark");
  } else if (localStorage.getItem("htmlProMode") === "false") {
    return darkMode("");
  }
  if (isDarkMode) {
    darkMode(isDarkMode);
  } else {
    darkMode("");
  }

  localStorage.setItem("htmlProMode", isDarkMode);
});
