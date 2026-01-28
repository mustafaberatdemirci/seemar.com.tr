import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import { useNavigate } from 'react-router-dom';

const RequestQuote: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [stoneTypes, setStoneTypes] = useState<string[]>(['marble']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const toggleStoneType = (type: string) => {
        setStoneTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Check form validity
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Check if at least one stone type is selected
        if (stoneTypes.length === 0) {
            setErrors({ stoneTypes: true });
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission (will be replaced with actual API call later)
        setTimeout(() => {
            setIsSubmitting(false);
            // Navigate to confirmation page
            navigate(language === 'tr' ? '/tr/teklif/onaylandi' : '/en/quote/confirmed');
        }, 1500);
    };

    // Common input classes with validation states
    const inputBaseClass = "w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 focus:ring-0 focus:outline-none focus:border-primary placeholder-anthracite/30 transition-colors text-lg font-light rounded-none invalid:border-red-500 invalid:text-red-500";

    return (
        <div className="bg-background-light min-h-screen transition-colors duration-500 flex flex-col font-display text-anthracite">
            <Navbar />

            <main className="flex-grow pt-[72px] pb-16 lg:pb-24 px-6 lg:px-12">
                <div className="max-w-[1440px] mx-auto mt-12 lg:mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
                            <div className="relative w-full aspect-[3/4] overflow-hidden group rounded-sm">
                                <img
                                    alt="Close up texture of luxurious beige marble slab"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                                    src="/images/products/121.webp"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-white w-full border-t border-white/20 backdrop-blur-sm bg-black/20">
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-primary">{t('quote.fromQuarry')}</p>
                                    <h2 className="font-serif text-3xl lg:text-4xl leading-tight text-white">{t('quote.rawMaterial')}<br />{t('quote.refinedElegance')}</h2>
                                </div>
                            </div>
                            <div className="border-l-2 border-primary pl-8 py-2">
                                <div className="flex items-start space-x-4 mb-4">
                                    <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl text-anthracite mb-2">{t('quote.needAssistance')}</h3>
                                    <p className="text-sm text-anthracite/60 leading-relaxed mb-4 font-light font-display">
                                        {t('quote.assistanceDesc')}
                                    </p>
                                    <a className="text-lg font-serif italic text-anthracite hover:text-primary transition-colors border-b border-primary/30 hover:border-primary pb-1" href="tel:+902722132600">
                                        +90 (272) 213 26 00
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Form */}
                        <section className="lg:col-span-8">
                            <div className="mb-16 border-b border-anthracite/10 pb-12">
                                <p className="text-xs font-bold tracking-[0.2em] uppercase text-anthracite/40 mb-4">{t('quote.collection')}</p>
                                <h1 className="font-serif text-5xl lg:text-6xl text-anthracite mb-6 leading-tight uppercase tracking-widest">
                                    {t('quote.title').split(' ').slice(0, -1).join(' ')} <br /><span className="text-primary italic">{t('quote.title').split(' ').slice(-1)}</span>
                                </h1>
                                <p className="text-lg text-anthracite/70 font-light leading-relaxed max-w-2xl font-display">
                                    {t('quote.desc')}
                                </p>
                            </div>

                            <form className="space-y-16" onSubmit={handleSubmit} noValidate>
                                {/* Step 1 - Contact Information */}
                                <div className="group">
                                    <div className="flex items-baseline space-x-4 mb-8 border-b border-anthracite/10 pb-4">
                                        <span className="font-serif text-4xl text-anthracite/20 group-hover:text-primary transition-colors duration-500">01</span>
                                        <h3 className="font-serif text-2xl tracking-wide uppercase text-anthracite">{t('quote.step1')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">
                                                {t('quote.fullName')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className={inputBaseClass}
                                                placeholder={t('quote.fullNamePlaceholder')}
                                                type="text"
                                                name="fullName"
                                                required
                                                minLength={2}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.companyName')}</label>
                                            <input
                                                className={inputBaseClass}
                                                placeholder={t('quote.companyPlaceholder')}
                                                type="text"
                                                name="company"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">
                                                {t('quote.email')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className={inputBaseClass}
                                                placeholder="email@sirket.com"
                                                type="email"
                                                name="email"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">
                                                {t('quote.phone')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                className={inputBaseClass}
                                                placeholder="+90 (5XX) XXX XXXX"
                                                type="tel"
                                                name="phone"
                                                required
                                                pattern="[0-9+\s()-]{7,20}"
                                                title={language === 'tr' ? 'Geçerli bir telefon numarası girin' : 'Enter a valid phone number'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 - Project Details */}
                                <div className="group">
                                    <div className="flex items-baseline space-x-4 mb-8 border-b border-anthracite/10 pb-4">
                                        <span className="font-serif text-4xl text-anthracite/20 group-hover:text-primary transition-colors duration-500">02</span>
                                        <h3 className="font-serif text-2xl tracking-wide uppercase text-anthracite">{t('quote.step2')}</h3>
                                    </div>
                                    <div className="space-y-10">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60 mb-2">
                                                {t('quote.stoneTypes')} <span className="text-red-500">*</span>
                                            </label>
                                            {errors.stoneTypes && (
                                                <p className="text-red-500 text-sm mb-4">{language === 'tr' ? 'En az bir taş türü seçin' : 'Select at least one stone type'}</p>
                                            )}
                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                                {[
                                                    { id: 'marble', image: '/images/products/101.webp' },
                                                    { id: 'travertine', image: '/images/products/201.webp' },
                                                    { id: 'onyx', image: '/images/products/301.webp' },
                                                    { id: 'limestone', image: '/images/products/401.webp' },
                                                    { id: 'granite', image: '/images/products/501.webp' },
                                                    { id: 'dolomite', image: '/images/products/601.webp' },
                                                    { id: 'mosaic', image: '/images/products/701.webp' },
                                                    { id: 'splitface', image: '/images/products/1001.webp' },
                                                    { id: 'tumbled', image: '/images/products/801.webp' },
                                                    { id: 'sand', image: '/images/products/901.webp' }
                                                ].map((type) => (
                                                    <div
                                                        key={type.id}
                                                        onClick={() => {
                                                            toggleStoneType(type.id);
                                                            setErrors({ ...errors, stoneTypes: false });
                                                        }}
                                                        className={`cursor-pointer flex flex-col items-center justify-center p-3 border transition-all h-36 overflow-hidden relative ${stoneTypes.includes(type.id) ? 'border-primary ring-2 ring-primary/30' : errors.stoneTypes ? 'border-red-500' : 'border-anthracite/20 hover:border-primary/50'}`}
                                                    >
                                                        <img
                                                            src={type.image}
                                                            alt={t(`cat.${type.id}`)}
                                                            className={`w-full h-20 object-cover mb-2 transition-all ${stoneTypes.includes(type.id) ? 'opacity-100 scale-105' : 'opacity-60 grayscale'}`}
                                                        />
                                                        <span className={`text-[10px] font-bold uppercase tracking-wider text-center ${stoneTypes.includes(type.id) ? 'text-primary' : 'text-anthracite/60'}`}>
                                                            {t(`cat.${type.id}`)}
                                                        </span>
                                                        {stoneTypes.includes(type.id) && (
                                                            <span className="absolute top-1.5 right-1.5 material-symbols-outlined text-primary text-base">check_circle</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                            <div className="space-y-2">
                                                <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.projectScope')}</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 pr-8 focus:ring-0 focus:outline-none focus:border-primary cursor-pointer text-lg font-light rounded-none"
                                                        style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                                                        name="projectScope"
                                                    >
                                                        <option>{t('quote.scopeResidential')}</option>
                                                        <option>{t('quote.scopeCommercial')}</option>
                                                        <option>{t('quote.scopeHospitality')}</option>
                                                        <option>{t('quote.scopeMultiUnit')}</option>
                                                        <option>{t('quote.scopeOther')}</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-anthracite">
                                                        <span className="material-symbols-outlined">expand_more</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.approxArea')}</label>
                                                <input
                                                    className={inputBaseClass}
                                                    placeholder={t('quote.areaPlaceholder')}
                                                    type="text"
                                                    name="area"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.timeline')}</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 pr-8 focus:ring-0 focus:outline-none focus:border-primary cursor-pointer text-lg font-light rounded-none"
                                                        style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                                                        name="timeline"
                                                    >
                                                        <option>{t('quote.timelineImmediate')}</option>
                                                        <option>{t('quote.timeline1to3')}</option>
                                                        <option>{t('quote.timeline3to6')}</option>
                                                        <option>{t('quote.timeline6to12')}</option>
                                                        <option>{t('quote.timeline12plus')}</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-anthracite">
                                                        <span className="material-symbols-outlined">expand_more</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.budget')} <span className="normal-case opacity-50 ml-1">{t('quote.budgetOptional')}</span></label>
                                                <input
                                                    className={inputBaseClass}
                                                    placeholder="TRY / USD / EUR"
                                                    type="text"
                                                    name="budget"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 - Project Location */}
                                <div className="group">
                                    <div className="flex items-baseline space-x-4 mb-8 border-b border-anthracite/10 pb-4">
                                        <span className="font-serif text-4xl text-anthracite/20 group-hover:text-primary transition-colors duration-500">03</span>
                                        <h3 className="font-serif text-2xl tracking-wide uppercase text-anthracite">{t('quote.step3')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.streetAddress')}</label>
                                            <input
                                                className={inputBaseClass}
                                                placeholder={t('quote.streetPlaceholder')}
                                                type="text"
                                                name="address"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.city')}</label>
                                            <input
                                                className={inputBaseClass}
                                                placeholder={t('quote.city')}
                                                type="text"
                                                name="city"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.stateProvince')}</label>
                                            <input
                                                className={inputBaseClass}
                                                placeholder={t('quote.stateProvince')}
                                                type="text"
                                                name="state"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.postalCode')}</label>
                                            <input
                                                className={inputBaseClass}
                                                placeholder={t('quote.postalCode')}
                                                type="text"
                                                name="postalCode"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('quote.country')}</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 pr-8 focus:ring-0 focus:outline-none focus:border-primary cursor-pointer text-lg font-light rounded-none"
                                                    style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                                                    name="country"
                                                >
                                                    <option>Türkiye</option>
                                                    <option>{language === 'tr' ? 'Amerika Birleşik Devletleri' : 'United States'}</option>
                                                    <option>{language === 'tr' ? 'Kanada' : 'Canada'}</option>
                                                    <option>{language === 'tr' ? 'İngiltere' : 'United Kingdom'}</option>
                                                    <option>{language === 'tr' ? 'İtalya' : 'Italy'}</option>
                                                    <option>{language === 'tr' ? 'Fransa' : 'France'}</option>
                                                    <option>{t('quote.scopeOther')}</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-anthracite">
                                                    <span className="material-symbols-outlined">expand_more</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 - Additional Notes */}
                                <div className="group">
                                    <div className="flex items-baseline space-x-4 mb-8 border-b border-anthracite/10 pb-4">
                                        <span className="font-serif text-4xl text-anthracite/20 group-hover:text-primary transition-colors duration-500">04</span>
                                        <h3 className="font-serif text-2xl tracking-wide uppercase text-anthracite">{t('quote.step4')}</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60 mb-2">{t('quote.projectRequirements')}</label>
                                        <textarea
                                            className="w-full bg-[#F5F5F5] border border-anthracite/10 text-anthracite px-6 py-6 focus:ring-1 focus:ring-primary focus:outline-none placeholder-anthracite/30 transition-shadow resize-y text-lg font-light rounded-none"
                                            placeholder={t('quote.requirementsPlaceholder')}
                                            rows={5}
                                            name="requirements"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-12">
                                    <button
                                        className="group relative w-full bg-transparent border border-primary text-anthracite font-serif font-bold text-xl py-6 px-12 transition-all hover:bg-primary hover:text-white flex items-center justify-between overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        <span className="relative z-10 tracking-widest uppercase">
                                            {isSubmitting ? (language === 'tr' ? 'Gönderiliyor...' : 'Submitting...') : t('quote.submit')}
                                        </span>
                                        {isSubmitting ? (
                                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin relative z-10"></div>
                                        ) : (
                                            <span className="material-symbols-outlined relative z-10 transform group-hover:translate-x-2 transition-transform duration-300 text-3xl">arrow_right_alt</span>
                                        )}
                                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                                    </button>
                                    <p className="text-xs text-center text-anthracite/50 mt-6 uppercase tracking-wider">
                                        {t('quote.termsText')}
                                    </p>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RequestQuote;