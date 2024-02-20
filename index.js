var movies = [];
var filteredMovies = [];

function setUpHomePage() {
  filteredMovies = movies;

  const mainElement = document.querySelector("#moviesContainer");
  let script = document.createElement("script");
  script.textContent = "showMovies()";
  mainElement.appendChild(script);

  const searchInput = document.getElementById("searchInput");
  const selectList = document.getElementById("yearsSelect");

  const filterMovies = debounce(() => {
    const searchTitle = searchInput.value.trim().toLowerCase();
    var searchYear = selectList.value;

    if (isNaN(searchYear)) searchYear = "";

    if (searchTitle || searchYear) {
      filteredMovies = movies.filter(
        (m) =>
          ((searchTitle && m.title.toLowerCase().includes(searchTitle)) ||
            !searchTitle) &&
          ((searchYear && m.year === searchYear) || !searchYear)
      );
    } else filteredMovies = movies;
    showMovies();
  });

  searchInput.addEventListener("keyup", () => filterMovies());
  selectList.addEventListener("change", () => filterMovies());

  loadYearsList();
}

function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const mainElement = document.getElementById("content");

const loadTemplate = (template) => {
  location.hash = template === "home" ? "" : template;

  const xhr = new XMLHttpRequest();
  xhr.open("get", `./pages/${template}.html`);
  xhr.addEventListener("load", () => {
    mainElement.innerHTML = xhr.response;

    if (template === "home") {
      setUpHomePage();
    }
  });
  xhr.send();

  //Desactivar todos los a del navbar
  var navItemsList = document
    .getElementById("navitems")
    .getElementsByTagName("a");
  for (var i = 0; i < navItemsList.length; i++) {
    navItemsList[i].classList.remove("active");
  }

  document.getElementById(template).classList.add("active");
};

function loadMovies() {
  const isResponseOk = (response) => {
    if (!response.ok) throw new Error(response.status);
    return response.text();
  };

  fetch("https://leandroordonez.azurewebsites.net/movies", {
    method: "GET",
    mode: "cors",
    headers: new Headers({ "Content-type": "application/json" }),
  })
    .then((response) => isResponseOk(response))
    .then((data) => {
      movies = JSON.parse(data);
      filteredMovies = movies;
      showMovies();
      loadYearsList();
    })
    .catch((err) => {
      //Mostrar error
      showError();
      console.error("ERROR: ", err.message);
    });
}

function showError() {
  const errorDiv = document.getElementById("errorbox");
  errorDiv.classList.remove("hidden");
}
//Get movies
loadMovies();

document.addEventListener("DOMContentLoaded", () => loadTemplate("home"));

window.addEventListener("popstate", () => {
  const { hash } = location;
  const page = hash.slice(1);

  loadTemplate(page || "home");
});
