let slideIndex = 1;
imageGallery(10)

function incrementSlides(n) {
  displaySlides(slideIndex += n);
}

function decrementSlides(n) {
  displaySlides(slideIndex -= n);
}

function currentSlide(n) {
  displaySlides(slideIndex = n);
}

function displaySlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function displayImages(nrOfImages, caption=imageCaptions()) {
  let display = document.querySelector(".slideshow-container");
  let div = document.createElement("div");
  display.append(div);
  let images = "";

  // TODO: perform check if the image exist
  for (let currentImage=0; currentImage<nrOfImages; currentImage++) {
    images += constructGalleryImage(currentImage, nrOfImages, `/img/bg${currentImage}.jpg`, caption[currentImage]);
  }
  display.innerHTML = images;
}

function constructGalleryImage(currentImage, nrOfImages, url, caption) {
  return `
  <div class="mySlides fade">
    <p class="numbertext">${currentImage+1} / ${nrOfImages}</p>
    <img defer src="${url}" width=200 height=200>
    <p class="text">${caption}</p>
  </div>
  `
}

function imageCaptions() {
  return ['First Beauty', 'Second Beauty', 'Third Beauty', 'Fourth Beauty', 'Fifth Beauty', 'Sixth Beauty', 'Seventh Beauty', 'Eighth Beauty', 'Ninth Beauty', 'Tenth Beauty', 'First Beauty']
}

function displaySlideButtons() {
  let display = document.querySelector(".slideshow-container");
  display.innerHTML += `
  <a class="prev" onclick="decrementSlides(1)">❮</a>
  <a class="next" onclick="incrementSlides(1)">❯</a>
  `
}

function displaySlideShortcut(nrOfImages) {
  let slideshow_container = document.querySelector(".slideshow-container");
  let div = document.createElement("div");
  div.classList.add("slideshow-shortcut");
  slideshow_container.append(div);

  for (let current=0; current<nrOfImages; current++) {
    const shortcut = document.createElement("span");
    shortcut.classList.add("dot")
    div.appendChild(shortcut)
  }

  document.addEventListener("readystatechange", () => {
    if (document.readyState == "complete") {
      const slideshow_shortcut = document.querySelector(".slideshow-shortcut")
      Array.from(slideshow_shortcut.children).map((item, index) => item.setAttribute("onclick", `currentSlide(${index+1})`))
    }
  })
}

function imageGallery(nrOfImages) {
  displayImages(nrOfImages);
  displaySlideButtons();
  displaySlideShortcut(nrOfImages);
  displaySlides(slideIndex);
}