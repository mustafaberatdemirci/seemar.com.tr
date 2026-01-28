import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { getPath } from '../routes';

const Catalog: React.FC = () => {
    const [centerIndex, setCenterIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    const categories = [
        { id: 'marble', name: t('cat.marble'), image: '/images/products/101.webp', textColor: '#ffffff' },
        { id: 'travertine', name: t('cat.travertine'), image: '/images/products/201.webp', textColor: '#e2dcc8' },
        { id: 'onyx', name: t('cat.onyx'), image: '/images/products/301.webp', textColor: '#eebb56' },
        { id: 'limestone', name: t('cat.limestone'), image: '/images/products/401.webp', textColor: '#dcc8b3' },
        { id: 'granite', name: t('cat.granite'), image: '/images/products/501.webp', textColor: '#9ca3af' },
        { id: 'dolomite', name: t('cat.dolomite'), image: '/images/products/601.webp', textColor: '#f3f4f6' },
        { id: 'tumbled', name: t('cat.tumbled'), image: '/images/products/801.webp', textColor: '#d97706' },
        { id: 'sand', name: t('cat.sand'), image: '/images/products/901.webp', textColor: '#fde047' },
    ];

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll to card when centerIndex changes (for mobile)
    useEffect(() => {
        if (isMobile && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.scrollWidth / categories.length;
            const scrollPosition = cardWidth * centerIndex - (container.clientWidth - cardWidth) / 2;
            container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }, [centerIndex, isMobile, categories.length]);

    const handleNext = () => {
        setCenterIndex((prev) => (prev + 1) % categories.length);
    };

    const handlePrev = () => {
        setCenterIndex((prev) => (prev - 1 + categories.length) % categories.length);
    };

    const handleCardClick = (index: number, e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();

        let offset = index - centerIndex;
        if (offset > categories.length / 2) offset -= categories.length;
        if (offset < -categories.length / 2) offset += categories.length;

        if (offset === 0) {
            // Center card - navigate to products
            const productsPath = getPath(language, 'products');
            navigate(`${productsPath}?category=${categories[index].id}`);
            return;
        }

        // Side card - move to center
        setCenterIndex(index);
    };

    // Desktop touch handlers only
    const onTouchStart = (e: React.TouchEvent) => {
        if (isMobile) return; // Disable on mobile - let native scroll handle it
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (isMobile) return; // Disable on mobile - let native scroll handle it
        if (touchStartX.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const distance = touchStartX.current - touchEndX;

        if (Math.abs(distance) > 50) {
            if (distance > 0) handleNext();
            else handlePrev();
        }
        touchStartX.current = null;
    };

    // Mobile scroll handler - sync centerIndex with actual scroll position
    const handleScroll = () => {
        if (!isMobile || !scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardWidth = container.scrollWidth / categories.length;
        const scrollCenter = container.scrollLeft + container.clientWidth / 2;
        const newIndex = Math.round((scrollCenter - cardWidth / 2) / cardWidth);
        const clampedIndex = Math.max(0, Math.min(categories.length - 1, newIndex));
        if (clampedIndex !== centerIndex) {
            setCenterIndex(clampedIndex);
        }
    };

    const getDesktopStyle = (index: number) => {
        let offset = index - centerIndex;
        if (offset > categories.length / 2) offset -= categories.length;
        if (offset < -categories.length / 2) offset += categories.length;

        // Calculate actual left position based on offset
        // Center card is at 50%, others are offset from center
        let leftPosition = '50%';
        let transform = 'translateX(-50%) translateY(-50%)';
        let zIndex = 0;
        let opacity = 1;
        let filter = '';
        let display = 'block';
        let scale = 1;

        if (offset === 0) {
            // Center card
            leftPosition = '50%';
            transform = 'translateX(-50%) translateY(-50%) scale(1.15)';
            zIndex = 50;
            filter = 'brightness(1.05)';
        } else if (offset === -1) {
            // Left neighbor
            leftPosition = 'calc(50% - 280px)';
            transform = 'translateX(-50%) translateY(-50%) rotateY(30deg) scale(0.9)';
            zIndex = 40;
            filter = 'brightness(0.5) contrast(0.9)';
        } else if (offset === 1) {
            // Right neighbor
            leftPosition = 'calc(50% + 280px)';
            transform = 'translateX(-50%) translateY(-50%) rotateY(-30deg) scale(0.9)';
            zIndex = 40;
            filter = 'brightness(0.5) contrast(0.9)';
        } else if (offset === -2) {
            // Far left
            leftPosition = 'calc(50% - 500px)';
            transform = 'translateX(-50%) translateY(-50%) rotateY(45deg) scale(0.8)';
            zIndex = 30;
            filter = 'brightness(0.3) blur(1px)';
            opacity = 0.8;
        } else if (offset === 2) {
            // Far right
            leftPosition = 'calc(50% + 500px)';
            transform = 'translateX(-50%) translateY(-50%) rotateY(-45deg) scale(0.8)';
            zIndex = 30;
            filter = 'brightness(0.3) blur(1px)';
            opacity = 0.8;
        } else {
            display = 'none';
        }

        const baseStyle: React.CSSProperties = {
            position: 'absolute',
            left: leftPosition,
            top: '50%',
            transform: transform,
            transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: zIndex,
            opacity: opacity,
            filter: filter,
            display: display,
        };

        return baseStyle;
    };

    return (
        <section className="w-full bg-[#110f0c] py-10 md:py-12 relative overflow-hidden h-auto md:h-[900px]" aria-label={t('products.collection')}>
            {/* Dark Ambient Background */}
            <div className="absolute inset-0 bg-radial-gradient from-[#2a261e] to-[#0a0907] opacity-60 pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-10 relative z-10 h-full flex flex-col justify-between">
                <div className="mb-12 md:mb-0 flex justify-center text-center relative z-40">
                    <h3
                        className="font-serif text-xs md:text-sm tracking-[0.3em] uppercase border-b pb-4 transition-colors duration-700"
                        style={{
                            color: categories[centerIndex].textColor,
                            borderColor: `${categories[centerIndex].textColor}40`
                        }}
                    >
                        {t('products.collection')}
                    </h3>
                </div>

                {/* 3D Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    className={`relative w-full flex-grow ${isMobile ? 'flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 py-8 no-scrollbar' : 'perspective-1000'}`}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onScroll={handleScroll}
                >
                    {categories.map((category, index) => {
                        const desktopStyle = getDesktopStyle(index);
                        const style = isMobile ? {} : desktopStyle;

                        let offset = index - centerIndex;
                        if (offset > categories.length / 2) offset -= categories.length;
                        if (offset < -categories.length / 2) offset += categories.length;
                        const isActive = offset === 0;

                        return (
                            <div
                                key={category.id}
                                onClick={(e) => handleCardClick(index, e)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(index, e)}
                                tabIndex={0}
                                role="button"
                                aria-label={`${category.name} - ${isActive ? t('catalog.curated') : ''}`}
                                className={`
                                    transition-all duration-500
                                    ${isMobile
                                        ? 'relative flex-shrink-0 w-[80vw] snap-center'
                                        : 'group select-none w-[280px] md:w-[320px]'
                                    }
                                `}
                                style={style}
                            >
                                <div className={`relative aspect-[3/4] overflow-hidden bg-[#1a1a1a] shadow-2xl rounded-2xl ${isActive ? 'ring-1 ring-white/10' : ''}`}>
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-700"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    ></div>
                                    <div className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-0' : 'opacity-20'}`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Controls */}
                <div className="flex flex-col items-center gap-6 mt-20 md:mt-16 relative z-20">
                    {/* Centered Category Title */}
                    <div className="text-center">
                        <h4 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-widest uppercase mb-3 drop-shadow-xl">
                            {categories[centerIndex].name}
                        </h4>
                        <p className="text-primary font-display text-xs font-bold tracking-[0.3em] uppercase">
                            {t('catalog.curated')}
                        </p>
                    </div>

                    {/* Arrow buttons */}
                    <div className="flex items-center gap-12 md:gap-20">
                        <button
                            onClick={handlePrev}
                            type="button"
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm group"
                            aria-label={language === 'tr' ? 'Önceki kategori' : 'Previous category'}
                        >
                            <span className="material-symbols-outlined text-2xl md:text-3xl group-hover:-translate-x-1 transition-transform" aria-hidden="true">arrow_back</span>
                        </button>
                        <div className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-light hidden md:block" aria-hidden="true">{t('catalog.scroll')}</div>
                        <button
                            onClick={handleNext}
                            type="button"
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm group"
                            aria-label={language === 'tr' ? 'Sonraki kategori' : 'Next category'}
                        >
                            <span className="material-symbols-outlined text-2xl md:text-3xl group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Catalog;