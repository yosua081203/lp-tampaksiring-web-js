// src/app/hooks/useFinalClientSetup.js
'use client';

import { useEffect } from 'react';

// === FUNGSI CLIENT-SIDE DARI SCRIPT.JS LAMA ===

function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const msgElement = document.getElementById('formMessage');

    const showMessage = (text, type) => {
        if (!msgElement) return;
        msgElement.textContent = text;
        msgElement.className = `form-message ${type}`;
        msgElement.style.display = 'block';
        
        setTimeout(() => {
            msgElement.style.display = 'none';
        }, 5000);
    };

    const handleSubmit = function(e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const waNumber = document.getElementById('contactWa').value.trim();
        const destination = document.getElementById('contactDestination').value;
        const message = document.getElementById('contactMessage').value.trim();

        if (name === '' || waNumber === '' || destination === '') {
            showMessage('Mohon isi Nama, Nomor WhatsApp, dan Pilih Tujuan Wisata.', 'error');
            return;
        }

        const waRegex = /^\+?(\d{9,15})$/; 
        if (!waRegex.test(waNumber.replace(/[^0-9+]/g, ''))) {
            showMessage('Nomor WhatsApp tidak valid. Gunakan format angka yang benar (min. 9 digit).', 'error');
            return;
        }

        let formattedWaNumber = waNumber.replace(/[^0-9]/g, ''); 
        if (formattedWaNumber.startsWith('0')) {
             formattedWaNumber = '62' + formattedWaNumber.substring(1); 
        } else if (!formattedWaNumber.startsWith('62')) {
            formattedWaNumber = '62' + formattedWaNumber; 
        }
        
        const waLink = `https://wa.me/${formattedWaNumber}?text=` + 
                       `*Permintaan Reservasi Desa Tampaksiring*%0A%0A` +
                       `Nama: ${encodeURIComponent(name)}%0A` +
                       `Tujuan: ${encodeURIComponent(destination)}%0A` +
                       `Pesan/Tanggal Kunjungan: ${encodeURIComponent(message || 'Tidak ada pesan khusus')}%0A%0A` +
                       `_Mohon balas pesan ini._`;

        window.open(waLink, '_blank');
        
        showMessage('Permintaan berhasil dibuat! Anda akan diarahkan ke WhatsApp.', 'success');
        form.reset();
    };

    form.addEventListener('submit', handleSubmit);

    return () => form.removeEventListener('submit', handleSubmit);
}

function setupLightbox() {
    const modal = document.getElementById('lightboxModal');
    const images = document.querySelectorAll('.gallery-slide');
    const closeBtn = document.querySelector('.close-btn');

    if (!modal || images.length === 0 || !closeBtn) return () => {}; // Harus mengembalikan fungsi kosong

    const modalImg = document.getElementById('lightboxImage');
    const captionText = document.getElementById('lightboxCaption');
    
    const handleImageClick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };
    
    const handleCloseClick = function() {
        modal.style.display = "none";
    };

    const handleWindowClick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    images.forEach(img => img.addEventListener('click', handleImageClick));
    closeBtn.onclick = handleCloseClick;
    window.addEventListener('click', handleWindowClick);

    return () => {
        images.forEach(img => img.removeEventListener('click', handleImageClick));
        closeBtn.onclick = null; 
        window.removeEventListener('click', handleWindowClick);
    };
}

function setupBackToTop() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (!backToTopBtn) return () => {};
    const scrollThreshold = 300; 

    const handleScroll = function() {
        if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    return () => window.removeEventListener('scroll', handleScroll);
}


const useFinalClientSetup = () => {
    useEffect(() => {
        // Panggil semua fungsi setup
        const cleanupForm = setupFormValidation();
        const cleanupLightbox = setupLightbox();
        const cleanupBackToTop = setupBackToTop();
        
        // Return fungsi cleanup utama
        return () => {
            // Jalankan semua cleanup function (walaupun beberapa mengembalikan fungsi kosong)
            if (cleanupForm) cleanupForm(); 
            if (cleanupLightbox) cleanupLightbox(); 
            if (cleanupBackToTop) cleanupBackToTop();
        };
    }, []);
};

export default useFinalClientSetup;