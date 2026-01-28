import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from './LanguageContext';

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
    image = '/images/hero/marble-closeup.jpg', // Default image
    url,
    type = 'website',
    jsonLd
}) => {
    const { language } = useLanguage();

    const siteTitle = 'Seemar - Digital Lapidarium';
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const currentUrl = url || window.location.href;
    const metaDescription = description || 'Seemar Digital Lapidarium - Discover our exclusive collection of premium marble and natural stones. View our interactive 3D showroom and explore our global locations.';
    const metaKeywords = keywords || 'marble, natural stone, seemar, lapidarium, showroom, 3d showroom, turkey marble, afyon white, black silk';

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={metaDescription} data-rh="true" />
            <meta name="keywords" content={metaKeywords} data-rh="true" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" data-rh="true" />
            <html lang={language} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Seemar" />
            <meta property="og:locale" content={language === 'tr' ? 'tr_TR' : 'en_US'} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={image} />

            {/* Favicon related can go here if dynamic, otherwise commonly in index.html */}
            <link rel="canonical" href={currentUrl} />

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
