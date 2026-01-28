import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects } from '../constants';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';

const Projects: React.FC = () => {
    const { language, t } = useLanguage();
    const projects = getProjects(language);
    const navigate = useNavigate();

    // Get first 3 projects for display
    const displayProjects = projects.slice(0, 3);

    const handleProjectClick = (projectId: number) => {
        navigate(getPath(language, 'projectDetail', { id: projectId }));
    };

    return (
        <section className="relative bg-cinematic-black py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-6 md:px-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                    <div className="space-y-4">
                        <span className="flex items-center gap-3">
                            <span className="h-[1px] w-12 bg-primary"></span>
                            <span className="text-primary font-display font-bold text-xs tracking-[0.3em] uppercase">{t('projects.label')}</span>
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-[1.1]">
                            {t('projects.title').split(' ')[0]} <br />
                            <span className="italic text-primary/80">{t('projects.title').split(' ').slice(1).join(' ')}</span>
                        </h2>
                    </div>
                    <Link
                        to={getPath(language, 'projects')}
                        className="group flex items-center gap-3 text-white/60 hover:text-primary transition-colors duration-300"
                    >
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">{t('projects.viewAll')}</span>
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {displayProjects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => handleProjectClick(project.id)}
                            className="group cursor-pointer"
                        >
                            {/* Card */}
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-anthracite">
                                {/* Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                ></div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <span className="text-primary text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block">
                                        {project.category}
                                    </span>
                                    <h3 className="font-serif text-xl md:text-2xl text-white font-medium leading-tight group-hover:text-primary transition-colors duration-300">
                                        {project.name}
                                    </h3>
                                </div>

                                {/* Hover Arrow */}
                                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <span className="material-symbols-outlined text-white text-lg">arrow_outward</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;