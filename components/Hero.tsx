import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';

const Hero: React.FC = () => {
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    return (
        <header className="relative w-full h-screen min-h-[600px] md:min-h-[700px] flex flex-col md:flex-row overflow-hidden pt-[72px]" role="banner">
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center group" role="img" aria-label="Drone shot of a raw, dusty marble quarry in Afyon" style={{ backgroundImage: 'url("/images/hero/quarry-drone.jpg")' }}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-700"></div>
            </div>
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center group" role="img" aria-label="Macro close-up of a polished white marble slab" style={{ backgroundImage: 'url("/images/hero/marble-closeup.jpg")' }}>
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-all duration-700"></div>
            </div>
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-primary z-20 shadow-[0_0_15px_rgba(197,159,89,0.5)]"></div>
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4">
                <div className="max-w-4xl w-full text-center space-y-6 md:space-y-10 text-white">
                    <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-widest uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                        {t('hero.title')}
                    </h1>

                </div>
                <div className="mt-12 pointer-events-auto">
                    <button
                        onClick={() => navigate(getPath(language, 'products'))}
                        className="group flex items-center justify-center overflow-hidden rounded border border-white hover:border-primary bg-black/20 hover:bg-primary transition-all duration-300 h-12 px-8 backdrop-blur-sm shadow-lg"
                    >
                        <span className="text-white text-sm font-bold tracking-[0.15em] uppercase group-hover:text-black drop-shadow-md">{t('hero.cta')}</span>
                    </button>
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce text-white mix-blend-difference" aria-hidden="true">
                <span className="material-symbols-outlined text-3xl">arrow_downward</span>
            </div>
        </header>
    );
};

export default Hero;