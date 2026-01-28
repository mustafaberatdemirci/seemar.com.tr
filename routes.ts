
// Route definitions and helper functions
// Extracted from App.tsx to avoid circular dependencies

// Route paths for each language
export const routes = {
    tr: {
        home: '/tr',
        products: '/tr/urunler',
        productDetail: '/tr/urunler/:slug',
        about: '/tr/hakkimizda',
        careers: '/tr/kariyer',
        careerDetail: '/tr/kariyer/:id',
        locations: '/tr/lokasyonlar',
        contact: '/tr/iletisim',
        quote: '/tr/teklif',
        quoteConfirmed: '/tr/teklif/onaylandi',
        projects: '/tr/projeler',
        projectDetail: '/tr/projeler/:id',
        catalog: '/tr/katalog',
        privacy: '/tr/gizlilik-politikasi',
        terms: '/tr/kullanim-kosullari',
    },
    en: {
        home: '/en',
        products: '/en/products',
        productDetail: '/en/products/:slug',
        about: '/en/about',
        careers: '/en/careers',
        careerDetail: '/en/careers/:id',
        locations: '/en/locations',
        contact: '/en/contact',
        quote: '/en/quote',
        quoteConfirmed: '/en/quote/confirmed',
        projects: '/en/projects',
        projectDetail: '/en/projects/:id',
        catalog: '/en/catalog',
        privacy: '/en/privacy-policy',
        terms: '/en/terms-of-use',
    }
};

// Helper to get path for current language
export const getPath = (lang: 'tr' | 'en', routeName: keyof typeof routes.tr, params?: Record<string, string | number>) => {
    let path = routes[lang][routeName];
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            path = path.replace(`:${key}`, String(value));
        });
    }
    return path;
};
