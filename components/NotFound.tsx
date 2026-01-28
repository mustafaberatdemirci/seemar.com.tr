import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';

const NotFound: React.FC = () => {
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-background-light min-h-screen transition-colors duration-500 flex flex-col font-display text-anthracite">
            <Navbar />

            <main className="flex-grow pt-[72px] flex items-center justify-center relative overflow-hidden min-h-[80vh]">
                {/* Background Texture/Noise */}
                <div className="absolute inset-0 z-0 opacity-5 pointer-events-none mix-blend-multiply">
                    <img
                        src="/images/misc/404-marble.jpg"
                        className="w-full h-full object-cover grayscale scale-150"
                        alt="Stone Texture"
                    />
                </div>

                {/* Abstract Geometric Elements */}
                <div className="absolute top-1/4 left-10 w-64 h-64 border border-anthracite/5 rounded-full pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-anthracite/5 rounded-full pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    {/* Large Background 404 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif font-black text-[180px] md:text-[300px] leading-none text-anthracite/5 select-none pointer-events-none tracking-tighter blur-sm">
                        404
                    </div>

                    <div className="relative space-y-8">
                        <div className="flex justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 border border-primary/50 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                                <span className="material-symbols-outlined text-sm">warning</span>
                                {t('notFound.badge')}
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-anthracite leading-tight">
                            {t('notFound.title')}
                        </h1>

                        <div className="w-24 h-[1px] bg-primary mx-auto"></div>

                        <p className="text-lg md:text-xl text-anthracite/60 font-light max-w-lg mx-auto leading-relaxed">
                            {t('notFound.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <button
                                onClick={() => navigate(getPath(language, 'home'))}
                                className="group relative px-8 py-4 bg-anthracite text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                <span className="relative flex items-center gap-2 group-hover:text-white">
                                    <span className="material-symbols-outlined text-lg">arrow_upward</span>
                                    {t('notFound.returnHome')}
                                </span>
                            </button>
                            <button
                                onClick={() => navigate(getPath(language, 'products'))}
                                className="px-8 py-4 border border-anthracite/20 text-anthracite text-xs font-bold uppercase tracking-widest rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
                            >
                                {t('notFound.viewCollection')}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;