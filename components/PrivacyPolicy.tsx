import React from 'react';
import { useLanguage } from './LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
    const { language, t } = useLanguage();

    const content = {
        tr: {
            title: 'Gizlilik Politikası',
            lastUpdated: 'Son Güncelleme: Ocak 2025',
            sections: [
                {
                    title: '1. Giriş',
                    content: 'SeeMAR Marble & Stone ("Şirket", "biz" veya "bizim") olarak, kişisel verilerinizin gizliliğine önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda toplanan, kullanılan ve korunan kişisel verileriniz hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.'
                },
                {
                    title: '2. Toplanan Bilgiler',
                    content: 'Web sitemiz aracılığıyla aşağıdaki bilgileri toplayabiliriz:\n\n• İletişim bilgileri (ad, soyad, e-posta adresi, telefon numarası)\n• Şirket bilgileri (şirket adı, unvanı)\n• İletişim formları aracılığıyla gönderilen mesajlar\n• Teklif talepleri için gerekli proje bilgileri\n• Web sitesi kullanım verileri (çerezler aracılığıyla)'
                },
                {
                    title: '3. Bilgilerin Kullanımı',
                    content: 'Topladığımız bilgileri şu amaçlarla kullanırız:\n\n• Taleplerinizi yanıtlamak ve sizinle iletişim kurmak\n• Ürün ve hizmetlerimiz hakkında bilgi sağlamak\n• Teklif hazırlamak ve göndermek\n• Web sitemizi geliştirmek ve kullanıcı deneyimini iyileştirmek\n• Yasal yükümlülüklerimizi yerine getirmek'
                },
                {
                    title: '4. Bilgi Güvenliği',
                    content: 'Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri alıyoruz. Verileriniz güvenli sunucularda saklanmakta ve yetkisiz erişime karşı korunmaktadır.'
                },
                {
                    title: '5. Üçüncü Taraflarla Paylaşım',
                    content: 'Kişisel verilerinizi, açık izniniz olmadan üçüncü taraflarla satmaz veya paylaşmayız. Ancak yasal zorunluluk durumlarında veya hizmet sağlayıcılarımızla (örneğin hosting, e-posta hizmetleri) paylaşım yapılabilir.'
                },
                {
                    title: '6. Çerezler',
                    content: 'Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz.'
                },
                {
                    title: '7. Haklarınız',
                    content: 'KVKK kapsamında aşağıdaki haklara sahipsiniz:\n\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme\n• İşlenmişse buna ilişkin bilgi talep etme\n• Verilerinizin düzeltilmesini veya silinmesini isteme\n• İşlemenin kısıtlanmasını talep etme\n• Verilerinizin üçüncü kişilere aktarılmasını isteme'
                },
                {
                    title: '8. İletişim',
                    content: 'Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:\n\nE-posta: info@seemar.com.tr\nTelefon: +90 543 656 22 57\nAdres: Mustafa Kemal Mah. 2139. Sok. Ekim Plaza No:2-5 Çankaya/Ankara'
                }
            ]
        },
        en: {
            title: 'Privacy Policy',
            lastUpdated: 'Last Updated: January 2025',
            sections: [
                {
                    title: '1. Introduction',
                    content: 'At SeeMAR Marble & Stone ("Company", "we" or "our"), we value the privacy of your personal data. This Privacy Policy has been prepared to inform you about how your personal data is collected, used, and protected when you visit our website or use our services.'
                },
                {
                    title: '2. Information Collected',
                    content: 'We may collect the following information through our website:\n\n• Contact information (name, surname, email address, phone number)\n• Company information (company name, title)\n• Messages sent through contact forms\n• Project information required for quote requests\n• Website usage data (through cookies)'
                },
                {
                    title: '3. Use of Information',
                    content: 'We use the information we collect for the following purposes:\n\n• Responding to your requests and contacting you\n• Providing information about our products and services\n• Preparing and sending quotes\n• Improving our website and enhancing user experience\n• Fulfilling our legal obligations'
                },
                {
                    title: '4. Information Security',
                    content: 'We implement industry-standard security measures to protect your personal data. Your data is stored on secure servers and protected against unauthorized access.'
                },
                {
                    title: '5. Third-Party Sharing',
                    content: 'We do not sell or share your personal data with third parties without your explicit consent. However, sharing may occur in cases of legal obligation or with our service providers (e.g., hosting, email services).'
                },
                {
                    title: '6. Cookies',
                    content: 'Our website uses cookies to improve user experience. You can manage or disable cookies through your browser settings.'
                },
                {
                    title: '7. Your Rights',
                    content: 'Under applicable data protection laws, you have the following rights:\n\n• The right to know whether your personal data is being processed\n• The right to request information about the processing\n• The right to request correction or deletion of your data\n• The right to request restriction of processing\n• The right to request transfer of your data to third parties'
                },
                {
                    title: '8. Contact',
                    content: 'For questions about our privacy policy, please contact us:\n\nEmail: info@seemar.com.tr\nPhone: +90 543 656 22 57\nAddress: Mustafa Kemal Mah. 2139. Sok. Ekim Plaza No:2-5 Çankaya/Ankara'
                }
            ]
        }
    };

    const currentContent = content[language];

    return (
        <div className="min-h-screen flex flex-col w-full bg-background-light dark:bg-background-dark">
            <Helmet>
                <title>{currentContent.title} | SeeMAR</title>
                <meta name="description" content={language === 'tr' ? 'SeeMAR Gizlilik Politikası' : 'SeeMAR Privacy Policy'} />
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

export default PrivacyPolicy;
