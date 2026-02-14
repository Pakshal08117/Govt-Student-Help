import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import GatewayBackground from "@/components/GatewayBackground";
import { 
  GraduationCap, 
  Users, 
  FileText, 
  Phone,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

export default function Index() {
  const { lang, t } = useLang();
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'student',
      title: t('students'),
      description: t('studentDesc'),
      icon: GraduationCap,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      schemes: ['NSP Scholarships', 'INSPIRE', 'YASASVI', 'NMMS']
    },
    {
      id: 'citizen',
      title: t('citizens'),
      description: t('citizenDesc'),
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      schemes: ['PM-KISAN', 'Ayushman Bharat', 'PMAY', 'Ujjwala']
    },
    {
      id: 'scheme_applicant',
      title: t('schemeSeekers'),
      description: t('schemeSeekerDesc'),
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      schemes: ['MUDRA', 'PMKVY', 'Stand Up India', 'PM Vishwakarma']
    }
  ];

  const getFeaturedSchemes = () => [
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
  
  const featuredSchemes = getFeaturedSchemes();

  const handleUserTypeSelect = (userType: string) => {
    navigate(`/schemes?userType=${userType}`);
  };

  return (
    <>
      <Helmet>
        <title>Government & Student Help Platform | All India</title>
        <meta name="description" content="One-stop assistance for students and citizens across India. Find central and state government schemes, scholarships, and services." />
      </Helmet>

      {/* Gateway of India Background */}
      <GatewayBackground />

      {/* Hero Section - New Color Palette */}
      <section className="relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Government Badge */}
            <div className="inline-flex items-center space-x-2 bg-orange-500/80 dark:bg-orange-500/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-accent-bg/30">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-sm font-semibold text-white dark:text-white">
                {t('govInitiative')}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-accent-bg via-secondary-bg to-accent-bg bg-clip-text text-transparent">
                {t('govAndStudent')}
              </span>
              <br />
              <span className="text-black dark:text-white">
                {t('helpPlatform')}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-black dark:text-white mb-12 leading-relaxed">
              {t('oneStopAssistance')}
            </p>

            {/* CTA Button */}
            <Button 
              onClick={() => navigate('/schemes')} 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <span>
                {t('exploreAllSchemes')}
              </span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* User Type Selection - New Color Palette */}
      <section className="relative py-16 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              {t('whoAreYou')}
            </h2>
            <p className="text-lg text-black dark:text-white max-w-2xl mx-auto">
              {t('chooseCategory')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-accent-bg/30 bg-white dark:bg-gray-800 group`}
                  onClick={() => handleUserTypeSelect(type.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className={`text-2xl font-bold text-orange-600 dark:text-orange-400 mb-3`}>
                      {type.title}
                    </h3>
                    
                    <p className="text-black dark:text-white mb-6 leading-relaxed">
                      {type.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {type.schemes.slice(0, 3).map((scheme, index) => (
                        <div key={index} className="flex items-center justify-center space-x-2 text-sm text-black dark:text-white">
                          <CheckCircle className="w-4 h-4 text-orange-600" />
                          <span>{scheme}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full bg-orange-500 hover:bg-orange-600 hover:shadow-lg transition-all duration-200`}
                    >
                      <span className="text-white font-semibold">
                        {t('viewSchemes')}
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

      {/* Featured Schemes - New Color Palette */}
      <section className="relative py-16 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              {t('popularGovSchemes')}
            </h2>
            <p className="text-lg text-black dark:text-white">
              {t('mostAccessedSchemes')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSchemes.map((scheme, index) => (
              <Card key={index} className="bg-orange-100 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200 cursor-pointer group border border-accent-bg/20">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {scheme.icon}
                  </div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2">{scheme.name}</h3>
                  <p className="text-black dark:text-white text-sm mb-4">{scheme.description}</p>
                  <Badge variant="secondary" className="text-xs bg-orange-500/20 text-orange-600 dark:text-orange-400">
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
              className="border-2 border-accent-bg text-orange-600 hover:bg-orange-500 hover:text-white"
            >
              {t('viewAllSchemes')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}