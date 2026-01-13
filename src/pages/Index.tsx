import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import { 
  GraduationCap, 
  Users, 
  FileText, 
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Clock,
  MapPin
} from "lucide-react";

export default function Index() {
  const { lang } = useLang();
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'student',
      title: lang === 'en' ? 'Students' : lang === 'mr' ? 'विद्यार्थी' : 'छात्र',
      description: lang === 'en' ? 'Scholarships, education schemes, and student services' : 
                   lang === 'mr' ? 'शिष्यवृत्ती, शिक्षण योजना आणि विद्यार्थी सेवा' : 
                   'छात्रवृत्ति, शिक्षा योजनाएं और छात्र सेवाएं',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      schemes: ['NSP Scholarships', 'INSPIRE', 'YASASVI', 'NMMS']
    },
    {
      id: 'citizen',
      title: lang === 'en' ? 'Citizens' : lang === 'mr' ? 'नागरिक' : 'नागरिक',
      description: lang === 'en' ? 'Government services, welfare schemes, and citizen benefits' : 
                   lang === 'mr' ? 'सरकारी सेवा, कल्याण योजना आणि नागरिक लाभ' : 
                   'सरकारी सेवाएं, कल्याण योजनाएं और नागरिक लाभ',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      schemes: ['PM-KISAN', 'Ayushman Bharat', 'PMAY', 'Ujjwala']
    },
    {
      id: 'scheme_applicant',
      title: lang === 'en' ? 'Scheme Seekers' : lang === 'mr' ? 'योजना शोधक' : 'योजना आवेदक',
      description: lang === 'en' ? 'Apply for specific government schemes and programs' : 
                   lang === 'mr' ? 'विशिष्ट सरकारी योजना आणि कार्यक्रमांसाठी अर्ज करा' : 
                   'विशिष्ट सरकारी योजनाओं और कार्यक्रमों के लिए आवेदन करें',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      schemes: ['MUDRA', 'PMKVY', 'Stand Up India', 'PM Vishwakarma']
    }
  ];

  const quickStats = [
    { 
      number: '40+', 
      label: lang === 'en' ? 'Government Schemes' : lang === 'mr' ? 'सरकारी योजना' : 'सरकारी योजनाएं',
      icon: FileText 
    },
    { 
      number: '28+', 
      label: lang === 'en' ? 'States & UTs' : lang === 'mr' ? 'राज्य आणि केंद्रशासित प्रदेश' : 'राज्य और केंद्र शासित प्रदेश',
      icon: MapPin 
    },
    { 
      number: '24x7', 
      label: lang === 'en' ? 'Support Available' : lang === 'mr' ? 'सहाय्य उपलब्ध' : 'सहायता उपलब्ध',
      icon: Clock 
    },
    { 
      number: '100%', 
      label: lang === 'en' ? 'Free Services' : lang === 'mr' ? 'मोफत सेवा' : 'मुफ्त सेवाएं',
      icon: Shield 
    }
  ];

  const featuredSchemes = [
    {
      name: 'PM-KISAN',
      description: lang === 'en' ? 'Rs 6,000/year for farmers' : lang === 'mr' ? 'शेतकऱ्यांसाठी ₹6,000/वर्ष' : 'किसानों के लिए ₹6,000/वर्ष',
      category: 'Agriculture',
      icon: '🌾'
    },
    {
      name: 'Ayushman Bharat',
      description: lang === 'en' ? 'Rs 5 lakh health insurance' : lang === 'mr' ? '₹5 लाख आरोग्य विमा' : '₹5 लाख स्वास्थ्य बीमा',
      category: 'Health',
      icon: '🏥'
    },
    {
      name: 'NSP Scholarships',
      description: lang === 'en' ? 'Education support for students' : lang === 'mr' ? 'विद्यार्थ्यांसाठी शिक्षण सहाय्य' : 'छात्रों के लिए शिक्षा सहायता',
      category: 'Education',
      icon: '🎓'
    },
    {
      name: 'PMAY Housing',
      description: lang === 'en' ? 'Affordable housing scheme' : lang === 'mr' ? 'परवडणारी गृहनिर्माण योजना' : 'किफायती आवास योजना',
      category: 'Housing',
      icon: '🏠'
    }
  ];

  const handleUserTypeSelect = (userType: string) => {
    navigate(`/schemes?userType=${userType}`);
  };

  return (
    <>
      <Helmet>
        <title>Government & Student Help Platform | All India</title>
        <meta name="description" content="One-stop assistance for students and citizens across India. Find central and state government schemes, scholarships, and services." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Government Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-green-100 px-4 py-2 rounded-full mb-6">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-sm font-semibold text-gray-700">
                {lang === 'en' ? 'Government of India Initiative' : 
                 lang === 'mr' ? 'भारत सरकारचा उपक्रम' : 
                 'भारत सरकार की पहल'}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-700 via-green-600 to-orange-500 bg-clip-text text-transparent">
                {lang === 'en' ? 'Government & Student' : 
                 lang === 'mr' ? 'सरकारी व विद्यार्थी' : 
                 'सरकारी व छात्र'}
              </span>
              <br />
              <span className="text-gray-800">
                {lang === 'en' ? 'Help Platform' : 
                 lang === 'mr' ? 'मदत प्लॅटफॉर्म' : 
                 'सहायता प्लेटफॉर्म'}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {lang === 'en' ? 'One-stop assistance for students and citizens across India' : 
               lang === 'mr' ? 'भारतभरातील विद्यार्थी आणि नागरिकांसाठी एकत्रित सहाय्य' : 
               'भारत भर के छात्रों और नागरिकों के लिए एकीकृत सहायता'}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg mb-2 mx-auto">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button 
              onClick={() => navigate('/schemes')} 
              size="lg"
              className="bg-gradient-to-r from-blue-700 to-green-600 hover:from-blue-800 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <span>
                {lang === 'en' ? 'Explore All Schemes' : 
                 lang === 'mr' ? 'सर्व योजना पहा' : 
                 'सभी योजनाएं देखें'}
              </span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'en' ? 'Who Are You?' : 
               lang === 'mr' ? 'तुम्ही कोण आहात?' : 
               'आप कौन हैं?'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {lang === 'en' ? 'Choose your category to find relevant government schemes and services' : 
               lang === 'mr' ? 'संबंधित सरकारी योजना आणि सेवा शोधण्यासाठी तुमची श्रेणी निवडा' : 
               'संबंधित सरकारी योजनाओं और सेवाओं को खोजने के लिए अपनी श्रेणी चुनें'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${type.borderColor} ${type.bgColor} group`}
                  onClick={() => handleUserTypeSelect(type.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className={`text-2xl font-bold ${type.textColor} mb-3`}>
                      {type.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {type.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {type.schemes.slice(0, 3).map((scheme, index) => (
                        <div key={index} className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{scheme}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full bg-gradient-to-r ${type.color} hover:shadow-lg transition-all duration-200`}
                    >
                      <span className="text-white font-semibold">
                        {lang === 'en' ? 'View Schemes' : 
                         lang === 'mr' ? 'योजना पहा' : 
                         'योजनाएं देखें'}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-2 text-white" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'en' ? 'Popular Government Schemes' : 
               lang === 'mr' ? 'लोकप्रिय सरकारी योजना' : 
               'लोकप्रिय सरकारी योजनाएं'}
            </h2>
            <p className="text-lg text-gray-600">
              {lang === 'en' ? 'Most accessed schemes by citizens across India' : 
               lang === 'mr' ? 'भारतभरातील नागरिकांद्वारे सर्वाधिक वापरल्या जाणाऱ्या योजना' : 
               'भारत भर के नागरिकों द्वारा सबसे अधिक उपयोग की जाने वाली योजनाएं'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSchemes.map((scheme, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {scheme.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {scheme.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/schemes')}
              variant="outline" 
              size="lg"
              className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
            >
              {lang === 'en' ? 'View All Schemes' : 
               lang === 'mr' ? 'सर्व योजना पहा' : 
               'सभी योजनाएं देखें'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-700 via-green-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {lang === 'en' ? 'Trusted by Millions' : 
                 lang === 'mr' ? 'लाखो लोकांचा विश्वास' : 
                 'लाखों लोगों का भरोसा'}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">1M+</div>
                  <div className="text-lg opacity-90">
                    {lang === 'en' ? 'Citizens Helped' : 
                     lang === 'mr' ? 'नागरिकांना मदत' : 
                     'नागरिकों की मदद'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">50K+</div>
                  <div className="text-lg opacity-90">
                    {lang === 'en' ? 'Applications Processed' : 
                     lang === 'mr' ? 'अर्ज प्रक्रिया' : 
                     'आवेदन प्रसंस्कृत'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24x7</div>
                  <div className="text-lg opacity-90">
                    {lang === 'en' ? 'Support Available' : 
                     lang === 'mr' ? 'सहाय्य उपलब्ध' : 
                     'सहायता उपलब्ध'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center space-x-6 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>
                    {lang === 'en' ? 'Government Verified' : 
                     lang === 'mr' ? 'सरकार सत्यापित' : 
                     'सरकार सत्यापित'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>
                    {lang === 'en' ? '100% Free Service' : 
                     lang === 'mr' ? '100% मोफत सेवा' : 
                     '100% मुफ्त सेवा'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>1077 Helpline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}