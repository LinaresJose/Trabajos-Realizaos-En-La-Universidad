console.log("¡Bienvenido al Arcade Clásico!");

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth + 20;
    const velocidadDesplazamiento = 3000;
    let currentIndex = 0;

    // Duplicar las primeras imágenes al final para el efecto infinito
    const firstSlides = [slides[0].cloneNode(true), slides[1].cloneNode(true)]; // Duplica las dos primeras
    firstSlides.forEach(slide => slider.appendChild(slide));

    const allSlides = document.querySelectorAll('.slide'); // Volver a seleccionar todos los slides
    const totalVisibleSlides = 2; // Número de slides visibles inicialmente
    let isTransitioning = false;

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        slider.style.transition = `transform 0.5s ease-in-out`;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Cuando llegamos al final de los slides originales, transicionamos instantáneamente al inicio
        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = 0;
                slider.style.transform = `translateX(0px)`;
                isTransitioning = false;
            }, 500); // Espera la duración de la transición
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Iniciar el desplazamiento automático
    setInterval(nextSlide, velocidadDesplazamiento);
});