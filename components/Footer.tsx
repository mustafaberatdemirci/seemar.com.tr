import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';

const Footer: React.FC = () => {
    const { language, t } = useLanguage();
    return (
        <footer className="bg-[#1a1a1a] text-white pt-20 pb-10" role="contentinfo">
            <div className="container mx-auto px-6 md:px-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6 lg:pr-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-primary" aria-hidden="true">diamond</span>
                                <h2 className="font-serif text-2xl font-bold tracking-widest uppercase">SeeMAR</h2>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {t('footer.desc')}
                            </p>
                        </div>
                        {/* Map Visual */}
                        <div className="relative w-full h-40 bg-[#252525] rounded border border-white/5 overflow-hidden" aria-hidden="true">
                            <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <path d="M0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.5"></path>
                                <path d="M0 30 Q 25 55 50 30 T 100 30" fill="none" stroke="white" strokeWidth="0.5"></path>
                                <path d="M50 0 L 50 100" fill="none" stroke="white" strokeDasharray="2,2" strokeWidth="0.5"></path>
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer">
                                <span className="material-symbols-outlined text-primary animate-pulse">location_on</span>
                                <span className="text-[10px] uppercase tracking-wider text-primary font-bold">{t('footer.quarryHQ')}</span>
                            </div>
                        </div>
                        {/* Locations */}
                        <div className="flex gap-6 text-xs tracking-wider text-white/50">
                            <div>
                                <span className="block text-primary font-bold mb-1">AFYON</span>
                                38.75° N, 30.54° E
                            </div>
                            <div>
                                <span className="block text-primary font-bold mb-1">KONYA</span>
                                37.87° N, 32.48° E
                            </div>
                        </div>
                    </div>

                    {/* Product Categories - KEŞFET */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">{t('footer.explore')}</h4>
                        <nav className="flex flex-col gap-2">
                            <Link to={getPath(language, 'products') + '?category=marble'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.marble')}</Link>
                            <Link to={getPath(language, 'products') + '?category=travertine'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.travertine')}</Link>
                            <Link to={getPath(language, 'products') + '?category=onyx'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.onyx')}</Link>
                            <Link to={getPath(language, 'products') + '?category=limestone'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.limestone')}</Link>
                            <Link to={getPath(language, 'products') + '?category=granite'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.granite')}</Link>
                            <Link to={getPath(language, 'products') + '?category=dolomite'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.dolomite')}</Link>
                            <Link to={getPath(language, 'products') + '?category=mosaic'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.mosaic')}</Link>
                            <Link to={getPath(language, 'products') + '?category=splitface'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.splitface')}</Link>
                            <Link to={getPath(language, 'products') + '?category=tumbled'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.tumbled')}</Link>
                            <Link to={getPath(language, 'products') + '?category=sand'} className="text-white/60 hover:text-primary transition-colors text-sm">{t('cat.sand')}</Link>
                        </nav>
                    </div>

                    {/* Company - ŞİRKET */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">{t('footer.company')}</h4>
                        <nav className="flex flex-col gap-2">
                            <Link to={getPath(language, 'about')} className="text-white/60 hover:text-primary transition-colors text-sm">{t('nav.about')}</Link>
                            <Link to={getPath(language, 'products')} className="text-white/60 hover:text-primary transition-colors text-sm">{t('nav.products')}</Link>
                            <Link to={getPath(language, 'locations')} className="text-white/60 hover:text-primary transition-colors text-sm">{t('nav.locations')}</Link>
                            <Link to={getPath(language, 'projects')} className="text-white/60 hover:text-primary transition-colors text-sm">{t('footer.projects')}</Link>
                            <Link to={getPath(language, 'careers')} className="text-white/60 hover:text-primary transition-colors text-sm">{t('nav.careers')}</Link>
                            <Link to={getPath(language, 'catalog')} className="text-white/60 hover:text-primary transition-colors text-sm">{t('footer.pdfCatalog')}</Link>
                            <Link to={getPath(language, 'contact')} className="text-white/60 hover:text-primary transition-colors text-sm">{t('nav.contact')}</Link>
                        </nav>
                    </div>

                    {/* Contact Section - İLETİŞİM */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">{t('nav.contact')}</h4>
                        <div className="flex flex-col gap-4">
                            {/* Phone */}
                            <a href="tel:+905436562257" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors group">
                                <span className="material-symbols-outlined text-primary text-lg">phone</span>
                                <span className="text-sm">+90 543 656 22 57</span>
                            </a>
                            {/* Email */}
                            <a href="mailto:info@seemar.com.tr" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors group">
                                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                                <span className="text-sm">info@seemar.com.tr</span>
                            </a>
                            {/* Address */}
                            <div className="flex items-start gap-3 text-white/60">
                                <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                                <span className="text-sm leading-relaxed">Mustafa Kemal Mah. 2139. Sok.<br />Ekim Plaza No:2-5<br />Çankaya/Ankara</span>
                            </div>
                            {/* Social Icons */}
                            <div className="flex gap-4 mt-2">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors group">
                                    <svg className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors group">
                                    <svg className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors group">
                                    <svg className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-widest">
                    <p>© 2023 SeeMAR. {t('footer.rights')}</p>
                    <div className="flex gap-6">
                        <Link to={getPath(language, 'privacy')} className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link>
                        <Link to={getPath(language, 'terms')} className="hover:text-white transition-colors">{t('footer.termsOfUse')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;