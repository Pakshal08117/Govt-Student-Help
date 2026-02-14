import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import { 
  Shield, 
  Users, 
  Globe, 
  Award, 
  CheckCircle, 
  Heart,
  Building2,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function About() {
  const { t, lang } = useLang();

  const features = [
    {
      icon: Shield,
      title: lang === 'hi' ? 'सरकार सत्यापित' : lang === 'mr' ? 'सरकार सत्यापित' : 'Government Verified',
      description: lang === 'hi' ? 'सभी जानकारी आधिकारिक स्रोतों से' : lang === 'mr' ? 'सर्व माहिती अधिकृत स्रोतांकडून' : 'All information from official sources'
    },
    {
      icon: Users,
      title: lang === 'hi' ? '1M+ नागरिकों की सेवा' : lang === 'mr' ? '1M+ नागरिकांची सेवा' : '1M+ Citizens Served',
      description: lang === 'hi' ? 'भारत भर के लाखों लोगों की मदद' : lang === 'mr' ? 'भारतभरातील लाखो लोकांची मदत' : 'Helping millions across India'
    },
    {
      icon: Globe,
      title: lang === 'hi' ? '12 भाषाओं में' : lang === 'mr' ? '12 भाषांमध्ये' : '12 Languages',
      description: lang === 'hi' ? 'सभी भारतीय भाषाओं में सहायता' : lang === 'mr' ? 'सर्व भारतीय भाषांमध्ये सहाय्य' : 'Support in all Indian languages'
    },
    {
      icon: Award,
      title: lang === 'hi' ? '24x7 सहायता' : lang === 'mr' ? '24x7 सहाय्य' : '24x7 Support',
      description: lang === 'hi' ? 'हमेशा उपलब्ध सहायता सेवा' : lang === 'mr' ? 'नेहमी उपलब्ध सहाय्य सेवा' : 'Always available assistance'
    }
  ];

  const stats = [
    { number: '40+', label: lang === 'hi' ? 'सरकारी योजनाएं' : lang === 'mr' ? 'सरकारी योजना' : 'Government Schemes' },
    { number: '28', label: lang === 'hi' ? 'राज्य और केंद्र शासित प्रदेश' : lang === 'mr' ? 'राज्य आणि केंद्रशासित प्रदेश' : 'States & UTs' },
    { number: '100%', label: lang === 'hi' ? 'मुफ्त सेवा' : lang === 'mr' ? 'मोफत सेवा' : 'Free Service' },
    { number: '50K+', label: lang === 'hi' ? 'सफल आवेदन' : lang === 'mr' ? 'यशस्वी अर्ज' : 'Successful Applications' }
  ];

  return (
    <>
      <Helmet>
        <title>{lang === 'hi' ? 'हमारे बारे में' : lang === 'mr' ? 'आमच्याबद्दल' : 'About Us'} | Government & Student Help Platform</title>
        <meta name="description" content="Learn about our mission to help Indian citizens and students access government schemes and services" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/30 px-4 py-2 rounded-full mb-6 border border-orange-500">
            <span className="text-2xl">🇮🇳</span>
            <span className="text-sm font-bold text-black dark:text-white">
              {lang === 'hi' ? 'भारत सरकार की पहल' : lang === 'mr' ? 'भारत सरकारचा उपक्रम' : 'Government of India Initiative'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-6">
            {lang === 'hi' ? 'सरकारी व छात्र सहायता प्लेटफॉर्म के बारे में' : 
             lang === 'mr' ? 'सरकारी व विद्यार्थी मदत प्लॅटफॉर्म बद्दल' : 
             'About Government & Student Help Platform'}
          </h1>

          <p className="text-xl text-black dark:text-white font-semibold max-w-3xl mx-auto leading-relaxed">
            {lang === 'hi' 
              ? 'यह प्लेटफॉर्म भारत भर के छात्रों और नागरिकों को सरकारी योजनाओं, छात्रवृत्ति और सेवाओं तक पहुंचने में मदद करता है। हमारा मिशन है डिजिटल इंडिया के माध्यम से सभी को सशक्त बनाना।'
              : lang === 'mr' 
              ? 'हे प्लॅटफॉर्म भारतभरातील विद्यार्थी आणि नागरिकांना सरकारी योजना, शिष्यवृत्ती आणि सेवांपर्यंत पोहोचण्यात मदत करते. आमचे ध्येय डिजिटल इंडियाच्या माध्यमातून सर्वांना सशक्त बनवणे आहे.'
              : 'This platform helps students and citizens across India access government schemes, scholarships, and services. Our mission is to empower everyone through Digital India.'}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2 border-orange-500 hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="pt-6">
                <div className="text-3xl font-black text-black dark:text-white mb-2">{stat.number}</div>
                <div className="text-sm font-bold text-black dark:text-white">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-center text-black dark:text-white mb-12">
            {lang === 'hi' ? 'हमारी विशेषताएं' : lang === 'mr' ? 'आमची वैशिष्ट्ये' : 'Our Features'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200 border-2 border-orange-500 bg-white dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-lg mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-black text-black dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-black dark:text-white font-semibold text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mission Section */}
        <Card className="mb-16 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 border-2 border-orange-500">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-black text-black dark:text-white mb-6">
                {lang === 'hi' ? 'हमारा मिशन' : lang === 'mr' ? 'आमचे ध्येय' : 'Our Mission'}
              </h2>
              <p className="text-lg text-black dark:text-white font-semibold max-w-4xl mx-auto leading-relaxed">
                {lang === 'hi' 
                  ? 'हमारा लक्ष्य है भारत के हर नागरिक और छात्र को सरकारी योजनाओं और सेवाओं की जानकारी आसानी से उपलब्ध कराना। हम डिजिटल इंडिया के सपने को साकार करने में योगदान देते हैं और सुनिश्चित करते हैं कि कोई भी व्यक्ति सरकारी लाभों से वंचित न रहे।'
                  : lang === 'mr' 
                  ? 'आमचे ध्येय भारताच्या प्रत्येक नागरिक आणि विद्यार्थ्याला सरकारी योजना आणि सेवांची माहिती सहजपणे उपलब्ध करून देणे आहे. आम्ही डिजिटल इंडियाच्या स्वप्नाला साकार करण्यात योगदान देतो आणि खात्री करतो की कोणताही व्यक्ती सरकारी फायद्यांपासून वंचित राहू नये.'
                  : 'Our goal is to make government schemes and services easily accessible to every citizen and student in India. We contribute to realizing the Digital India dream and ensure that no one is left behind in accessing government benefits.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information - Removed colored backgrounds */}
        <Card className="border-2 border-orange-500">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-black text-black dark:text-white">
              {lang === 'hi' ? 'संपर्क जानकारी' : lang === 'mr' ? 'संपर्क माहिती' : 'Contact Information'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-black dark:text-white">
                  {lang === 'hi' ? 'हेल्पलाइन' : lang === 'mr' ? 'हेल्पलाइन' : 'Helpline'}
                </h3>
                <p className="text-black dark:text-white font-bold">1077 (24x7 Free)</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-black dark:text-white">
                  {lang === 'hi' ? 'ईमेल' : lang === 'mr' ? 'ईमेल' : 'Email'}
                </h3>
                <p className="text-black dark:text-white font-bold">support@govhelp.in</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-black dark:text-white">
                  {lang === 'hi' ? 'कार्यालय' : lang === 'mr' ? 'कार्यालय' : 'Office'}
                </h3>
                <p className="text-black dark:text-white font-bold">
                  {lang === 'hi' ? 'सभी जिला कार्यालय' : lang === 'mr' ? 'सर्व जिल्हा कार्यालये' : 'All District Offices'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 dark:from-yellow-600 dark:via-orange-600 dark:to-orange-700 rounded-lg p-6 text-white">
            <h3 className="text-xl font-black mb-4">
              {lang === 'hi' ? 'सरकारी सत्यापित जानकारी' : lang === 'mr' ? 'सरकारी सत्यापित माहिती' : 'Government Verified Information'}
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
              <a 
                href="https://data.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-yellow-200 transition-colors hover:underline cursor-pointer"
              >
                <span>📊 data.gov.in</span>
              </a>
              <a 
                href="https://india.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-yellow-200 transition-colors hover:underline cursor-pointer"
              >
                <span>🏛️ india.gov.in</span>
              </a>
              <a 
                href="https://scholarships.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-yellow-200 transition-colors hover:underline cursor-pointer"
              >
                <span>🎓 scholarships.gov.in</span>
              </a>
              <a 
                href="tel:1077" 
                className="text-white hover:text-yellow-200 transition-colors hover:underline cursor-pointer"
              >
                <span>📞 1077 Helpline</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}