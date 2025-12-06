// src/app/hooks/useAOSInitializer.js
'use client';

import { useEffect } from 'react';
import AOS from 'aos';

// Hook untuk menginisialisasi AOS (Animasi Scroll)
const useAOSInitializer = (dependency) => {
    useEffect(() => {
        // Cek apakah AOS tersedia di window
        if (typeof AOS !== 'undefined') {
            AOS.init({
                once: true,
                duration: 1000,
            });
        }
        
        // Refresh AOS setiap kali bahasa berubah
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, [dependency]); // Rerun saat bahasa (dependency) berubah
};

export default useAOSInitializer;