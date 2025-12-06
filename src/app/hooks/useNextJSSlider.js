// src/app/hooks/useNextJSSlider.js
'use client';

import { useEffect } from 'react';

/**
 * Logika inti slider (diambil dari script.js lama, diadaptasi untuk React)
 * @param {string} trackId - ID dari elemen .slider-track
 * @param {string} prevBtnClass - Class tombol prev
 * @param {string} nextBtnClass - Class tombol next
 * @param {string} slideClass - Class item slide
 * @param {number} desktopItems - Item terlihat di desktop
 * @param {number} tabletItems - Item terlihat di tablet
 * @param {number} mobileItems - Item terlihat di mobile
 * @param {number} autoplayInterval - Interval autoplay
 */
function setupSlider(trackId, prevBtnClass, nextBtnClass, slideClass, desktopItems, tabletItems, mobileItems, autoplayInterval = 0) {
    const sliderTrack = document.getElementById(trackId);
    if (!sliderTrack) return () => {}; 

    const prevBtn = document.querySelector(`.${prevBtnClass}`);
    const nextBtn = document.querySelector(`.${nextBtnClass}`);
    const slides = document.querySelectorAll(`#${trackId} .${slideClass}`);
    
    if (!prevBtn || !nextBtn) return () => {}; 

    let itemsPerView = desktopItems; 
    let currentPosition = 0; 
    const totalItems = slides.length;
    let autoplayTimer = null; 

    const updateItemsPerView = () => {
        if (window.innerWidth <= 500) {
            itemsPerView = mobileItems; 
        } else if (window.innerWidth <= 1200) { 
            itemsPerView = tabletItems; 
        } else {
            itemsPerView = desktopItems; 
        }
        
        if (currentPosition > totalItems - itemsPerView) {
             currentPosition = Math.max(0, totalItems - itemsPerView);
        }
        updateSlider(); 
    };

    const updateSlider = () => {
        const translateValue = -(currentPosition * (100 / itemsPerView));
        sliderTrack.style.transform = `translateX(${translateValue}%)`;
    };

    const nextSlide = () => {
        if (currentPosition < totalItems - itemsPerView) {
            currentPosition++;
        } else {
            currentPosition = 0; 
        }
        updateSlider();
    };

    const stopAutoplay = () => {
        clearInterval(autoplayTimer);
    };

    const startAutoplay = () => {
        if (autoplayInterval > 0) {
            autoplayTimer = setInterval(nextSlide, autoplayInterval);
        }
    };
    
    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };


    // Attach listeners
    const handleNextClick = () => { nextSlide(); resetAutoplay(); };
    const handlePrevClick = () => {
        if (currentPosition > 0) {
            currentPosition--;
        } else {
            currentPosition = Math.max(0, totalItems - itemsPerView);
        }
        updateSlider();
        resetAutoplay();
    };
    
    prevBtn.addEventListener('click', handlePrevClick);
    nextBtn.addEventListener('click', handleNextClick); // Perbaikan: Tombol next

    const handleMouseEnter = stopAutoplay;
    const handleMouseLeave = startAutoplay;
    
    sliderTrack.parentNode.addEventListener('mouseenter', handleMouseEnter);
    sliderTrack.parentNode.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateItemsPerView);
    
    updateItemsPerView(); 
    startAutoplay(); 
    
    // Cleanup function untuk React
    return () => {
        stopAutoplay();
        window.removeEventListener('resize', updateItemsPerView);
        nextBtn.removeEventListener('click', handleNextClick);
        prevBtn.removeEventListener('click', handlePrevClick);
        sliderTrack.parentNode.removeEventListener('mouseenter', handleMouseEnter);
        sliderTrack.parentNode.removeEventListener('mouseleave', handleMouseLeave);
    };
}


const useNextJSSlider = () => {
    useEffect(() => {
        const autoplayTime = 5000;
        let cleanupFunctions = [];

        // 1. SLIDER GALERI
        cleanupFunctions.push(setupSlider('gallerySliderTrack', 'gallery-prev-btn', 'gallery-next-btn', 'gallery-slide', 4, 2, 1, autoplayTime));

        // 2. SLIDER UMKM
        cleanupFunctions.push(setupSlider('umkmSliderTrack', 'umkm-prev-btn', 'umkm-next-btn', 'umkm-slide', 4, 3, 1, autoplayTime));
        
        // 3. SLIDER PURA GUNUNG KAWI
        cleanupFunctions.push(setupSlider('kawiSliderTrack', 'kawi-prev-btn', 'kawi-next-btn', 'kawi-slide', 4, 2, 1, autoplayTime));

        // 4. SLIDER PURA MENGENING
        cleanupFunctions.push(setupSlider('mengeningSliderTrack', 'mengening-prev-btn', 'mengening-next-btn', 'mengening-slide', 4, 2, 1, autoplayTime));
        
        // 5. SLIDER TESTIMONI
        cleanupFunctions.push(setupSlider('testimoniSliderTrack', 'testimoni-prev-btn', 'testimoni-next-btn', 'testimoni-slide', 3, 2, 1, autoplayTime)); 
        
        // Autoplay Gambar Tubing (Fade/Single Image)
        const setupTubingAutoplay = () => {
            const imageElement = document.getElementById('tubingImageSlider');
            if (!imageElement) return () => {};

            const tubingImages = [
                'images/tubing-1.jpg', 'images/tubing-2.jpg', 'images/tubing-3.jpg', 'images/tubing-4.jpg', 'images/tubing-5.jpg'
            ];

            let currentImageIndex = 0;
            const intervalTime = 4000; 
            let timer;
            let interval;

            function changeImage() {
                imageElement.style.opacity = 0;

                timer = setTimeout(() => {
                    currentImageIndex = (currentImageIndex + 1) % tubingImages.length;
                    imageElement.src = `/images/${tubingImages[currentImageIndex].split('/')[1]}`; 
                    imageElement.alt = "Tubing Campuhan Gambar " + (currentImageIndex + 1);
                    imageElement.style.opacity = 1;
                }, 1000); 
            }
            
            imageElement.style.opacity = 1;
            interval = setInterval(changeImage, intervalTime);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        };

        cleanupFunctions.push(setupTubingAutoplay());


        return () => {
            cleanupFunctions.forEach(cleanup => {
                if (typeof cleanup === 'function') {
                    cleanup();
                }
            });
        };
    }, []); 
};

export default useNextJSSlider;