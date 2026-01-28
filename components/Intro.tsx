import React from 'react';
import { useLanguage } from './LanguageContext';

const Intro: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="relative bg-background-light py-16 md:py-24 px-6 md:px-20 z-10">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
                <span className="material-symbols-outlined text-4xl text-primary opacity-100">account_balance</span>
                <h2 className="text-[#181611] font-serif text-3xl md:text-4xl font-bold leading-tight tracking-wide uppercase">
                    {t('intro.title')}
                </h2>
                <div className="w-16 h-[2px] bg-primary"></div>
                <p className="text-[#181611]/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                    {t('intro.text')}
                </p>
            </div>

            {/* Stats Section */}
            <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#181611]/10">
                {/* Stat 1 - Annual Extraction */}
                <div className="flex flex-col items-center gap-3 py-8 md:py-0">
                    <span className="material-symbols-outlined text-3xl text-primary opacity-70">landscape</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t('intro.stat1Label')}</span>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#181611] font-bold">
                        50,000 <span className="text-lg font-normal uppercase tracking-wider">Ton</span>
                    </h3>
                </div>
                {/* Stat 2 - Quarry Area */}
                <div className="flex flex-col items-center gap-3 py-8 md:py-0">
                    <span className="material-symbols-outlined text-3xl text-primary opacity-70">square_foot</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t('intro.stat2Label')}</span>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#181611] font-bold">
                        80 <span className="text-lg font-normal uppercase tracking-wider">Hektar</span>
                    </h3>
                </div>
                {/* Stat 3 - Export */}
                <div className="flex flex-col items-center gap-3 py-8 md:py-0">
                    <span className="material-symbols-outlined text-3xl text-primary opacity-70">public</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t('intro.stat3Label')}</span>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#181611] font-bold">
                        12+ <span className="text-lg font-normal uppercase tracking-wider">{t('intro.stat3Unit')}</span>
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default Intro;