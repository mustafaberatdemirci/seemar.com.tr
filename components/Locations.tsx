import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import SEO from './SEO';

const Locations: React.FC = () => {
    const { t, language } = useLanguage();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const locations = [
        {
            id: 'afyon',
            nameKey: 'locations.quarryName',
            typeKey: 'locations.quarryType',
            address: language === 'tr'
                ? ["İscehisar Mermer Sanayi Bölgesi", "Blok 4, Sektör A", "03750 Afyonkarahisar, Türkiye"]
                : ["Iscehisar Marble Industrial Zone", "Block 4, Sector A", "03750 Afyonkarahisar, Turkey"],
            contact: { phone: "+90 272 000 0000", email: "quarry@seemar.com" },
            hours: language === 'tr' ? "Pzt - Cmt / 07:00 - 17:00" : "Mon - Sat / 07:00 - 17:00",
            mapImage: "/images/locations/map-afyon.jpg",
            coordinates: "38.75° N, 30.54° E"
        },
        {
            id: 'konya',
            nameKey: 'locations.showroomName',
            typeKey: 'locations.showroomType',
            address: language === 'tr'
                ? ["Organize Sanayi Bölgesi", "2. Cd. No:5 Selçuklu", "42000 Konya, Türkiye"]
                : ["Organized Industrial Zone", "2. St. No:5 Selçuklu", "42000 Konya, Turkey"],
            contact: { phone: "+90 332 000 0000", email: "showroom@seemar.com" },
            hours: language === 'tr' ? "Pzt - Cum / 09:00 - 18:00" : "Mon - Fri / 09:00 - 18:00",
            mapImage: "/images/locations/map-konya.jpg",
            coordinates: "37.87° N, 32.48° E"
        },
        {
            id: 'ankara',
            nameKey: 'locations.hqName',
            typeKey: 'locations.hqType',
            address: ["Mustafa Kemal Mah. 2139. Sok.", "Ekim Plaza No:2-5", "Çankaya/Ankara"],
            contact: { phone: "+90 543 656 22 57", email: "info@seemar.com.tr" },
            hours: language === 'tr' ? "Pzt - Cum / 08:30 - 17:30" : "Mon - Fri / 08:30 - 17:30",
            mapImage: "/images/locations/map-ankara.jpg",
            coordinates: "39.92° N, 32.85° E"
        }
    ];

    // Inline style for technical grid background
    const gridStyle = {
        backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
    };

    return (
        <div className="bg-background-light min-h-screen transition-colors duration-500 flex flex-col font-display">
            <SEO
                title={t('nav.locations')}
                description={t('locations.desc')}
                image="/images/locations/map-afyon.jpg"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Seemar",
                    "department": locations.map(loc => ({
                        "@type": "LocalBusiness",
                        "name": t(loc.nameKey),
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": loc.address.join(', '),
                            "addressCountry": "Turkey"
                        },
                        "telephone": loc.contact.phone,
                        "openingHours": loc.hours
                    }))
                }}
            />
            <Navbar />

            <main className="flex-grow pt-[72px]">
                {/* Hero Section */}
                <section className="relative w-full px-6 lg:px-12 py-20 lg:py-32 border-b border-anthracite/5 bg-background-light">
                    <div className="absolute inset-0 pointer-events-none opacity-100" style={gridStyle}></div>
                    <div className="max-w-[1440px] mx-auto relative z-10">
                        <div className="flex flex-col gap-6 max-w-4xl">
                            <span className="text-primary text-xs font-mono tracking-[0.2em] uppercase mb-2 block animate-pulse">
                                {t('locations.systemActive')}
                            </span>
                            <h1 className="font-serif text-5xl md:text-7xl text-anthracite font-black leading-[0.9] tracking-[-0.03em] uppercase">
                                {t('locations.title')}
                            </h1>
                            <p className="text-anthracite/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl border-l-2 border-primary pl-6 mt-4 font-display">
                                {t('locations.desc')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Locations List */}
                <section className="w-full bg-background-light">
                    {locations.map((loc) => (
                        <div key={loc.id} className="group border-b border-anthracite/5 hover:bg-white transition-colors duration-500">
                            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                    {/* Location Header */}
                                    <div className="lg:col-span-4 flex flex-col gap-2">
                                        <h2 className="font-serif text-anthracite text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-none group-hover:text-primary transition-colors duration-300">
                                            {t(loc.nameKey).split(' ').map((word, i) => (
                                                <React.Fragment key={i}>
                                                    {word}<br />
                                                </React.Fragment>
                                            ))}
                                        </h2>
                                        <span className="inline-block mt-4 px-3 py-1 bg-anthracite/5 text-anthracite text-xs font-mono uppercase tracking-wider w-fit rounded-sm">
                                            {t(loc.typeKey)}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="lg:col-span-4 flex flex-col gap-8 pt-2">
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-anthracite/40">{t('locations.address')}</h3>
                                            <p className="text-anthracite text-base font-normal leading-relaxed">
                                                {loc.address.map((line, i) => (
                                                    <span key={i} className="block">{line}</span>
                                                ))}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-anthracite/40">{t('locations.contact')}</h3>
                                            <div className="flex flex-col gap-1 text-base text-anthracite">
                                                <a className="hover:text-primary transition-colors" href={`tel:${loc.contact.phone}`}>{loc.contact.phone}</a>
                                                <a className="hover:text-primary transition-colors" href={`mailto:${loc.contact.email}`}>{loc.contact.email}</a>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-anthracite/40">{t('locations.hours')}</h3>
                                            <p className="text-base text-anthracite">{loc.hours}</p>
                                        </div>
                                        <button className="group/btn inline-flex items-center gap-3 border border-anthracite/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-anthracite rounded-sm transition-all duration-300 hover:border-primary hover:text-primary mt-4 w-fit bg-transparent">
                                            <span>{t('locations.getDirections')}</span>
                                            <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                        </button>
                                    </div>

                                    {/* Map Visual */}
                                    <div className="lg:col-span-4 relative h-64 lg:h-auto lg:aspect-square bg-gray-100 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500 border border-anthracite/5">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-multiply transition-all duration-500"
                                            style={{ backgroundImage: `url('${loc.mapImage}')` }}
                                        ></div>

                                        {/* Map Interface Overlay */}
                                        <div className="absolute inset-0 border border-black/10 m-4 pointer-events-none flex items-center justify-center">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <div className="relative flex items-center justify-center">
                                                    <div className="absolute size-12 bg-primary/20 rounded-full animate-ping"></div>
                                                    <div className="relative size-3 bg-primary rounded-full shadow-lg border border-white"></div>
                                                </div>
                                            </div>

                                            {/* Crosshairs */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-anthracite/50"></div>
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-anthracite/50"></div>
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-4 bg-anthracite/50"></div>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-4 bg-anthracite/50"></div>

                                            {/* Coordinates */}
                                            <div className="absolute bottom-2 right-2 text-[8px] font-mono text-anthracite/60">
                                                {loc.coordinates}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Locations;