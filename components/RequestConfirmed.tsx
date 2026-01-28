import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

const RequestConfirmed: React.FC = () => {
    const { language } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const content = {
        tr: {
            title: 'Talebiniz Alındı',
            description: 'İlginiz için teşekkür ederiz. Bilgileriniz ekibimize güvenli bir şekilde iletildi. Başvurunuzu inceleyip 48 saat içinde sizinle iletişime geçeceğiz.',
            returnHome: 'Ana Sayfaya Dön',
            browseCollection: 'Koleksiyonu İncele'
        },
        en: {
            title: 'Request Received',
            description: 'Thank you for your interest. Your information has been securely transmitted to our team. We will review your submission and contact you within 48 hours.',
            returnHome: 'Return Home',
            browseCollection: 'Browse Collection'
        }
    };

    const t = content[language];
    const homePath = language === 'tr' ? '/tr' : '/en';
    const productsPath = language === 'tr' ? '/tr/urunler' : '/en/products';

    return (
        <div className="bg-background-light min-h-screen transition-colors duration-500 flex flex-col font-display text-anthracite">
            <Navbar />

            <main className="flex-grow pt-[72px] flex items-center justify-center min-h-[80vh]">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                        <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white shadow-xl">
                            <span className="material-symbols-outlined text-5xl">check</span>
                        </div>
                    </div>

                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-anthracite uppercase tracking-wide">
                        {t.title}
                    </h1>

                    <p className="text-lg md:text-xl text-anthracite/60 font-light leading-relaxed mb-10">
                        {t.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to={homePath}
                            className="px-8 py-4 bg-anthracite text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                        >
                            {t.returnHome}
                        </Link>
                        <Link
                            to={productsPath}
                            className="px-8 py-4 border border-anthracite/20 text-anthracite text-xs font-bold uppercase tracking-widest rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
                        >
                            {t.browseCollection}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RequestConfirmed;