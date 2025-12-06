// src/app/components/Header.jsx
'use client'; 

import React, { useState, useEffect, useCallback } from 'react';
import { translations } from './Translations';

const Header = ({ currentLanguage, setLanguage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const langData = translations[currentLanguage];

    // Fungsi untuk toggle menu mobile
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // Fungsi untuk smooth scroll di React
    const handleSmoothScroll = useCallback((e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Tutup menu mobile setelah scroll
            setIsMenuOpen(false);
            
            // Tutup dropdown jika di mobile
            const dropdownContent = document.querySelector('.dropdown-content');
            if (window.innerWidth <= 768 && dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        }
    }, []);

    // Hook untuk setup event listeners (Smooth Scroll)
    useEffect(() => {
        // Karena Next.js akan merender ulang link, kita harus attach event listener
        const links = document.querySelectorAll('.nav-menu a');
        links.forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Cleanup listener saat komponen dilepas
        return () => {
            links.forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
        };
    }, [handleSmoothScroll]);


    return (
        <header>
            <div className="main-header">
                <div className="logo">
                    {/* Aset statis diakses melalui root path /images/ */}
                    <img src="/images/logo-8.png" alt="Logo Desa Tampaksiring" className="site-logo" />
                    <span id="siteTitle">{langData.siteTitle}</span> <span id="siteVillage" className="yellow-text">{langData.header_village}</span>
                </div>
                
                {/* Tombol Hamburger di mobile */}
                <button className="hamburger" onClick={toggleMenu}>☰</button>
                
                <nav className={`nav-menu ${isMenuOpen ? 'show' : ''}`}>
                    
                    <a href="#hero" data-lang-key="home">{langData.home}</a>
                    
                    {/* DROPDOWN DESTINASI */}
                    <div className="dropdown">
                        <button 
                            className="dropbtn" 
                            data-lang-key="destinations"
                            onClick={(e) => { 
                                if (window.innerWidth <= 768) { 
                                    e.preventDefault(); 
                                    const content = e.currentTarget.nextElementSibling;
                                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                                }
                            }}
                        >
                            {langData.destinations} 
                        </button>
                        <div className="dropdown-content">
                            {/* Link di dalam dropdown menggunakan smooth scroll listener dari useEffect */}
                            <a href="#campuhan" data-lang-key="tubing">{langData.tubing}</a>
                            <a href="#kawi" data-lang-key="kawi">{langData.kawi}</a>
                            <a href="#mengening" data-lang-key="mengening">{langData.mengening}</a>
                        </div>
                    </div>

                    <a href="#umkm" data-lang-key="umkm">{langData.umkm}</a>
                    <a href="#galeri" data-lang-key="gallery">{langData.gallery}</a>
                    <a href="#testimoni" data-lang-key="testimonials">{langData.testimonials}</a>
                    <a href="#kontak" data-lang-key="reservation">{langData.reservation}</a>

                    {/* SELECTOR BAHASA */}
                    <div className="language-selector">
                        <span id="currentLang">
                             <img 
                                src={`/images/flag-${currentLanguage}.png`} 
                                alt={`${currentLanguage.toUpperCase()} Flag`} 
                                className="flag-icon"
                            /> {currentLanguage.toUpperCase()}
                        </span>
                        <ul className="lang-dropdown">
                            <li data-lang="id" onClick={() => setLanguage('id')}>
                                <img src="/images/flag-id.png" alt="ID Flag" className="flag-icon" /> Indonesia
                            </li>
                            <li data-lang="en" onClick={() => setLanguage('en')}>
                                <img src="/images/flag-en.png" alt="EN Flag" className="flag-icon" /> English
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;