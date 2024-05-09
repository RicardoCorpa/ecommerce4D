// script.js

let position = 0; // Posição inicial

function nextSlide() {
    const carouselInner = document.querySelector(".carousel-inner");
    const items = document.querySelectorAll(".carousel-item");

    position++;
    if (position >= items.length) {
        position = 0;
    }

    const newPosition = -position * items[0].offsetWidth;
    carouselInner.style.transform = `translateX(${newPosition}px)`;
}

setInterval(nextSlide, 2000); // Troca o slide a cada 2 segundos
