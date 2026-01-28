import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSlabs } from '../constants';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';
import SEO from './SEO';

interface ProductDetailProps {
    id: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const slabs = getSlabs(language);

    const slab = slabs.find(s => s.id === id);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!slab) return <div className="min-h-screen flex items-center justify-center bg-background-light text-anthracite">{t('detail.productNotFound')}</div>;

    // Mock related items based on type
    const relatedSlabs = slabs.filter(s => s.type === slab.type && s.id !== slab.id).slice(0, 3);
    // If not enough same type, fill with others
    if (relatedSlabs.length < 3) {
        const others = slabs.filter(s => s.type !== slab.type && s.id !== slab.id).slice(0, 3 - relatedSlabs.length);
        relatedSlabs.push(...others);
    }

    const handleRelatedClick = (relatedId: number) => {
        navigate(getPath(language, 'productDetail', { id: relatedId }));
    };

    const filterDescription = `${slab.name} - ${slab.type} ${t('detail.series')}. ${t('detail.description')}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": slab.name,
        "image": window.location.origin + slab.image,
        "description": filterDescription,
        "brand": {
            "@type": "Brand",
            "name": "Seemar"
        },
        "category": slab.type,
        "material": "Natural Stone",
        "countryOfOrigin": {
            "@type": "Country",
            "name": "Turkey"
        }
    };

    return (
        <div className="min-h-screen bg-white transition-colors duration-500 flex flex-col">
            <SEO
                title={slab.name}
                description={filterDescription}
                image={slab.image}
                type="product"
                jsonLd={jsonLd}
            />
            <Navbar />

            <main className="flex-grow pt-[72px]">
                {/* Breadcrumbs */}
                <div className="px-6 md:px-10 py-6 border-b border-anthracite/5">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-anthracite/50">
                        <button onClick={() => navigate(getPath(language, 'home'))} className="hover:text-primary transition-colors">{t('detail.home')}</button>
                        <span>/</span>
                        <button onClick={() => navigate(getPath(language, 'products'))} className="hover:text-primary transition-colors">{t('detail.collection')}</button>
                        <span>/</span>
                        <span className="text-primary font-bold">{slab.name}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-130px)]">
                    {/* Left Column: Visuals */}
                    <div className="lg:col-span-7 bg-[#EFEFEF] relative group overflow-hidden">
                        <div
                            className="w-full h-[50vh] lg:h-full bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-105"
                            style={{ backgroundImage: `url(${slab.image})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 lg:opacity-100 pointer-events-none"></div>


                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-5 px-6 py-12 md:px-12 md:py-20 lg:py-32 flex flex-col justify-between bg-white">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-[1px] w-8 bg-primary"></span>
                                <span className="text-primary font-display font-bold text-xs tracking-[0.25em] uppercase">{slab.type} {t('detail.series')}</span>
                            </div>

                            <h1 className="font-serif text-5xl md:text-6xl text-anthracite font-medium leading-[1.1] mb-10">
                                {slab.name}
                            </h1>

                            <div className="prose prose-sm text-anthracite/70 font-light leading-relaxed mb-12 max-w-md">
                                <p>
                                    {t('detail.description')}
                                </p>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-b border-anthracite/10 py-8 mb-12">
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{t('detail.origin')}</h4>
                                    <p className="text-anthracite font-display">{t('detail.originValue')}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{t('detail.thickness')}</h4>
                                    <p className="text-anthracite font-display">20mm / 30mm</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{t('detail.surfaceFinish')}</h4>
                                    <p className="text-anthracite font-display">{t('detail.surfaceFinishValue')}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{t('detail.application')}</h4>
                                    <p className="text-anthracite font-display">{t('detail.applicationValue')}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => navigate(getPath(language, 'contact'))}
                                    className="w-full h-14 md:h-14 flex items-center justify-center bg-anthracite text-white hover:bg-primary hover:text-white transition-all duration-300 shadow-lg rounded-sm"
                                >
                                    <span className="text-sm md:text-xs font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase">{t('common.enquire')}</span>
                                </button>
                                <button
                                    onClick={() => navigate(getPath(language, 'quote'))}
                                    className="w-full h-14 md:h-14 flex items-center justify-center border-2 border-anthracite/30 text-anthracite hover:border-primary hover:text-primary transition-all duration-300 rounded-sm"
                                >
                                    <span className="text-sm md:text-xs font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase">{t('detail.orderSample')}</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-anthracite/5">
                            <p className="text-[10px] font-mono text-anthracite/40 uppercase tracking-widest mb-4">
                                {t('detail.shippingTitle')}
                            </p>
                            <p className="text-xs text-anthracite/60 leading-relaxed">
                                {t('detail.shippingDesc')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <section className="bg-white py-24 px-6 md:px-10">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">{t('detail.youMayLike')}</span>
                                <h3 className="font-serif text-3xl md:text-4xl text-anthracite">{t('detail.similarSpecimens')}</h3>
                            </div>
                            <button
                                onClick={() => navigate(getPath(language, 'products'))}
                                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-anthracite/60 hover:text-primary transition-colors"
                            >
                                {t('detail.viewAll')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedSlabs.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleRelatedClick(item.id)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-gray-200">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-anthracite mb-1 group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h4>
                                        <p className="text-[10px] font-mono text-anthracite/50 uppercase tracking-widest">
                                            {item.type}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail;