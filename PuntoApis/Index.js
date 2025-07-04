// funcion para consultar mateo
function MostrarMeteorologia() {
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = data.current_weather.temperature;
      return `la temperatura es: ${temp}°C`;
    });
}

// Función para consultar wttr.in
function fetchWttr() {
  return fetch(url)
    .then(res => res.text())
    .then(data => `wttr.in: ${data}`);
}

// Ejecutamos Promise.race para obtener la respuesta más rápida
Promise.race([
  MostrarMeteorologia(),
  fetchWttr()
])
.then(resultado => {
  document.getElementById("resultado").textContent = resultado;
})
.catch(error => {
  document.getElementById("resultado").textContent = "Error.";
  console.error("Error:", error);
});