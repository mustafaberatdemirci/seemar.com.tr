import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import SEO from './SEO';

const Contact: React.FC = () => {
    const { t, language } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Check form validity
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission (will be replaced with actual API call later)
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    // Common input classes with validation states
    const inputBaseClass = "w-full border-b border-anthracite/20 bg-transparent py-3 text-xl font-light focus:border-primary focus:outline-none placeholder-anthracite/30 transition-colors invalid:border-red-500 invalid:text-red-500";

    return (
        <div className="bg-background-light min-h-screen transition-colors duration-500 flex flex-col font-display text-anthracite">
            <SEO
                title={t('nav.contact')}
                description={t('contact.heroDesc')}
                image="/images/contact/map-overlay.jpg"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Seemar",
                        "telephone": "+90-272-213-2600",
                        "email": "info@seemar.com.tr",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Organize Sanayi Bölgesi",
                            "addressLocality": "Afyonkarahisar",
                            "postalCode": "03200",
                            "addressCountry": "TR"
                        }
                    }
                }}
            />
            <Navbar />

            <main className="flex-grow pt-[72px]">
                {/* Hero */}
                <section className="relative px-6 lg:px-12 pt-12 pb-12 lg:pt-24 lg:pb-24 flex flex-col lg:flex-row gap-12 items-start justify-between max-w-[1440px] mx-auto">
                    <div className="max-w-3xl z-10">
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8">
                            {t('contact.heroTitle1')} <br />
                            <span className="text-primary italic">{t('contact.heroTitle2')}</span>
                        </h1>
                        <p className="opacity-80 text-lg md:text-xl font-light max-w-xl leading-relaxed">
                            {t('contact.heroDesc')}
                        </p>
                    </div>
                    {/* Abstract Image */}
                    <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none hidden lg:block overflow-hidden">
                        <img
                            className="w-full h-full object-cover mix-blend-multiply filter contrast-125"
                            src="/images/contact/abstract-hero.jpg"
                            alt="Abstract Texture"
                        />
                    </div>
                </section>

                {/* Content Grid */}
                <section className="px-6 lg:px-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative max-w-[1440px] mx-auto">
                    {/* Form */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        {/* Success Message */}
                        {isSuccess && (
                            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-sm">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-green-600">check_circle</span>
                                    <p className="text-green-800 font-medium">
                                        {language === 'tr' ? 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.' : 'Your message has been sent successfully. We will get back to you soon.'}
                                    </p>
                                </div>
                            </div>
                        )}

                        <form className="flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-focus-within:text-primary transition-colors">
                                        {t('contact.firstName')} <span className="text-red-500">*</span>
                                    </span>
                                    <input
                                        className={inputBaseClass}
                                        placeholder={t('contact.firstNamePlaceholder')}
                                        type="text"
                                        name="firstName"
                                        required
                                        minLength={2}
                                    />
                                </label>
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-focus-within:text-primary transition-colors">
                                        {t('contact.lastName')} <span className="text-red-500">*</span>
                                    </span>
                                    <input
                                        className={inputBaseClass}
                                        placeholder={t('contact.lastNamePlaceholder')}
                                        type="text"
                                        name="lastName"
                                        required
                                        minLength={2}
                                    />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-focus-within:text-primary transition-colors">
                                        {t('contact.email')} <span className="text-red-500">*</span>
                                    </span>
                                    <input
                                        className={inputBaseClass}
                                        placeholder="email@sirket.com"
                                        type="email"
                                        name="email"
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-2 group">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-focus-within:text-primary transition-colors">
                                        {t('contact.phone')} <span className="text-red-500">*</span>
                                    </span>
                                    <input
                                        className={inputBaseClass}
                                        placeholder="+90 (5XX) XXX XXXX"
                                        type="tel"
                                        name="phone"
                                        required
                                        pattern="[0-9+\s()-]{7,20}"
                                        title={language === 'tr' ? 'Geçerli bir telefon numarası girin' : 'Enter a valid phone number'}
                                    />
                                </label>
                            </div>
                            <label className="flex flex-col gap-2 group mt-4">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-focus-within:text-primary transition-colors">
                                    {t('contact.inquiryType')} <span className="text-red-500">*</span>
                                </span>
                                <select
                                    className="w-full border-b border-anthracite/20 bg-transparent py-3 text-xl font-light focus:border-primary focus:outline-none transition-colors cursor-pointer text-anthracite invalid:border-red-500"
                                    name="inquiryType"
                                    required
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-gray-400">{t('contact.selectOption')}</option>
                                    <option value="architectural">{t('contact.optionArch')}</option>
                                    <option value="residential">{t('contact.optionRes')}</option>
                                    <option value="commercial">{t('contact.optionComm')}</option>
                                    <option value="quarry">{t('contact.optionQuarry')}</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 group mt-4">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-focus-within:text-primary transition-colors">
                                    {t('contact.message')} <span className="text-red-500">*</span>
                                </span>
                                <textarea
                                    className="w-full border-b border-anthracite/20 bg-transparent py-3 text-xl font-light focus:border-primary focus:outline-none placeholder-anthracite/30 transition-colors resize-none invalid:border-red-500"
                                    placeholder={t('contact.messagePlaceholder')}
                                    rows={4}
                                    name="message"
                                    required
                                    minLength={10}
                                ></textarea>
                            </label>
                            <div className="pt-8">
                                <button
                                    className="group relative flex items-center gap-4 w-full md:w-auto overflow-hidden px-10 py-5 border border-primary bg-transparent transition-all duration-300 hover:bg-anthracite hover:border-anthracite disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                                        {isSubmitting ? (language === 'tr' ? 'Gönderiliyor...' : 'Sending...') : t('contact.submit')}
                                    </span>
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin relative z-10"></div>
                                    ) : (
                                        <span className="material-symbols-outlined relative z-10 text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-12 border-l-0 lg:border-l border-anthracite/10">
                        <div className="flex flex-col gap-8 lg:sticky lg:top-32">
                            <div>
                                <h3 className="font-serif text-3xl mb-6">{t('contact.headquarters')}</h3>
                                <p className="font-light leading-relaxed mb-2 opacity-80">
                                    Mustafa Kemal Mah. 2139. Sok.<br />
                                    Ekim Plaza No:2-5<br />
                                    Çankaya/Ankara
                                </p>
                                <a href="tel:+905436562257" className="block text-primary hover:opacity-80 transition-opacity mt-2 text-sm font-medium tracking-wide">+90 543 656 22 57</a>
                                <a href="mailto:info@seemar.com.tr" className="block text-primary hover:opacity-80 transition-opacity mt-1 text-sm font-medium tracking-wide">info@seemar.com.tr</a>
                            </div>

                            {/* Quarry Map - Compact Version */}
                            <div className="relative h-48 bg-stone-200 overflow-hidden rounded-sm group">
                                <img
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                    src="/images/contact/map-overlay.jpg"
                                    alt="Quarry Location"
                                />
                                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                    <div className="bg-white/90 backdrop-blur px-4 py-3 border border-anthracite/10 shadow-sm">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-anthracite">{t('contact.quarryLocation')}</span>
                                        </div>
                                        <p className="text-xs opacity-70">
                                            38.75° N, 30.54° E<br />
                                            {t('contact.activeExtraction')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default Contact;