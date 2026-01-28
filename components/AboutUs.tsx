import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';
import SEO from './SEO';

const AboutUs: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    // Custom colors from the design
    const colors = {
        primary: "#ecb613", // vein-gold
        bgLight: "#fcfbf8", // gallery-white
        bgDark: "#1b180d",  // background-dark
        textMain: "#1b180d", // anthracite
        marbleGrey: "#e7e1cf",
    };

    // Inline styles for specific effects that are complex in utility classes
    const noiseStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E")`
    };

    const subtleNoiseStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.35%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")`
    };

    return (
        <div className="bg-[#fcfbf8] text-[#1b180d] font-display antialiased overflow-x-hidden relative min-h-screen">
            <SEO
                title={t('nav.about')}
                description={t('about.heroDesc')}
                image="/images/about/quarry-hero.jpg"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Seemar",
                    "url": window.location.origin,
                    "logo": window.location.origin + "/logo.png", // Assuming logo path
                    "description": t('about.heroDesc'),
                    "foundingDate": "1965",
                    "founder": {
                        "@type": "Person",
                        "name": "Semih Dabağ"
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Organize Sanayi Bölgesi",
                        "addressLocality": "Afyonkarahisar",
                        "postalCode": "03200",
                        "addressCountry": "TR"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+90-272-213-2600",
                        "contactType": "customer service"
                    }
                }}
            />
            {/* Global Styles for this page */}
            <style>{`
                .raw-edge-border {
                    position: relative;
                    border: 1px solid transparent;
                }
                .raw-edge-border::before {
                    content: '';
                    position: absolute;
                    top: -10px; bottom: -10px; left: -10px; right: -10px;
                    border: 1px solid #d9d0c2;
                    pointer-events: none;
                    z-index: 10;
                    transform: rotate(0.2deg) scaleX(1.005) scaleY(1.005);
                    filter: drop-shadow(0 0 1px rgba(0,0,0,0.05));
                }
                @media (min-width: 1024px) {
                    .raw-edge-border::before {
                        top: -20px; bottom: -20px; left: -20px; right: -20px;
                    }
                }
                ::selection {
                    background-color: #ecb613;
                    color: white;
                }
            `}</style>

            <Navbar />

            {/* Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-40" style={noiseStyle}></div>

            <main className="pt-[72px]">
                {/* Hero Section */}
                <section className="max-w-[1440px] mx-auto py-20 px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#fcfbf8] p-6 lg:p-12 raw-edge-border relative" style={subtleNoiseStyle}>
                        <div className="relative overflow-hidden group min-h-[400px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out scale-100 group-hover:scale-105"
                                style={{ backgroundImage: 'url("/images/about/quarry-hero.jpg")' }}
                            ></div>
                            <div className="absolute bottom-6 left-6 bg-[#fcfbf8]/80 backdrop-blur px-4 py-2 rounded-sm border-l-2 border-[#ecb613]">
                                <p className="text-xs font-mono uppercase tracking-widest text-[#1b180d]">{t('about.quarryLot')}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center p-4">
                            <div className="max-w-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-[1px] w-12 bg-[#ecb613]"></div>
                                    <span className="text-[#ecb613] uppercase tracking-[0.2em] text-xs font-bold">{t('about.established')}</span>
                                </div>
                                <h1 className="text-[#1b180d] text-3xl md:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] mb-8 break-words">
                                    {t('about.heroTitle1')} <br />
                                    <span className="italic text-[#e7e1cf]">{t('about.heroTitle2')}</span> <br className="md:hidden" />{t('about.heroTitle3')}
                                </h1>
                                <p className="text-[#1b180d]/80 text-lg leading-relaxed font-light mb-10 max-w-md">
                                    {t('about.heroDesc')}
                                </p>
                                <button
                                    onClick={() => navigate(getPath(language, 'products'))}
                                    className="flex w-fit cursor-pointer items-center justify-center rounded-md h-12 px-8 border border-[#1b180d] text-[#1b180d] text-sm font-bold tracking-widest hover:border-[#ecb613] hover:text-[#ecb613] transition-colors duration-300"
                                >
                                    {t('about.exploreHeritage')}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Digital Lapidarium */}
                <section className="max-w-[1440px] mx-auto py-20 px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#fcfbf8] p-6 lg:p-12 raw-edge-border relative" style={subtleNoiseStyle}>
                        <div className="flex flex-col justify-center p-4 lg:pr-12">
                            <h2 className="text-4xl lg:text-5xl font-serif text-[#1b180d] leading-tight mb-8">
                                {t('about.lapidariumTitle1')} <br /><span className="text-[#ecb613] italic">{t('about.lapidariumTitle2')}</span>
                            </h2>
                            <div className="p-8 border-l border-[#e7e1cf] bg-white/50 mb-12">
                                <p className="text-xl lg:text-2xl font-light leading-relaxed text-[#1b180d]">
                                    "{t('about.founderQuote')}"
                                </p>
                                <div className="mt-6">
                                    <p className="text-sm font-bold text-[#1b180d]">{t('about.founderName')}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t('about.founderRole')}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-[#fcfbf8] p-6 border border-[#e7e1cf]/20 hover:border-[#ecb613]/30 transition-colors group">
                                    <div className="mb-4 text-[#ecb613] bg-[#ecb613]/10 w-fit p-3 rounded-md">
                                        <span className="material-symbols-outlined">diamond</span>
                                    </div>
                                    <h3 className="font-serif text-xl mb-3 text-[#1b180d]">{t('about.permanence')}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{t('about.permanenceDesc')}</p>
                                </div>
                                <div className="bg-[#fcfbf8] p-6 border border-[#e7e1cf]/20 hover:border-[#ecb613]/30 transition-colors group">
                                    <div className="mb-4 text-[#ecb613] bg-[#ecb613]/10 w-fit p-3 rounded-md">
                                        <span className="material-symbols-outlined">architecture</span>
                                    </div>
                                    <h3 className="font-serif text-xl mb-3 text-[#1b180d]">{t('about.precision')}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{t('about.precisionDesc')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden group min-h-[400px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out scale-100 group-hover:scale-105"
                                style={{ backgroundImage: 'url("/images/about/lapidarium.jpg")' }}
                            ></div>
                        </div>
                    </div>
                </section>

                {/* History Timeline */}
                <section className="max-w-[1440px] mx-auto py-20 px-6 lg:px-12">
                    <div className="bg-[#fcfbf8] p-6 lg:p-12 raw-edge-border relative" style={subtleNoiseStyle}>
                        <div className="text-center mb-16">
                            <span className="text-[#ecb613] uppercase tracking-[0.2em] text-xs font-bold block mb-4">{t('about.historyTitle')}</span>
                            <h2 className="text-3xl lg:text-4xl font-serif text-[#1b180d]">{t('about.historySubtitle')}</h2>
                        </div>
                        <div className="relative max-w-[960px] mx-auto">
                            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#e7e1cf]/50 transform -translate-x-1/2 hidden md:block"></div>

                            {/* 1965 */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between mb-20 group">
                                <div className="md:w-[45%] mb-6 md:mb-0 order-2 md:order-1 flex justify-end">
                                    <div className="bg-[#e7e1cf]/10 p-6 shadow-sm border border-[#e7e1cf]/30 max-w-sm">
                                        <span className="text-[#ecb613] font-bold text-lg font-serif block mb-2">{t('about.timeline1965')}</span>
                                        <h3 className="text-xl font-serif font-semibold mb-2 text-[#1b180d]">{t('about.timeline1965Title')}</h3>
                                        <p className="text-base text-[#1b180d]/80 leading-relaxed">{t('about.timeline1965Desc')}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 w-4 h-4 bg-[#ecb613] rounded-full border-4 border-[#fcfbf8] transform -translate-x-1/2 z-10 hidden md:block"></div>
                                <div className="md:w-[45%] order-1 md:order-2 pl-0 flex justify-start min-h-[200px]">
                                    <div
                                        className="w-full max-w-sm h-48 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                                        style={{ backgroundImage: 'url("/images/about/timeline-1965.jpg")' }}
                                    ></div>
                                </div>
                            </div>

                            {/* 1995 */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between mb-20 group">
                                <div className="md:w-[45%] mb-6 md:mb-0 order-2 md:order-1 pl-0 flex justify-end min-h-[200px]">
                                    <div
                                        className="w-full max-w-sm h-48 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                                        style={{ backgroundImage: 'url("/images/about/timeline-1995.jpg")' }}
                                    ></div>
                                </div>
                                <div className="absolute left-1/2 w-4 h-4 bg-[#ecb613] rounded-full border-4 border-[#fcfbf8] transform -translate-x-1/2 z-10 hidden md:block"></div>
                                <div className="md:w-[45%] order-1 md:order-2 flex justify-start">
                                    <div className="bg-[#e7e1cf]/10 p-6 shadow-sm border border-[#e7e1cf]/30 max-w-sm">
                                        <span className="text-[#ecb613] font-bold text-lg font-serif block mb-2">{t('about.timeline1995')}</span>
                                        <h3 className="text-xl font-serif font-semibold mb-2 text-[#1b180d]">{t('about.timeline1995Title')}</h3>
                                        <p className="text-base text-[#1b180d]/80 leading-relaxed">{t('about.timeline1995Desc')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Present */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-[45%] mb-6 md:mb-0 order-2 md:order-1 flex justify-end">
                                    <div className="bg-[#e7e1cf]/10 p-6 shadow-sm border border-[#e7e1cf]/30 max-w-sm">
                                        <span className="text-[#ecb613] font-bold text-lg font-serif block mb-2">{t('about.timelinePresent')}</span>
                                        <h3 className="text-xl font-serif font-semibold mb-2 text-[#1b180d]">{t('about.timelinePresentTitle')}</h3>
                                        <p className="text-base text-[#1b180d]/80 leading-relaxed">{t('about.timelinePresentDesc')}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 w-4 h-4 bg-[#ecb613] rounded-full border-4 border-[#fcfbf8] transform -translate-x-1/2 z-10 hidden md:block"></div>
                                <div className="md:w-[45%] order-1 md:order-2 pl-0 flex justify-start min-h-[200px]">
                                    <div
                                        className="w-full max-w-sm h-48 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                                        style={{ backgroundImage: 'url("/images/about/lapidarium.jpg")' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Methodology */}
                <section className="max-w-[1440px] mx-auto py-20 px-6 lg:px-12">
                    <div className="bg-[#fcfbf8] p-6 lg:p-12 raw-edge-border relative" style={subtleNoiseStyle}>
                        <div className="text-center mb-16">
                            <span className="text-[#ecb613] uppercase tracking-[0.2em] text-xs font-bold block mb-4">{t('about.methodologyTitle')}</span>
                            <h2 className="text-3xl lg:text-4xl font-serif text-[#1b180d]">{t('about.methodologySubtitle')}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] gap-8">
                            <div className="relative group overflow-hidden bg-[#e7e1cf]/20 p-8 flex flex-col justify-end">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: 'url("/images/about/hand-master.jpg")' }}
                                ></div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                                <div className="relative z-10 p-4 text-white">
                                    <h3 className="text-4xl font-serif mb-4 leading-tight">{t('about.handTitle1')} <br /> <span className="text-[#ecb613] italic">{t('about.handTitle2')}</span></h3>
                                    <p className="text-gray-200 max-w-sm text-lg leading-relaxed">{t('about.handDesc')}</p>
                                </div>
                            </div>
                            <div className="relative group overflow-hidden bg-[#e7e1cf]/20 p-8 flex flex-col justify-end">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: 'url("/images/about/machine-precision.jpg")' }}
                                ></div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                                <div className="relative z-10 p-4 text-white">
                                    <h3 className="text-4xl font-serif mb-4 leading-tight">{t('about.machineTitle1')} <br /> <span className="text-[#ecb613] italic">{t('about.machineTitle2')}</span></h3>
                                    <p className="text-gray-200 max-w-sm text-lg leading-relaxed">{t('about.machineDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 px-6 flex flex-col items-center justify-center text-center bg-[#fcfbf8]">
                    <h2 className="text-4xl md:text-6xl font-serif text-[#1b180d] mb-8">{t('about.ctaTitle1')} <br />{t('about.ctaTitle2')}</h2>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <button
                            onClick={() => navigate(getPath(language, 'products'))}
                            className="min-w-[200px] cursor-pointer items-center justify-center rounded-md h-14 px-8 bg-[#ecb613] text-[#1b180d] text-base font-bold tracking-widest hover:bg-[#d9a50d] transition-colors shadow-lg"
                        >
                            {t('about.viewCollections')}
                        </button>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
};

export default AboutUs;