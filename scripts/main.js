let idiomas = "";

fetch("http://127.0.0.1:5500/datos/idiomas.json")
  .then((response) => {
    if (!response.ok) {
      throw new Err("error en la traducción");
    }
    return response.json();
  })
  .then((data) => {
    idiomas = data;
  })
  .catch((Err) => {
    console.error(Err);
  });

function translate(obj) {
  for (i in obj) {
    console.log(i);
    let $element = document.getElementById(i);
    console.log($element);
    $element.innerText = obj[i];
  }
}
document.addEventListener("change", (e) => {
  if (!e.target.matches(".select") & idiomas) return;
  translate(idiomas[e.target.value]);
});
