import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSlabs } from '../constants';
import { useLanguage } from './LanguageContext';
import { getPath } from '../routes';
import SEO from './SEO';

const ITEMS_PER_PAGE = 15;

const Products: React.FC = () => {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category');
    const [filter, setFilter] = useState(initialCategory || 'All');
    const [animateItems, setAnimateItems] = useState(false);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    const slabs = getSlabs(language);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setFilter(category);
        }
    }, [searchParams]);

    // Categories mapping for UI labels
    const categoryLabels: Record<string, string> = {
        'All': t('cat.all'),
        'marble': t('cat.marble'),
        'travertine': t('cat.travertine'),
        'onyx': t('cat.onyx'),
        'limestone': t('cat.limestone'),
        'granite': t('cat.granite'),
        'dolomite': t('cat.dolomite'),
        'mosaic': t('cat.mosaic'),
        'splitface': t('cat.splitface'),
        'tumbled': t('cat.tumbled'),
        'sand': t('cat.sand'),
    };

    // Use predefined category order to maintain consistency
    const categories = ['All', 'marble', 'travertine', 'onyx', 'limestone', 'granite', 'dolomite', 'mosaic', 'splitface', 'tumbled', 'sand'];

    // Type order for consistent display (matches filter order)
    const typeOrder: Record<string, number> = {
        'marble': 1,
        'travertine': 2,
        'onyx': 3,
        'limestone': 4,
        'granite': 5,
        'dolomite': 6,
        'mosaic': 7,
        'splitface': 8,
        'tumbled': 9,
        'sand': 10,
    };

    const filteredSlabs = (filter === 'All'
        ? [...slabs].sort((a, b) => (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99))
        : slabs.filter(slab => slab.type === filter)
    ).filter(slab =>
        searchQuery === '' || slab.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get visible slabs based on pagination
    const visibleSlabs = filteredSlabs.slice(0, visibleCount);
    const hasMoreItems = visibleCount < filteredSlabs.length;

    // Reset pagination and animation when filter changes
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
        setAnimateItems(false);
        const timer = setTimeout(() => setAnimateItems(true), 100);
        return () => clearTimeout(timer);
    }, [filter]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    const handleCardClick = (slug: string) => {
        const detailPath = getPath(language, 'productDetail', { slug });
        navigate(detailPath);
    };

    return (
        <div className="bg-background-light min-h-screen pt-24 transition-colors duration-500 flex flex-col">
            <SEO
                title={t('nav.products')}
                description={t('products.desc')}
                image="/images/hero/marble-closeup.jpg" // Fallback or main catalog image
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": t('products.title'),
                    "description": t('products.desc'),
                    "url": window.location.href,
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": visibleSlabs.map((slab, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "url": window.location.origin + getPath(language, 'productDetail', { slug: slab.slug }),
                            "name": slab.name,
                            "image": window.location.origin + slab.image
                        }))
                    }
                }}
            />
            {/* Header Section */}
            <header className="px-6 md:px-12 lg:px-20 py-12 md:py-20 max-w-[1600px] mx-auto w-full flex-grow">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="h-[1px] w-12 bg-primary"></span>
                            <span className="text-primary font-display font-bold text-xs tracking-[0.25em] uppercase">{t('products.collection')}</span>
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl text-anthracite font-medium leading-[0.9]">
                            {t('products.title').split(' ')[0]} <br />
                            <span className="italic text-gray-400">{t('products.title').split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </div>
                    <p className="max-w-md text-sm md:text-base text-gray-600 leading-relaxed font-display font-light">
                        {t('products.desc')}
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-col gap-4 border-b border-anthracite/10 pb-6 mb-12">
                    <div className="flex flex-nowrap md:flex-wrap items-center gap-4 overflow-x-auto no-scrollbar" role="tablist" aria-label={t('products.filter')}>
                        <span className="text-xs font-bold uppercase tracking-widest text-anthracite/40 mr-4 whitespace-nowrap" aria-hidden="true">{t('products.filter')}</span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                role="tab"
                                aria-selected={filter === cat}
                                className={`
                                    px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 whitespace-nowrap
                                    ${filter === cat
                                        ? 'bg-anthracite text-white shadow-lg'
                                        : 'bg-transparent text-anthracite/60 hover:text-primary'}
                                `}
                            >
                                {categoryLabels[cat] || cat}
                            </button>
                        ))}
                        {/* Search Button & Input */}
                        <div className="ml-auto flex items-center gap-2">
                            {searchOpen && (
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={language === 'tr' ? 'Ürün ara...' : 'Search...'}
                                    className="w-40 md:w-48 px-4 py-2 bg-transparent border border-anthracite/20 rounded-sm text-sm text-anthracite placeholder-anthracite/40 focus:outline-none focus:border-primary transition-all duration-300"
                                    autoFocus
                                />
                            )}
                            <button
                                onClick={() => {
                                    if (searchOpen && searchQuery) {
                                        setSearchQuery('');
                                    }
                                    setSearchOpen(!searchOpen);
                                }}
                                className={`w-10 h-10 flex items-center justify-center border rounded-sm transition-all duration-300 ${searchOpen
                                    ? 'border-primary text-primary bg-primary/5'
                                    : 'border-anthracite/20 hover:border-primary hover:text-primary'
                                    }`}
                                aria-label={language === 'tr' ? 'Ürün ara' : 'Search products'}
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {searchOpen ? 'close' : 'search'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {visibleSlabs.map((slab, index) => {
                        return (
                            <div
                                key={slab.id}
                                onClick={() => handleCardClick(slab.slug)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(slab.slug)}
                                tabIndex={0}
                                role="button"
                                aria-label={`${slab.name} - ${slab.quarry}`}
                                className={`
                                    group cursor-pointer flex flex-col gap-4 transform transition-all duration-700 ease-out
                                    ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                                `}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm product-card-image">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                                        style={{ backgroundImage: `url(${slab.image})` }}
                                    ></div>

                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>

                                    {/* Overlay Details */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="flex justify-between items-start">
                                            <span className="px-2 py-1 bg-white/90 text-anthracite text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                                {slab.id.toString().padStart(3, '0')}
                                            </span>
                                            <span className="w-10 h-10 rounded-full bg-white text-anthracite flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg" aria-hidden="true">
                                                <span className="material-symbols-outlined text-lg">arrow_outward</span>
                                            </span>
                                        </div>
                                        <div>
                                            <span className="inline-block px-3 py-1 border border-white/50 text-white text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                                                {t('common.viewDetails')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex justify-between items-end border-b border-anthracite/10 pb-4 group-hover:border-primary transition-colors duration-300">
                                    <div>
                                        <h3 className="font-serif text-2xl text-anthracite mb-1 group-hover:text-primary transition-colors">
                                            {slab.name}
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                        {categoryLabels[slab.type] || slab.type}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Load More Button */}
                {hasMoreItems && (
                    <div className="flex flex-col items-center gap-4 mt-16">
                        <p className="text-sm text-gray-500">
                            {language === 'tr'
                                ? `${visibleCount} / ${filteredSlabs.length} ürün gösteriliyor`
                                : `Showing ${visibleCount} of ${filteredSlabs.length} products`
                            }
                        </p>
                        <button
                            onClick={handleLoadMore}
                            className="group flex items-center gap-3 px-8 py-4 border border-anthracite/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-sm"
                        >
                            <span className="text-xs font-bold tracking-[0.15em] uppercase">
                                {language === 'tr' ? 'Daha Fazla Yükle' : 'Load More'}
                            </span>
                            <span className="material-symbols-outlined text-lg group-hover:translate-y-1 transition-transform" aria-hidden="true">
                                expand_more
                            </span>
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {filteredSlabs.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-gray-400 font-serif italic text-xl">{t('products.empty')}</p>
                        <button
                            onClick={() => setFilter('All')}
                            className="mt-4 text-primary text-xs font-bold uppercase tracking-widest border-b border-primary pb-1"
                        >
                            {t('products.reset')}
                        </button>
                    </div>
                )}
            </header>

            {/* Footer CTA */}
            <section className="bg-[#111] text-white py-32 px-6 text-center w-full mt-auto border-t border-white/5">
                <div className="max-w-2xl mx-auto space-y-8">
                    <span className="material-symbols-outlined text-5xl text-primary" aria-hidden="true">diamond</span>
                    <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest">{t('products.customTitle')}</h2>
                    <p className="text-white/60 font-light text-lg font-display">
                        {t('products.customDesc')}
                    </p>
                    <button
                        onClick={() => navigate(getPath(language, 'quote'))}
                        className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-primary hover:bg-primary hover:text-anthracite transition-all duration-300 uppercase tracking-widest text-xs font-bold"
                    >
                        {t('products.requestAccess')}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Products;