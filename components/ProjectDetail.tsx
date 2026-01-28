import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProjects, getSlabs } from '../constants';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';

interface ProjectDetailProps {
    id: number;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const projects = getProjects(language);
    const slabs = getSlabs(language);
    const slabsEN = getSlabs('en'); // Always use English for matching

    const project = projects.find(p => p.id === id);

    // Get related projects (same category, excluding current)
    const relatedProjects = projects
        .filter(p => p.category === project?.category && p.id !== id)
        .slice(0, 3);

    // If no related projects in same category, get random featured ones
    const displayProjects = relatedProjects.length > 0
        ? relatedProjects
        : projects.filter(p => p.id !== id && p.featured).slice(0, 3);

    // Find matching materials in products - use English slabs for matching since materials are in English
    const materialProducts = project?.materials?.map(material => {
        const materialLower = material.toLowerCase();
        const materialWords = materialLower.split(' ');

        // Search in English slabs first
        let matchEN = slabsEN.find(slab => slab.name.toLowerCase() === materialLower);

        // If no exact match, try matching with first two words
        if (!matchEN && materialWords.length >= 2) {
            matchEN = slabsEN.find(slab => {
                const slabLower = slab.name.toLowerCase();
                return slabLower.startsWith(materialWords[0]) &&
                    slabLower.includes(materialWords[1].substring(0, 5));
            });
        }

        // If still no match, try first word only
        if (!matchEN) {
            matchEN = slabsEN.find(slab => {
                const slabLower = slab.name.toLowerCase();
                const slabWords = slabLower.split(' ');
                return slabWords[0] === materialWords[0] &&
                    (!materialWords[1] || !slabWords[1] || slabWords[1].substring(0, 4) === materialWords[1].substring(0, 4));
            });
        }

        // If found in English, get the corresponding product in current language by ID
        if (matchEN) {
            return slabs.find(slab => slab.id === matchEN.id) || matchEN;
        }

        return null;
    }).filter(Boolean) || [];

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col w-full bg-background-light">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">construction</span>
                        <h1 className="font-serif text-3xl text-anthracite mb-4">{t('projects.projectNotFound')}</h1>
                        <button
                            onClick={() => navigate(getPath(language, 'projects'))}
                            className="text-primary text-sm font-bold uppercase tracking-widest border-b border-primary pb-1"
                        >
                            {t('projects.backToProjects')}
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full bg-background-light">
            <SEO
                title={project.name}
                description={project.description || t('projects.pageDesc')}
                image={project.image}
            />
            <Navbar />

            {/* Hero Image */}
            <header className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

                {/* Back Button */}
                <div className="absolute top-24 left-6 md:left-12 z-10">
                    <button
                        onClick={() => navigate(getPath(language, 'projects'))}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-anthracite transition-all duration-300 rounded-sm"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        {t('projects.backToProjects')}
                    </button>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-12 bg-primary"></span>
                            <span className="text-primary font-display font-bold text-xs tracking-[0.25em] uppercase">
                                {project.category}
                            </span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-[0.95] mb-6">
                            {project.name}
                        </h1>

                        {/* Quick Info Bar */}
                        <div className="flex flex-wrap gap-6 md:gap-10 text-white/80 text-sm">
                            {project.location && (
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                                    <span>{project.location}</span>
                                </div>
                            )}
                            {project.year && (
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">calendar_month</span>
                                    <span>{project.year}</span>
                                </div>
                            )}
                            {project.client && (
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">business</span>
                                    <span>{project.client}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {/* Description Section */}
                <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                            {/* Main Description */}
                            <div className="lg:col-span-2">
                                <h2 className="font-serif text-2xl md:text-3xl text-anthracite mb-6">
                                    {t('projects.aboutProject')}
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    {project.longDescription || project.description}
                                </p>

                                {/* Materials Used - Moved Inside About Section */}
                                {materialProducts.length > 0 && (
                                    <div className="mt-10 pt-10 border-t border-anthracite/10">
                                        <h3 className="font-serif text-xl md:text-2xl text-anthracite mb-6">
                                            {t('projects.materials')}
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                            {materialProducts.map((product) => product && (
                                                <Link
                                                    key={product.id}
                                                    to={getPath(language, 'productDetail', { id: product.id })}
                                                    className="group block"
                                                >
                                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                                                        <div
                                                            className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                                            style={{ backgroundImage: `url(${product.image})` }}
                                                        ></div>
                                                    </div>
                                                    <h4 className="font-serif text-sm text-anthracite group-hover:text-primary transition-colors">
                                                        {product.name}
                                                    </h4>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="lg:col-span-1">
                                <div className="bg-gallery-white border border-anthracite/5 rounded-lg p-6 md:p-8 sticky top-24">
                                    <h3 className="font-serif text-lg text-anthracite mb-6 pb-4 border-b border-anthracite/10">
                                        {t('projects.projectDetails')}
                                    </h3>

                                    {project.location && (
                                        <div className="mb-6">
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                                                {t('projects.location')}
                                            </span>
                                            <span className="text-anthracite font-display">{project.location}</span>
                                        </div>
                                    )}

                                    {project.year && (
                                        <div className="mb-6">
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                                                {t('projects.year')}
                                            </span>
                                            <span className="text-anthracite font-display">{project.year}</span>
                                        </div>
                                    )}

                                    {project.client && (
                                        <div className="mb-6">
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                                                {t('projects.client')}
                                            </span>
                                            <span className="text-anthracite font-display">{project.client}</span>
                                        </div>
                                    )}

                                    {project.materials && project.materials.length > 0 && (
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">
                                                {t('projects.materials')}
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {project.materials.map((material, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1.5 bg-anthracite/5 text-anthracite text-xs font-mono rounded-sm"
                                                    >
                                                        {material}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => navigate(getPath(language, 'quote'))}
                                        className="w-full mt-8 px-6 py-4 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-anthracite transition-colors duration-300 rounded-sm flex items-center justify-center gap-2"
                                    >
                                        {t('cta.requestQuote')}
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Projects */}
                {displayProjects.length > 0 && (
                    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
                        <div className="max-w-[1600px] mx-auto">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="font-serif text-2xl md:text-3xl text-anthracite">
                                    {t('projects.relatedProjects')}
                                </h2>
                                <Link
                                    to={getPath(language, 'projects')}
                                    className="hidden md:flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:text-anthracite transition-colors"
                                >
                                    {t('projects.viewAll')}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {displayProjects.map((relatedProject) => (
                                    <article
                                        key={relatedProject.id}
                                        onClick={() => navigate(getPath(language, 'projectDetail', { id: relatedProject.id }))}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                                style={{ backgroundImage: `url(${relatedProject.image})` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">
                                            {relatedProject.category}
                                        </span>
                                        <h3 className="font-serif text-xl text-anthracite group-hover:text-primary transition-colors">
                                            {relatedProject.name}
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetail;
