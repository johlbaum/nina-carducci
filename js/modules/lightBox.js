export function lightBox() {
  const lightBox = new bootstrap.Modal(document.querySelector("#lightBox"));
  const galleryItems = document.querySelectorAll(".gallery-item");
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  let currentIndex = null;
  let currentImages = [];

  const getGalleryData = () => {
    const galleryData = [];
    galleryItems.forEach((item) => {
      const category = item.getAttribute("data-gallery-tag");
      const imageSrc = item.getAttribute("src");
      const imageAlt = item.getAttribute("alt");

      const categoryObj = galleryData.find((obj) => obj.category === category);

      if (!categoryObj) {
        const newCategoryObj = {
          category,
          images: [{ src: imageSrc, alt: imageAlt }],
        };
        galleryData.push(newCategoryObj);
      } else {
        categoryObj.images.push({ src: imageSrc, alt: imageAlt });
      }
    });

    return galleryData;
  };

  const galleryData = getGalleryData();

  const showCurrentImage = () => {
    const modalImage = document.querySelector("#modal-image");
    modalImage.setAttribute("src", currentImages[currentIndex].src);
    modalImage.setAttribute("alt", currentImages[currentIndex].alt);
  };

  const updateCurrentImages = (filterSelected, item) => {
    if (filterSelected.textContent === "Tous") {
      //Creating a table with all images
      currentImages = galleryData.flatMap((categoryData) => {
        return categoryData.images.map((imageData) => {
          return {
            src: imageData.src,
            alt: imageData.alt,
          };
        });
      });
    } else {
      //Creating a table with images that belong to the selected category
      const category = item.getAttribute("data-gallery-tag");
      const categoryImages = galleryData.find(
        (data) => data.category === category
      );
      currentImages = categoryImages.images;
    }
  };

  const nextImage = () => {
    currentIndex++;
    if (currentIndex >= currentImages.length) {
      currentIndex = 0;
    }
    showCurrentImage();
  };

  const prevImage = () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = currentImages.length - 1;
    }
    showCurrentImage();
  };

  const lightBoxManager = () => {
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        lightBox.show();
        const filterSelected = document.querySelector(".filter.selected");
        updateCurrentImages(filterSelected, item);
        currentIndex = currentImages.findIndex(
          (image) => image.src === item.getAttribute("src")
        );
        showCurrentImage();
      });
    });
  };

  lightBoxManager();
  nextButton.addEventListener("click", nextImage);
  prevButton.addEventListener("click", prevImage);
}
