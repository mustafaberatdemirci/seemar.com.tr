import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';

const CallToAction: React.FC = () => {
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    return (
        <section className="bg-[#f5f0e8] py-20 px-6 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] tracking-wide mb-6">
                    {t('cta.title')}
                </h2>
                <p className="text-[#5a5a5a] text-lg mb-10 leading-relaxed">
                    {t('cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(getPath(language, 'quote'))}
                        className="px-8 py-3 bg-[#c9a962] text-white font-semibold uppercase tracking-wider border-2 border-[#c9a962] hover:bg-transparent hover:text-[#c9a962] transition-all duration-300"
                    >
                        {t('cta.requestQuote')}
                    </button>
                    <button
                        onClick={() => navigate(getPath(language, 'contact'))}
                        className="px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] font-semibold uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
                    >
                        {t('cta.contactSales')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
