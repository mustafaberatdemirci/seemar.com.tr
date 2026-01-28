import React from 'react';
import { useLanguage } from './LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

const TermsOfUse: React.FC = () => {
    const { language, t } = useLanguage();

    const content = {
        tr: {
            title: 'Kullanım Koşulları',
            lastUpdated: 'Son Güncelleme: Ocak 2025',
            sections: [
                {
                    title: '1. Genel Koşullar',
                    content: 'Bu web sitesini ("Site") kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen Siteyi kullanmayınız. SeeMAR Marble & Stone ("Şirket") bu koşulları önceden bildirmeksizin değiştirme hakkını saklı tutar.'
                },
                {
                    title: '2. Fikri Mülkiyet Hakları',
                    content: 'Bu Sitede yer alan tüm içerik, görseller, logolar, grafikler, tasarımlar ve metinler SeeMAR Marble & Stone\'a aittir ve telif hakkı ile korunmaktadır. Yazılı izin olmaksızın kopyalanamaz, çoğaltılamaz veya dağıtılamaz.'
                },
                {
                    title: '3. Site Kullanımı',
                    content: 'Siteyi yalnızca yasal amaçlarla kullanabilirsiniz. Aşağıdaki davranışlar kesinlikle yasaktır:\n\n• Siteye zarar verecek veya hizmetleri engelleyecek faaliyetler\n• Virüs veya zararlı yazılım yükleme girişimleri\n• Yetkisiz erişim denemeleri\n• Site içeriğinin izinsiz kopyalanması veya dağıtılması\n• Üçüncü tarafların haklarını ihlal eden faaliyetler'
                },
                {
                    title: '4. Ürün Bilgileri',
                    content: 'Sitedeki ürün bilgileri, görseller ve teknik özellikler bilgilendirme amaçlıdır. Doğal taş ürünlerinin doğası gereği, renk, desen ve damar yapısı her partide farklılık gösterebilir. Kesin sipariş öncesi numune talep etmenizi öneririz.'
                },
                {
                    title: '5. Fiyatlandırma ve Siparişler',
                    content: 'Sitedeki fiyatlar ve stok durumu önceden haber verilmeksizin değişebilir. Tüm siparişler, Şirketimiz tarafından onaylandıktan sonra geçerlilik kazanır. Şirketimiz, herhangi bir siparişi kabul etmeme hakkını saklı tutar.'
                },
                {
                    title: '6. Sorumluluk Sınırlaması',
                    content: 'Site "olduğu gibi" sunulmaktadır. SeeMAR Marble & Stone:\n\n• Sitenin kesintisiz veya hatasız çalışacağını garanti etmez\n• Site kullanımından kaynaklanan doğrudan, dolaylı veya sonuç olarak ortaya çıkan zararlardan sorumlu tutulamaz\n• Üçüncü taraf web sitelerinin içeriğinden sorumlu değildir'
                },
                {
                    title: '7. Bağlantılar',
                    content: 'Site, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu bağlantılar yalnızca kullanıcı kolaylığı için sağlanmış olup, bağlantı verilen sitelerin içeriği veya gizlilik uygulamalarından Şirketimiz sorumlu değildir.'
                },
                {
                    title: '8. Uygulanacak Hukuk',
                    content: 'Bu kullanım koşulları Türkiye Cumhuriyeti kanunlarına tabidir. Herhangi bir uyuşmazlık durumunda Ankara mahkemeleri yetkilidir.'
                },
                {
                    title: '9. İletişim',
                    content: 'Kullanım koşullarımız hakkında sorularınız için bizimle iletişime geçebilirsiniz:\n\nE-posta: info@seemar.com.tr\nTelefon: +90 543 656 22 57\nAdres: Mustafa Kemal Mah. 2139. Sok. Ekim Plaza No:2-5 Çankaya/Ankara'
                }
            ]
        },
        en: {
            title: 'Terms of Use',
            lastUpdated: 'Last Updated: January 2025',
            sections: [
                {
                    title: '1. General Terms',
                    content: 'By using this website ("Site"), you agree to the following terms of use. If you do not accept these terms, please do not use the Site. SeeMAR Marble & Stone ("Company") reserves the right to modify these terms without prior notice.'
                },
                {
                    title: '2. Intellectual Property Rights',
                    content: 'All content, images, logos, graphics, designs, and text on this Site belong to SeeMAR Marble & Stone and are protected by copyright. They may not be copied, reproduced, or distributed without written permission.'
                },
                {
                    title: '3. Site Usage',
                    content: 'You may use the Site only for legal purposes. The following behaviors are strictly prohibited:\n\n• Activities that may damage the Site or disrupt services\n• Attempts to upload viruses or malicious software\n• Unauthorized access attempts\n• Unauthorized copying or distribution of Site content\n• Activities that violate the rights of third parties'
                },
                {
                    title: '4. Product Information',
                    content: 'Product information, images, and technical specifications on the Site are for informational purposes. Due to the nature of natural stone products, color, pattern, and vein structure may vary between batches. We recommend requesting samples before final orders.'
                },
                {
                    title: '5. Pricing and Orders',
                    content: 'Prices and stock availability on the Site may change without prior notice. All orders become valid only after confirmation by our Company. Our Company reserves the right to decline any order.'
                },
                {
                    title: '6. Limitation of Liability',
                    content: 'The Site is provided "as is". SeeMAR Marble & Stone:\n\n• Does not guarantee uninterrupted or error-free operation of the Site\n• Cannot be held liable for direct, indirect, or consequential damages arising from Site use\n• Is not responsible for the content of third-party websites'
                },
                {
                    title: '7. Links',
                    content: 'The Site may contain links to third-party websites. These links are provided solely for user convenience, and our Company is not responsible for the content or privacy practices of linked sites.'
                },
                {
                    title: '8. Applicable Law',
                    content: 'These terms of use are subject to the laws of the Republic of Turkey. In case of any dispute, Ankara courts have jurisdiction.'
                },
                {
                    title: '9. Contact',
                    content: 'For questions about our terms of use, please contact us:\n\nEmail: info@seemar.com.tr\nPhone: +90 543 656 22 57\nAddress: Mustafa Kemal Mah. 2139. Sok. Ekim Plaza No:2-5 Çankaya/Ankara'
                }
            ]
        }
    };

    const currentContent = content[language];

    return (
        <div className="min-h-screen flex flex-col w-full bg-background-light dark:bg-background-dark">
            <Helmet>
                <title>{currentContent.title} | SeeMAR</title>
                <meta name="description" content={language === 'tr' ? 'SeeMAR Kullanım Koşulları' : 'SeeMAR Terms of Use'} />
            </Helmet>
            <Navbar />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6 md:px-10 max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-4">
                        {currentContent.title}
                    </h1>
                    <p className="text-text-light dark:text-white/60 mb-12">{currentContent.lastUpdated}</p>

                    <div className="space-y-10">
                        {currentContent.sections.map((section, index) => (
                            <section key={index} className="border-b border-gray-200 dark:border-white/10 pb-8 last:border-none">
                                <h2 className="font-serif text-xl md:text-2xl font-bold text-text-dark dark:text-white mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-text-light dark:text-white/70 leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfUse;
