import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../constants';
import { useLanguage } from './LanguageContext';
import { getPath } from '../routes';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';

const ProjectsPage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [animateItems, setAnimateItems] = useState(false);
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const projects = getProjects(language);

    // Category mapping
    const categoryMap: Record<string, string[]> = {
        'All': [],
        'Commercial': ['Commercial Interiors', 'Ticari İç Mekanlar', 'Commercial', 'Ticari'],
        'Residential': ['Residential', 'Konut'],
        'Hospitality': ['Hospitality', 'Konaklama'],
        'Religious': ['Religious Architecture', 'Dini Mimari'],
        'Art': ['Artisan Sculpture', 'Zanaatkar Heykeli'],
    };

    const categoryLabels: Record<string, string> = {
        'All': t('projects.all'),
        'Commercial': t('projects.commercial'),
        'Residential': t('projects.residential'),
        'Hospitality': t('projects.hospitality'),
        'Religious': t('projects.religious'),
        'Art': t('projects.art'),
    };

    const categories = ['All', 'Commercial', 'Residential', 'Hospitality'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => categoryMap[filter]?.includes(project.category));

    useEffect(() => {
        setAnimateItems(false);
        const timer = setTimeout(() => setAnimateItems(true), 100);
        return () => clearTimeout(timer);
    }, [filter]);

    const handleProjectClick = (id: number) => {
        const detailPath = getPath(language, 'projectDetail', { id });
        navigate(detailPath);
    };

    return (
        <div className="min-h-screen flex flex-col w-full bg-background-light">
            <SEO
                title={t('projects.title')}
                description={t('projects.pageDesc')}
                image="/images/projects/1.png"
            />
            <Navbar />

            {/* Hero Header */}
            <header className="relative bg-cinematic-black pt-36 md:pt-44 pb-16 md:pb-20 overflow-hidden">
                {/* Marble texture background */}
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/marble-bg.png)' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cinematic-black/90 via-cinematic-black/70 to-cinematic-black/50"></div>

                <div className="relative px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="h-[1px] w-12 bg-primary"></span>
                                <span className="text-primary font-display font-bold text-xs tracking-[0.25em] uppercase">{t('projects.label')}</span>
                            </div>
                            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-[0.95]">
                                {t('projects.title').split(' ')[0]} <br />
                                <span className="italic text-dark-silver">{t('projects.title').split(' ').slice(1).join(' ')}</span>
                            </h1>
                        </div>
                        <p className="max-w-lg text-sm md:text-base text-white/60 leading-relaxed font-display font-light">
                            {t('projects.pageDesc')}
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow px-6 md:px-12 lg:px-20 py-8 md:py-12 max-w-[1600px] mx-auto w-full">
                {/* Filter Tabs */}
                <div className="flex flex-nowrap md:flex-wrap items-center gap-4 border-b border-anthracite/10 pb-6 mb-12 overflow-x-auto no-scrollbar" role="tablist">
                    <span className="text-xs font-bold uppercase tracking-widest text-anthracite/40 mr-4 whitespace-nowrap">{t('projects.filter')}</span>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            role="tab"
                            aria-selected={filter === cat}
                            className={`
                                px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 whitespace-nowrap
                                ${filter === cat
                                    ? 'bg-anthracite text-white shadow-lg'
                                    : 'bg-transparent text-anthracite/60 hover:text-primary'}
                            `}
                        >
                            {categoryLabels[cat] || cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <article
                            key={project.id}
                            onClick={() => handleProjectClick(project.id)}
                            onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.id)}
                            tabIndex={0}
                            role="button"
                            aria-label={`${project.name} - ${project.category}`}
                            className={`
                                group cursor-pointer flex flex-col bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl
                                transform transition-all duration-700 ease-out border border-anthracite/5
                                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                            `}
                            style={{ transitionDelay: `${index * 80}ms` }}
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                            {t('projects.featured')}
                                        </span>
                                    </div>
                                )}

                                {/* Year Badge */}
                                {project.year && (
                                    <div className="absolute top-4 right-4">
                                        <span className="px-2 py-1 bg-white/90 text-anthracite text-[10px] font-mono tracking-wider backdrop-blur-sm rounded-sm">
                                            {project.year}
                                        </span>
                                    </div>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                                        {t('projects.viewProject')}
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h3 className="font-serif text-xl md:text-2xl text-anthracite group-hover:text-primary transition-colors duration-300 leading-tight">
                                        {project.name}
                                    </h3>
                                </div>

                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                                    {project.category}
                                </p>

                                {project.description && (
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                                        {project.description}
                                    </p>
                                )}

                                {/* Location */}
                                {project.location && (
                                    <div className="mt-auto pt-4 border-t border-anthracite/5 flex items-center gap-2 text-xs text-gray-500">
                                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                                        {project.location}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="py-20 text-center">
                        <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">folder_open</span>
                        <p className="text-gray-400 font-serif italic text-xl mb-4">{t('projects.empty')}</p>
                        <button
                            onClick={() => setFilter('All')}
                            className="text-primary text-xs font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-anthracite hover:border-anthracite transition-colors"
                        >
                            {t('projects.all')}
                        </button>
                    </div>
                )}
            </main>

            {/* CTA Section */}
            <section className="relative bg-cinematic-black text-white py-24 md:py-32 px-6 text-center border-t border-white/5 overflow-hidden">
                {/* Marble texture background */}
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/marble-bg.png)' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cinematic-black/90 via-cinematic-black/70 to-cinematic-black/50"></div>

                <div className="relative max-w-2xl mx-auto space-y-8">
                    <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest leading-tight">
                        {t('projects.ctaTitle')}
                    </h2>
                    <p className="text-white/60 font-light text-lg font-display">
                        {t('projects.ctaDesc')}
                    </p>
                    <button
                        onClick={() => navigate(getPath(language, 'quote'))}
                        className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-primary hover:bg-primary hover:text-anthracite transition-all duration-300 uppercase tracking-widest text-xs font-bold"
                    >
                        {t('projects.ctaButton')}
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
