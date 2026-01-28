import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs } from '../constants';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import { getPath } from '../App';

interface CareerDetailProps {
    jobId: number;
}

const CareerDetail: React.FC<CareerDetailProps> = ({ jobId }) => {
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const jobs = getJobs(language);
    const job = jobs.find(j => j.id === jobId);
    const formRef = useRef<HTMLDivElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [jobId]);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError(null);
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Validate file size (5MB = 5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                setFileError("File size exceeds 5MB limit. Please upload a smaller file.");
                setFileName(null);
                e.target.value = ''; // Reset the file input
                return;
            }

            setFileName(file.name);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (fileError) return;
        // Proceed to confirmation
        navigate(getPath(language, 'quoteConfirmed'));
    };



    if (!job) return <div className="min-h-screen flex items-center justify-center bg-background-light text-anthracite">Job not found</div>;



    return (
        <div className="min-h-screen bg-background-light transition-colors duration-500 flex flex-col font-display">
            <Navbar />

            <main className="flex-grow pt-[72px]">
                {/* Header / Hero */}
                <section className="relative pt-12 pb-16 px-6 lg:px-12 bg-background-light border-b border-anthracite/5">
                    <div className="max-w-[1200px] mx-auto">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-anthracite/50 mb-10">
                            <button onClick={() => navigate(getPath(language, 'careers'))} className="hover:text-primary transition-colors">{t('careers.breadcrumb')}</button>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                            <span className="text-anthracite font-bold">{t('careers.jobDetails')}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                            <div className="max-w-2xl">
                                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                    {job.category} {t('careers.division')}
                                </span>
                                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite mb-6 leading-tight font-medium">
                                    {job.title}
                                </h1>
                                <div className="flex flex-wrap gap-x-8 gap-y-4 text-anthracite/70 font-display text-sm uppercase tracking-wide">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg text-primary">location_on</span>
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg text-primary">schedule</span>
                                        {job.type}
                                    </div>
                                    {job.level && (
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-lg text-primary">workspace_premium</span>
                                            {job.level}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-shrink-0 mt-4 md:mt-0">
                                <button
                                    onClick={scrollToForm}
                                    className="w-full md:w-auto px-8 py-4 bg-anthracite text-white hover:bg-primary hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-lg"
                                >
                                    {t('careers.applyNow')}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-16">

                            {/* Role Description */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold text-anthracite mb-6 uppercase tracking-wide">{t('careers.theRole')}</h3>
                                <div className="prose prose-lg max-w-none text-anthracite/80 font-light leading-relaxed">
                                    <p>{job.longDescription || job.description}</p>
                                </div>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold text-anthracite mb-6 uppercase tracking-wide">{t('careers.responsibilities')}</h3>
                                <ul className="space-y-4">
                                    {job.responsibilities?.map((resp, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-anthracite/80 font-light leading-relaxed">
                                            <span className="material-symbols-outlined text-primary mt-1 flex-shrink-0">check_circle</span>
                                            <span>{resp}</span>
                                        </li>
                                    )) || <p className="text-anthracite/50">{t('careers.detailsOnApplication')}</p>}
                                </ul>
                            </div>

                            {/* Qualifications */}
                            <div>
                                <h3 className="font-serif text-2xl font-bold text-anthracite mb-6 uppercase tracking-wide">{t('careers.qualifications')}</h3>
                                <ul className="space-y-4">
                                    {job.qualifications?.map((qual, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-anthracite/80 font-light leading-relaxed">
                                            <span className="material-symbols-outlined text-primary mt-1 flex-shrink-0">check_circle</span>
                                            <span>{qual}</span>
                                        </li>
                                    )) || <p className="text-anthracite/50">{t('careers.detailsOnApplication')}</p>}
                                </ul>
                            </div>

                            {/* Application Form */}
                            <div ref={formRef} className="pt-16 mt-16 border-t border-anthracite/10">
                                <h3 className="font-serif text-3xl font-bold text-anthracite mb-2 uppercase tracking-wide">{t('careers.applyForPosition')}</h3>
                                <p className="text-anthracite/60 mb-8 font-light">{t('careers.applyDesc')}</p>

                                <form className="space-y-10" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('careers.firstName')}</label>
                                            <input required className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 focus:ring-0 focus:outline-none focus:border-primary placeholder-anthracite/30 transition-colors text-lg font-light rounded-none" placeholder={t('careers.firstName')} type="text" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('careers.lastName')}</label>
                                            <input required className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 focus:ring-0 focus:outline-none focus:border-primary placeholder-anthracite/30 transition-colors text-lg font-light rounded-none" placeholder={t('careers.lastName')} type="text" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('careers.email')}</label>
                                            <input required className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 focus:ring-0 focus:outline-none focus:border-primary placeholder-anthracite/30 transition-colors text-lg font-light rounded-none" placeholder="email@example.com" type="email" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('careers.phone')}</label>
                                            <input className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 focus:ring-0 focus:outline-none focus:border-primary placeholder-anthracite/30 transition-colors text-lg font-light rounded-none" placeholder="+90 (5XX) XXX-XXXX" type="tel" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('careers.linkedin')}</label>
                                        <input className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 focus:ring-0 focus:outline-none focus:border-primary placeholder-anthracite/30 transition-colors text-lg font-light rounded-none" placeholder="https://linkedin.com/in/..." type="url" name="linkedin" />
                                    </div>



                                    <div className="space-y-4">
                                        <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('careers.resume')} <span className="text-primary normal-case tracking-normal ml-1">(PDF, DOCX - Max 5MB)</span></label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="resume-upload"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                                required
                                            />
                                            <label
                                                htmlFor="resume-upload"
                                                className={`flex items-center justify-center w-full md:w-auto px-8 py-4 border border-dashed rounded-sm cursor-pointer transition-all duration-300 group ${fileError ? 'border-red-500 bg-red-50' : 'border-anthracite/30 hover:border-primary hover:bg-primary/5'}`}
                                            >
                                                <span className={`material-symbols-outlined text-2xl mr-3 ${fileError ? 'text-red-500' : 'text-anthracite/50 group-hover:text-primary'}`}>
                                                    {fileError ? 'error' : 'upload_file'}
                                                </span>
                                                <span className={`text-sm font-bold uppercase tracking-wider ${fileError ? 'text-red-500' : 'text-anthracite/70 group-hover:text-primary'}`}>
                                                    {fileError ? t('careers.fileSizeError') : (fileName ? fileName : t('careers.uploadResume'))}
                                                </span>
                                            </label>
                                            {fileError && <p className="text-red-500 text-xs mt-2 font-mono uppercase tracking-wide">{fileError}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs uppercase tracking-widest font-bold text-anthracite/60">{t('careers.coverLetter')}</label>
                                        <textarea
                                            className="w-full bg-transparent border-0 border-b border-anthracite/20 text-anthracite px-0 py-3 focus:ring-0 focus:outline-none focus:border-primary placeholder-anthracite/30 transition-colors text-lg font-light rounded-none min-h-[100px] resize-y"
                                            placeholder={t('careers.coverLetterPlaceholder')}
                                            name="coverLetter"
                                        ></textarea>
                                    </div>

                                    <div className="pt-8">
                                        <button className="flex items-center gap-3 px-10 py-5 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded-sm shadow-lg hover:bg-[#b08d4b] hover:shadow-xl transition-all duration-300 w-full md:w-auto justify-center">
                                            {t('careers.submitApplication')}
                                            <span className="material-symbols-outlined text-lg">send</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">

                                {/* Team Info */}
                                <div className="bg-marble-grey p-8 rounded-sm border border-anthracite/5">
                                    <h4 className="font-serif text-lg font-bold text-anthracite mb-4 uppercase tracking-wide">{t('careers.aboutTeam')}</h4>
                                    <p className="text-sm text-anthracite/70 font-light leading-relaxed mb-6">
                                        {job.teamDescription || t('careers.defaultTeamDesc')}
                                    </p>
                                    {job.teamImage && (
                                        <div className="h-40 w-full overflow-hidden rounded-sm mb-4">
                                            <img
                                                alt="Team working"
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                                src={job.teamImage}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Benefits */}
                                <div className="bg-marble-grey p-8 rounded-sm border border-anthracite/5">
                                    <h4 className="font-serif text-lg font-bold text-anthracite mb-4 uppercase tracking-wide">{t('careers.keyBenefits')}</h4>
                                    <ul className="space-y-3 text-sm text-anthracite/70">
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">health_and_safety</span>
                                            <span>{t('careers.benefit1')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">savings</span>
                                            <span>{t('careers.benefit2')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">restaurant</span>
                                            <span>{t('careers.benefit3')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">school</span>
                                            <span>{t('careers.benefit4')}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Share */}
                                <div className="border-t border-anthracite/10 pt-6">
                                    <h4 className="font-serif text-xs font-bold text-anthracite mb-3 uppercase tracking-widest">{t('careers.shareRole')}</h4>
                                    <div className="flex gap-4">
                                        <button className="text-anthracite/40 hover:text-primary transition-colors">
                                            <span className="sr-only">LinkedIn</span>
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                        </button>
                                        <button className="text-anthracite/40 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">mail</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </main>
            <Footer />
        </div>
    );
};

export default CareerDetail;