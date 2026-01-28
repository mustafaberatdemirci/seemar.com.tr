import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { getPath, routes } from '../routes';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    // Get the equivalent path in the other language
    const getAlternateLanguagePath = () => {
        const otherLang = language === 'tr' ? 'en' : 'tr';
        const currentPath = location.pathname;

        // Map Turkish paths to English and vice versa
        const pathMappings: Record<string, Record<string, string>> = {
            tr: {
                '/tr': '/en',
                '/tr/urunler': '/en/products',
                '/tr/projeler': '/en/projects',
                '/tr/hakkimizda': '/en/about',
                '/tr/kariyer': '/en/careers',
                '/tr/lokasyonlar': '/en/locations',
                '/tr/iletisim': '/en/contact',
                '/tr/teklif': '/en/quote',
                '/tr/teklif/onaylandi': '/en/quote/confirmed',
            },
            en: {
                '/en': '/tr',
                '/en/products': '/tr/urunler',
                '/en/projects': '/tr/projeler',
                '/en/about': '/tr/hakkimizda',
                '/en/careers': '/tr/kariyer',
                '/en/locations': '/tr/lokasyonlar',
                '/en/contact': '/tr/iletisim',
                '/en/quote': '/tr/teklif',
                '/en/quote/confirmed': '/tr/teklif/onaylandi',
            }
        };

        // Check for exact match first
        if (pathMappings[language][currentPath]) {
            return pathMappings[language][currentPath];
        }

        // Handle dynamic routes (products/:id, careers/:id)
        if (currentPath.startsWith('/tr/urunler/')) {
            return currentPath.replace('/tr/urunler/', '/en/products/');
        }
        if (currentPath.startsWith('/en/products/')) {
            return currentPath.replace('/en/products/', '/tr/urunler/');
        }
        if (currentPath.startsWith('/tr/kariyer/')) {
            return currentPath.replace('/tr/kariyer/', '/en/careers/');
        }
        if (currentPath.startsWith('/en/careers/')) {
            return currentPath.replace('/en/careers/', '/tr/kariyer/');
        }
        if (currentPath.startsWith('/tr/projeler/')) {
            return currentPath.replace('/tr/projeler/', '/en/projects/');
        }
        if (currentPath.startsWith('/en/projects/')) {
            return currentPath.replace('/en/projects/', '/tr/projeler/');
        }

        // Default to home of other language
        return otherLang === 'tr' ? '/tr' : '/en';
    };

    const toggleLanguage = () => {
        const newPath = getAlternateLanguagePath();
        navigate(newPath);
    };

    const productCategories = [
        { id: 'marble', label: t('cat.marble'), image: '/images/products/101.webp' },
        { id: 'travertine', label: t('cat.travertine'), image: '/images/products/201.webp' },
        { id: 'onyx', label: t('cat.onyx'), image: '/images/products/301.webp' },
        { id: 'limestone', label: t('cat.limestone'), image: '/images/products/401.webp' },
        { id: 'granite', label: t('cat.granite'), image: '/images/products/501.webp' },
        { id: 'dolomite', label: t('cat.dolomite'), image: '/images/products/601.webp' },
        { id: 'mosaic', label: t('cat.mosaic'), image: '/images/products/701.webp' },
        { id: 'splitface', label: t('cat.splitface'), image: '/images/products/1001.webp' },
        { id: 'tumbled', label: t('cat.tumbled'), image: '/images/products/801.webp' },
        { id: 'sand', label: t('cat.sand'), image: '/images/products/901.webp' },
    ];

    const handleProductClick = (categoryId?: string) => {
        const productsPath = getPath(language, 'products');
        if (categoryId) {
            navigate(`${productsPath}?category=${categoryId}`);
        } else {
            navigate(productsPath);
        }
        setIsProductMenuOpen(false);
        setMobileMenuOpen(false);
    };

    const handleMobileNavigate = (routeName: keyof typeof routes.tr) => {
        navigate(getPath(language, routeName));
        setMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 group/nav ${scrolled ? 'py-2' : 'py-4'}`}
            onMouseLeave={() => setIsProductMenuOpen(false)}
        >
            <div className={`absolute inset-0 bg-background-light/80 backdrop-blur-md border-b border-white/10 shadow-sm transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-90'}`}></div>
            <div className="relative px-6 md:px-10 flex items-center justify-between">
                <Link
                    to={getPath(language, 'home')}
                    className="flex items-center gap-3 z-50"
                    aria-label={language === 'tr' ? 'Ana sayfaya git' : 'Go to homepage'}
                >
                    <span className="material-symbols-outlined text-primary text-3xl" aria-hidden="true">diamond</span>
                    <h2 className="text-[#181611] font-serif text-lg font-bold tracking-widest uppercase">SeeMAR</h2>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-1 justify-end items-center gap-10">
                    <div className="flex items-center gap-8 h-full">
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setIsProductMenuOpen(true)}
                        >
                            <button
                                onClick={() => handleProductClick()}
                                className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase bg-transparent border-none cursor-pointer text-anthracite py-4"
                                aria-haspopup="true"
                                aria-expanded={isProductMenuOpen}
                                aria-label={t('nav.products')}
                            >
                                {t('nav.products')}
                            </button>

                            {/* Mega Menu Dropdown */}
                            <div
                                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 transform ${isProductMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}
                                style={{ width: '800px', marginLeft: '0px' }}
                            >
                                <div className="bg-[#fcfbf8] border border-anthracite/10 shadow-2xl p-8 rounded-sm">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                        {productCategories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => handleProductClick(cat.id)}
                                                className="flex items-center gap-4 text-left group w-full"
                                            >
                                                <div className="w-10 h-8 rounded-sm overflow-hidden flex-shrink-0 bg-gray-200">
                                                    <img
                                                        src={cat.image}
                                                        alt={cat.label}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                                <span className="text-sm text-anthracite/70 group-hover:text-primary transition-colors font-display uppercase tracking-wider font-bold">
                                                    {cat.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-anthracite/5 text-center">
                                        <button
                                            onClick={() => handleProductClick()}
                                            className="text-xs font-bold text-primary uppercase tracking-[0.15em] hover:text-anthracite transition-colors"
                                        >
                                            {t('projects.viewAll')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to={getPath(language, 'locations')} className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase text-anthracite">
                            {t('nav.locations')}
                        </Link>
                        <Link to={getPath(language, 'projects')} className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase text-anthracite">
                            {t('projects.label')}
                        </Link>
                        <Link to={getPath(language, 'careers')} className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase text-anthracite">
                            {t('nav.careers')}
                        </Link>
                        <Link to={getPath(language, 'about')} className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase text-anthracite">
                            {t('nav.about')}
                        </Link>
                        <Link to={getPath(language, 'contact')} className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase text-anthracite">
                            {t('nav.contact')}
                        </Link>
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-anthracite hover:text-primary transition-colors ml-4"
                            aria-label={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
                        >
                            <span className={language === 'en' ? 'text-primary' : ''}>EN</span>
                            <span className="opacity-50" aria-hidden="true">/</span>
                            <span className={language === 'tr' ? 'text-primary' : ''}>TR</span>
                        </button>
                    </div>
                    <Link
                        to={getPath(language, 'quote')}
                        className="flex items-center justify-center h-10 px-6 border border-[#181611] rounded hover:bg-[#181611] hover:text-white transition-all duration-300"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase">{t('nav.requestQuote')}</span>
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    className="md:hidden text-[#181611] z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? (language === 'tr' ? 'Menüyü kapat' : 'Close menu') : (language === 'tr' ? 'Menüyü aç' : 'Open menu')}
                    aria-expanded={mobileMenuOpen}
                >
                    <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                        {mobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-background-light z-40 flex flex-col pt-24 px-6 transition-all duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                    <div className="flex flex-col gap-6 text-2xl font-serif font-bold text-anthracite">
                        <button onClick={() => handleMobileNavigate('products')} className="text-left py-2 border-b border-anthracite/10">{t('nav.products')}</button>
                        <button onClick={() => handleMobileNavigate('projects')} className="text-left py-2 border-b border-anthracite/10">{t('projects.label')}</button>
                        <button onClick={() => handleMobileNavigate('locations')} className="text-left py-2 border-b border-anthracite/10">{t('nav.locations')}</button>
                        <button onClick={() => handleMobileNavigate('careers')} className="text-left py-2 border-b border-anthracite/10">{t('nav.careers')}</button>
                        <button onClick={() => handleMobileNavigate('about')} className="text-left py-2 border-b border-anthracite/10">{t('nav.about')}</button>
                        <button onClick={() => handleMobileNavigate('contact')} className="text-left py-2 border-b border-anthracite/10">{t('nav.contact')}</button>
                    </div>

                    <div className="mt-8 flex flex-col gap-6">
                        <button
                            onClick={() => handleMobileNavigate('quote')}
                            className="flex items-center justify-center h-14 w-full border border-[#181611] rounded hover:bg-[#181611] hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-sm font-bold tracking-widest uppercase">{t('nav.requestQuote')}</span>
                        </button>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-anthracite"
                            >
                                <span className={language === 'en' ? 'text-primary' : ''}>EN</span>
                                <span>/</span>
                                <span className={language === 'tr' ? 'text-primary' : ''}>TR</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;