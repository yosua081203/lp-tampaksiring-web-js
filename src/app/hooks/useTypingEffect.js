// src/app/hooks/useTypingEffect.js
'use client';

import { useEffect } from 'react';

// Hook untuk mengontrol animasi typing text
const useTypingEffect = (tubingText, kawiText, mengeningText) => {
    useEffect(() => {
        const textElement = document.getElementById('typing-text');
        if (!textElement) return;

        const textToType = [tubingText, kawiText, mengeningText];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timer;

        function type() {
            let currentText = textToType[textIndex];

            if (!isDeleting) {
                charIndex++;
                textElement.textContent = currentText.substring(0, charIndex);

                if (charIndex === currentText.length) {
                    isDeleting = true;
                    timer = setTimeout(type, 2000); 
                } else {
                    timer = setTimeout(type, 100);
                }
            } else {
                charIndex--;
                textElement.textContent = currentText.substring(0, charIndex);

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % textToType.length;
                    timer = setTimeout(type, 500); 
                } else {
                    timer = setTimeout(type, 50);
                }
            }
        }
        
        // Mulai
        type();

        // Cleanup: Hentikan timer saat komponen di-unmount atau di-rerender
        return () => clearTimeout(timer);
    }, [tubingText, kawiText, mengeningText]); // Rerun saat teks terjemahan berubah
};

export default useTypingEffect; 