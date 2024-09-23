document.getElementById("show-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const query = document.getElementById("input-show").value.trim();
  const showContainer = document.getElementById("show-container");
  showContainer.innerHTML = "";

  if (query !== "") {
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((show) => {
          const showElement = document.createElement("div");
          showElement.classList.add("show-data");

          const imgSrc = show.show.image
            ? show.show.image.medium
            : "https://via.placeholder.com/210x295";
          showElement.innerHTML = `
                        <img src="${imgSrc}" alt="${show.show.name}">
                        <div class="show-info">
                            <h1>${show.show.name}</h1>
                            ${show.show.summary || "<p>Not thsi time</p>"}
                        </div>
                    `;
          showContainer.appendChild(showElement);
        });
      })
      .catch((error) => console.error("No data for you, sorry:", error));
  }
});
