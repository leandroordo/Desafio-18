function validate(input) {
  const value = input.value.trim();

  if (value.length === 0) {
    input.classList.add("error");
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
}

function validateAño(input) {
  if (validate(input)) {
    //Validar que sea un año válido
    const value = input.value.trim();

    if (isNaN(value)) {
      input.classList.add("error");
      return false;
    }

    if (Number(value) < 1900 || Number(value) > new Date().getFullYear()) {
      input.classList.add("error");
      return false;
    }
  }
  return true;
}

function addMovie() {
  const name = document.getElementById("moviename");
  if (!validate(name)) return;

  const year = document.getElementById("movieyear");
  if (!validateAño(year)) return;

  const pictureUrl = document.getElementById("moviepicture");
  if (!validate(pictureUrl)) return;

  const synopsis = document.getElementById("moviesynopsis");
  if (!validate(synopsis)) return;

  //Agregar nueva película
  const movie = {
    id: "0",
    title: name.value.trim(),
    year: year.value,
    img: pictureUrl.value,
    synopsis: synopsis.value,
  };

  fetch("https://leandroordonez.azurewebsites.net/movies", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  })
    .then((response) => response.json())
    .then(() => {
      loadMovies();
      loadTemplate("home");
    }) //Volver a la home
    .catch((error) => {
      console.error("Error:", error);
    });
}
