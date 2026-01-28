import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Catalog from './components/Catalog';
import Showroom from './components/Showroom';
import Projects from './components/Projects';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import SEO from './components/SEO';

// ============================================
// LAZY LOADED COMPONENTS (Route-Level Splitting)
// ============================================
// These components are loaded on-demand when the user navigates to them.
// This reduces the initial bundle size significantly.

const AboutUs = lazy(() => import('./components/AboutUs'));
const Products = lazy(() => import('./components/Products'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Careers = lazy(() => import('./components/Careers'));
const CareerDetail = lazy(() => import('./components/CareerDetail'));
const Locations = lazy(() => import('./components/Locations'));
const Contact = lazy(() => import('./components/Contact'));
const RequestQuote = lazy(() => import('./components/RequestQuote'));
const RequestConfirmed = lazy(() => import('./components/RequestConfirmed'));
const NotFound = lazy(() => import('./components/NotFound'));
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const CatalogPage = lazy(() => import('./components/CatalogPage'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./components/TermsOfUse'));

// ============================================
// LOADING SKELETON COMPONENT
// ============================================
// Minimal, elegant loading state that matches the site's design language

const PageLoader: React.FC = () => {
  // Detect language from URL for loading text
  const isTurkish = typeof window !== 'undefined' && window.location.pathname.startsWith('/tr');

  return (
    <div className="min-h-screen flex flex-col w-full bg-background-light">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-anthracite/50 text-sm uppercase tracking-widest font-display">
            {isTurkish ? 'Yükleniyor...' : 'Loading...'}
          </p>
        </div>
      </main>
    </div>
  );
};



// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Language sync with URL
const LanguageSync: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (pathname.startsWith('/tr')) {
      setLanguage('tr');
    } else if (pathname.startsWith('/en')) {
      setLanguage('en');
    }
  }, [pathname, setLanguage]);

  return <>{children}</>;
};

// Home page with all sections (NOT lazy loaded - critical path)
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Intro />
        <Catalog />
        <Showroom />
        <Projects />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

// Products page wrapper (uses lazy loaded Products component)
const ProductsPageWrapper: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background-light dark:bg-background-dark">
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
};

// Product detail page wrapper
const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ProductDetail slug={slug || ''} />;
};

// Careers page wrapper
const CareersPageWrapper: React.FC = () => {
  return <Careers />;
};

// Career detail page wrapper
const CareerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <CareerDetail jobId={Number(id)} />;
};

// Project detail page wrapper
const ProjectDetailPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <ProjectDetail id={Number(id)} />;
};

const AppRoutes: React.FC = () => {
  return (
    <LanguageSync>
      <ScrollToTop />
      <Helmet>
        <meta name="test-helmet" content="working" data-rh="true" />
      </Helmet>
      <SEO />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Root redirect to Turkish */}
          <Route path="/" element={<Navigate to="/tr" replace />} />

          {/* Turkish Routes */}
          <Route path="/tr" element={<HomePage />} />
          <Route path="/tr/urunler" element={<ProductsPageWrapper />} />
          <Route path="/tr/urunler/:slug" element={<ProductDetailPage />} />
          <Route path="/tr/hakkimizda" element={<AboutUs />} />
          <Route path="/tr/kariyer" element={<CareersPageWrapper />} />
          <Route path="/tr/kariyer/:id" element={<CareerDetailPage />} />
          <Route path="/tr/lokasyonlar" element={<Locations />} />
          <Route path="/tr/iletisim" element={<Contact />} />
          <Route path="/tr/teklif" element={<RequestQuote />} />
          <Route path="/tr/teklif/onaylandi" element={<RequestConfirmed />} />
          <Route path="/tr/projeler" element={<ProjectsPage />} />
          <Route path="/tr/projeler/:id" element={<ProjectDetailPageWrapper />} />
          <Route path="/tr/katalog" element={<CatalogPage />} />
          <Route path="/tr/gizlilik-politikasi" element={<PrivacyPolicy />} />
          <Route path="/tr/kullanim-kosullari" element={<TermsOfUse />} />

          {/* English Routes */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/products" element={<ProductsPageWrapper />} />
          <Route path="/en/products/:slug" element={<ProductDetailPage />} />
          <Route path="/en/about" element={<AboutUs />} />
          <Route path="/en/careers" element={<CareersPageWrapper />} />
          <Route path="/en/careers/:id" element={<CareerDetailPage />} />
          <Route path="/en/locations" element={<Locations />} />
          <Route path="/en/contact" element={<Contact />} />
          <Route path="/en/quote" element={<RequestQuote />} />
          <Route path="/en/quote/confirmed" element={<RequestConfirmed />} />
          <Route path="/en/projects" element={<ProjectsPage />} />
          <Route path="/en/projects/:id" element={<ProjectDetailPageWrapper />} />
          <Route path="/en/catalog" element={<CatalogPage />} />
          <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/en/terms-of-use" element={<TermsOfUse />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LanguageSync>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;