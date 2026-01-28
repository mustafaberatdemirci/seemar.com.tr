import React from 'react';
import { useLanguage } from './LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import FlipbookViewer from './FlipbookViewer';

const CatalogPage: React.FC = () => {
    const { language, t } = useLanguage();

    const pdfUrl = '/catalog/seemar-catalog.pdf';

    return (
        <div className="min-h-screen flex flex-col w-full bg-background-light">
            <SEO
                title={t('catalog.title')}
                description={t('catalog.desc')}
                image="/images/catalog-cover.jpg"
            />
            <Navbar />

            {/* Hero Header */}
            <header className="relative bg-cinematic-black pt-36 md:pt-44 pb-12 md:pb-16 overflow-hidden">
                {/* Marble texture background */}
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/marble-bg.png)' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cinematic-black/90 via-cinematic-black/70 to-cinematic-black/50"></div>

                <div className="relative px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="h-[1px] w-12 bg-primary"></span>
                                <span className="text-primary font-display font-bold text-xs tracking-[0.25em] uppercase">{t('catalog.label')}</span>
                            </div>
                            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-[0.95]">
                                {t('catalog.title').split(' ')[0]} <br />
                                <span className="italic text-dark-silver">{t('catalog.title').split(' ').slice(1).join(' ')}</span>
                            </h1>
                        </div>
                        <p className="max-w-lg text-sm md:text-base text-white/60 leading-relaxed font-display font-light">
                            {t('catalog.desc')}
                        </p>
                    </div>
                </div>
            </header>

            {/* Flipbook Viewer Section */}
            <main className="flex-grow px-4 md:px-12 lg:px-20 py-8 md:py-12 max-w-[1600px] mx-auto w-full">
                {/* Flipbook Container */}
                <div className="rounded-xl overflow-hidden shadow-2xl">
                    <FlipbookViewer pdfUrl={pdfUrl} />
                </div>

                {/* Instructions */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        {language === 'tr'
                            ? 'Sayfaları çevirmek için kenarlarına tıklayın veya sürükleyin. Kontrol butonlarını da kullanabilirsiniz.'
                            : 'Click or drag the page edges to flip. You can also use the control buttons below.'
                        }
                    </p>
                </div>

                {/* Info Note */}
                <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0">info</span>
                        <div>
                            <h3 className="font-display font-bold text-anthracite mb-2">{t('catalog.noteTitle')}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{t('catalog.noteText')}</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CatalogPage;
