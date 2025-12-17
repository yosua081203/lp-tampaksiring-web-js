// src/app/page.js
'use client'; 

import React, { useState } from 'react';
import Header from './components/Header';
import { translations, defaultLang } from './components/Translations';
import useNextJSSlider from './hooks/useNextJSSlider';
import useTypingEffect from './hooks/useTypingEffect';
import useAOSInitializer from './hooks/useAOSInitializer';
import useFinalClientSetup from './hooks/useFinalClientSetup'; 
// Hapus import Image dari 'next/image';
// Hapus import logo mitra

export default function Home() {
    const [currentLanguage, setLanguage] = useState(defaultLang);
    const langData = translations[currentLanguage];

    useAOSInitializer(currentLanguage);
    useNextJSSlider();
    useFinalClientSetup(); 

    useTypingEffect(langData.tubing, langData.kawi, langData.mengening);
    
    return (
        <>
            <Header 
                currentLanguage={currentLanguage} 
                setLanguage={setLanguage} 
            />
            
            {/* Tombol Back to Top */}
            <button id="backToTopBtn" title="Kembali ke Atas"><i className="fas fa-chevron-up"></i></button>

            <main>
                {/* HERO SECTION */}
                <section id="hero" className="hero">
                    <video autoPlay loop muted playsInline className="background-video">
                        <source src="/videos/hero-video.mp4" type="video/mp4" />
                        Browser Anda tidak mendukung tag video.
                    </video>
                    <div className="hero-overlay"></div>
                    <div className="hero-content" data-aos="fade-up" data-aos-duration="1500">
                        <h1 data-lang-key="title">{langData.title}</h1>
                        <p><span data-lang-key="subtitle">{langData.subtitle}</span> <span id="typing-text" className="animated-text"></span></p>
                        <a href="#kontak" className="btn primary-btn" data-lang-key="btn_hero">{langData.btn_hero} <i className="fas fa-angle-right"></i></a>
                    </div>
                </section>

                {/* SEJARAH SECTION */}
                <section id="sejarah" className="section history-section">
                    <h2 data-aos="fade-down" data-lang-key="h2_history">{langData.h2_history}</h2>
                    <div className="history-content" data-aos="fade-up" data-aos-delay="100">
                        <p><span data-lang-key="p_history_1">{langData.p_history_1}</span></p>
                        <p><span data-lang-key="p_history_2">{langData.p_history_2}</span></p>
                    </div>
                </section>

                {/* FITUR UTAMA: TUBING CAMPUHAN */}
                <section id="campuhan" className="section main-feature-section">
                    <div className="feature-item">
                        <div className="text-content" data-aos="fade-right">
                            <h2 data-lang-key="h2_tubing">{langData.h2_tubing}</h2>
                            <p><span data-lang-key="p_tubing_1">{langData.p_tubing_1}</span></p>
                            <ul>
                                <li><i className="fas fa-check-circle"></i> <span data-lang-key="li_tubing_1">{langData.li_tubing_1}</span></li>
                                <li><i className="fas fa-check-circle"></i> <span data-lang-key="li_tubing_2">{langData.li_tubing_2}</span></li>
                                <li><i className="fas fa-check-circle"></i> <span data-lang-key="li_tubing_3">{langData.li_tubing_3}</span></li>
                            </ul>
                            <a href="#kontak" className="btn secondary-btn"><i className="fas fa-ticket-alt"></i> <span data-lang-key="btn_tubing">{langData.btn_tubing}</span></a>
                        </div>
                        
                        <div className="image-placeholder" data-aos="fade-left">
                            <img src="/images/tubing-1.jpg" alt="Tubing Campuhan" id="tubingImageSlider" className="round-image" />
                        </div>
                    </div>
                </section>

                {/* PURA GUNUNG KAWI (SLIDER 10 GAMBAR) */}
                <section id="kawi" className="section supporting-section">
                    <h2 data-aos="fade-up" data-lang-key="h2_kawi">{langData.h2_kawi}</h2>
                    <div className="supporting-content" data-aos="fade-up" data-aos-delay="100">
                        <p><span data-lang-key="p_kawi">{langData.p_kawi}</span></p>
                    </div>
                    
                    <div className="slider-container kawi-slider-container" data-aos="zoom-in">
                        <div className="slider-track" id="kawiSliderTrack">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <img key={`kawi-${i}`} src={`/images/kawi-${i + 1}.jpg`} alt={`Pura Gunung Kawi ${i + 1}`} className="kawi-slide gallery-slide" />
                            ))}
                        </div>
                        <button className="slider-btn kawi-prev-btn"><i className="fas fa-chevron-left"></i></button>
                        <button className="slider-btn kawi-next-btn"><i className="fas fa-chevron-right"></i></button>
                    </div>
                </section>

                {/* PURA MENGENING (SLIDER 10 GAMBAR) */}
                <section id="mengening" className="section supporting-section">
                    <h2 data-aos="fade-up" data-lang-key="h2_mengening">{langData.h2_mengening}</h2>
                    <div className="supporting-content" data-aos="fade-up" data-aos-delay="100">
                        <p><span data-lang-key="p_mengening">{langData.p_mengening}</span></p>
                    </div>

                    <div className="slider-container mengening-slider-container" data-aos="zoom-in">
                        <div className="slider-track" id="mengeningSliderTrack">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <img key={`mengening-${i}`} src={`/images/mengening-${i + 1}.jpg`} alt={`Pura Mengening ${i + 1}`} className="mengening-slide gallery-slide" />
                            ))}
                        </div>
                        <button className="slider-btn mengening-prev-btn"><i className="fas fa-chevron-left"></i></button>
                        <button className="slider-btn mengening-next-btn"><i className="fas fa-chevron-right"></i></button>
                    </div>
                </section>

                {/* SECTION UMKM (SLIDER 10 PRODUK) */}
                <section id="umkm" className="section umkm-section">
                    <h2 data-aos="fade-down" data-lang-key="h2_umkm">{langData.h2_umkm}</h2>
                    <p className="section-description" data-aos="fade-down" data-lang-key="p_umkm" data-aos-delay="100">{langData.p_umkm}</p>
                    
                    <div className="slider-container umkm-slider-container" data-aos="zoom-in">
                        <div className="slider-track" id="umkmSliderTrack">
                            {/* Item UMKM: Teks statis karena ini adalah data produk */}
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-1.jpg" alt="Kerajinan Kayu Unik" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-2.jpg" alt="Kopi Bali Arabika" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-3.jpg" alt="Tenun Ikat Tradisional" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-4.jpg" alt="Madu Hutan Murni" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-5.jpg" alt="Produk Herbal Alami" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-6.jpg" alt="Sabun Organik" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-7.jpg" alt="Snack Tradisional" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-8.jpg" alt="Topeng Kayu" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-9.jpg" alt="Lukisan Kontemporer" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                            <div className="umkm-card umkm-slide">
                                <img src="/images/umkm-item-10.jpg" alt="Perak Filigree" className="umkm-image" />
                                <h3></h3>
                                <p></p>
                            </div>
                        </div>
                        
                        <button className="slider-btn umkm-prev-btn"><i className="fas fa-chevron-left"></i></button>
                        <button className="slider-btn umkm-next-btn"><i className="fas fa-chevron-right"></i></button>
                    </div>

                    <a href="#kontak" className="btn secondary-btn" style={{marginTop: '30px'}} data-aos="fade-up" data-lang-key="btn_umkm">{langData.btn_umkm}</a>
                </section>
                
                {/* GALERI SECTION (28 GAMBAR TOTAL) */}
                <section id="galeri" className="section gallery-section">
                    <h2 data-aos="fade-down" data-lang-key="h2_gallery">{langData.h2_gallery}</h2>
                    <div className="slider-container gallery-slider-container" data-aos="fade-up">
                        <div className="slider-track" id="gallerySliderTrack">
                            
                            {/* GAMBAR GALERI (28 TOTAL) */}
                            <img src="/images/tubing-1.jpg" alt="Tubing Campuhan: Aksi Seru di Sungai" className="gallery-item gallery-slide" />
                            <img src="/images/tubing-2.jpg" alt="Tubing Campuhan: Pemandu Memberikan Arahan" className="gallery-item gallery-slide" />
                            <img src="/images/tubing-3.jpg" alt="Tubing Campuhan: Melewati Jeram Kecil" className="gallery-item gallery-slide" />
                            <img src="/images/tubing-4.jpg" alt="Tubing Campuhan: Pemandangan Hutan Tropis" className="gallery-item gallery-slide" />
                            <img src="/images/tubing-5.jpg" alt="Tubing Campuhan: Keseruan Bersama Group Tour" className="gallery-item gallery-slide" />

                            <img src="/images/kawi-1.jpg" alt="Pura Gunung Kawi: Candi Tebing Utama" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-2.jpg" alt="Pura Gunung Kawi: Pemandangan Anak Tangga" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-3.jpg" alt="Pura Gunung Kawi: Relif Candi" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-4.jpg" alt="Pura Gunung Kawi: Gerbang Pura" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-5.jpg" alt="Pura Gunung Kawi: Suasana Pura Dalam" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-6.jpg" alt="Pura Gunung Kawi: Patung Arca" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-7.jpg" alt="Pura Gunung Kawi: Persawahan Hijau" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-8.jpg" alt="Pura Gunung Kawi: Detail Ukiran Batu" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-9.jpg" alt="Pura Gunung Kawi: Prosesi Upacara" className="gallery-item gallery-slide" />
                            <img src="/images/kawi-10.jpg" alt="Pura Gunung Kawi: Pemandangan Sungai" className="gallery-item gallery-slide" />

                            <img src="/images/mengening-1.jpg" alt="Pura Mengening: Kolam Mata Air Melukat" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-2.jpg" alt="Pura Mengening: Gerbang Utama" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-3.jpg" alt="Pura Mengening: Air Suci Mengalir" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-4.jpg" alt="Pura Mengening: Struktur Candi Kuno" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-5.jpg" alt="Pura Mengening: Suasana Tenang" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-6.jpg" alt="Pura Mengening: Persembahyangan" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-7.jpg" alt="Pura Mengening: Area Mandi Suci" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-8.jpg" alt="Pura Mengening: Detail Relief" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-9.jpg" alt="Pura Mengening: Pemandangan Alam" className="gallery-item gallery-slide" />
                            <img src="/images/mengening-10.jpg" alt="Pura Mengening: Air Jernih" className="gallery-item gallery-slide" />

                            <img src="/images/desa-4.jpg" alt="Pemandangan Desa Tampaksiring: Sawah Hijau" className="gallery-item gallery-slide" />
                            <img src="/images/pemandangan-5.jpg" alt="Pemandangan Alam Tampaksiring: Hutan Tropis" className="gallery-item gallery-slide" />
                            <img src="/images/budaya-6.jpg" alt="Budaya dan Tradisi Bali: Upacara Adat" className="gallery-item gallery-slide" />
                        </div>
                        
                        <button className="slider-btn gallery-prev-btn"><i className="fas fa-chevron-left"></i></button>
                        <button className="slider-btn gallery-next-btn"><i className="fas fa-chevron-right"></i></button>
                    </div>
                </section>
                
                {/* SECTION TESTIMONI */}
                <section id="testimoni" className="section history-section">
                    <h2 data-aos="fade-down" data-lang-key="h2_testi">{langData.h2_testi}</h2>
                    <div className="slider-container testimoni-slider-container" data-aos="fade-up">
                        <div className="slider-track" id="testimoniSliderTrack">
                            {/* TESTIMONI (Teks Statis) */}
                            <div className="testimoni-card testimoni-slide">
                                <i className="fas fa-quote-left testimoni-icon"></i>
                                <p className="testimoni-text">"Pengalaman tubing terbaik di Bali! Pemandu sangat profesional dan pemandangannya luar biasa. Tubing Campuhan wajib dicoba!"</p>
                                <div className="testimoni-info">
                                    <h4>Rina S.</h4>
                                    <div className="rating">
                                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="testimoni-card testimoni-slide">
                                <i className="fas fa-quote-left testimoni-icon"></i>
                                <p className="testimoni-text">"Pura Gunung Kawi sungguh megah. Situs bersejarah yang terawat dengan baik. Sangat merekomendasikan kunjungan ke sini."</p>
                                <div className="testimoni-info">
                                    <h4>Budi H.</h4>
                                    <div className="rating">
                                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="testimoni-card testimoni-slide">
                                <i className="fas fa-quote-left testimoni-icon"></i>
                                <p className="testimoni-text">"Produk UMKM lokalnya berkualitas tinggi, terutama kopi dan kerajinan kayunya. Sangat cocok untuk oleh-oleh."</p>
                                <div className="testimoni-info">
                                    <h4>Lisa M.</h4>
                                    <div className="rating">
                                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="testimoni-card testimoni-slide">
                                <i className="fas fa-quote-left testimoni-icon"></i>
                                <p className="testimoni-text">"Pura Mengening memberikan suasana spiritual yang sangat tenang. Air sucinya benar-benar menyegarkan jiwa."</p>
                                <div className="testimoni-info">
                                    <h4>Ahmad F.</h4>
                                    <div className="rating">
                                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="slider-btn testimoni-prev-btn"><i className="fas fa-chevron-left"></i></button>
                        <button className="slider-btn testimoni-next-btn"><i className="fas fa-chevron-right"></i></button>
                    </div>
                </section>
                
                <section id="kontak" className="section contact-map-section">
                    <h2 data-aos="fade-down" data-lang-key="h2_contact">{langData.h2_contact}</h2>
                    <div className="contact-map-container" data-aos="fade-up">
                        <div className="contact-form-area">
                            <h3 data-lang-key="h3_contact_form">{langData.h3_contact_form}</h3>
                            <form id="contactForm">
                                <input type="text" id="contactName" placeholder={langData.form_placeholder_name} required data-lang-key="form_placeholder_name" />
                                <input type="tel" id="contactWa" placeholder={langData.form_placeholder_wa} required data-lang-key="form_placeholder_wa" />
                                <select id="contactDestination" required>
                                    <option value="" data-lang-key="form_option_default">{langData.form_option_default}</option>
                                    <option value="tubing" data-lang-key="form_option_tubing">{langData.form_option_tubing}</option>
                                    <option value="kawi" data-lang-key="form_option_kawi">{langData.form_option_kawi}</option>
                                    <option value="mengening" data-lang-key="form_option_mengening">{langData.form_option_mengening}</option>
                                    <option value="umkm" data-lang-key="form_option_umkm">{langData.form_option_umkm}</option>
                                </select>
                                <textarea id="contactMessage" placeholder={langData.form_placeholder_msg} data-lang-key="form_placeholder_msg"></textarea>
                                <button type="submit" className="btn primary-btn" data-lang-key="btn_submit">{langData.btn_submit}</button>
                                <p id="formMessage" className="form-message"></p>
                            </form>

                            {/* SOCIAL LINKS */}
                            <div className="social-links">
                                <h4 data-lang-key="h4_social">{langData.h4_social}</h4>
                                <a href="https://www.instagram.com/desa_tampaksiring?igsh=MXhrcngwemY3azMxcw==" target="_blank" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                                <a href="https://www.tiktok.com/@desatampaksiring?_r=1&_t=ZS-91xK35TD81l" target="_blank" className="social-icon tiktok"><i className="fab fa-tiktok"></i></a>
                                <a href="https://wa.me/+6283834997026" target="_blank" className="social-icon whatsapp"><i className="fab fa-whatsapp"></i></a>
                            </div>

                            {/* SECTION SUPPORTED BY (Logo Mitra) */}
                            <div className="supported-by-container" data-aos="fade-up">
                                <h4 data-aos="fade-down" data-lang-key="h2_supported_by">{langData.h2_supported_by}</h4>
                                <div className="logo-grid">
                                    {/* [DIGANTI] Kembali ke tag <img> biasa dengan path absolut */}
                                    <img src="/images/logo-instiki.png" alt="Logo INSTIKI" className="supported-logo" />
                                    <img src="/images/logo-kknt.png" alt="Logo KKNT" className="supported-logo" /> 
                                    <img src="/images/logo-desa-tampaksiring.png" alt="Logo Desa Tampaksiring" className="supported-logo" />
                                </div>
                            </div>
                        </div>

                        <div className="map-area">
                            <h3 data-lang-key="h3_location">{langData.h3_location}</h3>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0461623910815!2d115.30907157444737!3d-8.42398519163276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1855a74e5127d%3A0xc3f58a3ffb86d9a1!2sPura%20Tirta%20Empul!5e0!3m2!1sen!2sid!4v1700668012345!5m2!1sen!2sid" width="100%" height="350" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </section>
                {/* END KONTAK SECTION */}
            </main>

            {/* [PERBAIKAN FOOTER] Mengganti footer lama dengan struktur 3-kolom */}
            <footer className="footer-full-structure">
                <div className="footer-content">
                    {/* Kolom 1: Village Life */}
                    <div className="footer-col" id="col-village-life">
                        <h4>VILLAGE LIFE</h4>
                        <span className="footer-title">Tampaksiring</span>
                        <p className="footer-tagline">Pusaka alam dan petualangan abadi.</p>
                    </div>

                    {/* Kolom 2: Social Media */}
                    <div className="footer-col" id="col-social-media">
                        <h4>IKUTI KAMI DI MEDIA SOSIAL</h4>
                        <div className="social-links-footer">
                            <a href="https://www.instagram.com/desa_tampaksiring?igsh=MXhrcngwemY3azMxcw==" target="_blank" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.tiktok.com/@desatampaksiring?_r=1&_t=ZS-91xK35TD81l" target="_blank" className="social-icon tiktok"><i className="fab fa-tiktok"></i></a>
                            <a href="https://www.facebook.com/tampaksiring" target="_blank" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.youtube.com/@DesaTampaksiringBali" target="_blank" className="social-icon youtube"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    {/* Kolom 3: Lokasi Kami */}
                    <div className="footer-col" id="col-location">
                        <h4>LOKASI KAMI (TAMPAKSIRING)</h4>
                        <p>Tampaksiring, Gianyar - Bali</p>
                        <p>info@tampaksiring.id</p>
                    </div>
                </div>

                {/* Footer Bar Bawah */}
                <div className="footer-bottom">
                    <p>© 2025 KKNT INSTIKI DESA TAMPAKSIRING. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
            {/* END FOOTER PERBAIKAN */}


            {/* LIGHTBOX MODAL (Tersembunyi) */}
            <div id="lightboxModal" className="lightbox-modal">
                <span className="close-btn">×</span>
                <img className="modal-content" id="lightboxImage" />
                <div id="lightboxCaption"></div>
            </div>
            
            {/* TOMBOL KEMBALI KE ATAS */}
            <button id="backToTopBtn" title="Kembali ke Atas"><i className="fas fa-chevron-up"></i></button>

            {/* JS Libraries are imported in layout.js */}
        </>
    );
}