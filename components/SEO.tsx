import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from './LanguageContext';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    jsonLd?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = '/images/hero/marble-closeup.jpg',
    url,
    type = 'website',
    jsonLd
}) => {
    const { language } = useLanguage();
    const location = useLocation();

    const baseUrl = 'https://www.seemar.com.tr';
    const siteTitle = 'Seemar - Digital Lapidarium';
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const currentUrl = url || `${baseUrl}${location.pathname}`;

    // Bilingual default descriptions
    const defaultDescriptions = {
        tr: 'Seemar Digital Lapidarium - Premium mermer ve doğal taş koleksiyonumuzu keşfedin. 3D showroom ile ürünlerimizi inceleyin.',
        en: 'Seemar Digital Lapidarium - Discover our exclusive collection of premium marble and natural stones. View our interactive 3D showroom.'
    };

    const defaultKeywords = {
        tr: 'mermer, doğal taş, seemar, traverten, oniks, kalker, granit, afyon beyaz, türk mermeri',
        en: 'marble, natural stone, seemar, travertine, onyx, limestone, granite, afyon white, turkish marble'
    };

    const metaDescription = description || defaultDescriptions[language];
    const metaKeywords = keywords || defaultKeywords[language];

    // Generate hreflang alternate URLs
    const getAlternateUrl = (lang: 'tr' | 'en') => {
        const path = location.pathname;
        if (lang === 'tr') {
            return path.startsWith('/en')
                ? `${baseUrl}${path.replace('/en', '/tr')
                    .replace('/products', '/urunler')
                    .replace('/about', '/hakkimizda')
                    .replace('/contact', '/iletisim')
                    .replace('/quote', '/teklif')
                    .replace('/projects', '/projeler')
                    .replace('/locations', '/lokasyonlar')
                    .replace('/careers', '/kariyer')
                    .replace('/catalog', '/katalog')
                    .replace('/privacy-policy', '/gizlilik-politikasi')
                    .replace('/terms-of-use', '/kullanim-kosullari')}`
                : `${baseUrl}${path}`;
        } else {
            return path.startsWith('/tr')
                ? `${baseUrl}${path.replace('/tr', '/en')
                    .replace('/urunler', '/products')
                    .replace('/hakkimizda', '/about')
                    .replace('/iletisim', '/contact')
                    .replace('/teklif', '/quote')
                    .replace('/projeler', '/projects')
                    .replace('/lokasyonlar', '/locations')
                    .replace('/kariyer', '/careers')
                    .replace('/katalog', '/catalog')
                    .replace('/gizlilik-politikasi', '/privacy-policy')
                    .replace('/kullanim-kosullari', '/terms-of-use')}`
                : `${baseUrl}${path}`;
        }
    };

    const trUrl = getAlternateUrl('tr');
    const enUrl = getAlternateUrl('en');

    // Generate full image URL
    const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={metaDescription} data-rh="true" />
            <meta name="keywords" content={metaKeywords} data-rh="true" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" data-rh="true" />
            <html lang={language} />

            {/* Canonical & Hreflang */}
            <link rel="canonical" href={currentUrl} />
            <link rel="alternate" hrefLang="tr" href={trUrl} />
            <link rel="alternate" hrefLang="en" href={enUrl} />
            <link rel="alternate" hrefLang="x-default" href={enUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:site_name" content="Seemar" />
            <meta property="og:locale" content={language === 'tr' ? 'tr_TR' : 'en_US'} />
            <meta property="og:locale:alternate" content={language === 'tr' ? 'en_US' : 'tr_TR'} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={fullImageUrl} />

            {/* JSON-LD Structured Data */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
