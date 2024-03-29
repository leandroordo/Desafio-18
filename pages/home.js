function showMovies() {
  var moviesHtml = "";

  filteredMovies.forEach((element) => {
    moviesHtml += `
  <div class="col-xs-12 col-sm-4">
    <div class="card">
      <img class="img-card" src="${element.img}" />
      <div class="card-body">
        <h4 class="card-title">${element.title}</h4>
        <p class="card-text">
          ${element.synopsis}
        </p>
        <div class="d-flex justify-content-end align-items-center">
          <small class="text-body-secondary">${element.year}</small>
        </div>
      </div>
    </div>
  </div>`;
  });

  var moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = moviesHtml;
}

function getYears() {
  //Devolver un array de los años de las películas. Cada año debe aparecer una sola vez
  return [...new Set(movies.map((movie) => movie.year))].sort();
}

function loadYearsList() {
  //Cargar lista de años
  const selectList = document.getElementById("yearsSelect");
  const options = getYears();

  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectList.appendChild(el);
  }
}
