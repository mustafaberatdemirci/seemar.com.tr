import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';
import SEO from './SEO';

const Showroom: React.FC = () => {
    const { language, t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="relative w-full overflow-hidden bg-[#FDFDFD] py-24 lg:py-40">
            <SEO
                title={t('showroom.virtual')}
                description={t('showroom.text')}
                image="/images/showroom/room-floor.jpg"
            />
            <div className="container mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative">

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center z-20 relative order-2 lg:order-1 lg:pr-8">
                        <div className="space-y-8 text-left">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cool-grey/10 text-cool-grey border border-cool-grey/20" aria-hidden="true">
                                    <span className="material-symbols-outlined text-sm">3d_rotation</span>
                                </span>
                                <span className="font-display font-bold text-sm tracking-[0.25em] uppercase text-cool-grey">
                                    {t('showroom.virtual')}
                                </span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-anthracite font-bold">
                                {t('showroom.title').split(' ').slice(0, 2).join(' ')} <br />
                                <span className="font-extrabold text-primary">{t('showroom.title').split(' ').slice(2).join(' ')}</span>
                            </h2>
                            <div className="w-24 h-[1px] bg-primary"></div>
                            <p className="font-display text-lg text-cool-grey/80 leading-relaxed max-w-xl">
                                {t('showroom.text')}
                            </p>
                            <div className="pt-4">
                                <Link
                                    to={getPath(language, 'catalog')}
                                    className="group relative inline-flex px-8 py-4 bg-anthracite text-white overflow-hidden rounded-sm transition-all hover:shadow-xl hover:shadow-primary/20"
                                >
                                    <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                    <span className="relative flex items-center gap-3 group-hover:text-cool-grey transition-colors">
                                        <span className="text-xs font-bold tracking-[0.2em] uppercase">{t('showroom.cta')}</span>
                                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Isometric View Visual */}
                    <div
                        className="w-full lg:w-1/2 relative h-[350px] md:h-[600px] lg:h-[700px] flex items-center justify-center perspective-1000 order-1 lg:order-2 p-4 sm:p-12"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* 3D Container */}
                        <div className="absolute inset-4 sm:inset-0 w-full h-full overflow-hidden rounded-2xl shadow-2xl bg-cool-grey transform transition-transform duration-1000 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
                            <div
                                className="relative w-[80%] h-[80%] bg-cool-grey/20 border border-dark-silver/20 rounded-md transition-transform duration-700 ease-out"
                                style={{
                                    transform: isHovered
                                        ? 'rotateX(0deg) rotateZ(0deg) scale(1.05)'
                                        : 'rotateX(30deg) rotateZ(-45deg)',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* Floor */}
                                <div className="absolute inset-0 bg-cover bg-center border border-dark-silver/30" style={{ transform: 'rotateX(90deg) translateZ(-50px)', transformOrigin: '50% 100%', width: '100%', height: '100%', backgroundImage: 'url("/images/showroom/room-floor.jpg")', filter: 'brightness(0.7)' }}></div>
                                {/* Left Wall */}
                                <div className="absolute inset-0 bg-cover bg-center border border-dark-silver/30" style={{ transform: 'translateZ(-50px)', width: '100%', height: '100%', backgroundImage: 'url("/images/showroom/room-back.jpg")', filter: 'brightness(0.8)' }}></div>
                                {/* Right Wall */}
                                <div className="absolute inset-0 bg-cover bg-center border border-dark-silver/30" style={{ transform: 'rotateY(90deg) translateZ(-50px)', transformOrigin: '100% 50%', width: '100%', height: '100%', backgroundImage: 'url("/images/showroom/room-side.jpg")', filter: 'brightness(0.75)' }}></div>
                            </div>
                        </div>

                        {/* OVERLAY LAYER - Pure CSS hover tooltips using group */}
                        <div className="absolute inset-0 z-50">
                            {/* Marker 1 with tooltip - using group for CSS hover */}
                            <div
                                className="group absolute"
                                style={{
                                    top: isHovered ? '25%' : '30%',
                                    left: isHovered ? '30%' : '25%',
                                    transition: 'top 0.7s ease-out, left 0.7s ease-out'
                                }}
                            >
                                <button
                                    className="w-8 h-8 rounded-full border-2 border-white text-white flex items-center justify-center font-bold cursor-pointer bg-primary/90 hover:bg-primary hover:scale-125 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                                    aria-label="Polished Afyon White surface info"
                                >
                                    <span className="material-symbols-outlined text-sm" aria-hidden="true">info</span>
                                </button>
                                {/* Tooltip appears on group hover */}
                                <div className="absolute left-10 top-0 bg-anthracite/95 backdrop-blur-sm text-white text-sm p-4 rounded-xl shadow-2xl border border-primary/30 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">diamond</span>
                                        <div>
                                            <span className="font-mono block text-primary font-bold text-xs tracking-wider">PROJECT-CODE: M-S01-A</span>
                                            <span className="block text-white mt-1">{language === 'tr' ? 'Yüzey: Cilalı Afyon Beyaz' : 'Surface: Polished Afyon White'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Marker 2 with tooltip - using group for CSS hover */}
                            <div
                                className="group absolute"
                                style={{
                                    bottom: isHovered ? '30%' : '25%',
                                    right: isHovered ? '25%' : '30%',
                                    transition: 'bottom 0.7s ease-out, right 0.7s ease-out'
                                }}
                            >
                                <button
                                    className="w-8 h-8 rounded-full border-2 border-white text-white flex items-center justify-center font-bold cursor-pointer bg-primary/90 hover:bg-primary hover:scale-125 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                                    aria-label="Honed Black Silk surface info"
                                >
                                    <span className="material-symbols-outlined text-sm" aria-hidden="true">info</span>
                                </button>
                                {/* Tooltip appears on group hover - positioned to left */}
                                <div className="absolute right-10 top-0 bg-anthracite/95 backdrop-blur-sm text-white text-sm p-4 rounded-xl shadow-2xl border border-primary/30 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">diamond</span>
                                        <div>
                                            <span className="font-mono block text-primary font-bold text-xs tracking-wider">PROJECT-CODE: M-S01-F</span>
                                            <span className="block text-white mt-1">{language === 'tr' ? 'Yüzey: Mat Siyah İpek' : 'Surface: Honed Black Silk'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showroom;