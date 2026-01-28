import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs } from '../constants';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import { getPath } from '../routes';

const Careers: React.FC = () => {
    const { language, t } = useLanguage();
    const jobs = getJobs(language);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleJobClick = (id: number) => {
        navigate(getPath(language, 'careerDetail', { id }));
    };

    return (
        <div className="bg-background-light min-h-screen transition-colors duration-500 flex flex-col font-display">
            <Navbar />

            <main className="flex-grow pt-[72px]">
                {/* Hero Section */}
                <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-background-dark">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
                        <img
                            alt="Close up texture of dark marble stone with white veins"
                            className="h-full w-full object-cover opacity-80 grayscale contrast-125"
                            src="/images/careers/team-hero.jpg"
                        />
                    </div>
                    <div className="relative z-20 flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
                        <h1 className="font-serif text-5xl font-black text-white tracking-tighter md:text-7xl lg:text-8xl drop-shadow-xl uppercase">
                            {t('careers.join')}
                        </h1>
                        <p className="max-w-xl text-base font-light text-gray-200 md:text-lg tracking-wider font-display">
                            {t('careers.heroDesc')}
                        </p>
                        <div className="mt-4 animate-bounce">
                            <span className="material-symbols-outlined text-white text-4xl opacity-50">keyboard_arrow_down</span>
                        </div>
                    </div>
                </section>

                {/* Art of Permanence Section */}
                <section className="w-full py-20 px-6 lg:px-12 bg-background-light">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="flex flex-col gap-6">
                                <div className="h-1 w-20 bg-primary"></div>
                                <h2 className="font-serif text-4xl md:text-5xl font-bold text-anthracite leading-tight tracking-tight">
                                    {t('careers.artTitle').split(' ').slice(0, 3).join(' ')} <br />
                                    {t('careers.artTitle').split(' ').slice(3).join(' ')}
                                </h2>
                                <div className="relative h-[400px] w-full mt-6 overflow-hidden rounded-sm bg-[#F5F5F5]">
                                    <img
                                        alt="Modern minimalist office interior with marble accents and large windows"
                                        className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                        src="/images/careers/team-work.jpg"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 lg:pt-24">
                                <p className="text-lg text-gray-600 font-light leading-relaxed font-display">
                                    {t('careers.artDesc1')}
                                </p>
                                <p className="text-lg text-gray-600 font-light leading-relaxed font-display">
                                    {t('careers.artDesc2')}
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                                    <div className="flex flex-col gap-2 p-4 border border-anthracite/10 bg-[#F5F5F5]/30 rounded-sm hover:border-primary/30 transition-colors">
                                        <span className="material-symbols-outlined text-primary text-3xl">architecture</span>
                                        <h3 className="font-serif font-bold text-lg text-anthracite">{t('careers.precision')}</h3>
                                    </div>
                                    <div className="flex flex-col gap-2 p-4 border border-anthracite/10 bg-[#F5F5F5]/30 rounded-sm hover:border-primary/30 transition-colors">
                                        <span className="material-symbols-outlined text-primary text-3xl">history_edu</span>
                                        <h3 className="font-serif font-bold text-lg text-anthracite">{t('careers.heritage')}</h3>
                                    </div>
                                    <div className="flex flex-col gap-2 p-4 border border-anthracite/10 bg-[#F5F5F5]/30 rounded-sm hover:border-primary/30 transition-colors">
                                        <span className="material-symbols-outlined text-primary text-3xl">engineering</span>
                                        <h3 className="font-serif font-bold text-lg text-anthracite">{t('careers.innovation')}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Current Openings */}
                <section className="w-full py-24 px-6 lg:px-12 bg-[#F5F5F5] border-t border-anthracite/10" id="openings">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-6 border-b border-anthracite/10">
                            <div>
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-anthracite mb-2">{t('careers.openings')}</h2>
                                <p className="text-gray-500 font-light font-display">{t('careers.openingsDesc')}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button className="px-4 py-2 text-sm font-medium bg-anthracite text-white rounded-sm shadow-sm font-display uppercase tracking-wider">{t('careers.allRoles')}</button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-sm transition-colors font-display uppercase tracking-wider">{t('careers.artisans')}</button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-sm transition-colors font-display uppercase tracking-wider">{t('careers.engineering')}</button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-sm transition-colors font-display uppercase tracking-wider">{t('careers.operations')}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => handleJobClick(job.id)}
                                    className="group flex flex-col justify-between min-h-[240px] p-8 bg-white border border-gray-200 rounded-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 relative overflow-hidden cursor-pointer"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <span className="material-symbols-outlined text-8xl text-anthracite">{job.icon}</span>
                                    </div>
                                    <div className="relative z-10">
                                        <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 block font-mono">{job.category} • {job.location}</span>
                                        <h3 className="font-serif text-2xl font-bold text-anthracite mb-3 group-hover:text-primary transition-colors">{job.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm font-display">
                                            {job.description}
                                        </p>
                                    </div>
                                    <div className="relative z-10 mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-400 font-mono">{job.type}</span>
                                        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wide rounded-sm shadow-md hover:shadow-lg hover:bg-[#b08d4b] transition-all duration-300">
                                            {t('careers.apply')}
                                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                                        </button>
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

export default Careers;