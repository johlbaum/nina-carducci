export function filters() {
  const filtersArray = ["Tous", "Concert", "Entreprise", "Mariage", "Portrait"];
  const filterContainer = document.querySelector(".filters");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryItemsRow = document.querySelector(".gallery-items-row");

  const createFilters = () => {
    let ulFilters = document.createElement("ul");
    filtersArray.forEach((filter) => {
      let filterElement = document.createElement("li");
      filterElement.classList.add("filter");
      filterElement.setAttribute("tabindex", 0);
      filterElement.innerHTML = filter;
      ulFilters.appendChild(filterElement);
    });

    filterContainer.appendChild(ulFilters);
    ulFilters.firstChild.classList.add("selected");
  };

  const changeFilterBackground = (filter, filterElements) => {
    filterElements.forEach((element) => {
      element.classList.remove("selected");
    });

    filter.classList.add("selected");
  };

  const filterGallery = (filter) => {
    const selectedCategory = filter.textContent;
    galleryItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-gallery-tag");
      const itemColumn = item.closest(".item-column");
      if (selectedCategory === "Tous" || selectedCategory === itemCategory) {
        itemColumn.classList.remove("d-none");
      } else {
        itemColumn.classList.add("d-none");
      }
    });
  };

  const activeFilter = () => {
    const filterElements = document.querySelectorAll(".filter");
    filterElements.forEach((filter) => {
      filter.addEventListener("click", function () {
        changeFilterBackground(filter, filterElements);
        filterGallery(filter);
        //Transition effect
        galleryItemsRow.style.transition = "none";
        galleryItemsRow.style.width = "0";
        //Forces the browser to recalculate the width of galleryItemsRow
        galleryItemsRow.offsetWidth;
        galleryItemsRow.style.transition = "width 0.5s ease";
        galleryItemsRow.style.width = "100%";
      });
      //Accessibility of filters
      filter.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          filterGallery(filter);
        }
      });
    });
  };

  createFilters();
  activeFilter();
}
