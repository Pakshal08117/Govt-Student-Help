// AI Service - Intelligent Problem Solving Engine with Comprehensive Website Data
import { schemes } from '@/data/schemes';

export interface AIResponse {
  message: string;
  schemes: any[];
  actionable: boolean;
  category: string;
}

// Comprehensive website data and services with all 12 Indian languages
const websiteServices = {
  platformFeatures: {
    en: [
      "🎯 40+ Government Schemes & Scholarships",
      "🌍 Support in 12 Indian Languages",
      "📱 Mobile-Friendly Interface",
      "🔒 Secure Application Process",
      "📞 24x7 Helpline Support (1077)",
      "🏛️ Government Verified Information",
      "📊 Real-time Application Tracking",
      "🤖 AI-Powered Scheme Recommendations",
      "📄 Document Assistance & Guidance",
      "💬 Multi-language Voice Support"
    ],
    hi: [
      "🎯 40+ सरकारी योजनाएं और छात्रवृत्ति",
      "🌍 12 भारतीय भाषाओं में सहायता",
      "📱 मोबाइल-फ्रेंडली इंटरफेस",
      "🔒 सुरक्षित आवेदन प्रक्रिया",
      "📞 24x7 हेल्पलाइन सहायता (1077)",
      "🏛️ सरकार सत्यापित जानकारी",
      "📊 रियल-टाइम आवेदन ट्रैकिंग",
      "🤖 AI-संचालित योजना सुझाव",
      "📄 दस्तावेज़ सहायता और मार्गदर्शन",
      "💬 बहुभाषी आवाज सहायता"
    ],
    mr: [
      "🎯 40+ सरकारी योजना आणि शिष्यवृत्ती",
      "🌍 12 भारतीय भाषांमध्ये सहाय्य",
      "📱 मोबाइल-फ्रेंडली इंटरफेस",
      "🔒 सुरक्षित अर्ज प्रक्रिया",
      "📞 24x7 हेल्पलाइन सहाय्य (1077)",
      "🏛️ सरकार सत्यापित माहिती",
      "📊 रिअल-टाइम अर्ज ट्रॅकिंग",
      "🤖 AI-संचालित योजना सुचवणे",
      "📄 कागदपत्र सहाय्य आणि मार्गदर्शन",
      "💬 बहुभाषी आवाज सहाय्य"
    ],
    bn: [
      "🎯 40+ সরকারি প্রকল্প ও বৃত্তি",
      "🌍 12টি ভারতীয় ভাষায় সহায়তা",
      "📱 মোবাইল-বান্ধব ইন্টারফেস",
      "🔒 নিরাপদ আবেদন প্রক্রিয়া",
      "📞 24x7 হেল্পলাইন সহায়তা (1077)",
      "🏛️ সরকার যাচাইকৃত তথ্য",
      "📊 রিয়েল-টাইম আবেদন ট্র্যাকিং",
      "🤖 AI-চালিত প্রকল্প সুপারিশ",
      "📄 নথি সহায়তা ও নির্দেশনা",
      "💬 বহুভাষিক ভয়েস সহায়তা"
    ],
    te: [
      "🎯 40+ ప్రభుత్వ పథకాలు & స్కాలర్‌షిప్‌లు",
      "🌍 12 భారతీయ భాషలలో మద్దతు",
      "📱 మొబైల్-స్నేహపూర్వక ఇంటర్‌ఫేస్",
      "🔒 సురక్షిత దరఖాస్తు ప్రక్రియ",
      "📞 24x7 హెల్ప్‌లైన్ మద్దతు (1077)",
      "🏛️ ప్రభుత్వం ధృవీకరించిన సమాచారం",
      "📊 రియల్-టైమ్ దరఖాస్తు ట్రాకింగ్",
      "🤖 AI-ఆధారిత పథకం సిఫార్సులు",
      "📄 పత్రాల సహాయం & మార్గదర్శకత్వం",
      "💬 బహుభాషా వాయిస్ మద్దతు"
    ],
    ta: [
      "🎯 40+ அரசு திட்டங்கள் & உதவித்தொகைகள்",
      "🌍 12 இந்திய மொழிகளில் ஆதரவு",
      "📱 மொபைல்-நட்பு இடைமுகம்",
      "🔒 பாதுகாப்பான விண்ணப்ப செயல்முறை",
      "📞 24x7 உதவி எண் ஆதரவு (1077)",
      "🏛️ அரசு சரிபார்க்கப்பட்ட தகவல்",
      "📊 நிகழ்நேர விண்ணப்ப கண்காணிப்பு",
      "🤖 AI-இயங்கும் திட்ட பரிந்துரைகள்",
      "📄 ஆவண உதவி & வழிகாட்டுதல்",
      "💬 பல்மொழி குரல் ஆதரவு"
    ],
    gu: [
      "🎯 40+ સરકારી યોજનાઓ અને શિષ્યવૃત્તિઓ",
      "🌍 12 ભારતીય ભાષાઓમાં સહાય",
      "📱 મોબાઇલ-મૈત્રીપૂર્ણ ઇન્ટરફેસ",
      "🔒 સુરક્ષિત અરજી પ્રક્રિયા",
      "📞 24x7 હેલ્પલાઇન સહાય (1077)",
      "🏛️ સરકાર ચકાસેલી માહિતી",
      "📊 રિયલ-ટાઇમ અરજી ટ્રેકિંગ",
      "🤖 AI-સંચાલિત યોજના ભલામણો",
      "📄 દસ્તાવેજ સહાય અને માર્ગદર્શન",
      "💬 બહુભાષી અવાજ સહાય"
    ],
    kn: [
      "🎯 40+ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು",
      "🌍 12 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಬೆಂಬಲ",
      "📱 ಮೊಬೈಲ್-ಸ್ನೇಹಿ ಇಂಟರ್ಫೇಸ್",
      "🔒 ಸುರಕ್ಷಿತ ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ",
      "📞 24x7 ಸಹಾಯವಾಣಿ ಬೆಂಬಲ (1077)",
      "🏛️ ಸರ್ಕಾರ ಪರಿಶೀಲಿಸಿದ ಮಾಹಿತಿ",
      "📊 ನೈಜ-ಸಮಯ ಅರ್ಜಿ ಟ್ರ್ಯಾಕಿಂಗ್",
      "🤖 AI-ಚಾಲಿತ ಯೋಜನೆ ಶಿಫಾರಸುಗಳು",
      "📄 ದಾಖಲೆ ಸಹಾಯ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ",
      "💬 ಬಹುಭಾಷಾ ಧ್ವನಿ ಬೆಂಬಲ"
    ],
    ml: [
      "🎯 40+ സർക്കാർ പദ്ധതികളും സ്കോളർഷിപ്പുകളും",
      "🌍 12 ഇന്ത്യൻ ഭാഷകളിൽ പിന്തുണ",
      "📱 മൊബൈൽ-സൗഹൃദ ഇന്റർഫേസ്",
      "🔒 സുരക്ഷിത അപേക്ഷാ പ്രക്രിയ",
      "📞 24x7 ഹെൽപ്പ്‌ലൈൻ പിന്തുണ (1077)",
      "🏛️ സർക്കാർ പരിശോധിച്ച വിവരങ്ങൾ",
      "📊 തത്സമയ അപേക്ഷാ ട്രാക്കിംഗ്",
      "🤖 AI-പവർഡ് സ്കീം ശുപാർശകൾ",
      "📄 ഡോക്യുമെന്റ് സഹായവും മാർഗ്ഗനിർദ്ദേശവും",
      "💬 ബഹുഭാഷാ വോയ്‌സ് പിന്തുണ"
    ],
    pa: [
      "🎯 40+ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਸਕਾਲਰਸ਼ਿਪਾਂ",
      "🌍 12 ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਸਹਾਇਤਾ",
      "📱 ਮੋਬਾਈਲ-ਦੋਸਤ ਇੰਟਰਫੇਸ",
      "🔒 ਸੁਰੱਖਿਅਤ ਅਰਜ਼ੀ ਪ੍ਰਕਿਰਿਆ",
      "📞 24x7 ਹੈਲਪਲਾਈਨ ਸਹਾਇਤਾ (1077)",
      "🏛️ ਸਰਕਾਰ ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ ਜਾਣਕਾਰੀ",
      "📊 ਰੀਅਲ-ਟਾਈਮ ਅਰਜ਼ੀ ਟਰੈਕਿੰਗ",
      "🤖 AI-ਸੰਚਾਲਿਤ ਸਕੀਮ ਸਿਫਾਰਸ਼ਾਂ",
      "📄 ਦਸਤਾਵੇਜ਼ ਸਹਾਇਤਾ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ",
      "💬 ਬਹੁ-ਭਾਸ਼ਾਈ ਆਵਾਜ਼ ਸਹਾਇਤਾ"
    ],
    or: [
      "🎯 40+ ସରକାରୀ ଯୋଜନା ଏବଂ ଛାତ୍ରବୃତ୍ତି",
      "🌍 12ଟି ଭାରତୀୟ ଭାଷାରେ ସହାୟତା",
      "📱 ମୋବାଇଲ୍-ବନ୍ଧୁ ଇଣ୍ଟରଫେସ୍",
      "🔒 ସୁରକ୍ଷିତ ଆବେଦନ ପ୍ରକ୍ରିୟା",
      "📞 24x7 ହେଲ୍ପଲାଇନ୍ ସହାୟତା (1077)",
      "🏛️ ସରକାର ଯାଞ୍ଚିତ ସୂଚନା",
      "📊 ରିଅଲ୍-ଟାଇମ୍ ଆବେଦନ ଟ୍ରାକିଂ",
      "🤖 AI-ଚାଳିତ ଯୋଜନା ସୁପାରିଶ",
      "📄 ଦଲିଲ ସହାୟତା ଏବଂ ମାର୍ଗଦର୍ଶନ",
      "💬 ବହୁଭାଷୀ ସ୍ୱର ସହାୟତା"
    ],
    as: [
      "🎯 40+ চৰকাৰী আঁচনি আৰু বৃত্তি",
      "🌍 12টা ভাৰতীয় ভাষাত সহায়",
      "📱 মোবাইল-বন্ধুত্বপূৰ্ণ ইণ্টাৰফেচ",
      "🔒 সুৰক্ষিত আবেদন প্ৰক্ৰিয়া",
      "📞 24x7 হেল্পলাইন সহায় (1077)",
      "🏛️ চৰকাৰ সত্যাপিত তথ্য",
      "📊 ৰিয়েল-টাইম আবেদন ট্ৰেকিং",
      "🤖 AI-চালিত আঁচনি পৰামৰ্শ",
      "📄 নথি সহায় আৰু নিৰ্দেশনা",
      "💬 বহুভাষিক কণ্ঠস্বৰ সহায়"
    ]
  },

  availablePages: {
    en: [
      "🏠 Homepage - Platform overview and quick access",
      "📋 Schemes - Browse 40+ government schemes",
      "🎓 Scholarships - Education funding opportunities",
      "👤 User Dashboard - Profile and application management",
      "🔍 Search - Find schemes by category or keyword",
      "📞 Contact - Helplines and support information",
      "ℹ️ About - Platform features and information",
      "🔐 Admin Panel - Management interface (Admin only)",
      "📊 Application Tracking - Real-time status updates"
    ],
    hi: [
      "🏠 होमपेज - प्लेटफॉर्म अवलोकन और त्वरित पहुंच",
      "📋 योजनाएं - 40+ सरकारी योजनाएं ब्राउज़ करें",
      "🎓 छात्रवृत्ति - शिक्षा फंडिंग अवसर",
      "👤 उपयोगकर्ता डैशबोर्ड - प्रोफ़ाइल और आवेदन प्रबंधन",
      "🔍 खोज - श्रेणी या कीवर्ड द्वारा योजनाएं खोजें",
      "📞 संपर्क - हेल्पलाइन और सहायता जानकारी",
      "ℹ️ के बारे में - प्लेटफॉर्म सुविधाएं और जानकारी",
      "🔐 एडमिन पैनल - प्रबंधन इंटरफेस (केवल एडमिन)",
      "📊 आवेदन ट्रैकिंग - रियल-टाइम स्थिति अपडेट"
    ],
    mr: [
      "🏠 होमपेज - प्लॅटफॉर्म अवलोकन आणि द्रुत प्रवेश",
      "📋 योजना - 40+ सरकारी योजना ब्राउझ करा",
      "🎓 शिष्यवृत्ती - शिक्षण निधी संधी",
      "👤 वापरकर्ता डॅशबोर्ड - प्रोफाइल आणि अर्ज व्यवस्थापन",
      "🔍 शोध - श्रेणी किंवा कीवर्डनुसार योजना शोधा",
      "📞 संपर्क - हेल्पलाइन आणि सहाय्य माहिती",
      "ℹ️ बद्दल - प्लॅटफॉर्म वैशिष्ट्ये आणि माहिती",
      "🔐 प्रशासक पॅनेल - व्यवस्थापन इंटरफेस (फक्त प्रशासक)",
      "📊 अर्ज ट्रॅकिंग - रिअल-टाइम स्थिती अपडेट"
    ]
  },

  supportedLanguages: {
    en: "English, Hindi, Marathi, Bengali, Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese",
    hi: "अंग्रेजी, हिंदी, मराठी, बंगाली, तेलुगु, तमिल, गुजराती, कन्नड़, मलयालम, पंजाबी, ओड़िया, असमिया",
    mr: "इंग्रजी, हिंदी, मराठी, बंगाली, तेलुगु, तमिळ, गुजराती, कन्नड, मल्याळम, पंजाबी, ओडिया, आसामी",
    bn: "ইংরেজি, হিন্দি, মারাঠি, বাংলা, তেলুগু, তামিল, গুজরাটি, কন্নড়, মালয়ালাম, পাঞ্জাবি, ওড়িয়া, অসমিয়া",
    te: "ఇంగ్లీష్, హిందీ, మరాఠీ, బెంగాలీ, తెలుగు, తమిళ్, గుజరాతీ, కన్నడ, మలయాళం, పంజాబీ, ఒడియా, అస్సామీస్",
    ta: "ஆங்கிலம், இந்தி, மராத்தி, வங்காளம், தெலுங்கு, தமிழ், குஜராத்தி, கன்னடம், மலையாளம், பஞ்சாபி, ஒடியா, அசாமி",
    gu: "અંગ્રેજી, હિન્દી, મરાઠી, બંગાળી, તેલુગુ, તમિલ, ગુજરાતી, કન્નડ, મલયાલમ, પંજાબી, ઓડિયા, આસામી",
    kn: "ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಮರಾಠಿ, ಬಂಗಾಳಿ, ತೆಲುಗು, ತಮಿಳು, ಗುಜರಾತಿ, ಕನ್ನಡ, ಮಲಯಾಳಂ, ಪಂಜಾಬಿ, ಒಡಿಯಾ, ಅಸ್ಸಾಮೀಸ್",
    ml: "ഇംഗ്ലീഷ്, ഹിന്ദി, മറാത്തി, ബംഗാളി, തെലുങ്ക്, തമിഴ്, ഗുജറാത്തി, കന്നഡ, മലയാളം, പഞ്ചാബി, ഒഡിയ, അസമിയ",
    pa: "ਅੰਗਰੇਜ਼ੀ, ਹਿੰਦੀ, ਮਰਾਠੀ, ਬੰਗਾਲੀ, ਤੇਲਗੂ, ਤਮਿਲ, ਗੁਜਰਾਤੀ, ਕੰਨੜ, ਮਲਿਆਲਮ, ਪੰਜਾਬੀ, ਓੜੀਆ, ਅਸਾਮੀ",
    or: "ଇଂରାଜୀ, ହିନ୍ଦୀ, ମରାଠୀ, ବଙ୍ଗାଳୀ, ତେଲୁଗୁ, ତାମିଲ୍, ଗୁଜରାଟୀ, କନ୍ନଡ଼, ମାଲାୟାଲମ୍, ପଞ୍ଜାବୀ, ଓଡ଼ିଆ, ଅସମୀୟା",
    as: "ইংৰাজী, হিন্দী, মাৰাঠী, বাংলা, তেলুগু, তামিল, গুজৰাটী, কন্নড়, মালায়ালাম, পাঞ্জাবী, ওড়িয়া, অসমীয়া"
  },

  helplineNumbers: {
    en: [
      "📞 National Citizen Helpline: 1077 (24x7)",
      "🏥 Ayushman Bharat: 14555",
      "🌾 PM-KISAN: 155261",
      "🎓 Scholarship Portal: 0120-6619540",
      "🚨 Emergency: 100 (Police), 108 (Ambulance)",
      "👩 Women Helpline: 181",
      "👶 Child Helpline: 1098"
    ],
    hi: [
      "📞 राष्ट्रीय नागरिक हेल्पलाइन: 1077 (24x7)",
      "🏥 आयुष्मान भारत: 14555",
      "🌾 पीएम-किसान: 155261",
      "🎓 छात्रवृत्ति पोर्टल: 0120-6619540",
      "🚨 आपातकाल: 100 (पुलिस), 108 (एम्बुलेंस)",
      "👩 महिला हेल्पलाइन: 181",
      "👶 बाल हेल्पलाइन: 1098"
    ],
    mr: [
      "📞 राष्ट्रीय नागरिक हेल्पलाइन: 1077 (24x7)",
      "🏥 आयुष्मान भारत: 14555",
      "🌾 पीएम-किसान: 155261",
      "🎓 शिष्यवृत्ती पोर्टल: 0120-6619540",
      "🚨 आपत्काल: 100 (पोलीस), 108 (रुग्णवाहिका)",
      "👩 महिला हेल्पलाइन: 181",
      "👶 बाल हेल्पलाइन: 1098"
    ]
  },

  governmentWebsites: {
    en: [
      "🏛️ india.gov.in - Official Government Portal",
      "📊 data.gov.in - Open Government Data",
      "🎓 scholarships.gov.in - National Scholarship Portal",
      "🏥 pmjay.gov.in - Ayushman Bharat Portal",
      "🌾 pmkisan.gov.in - PM-KISAN Portal",
      "💼 nrega.nic.in - MGNREGA Portal",
      "🏠 pmaymis.gov.in - PM Awas Yojana Portal"
    ],
    hi: [
      "🏛️ india.gov.in - आधिकारिक सरकारी पोर्टल",
      "📊 data.gov.in - खुला सरकारी डेटा",
      "🎓 scholarships.gov.in - राष्ट्रीय छात्रवृत्ति पोर्टल",
      "🏥 pmjay.gov.in - आयुष्मान भारत पोर्टल",
      "🌾 pmkisan.gov.in - पीएम-किसान पोर्टल",
      "💼 nrega.nic.in - मनरेगा पोर्टल",
      "🏠 pmaymis.gov.in - पीएम आवास योजना पोर्टल"
    ],
    mr: [
      "🏛️ india.gov.in - अधिकृत सरकारी पोर्टल",
      "📊 data.gov.in - मुक्त सरकारी डेटा",
      "🎓 scholarships.gov.in - राष्ट्रीय शिष्यवृत्ती पोर्टल",
      "🏥 pmjay.gov.in - आयुष्मान भारत पोर्टल",
      "🌾 pmkisan.gov.in - पीएम-किसान पोर्टल",
      "💼 nrega.nic.in - मनरेगा पोर्टल",
      "🏠 pmaymis.gov.in - पीएम आवास योजना पोर्टल"
    ]
  }
};

// Comprehensive keyword mapping for all problems
const problemKeywords = {
  health: {
    keywords: [
      'health', 'hospital', 'medical', 'treatment', 'doctor', 'surgery', 'illness', 'disease',
      'sick', 'medicine', 'operation', 'cancer', 'diabetes', 'heart', 'emergency', 'ambulance',
      'बीमार', 'आजार', 'उपचार', 'रुग्णालय', 'डॉक्टर', 'शस्त्रक्रिया', 'औषध',
      'इलाज', 'बीमारी', 'चिकित्सा', 'अस्पताल', 'दवा', 'ऑपरेशन', 'स्वास्थ्य'
    ],
    schemes: ['ayushman-bharat', 'pmsby', 'pmjjby']
  },
  education: {
    keywords: [
      'education', 'school', 'college', 'study', 'scholarship', 'fees', 'student', 'exam',
      'university', 'admission', 'books', 'tuition', 'learning', 'class', 'degree',
      'शिक्षण', 'शाळा', 'महाविद्यालय', 'अभ्यास', 'शिष्यवृत्ती', 'फी', 'विद्यार्थी',
      'शिक्षा', 'स्कूल', 'कॉलेज', 'छात्रवृत्ति', 'पढ़ाई', 'परीक्षा', 'फीस'
    ],
    schemes: ['nsp-post-matric-sc', 'nsp-post-matric-st', 'nsp-post-matric-obc', 'nsp-minority', 'inspire', 'nmms', 'pm-yasasvi', 'pragati-saksham']
  },
  girlChild: {
    keywords: [
      'girl', 'daughter', 'female', 'woman', 'lady', 'sister', 'girl child',
      'मुलगी', 'मुलीचे', 'बेटी', 'लड़की', 'महिला', 'बालिका', 'कन्या'
    ],
    schemes: ['sukanya-samriddhi', 'maha-lek-ladki', 'up-kanya-sumangala', 'guj-vahli-dikri']
  },
  agriculture: {
    keywords: [
      'farm', 'agriculture', 'crop', 'irrigation', 'farmer', 'field', 'harvest', 'land',
      'cultivation', 'seeds', 'fertilizer', 'tractor', 'farming', 'kisan',
      'खेती', 'शेती', 'शेतकरी', 'पीक', 'शेत', 'लागवड', 'बियाणे',
      'किसान', 'कृषि', 'खेत', 'फसल', 'बीज', 'खाद'
    ],
    schemes: ['pm-kisan', 'pm-fasal-bima', 'kisan-credit-card', 'maha-sharad-pawar-gram-samruddhata']
  },
  financial: {
    keywords: [
      'money', 'financial', 'income', 'poor', 'poverty', 'help', 'assistance', 'loan',
      'debt', 'payment', 'cash', 'fund', 'support', 'aid', 'bank', 'credit',
      'पैसे', 'आर्थिक', 'उत्पन्न', 'गरीब', 'मदत', 'सहाय्य', 'कर्ज',
      'आय', 'गरीबी', 'सहायता', 'रुपये', 'धन', 'पैसा', 'ऋण'
    ],
    schemes: ['mudra', 'standup-india', 'pmegp', 'pm-vishwakarma', 'kar-gruha-lakshmi', 'tn-kalaignar-magalir', 'wb-lakshmir-bhandar']
  },
  employment: {
    keywords: [
      'job', 'work', 'employment', 'unemployed', 'skill', 'training', 'business', 'rozgar',
      'नोकरी', 'काम', 'रोजगार', 'बेरोजगार', 'कौशल्य', 'प्रशिक्षण', 'व्यवसाय',
      'नौकरी', 'काम', 'बेरोज़गार', 'कौशल', 'ट्रेनिंग'
    ],
    schemes: ['pmkvy', 'mudra', 'standup-india', 'startup-india', 'pmegp']
  },
  housing: {
    keywords: [
      'house', 'home', 'housing', 'shelter', 'construction', 'building', 'awas',
      'घर', 'मकान', 'आवास', 'निर्माण', 'इमारत', 'घर', 'मकान'
    ],
    schemes: ['pmay-urban', 'pmay-gramin']
  },
  pension: {
    keywords: [
      'pension', 'old', 'elderly', 'senior', 'retirement', 'widow', 'disabled', 'वृद्ध',
      'पेंशन', 'वृद्ध', 'बुजुर्ग', 'सेवानिवृत्त', 'विधवा', 'दिव्यांग', 'बुढ़ापा'
    ],
    schemes: ['apy', 'nsap-oap', 'nsap-widow', 'nsap-disability', 'raj-palanhar']
  },
  women: {
    keywords: [
      'woman', 'women', 'female', 'mother', 'wife', 'pregnant', 'pregnancy',
      'महिला', 'स्त्री', 'माता', 'पत्नी', 'गर्भवती', 'गर्भावस्था', 'औरत'
    ],
    schemes: ['kar-gruha-lakshmi', 'tn-kalaignar-magalir', 'wb-lakshmir-bhandar', 'ujjwala']
  },
  children: {
    keywords: [
      'child', 'children', 'kids', 'baby', 'infant', 'orphan',
      'मूल', 'बच्चे', 'बच्चा', 'शिशु', 'अनाथ', 'बालक'
    ],
    schemes: ['raj-palanhar', 'ap-amma-vodi', 'maha-lek-ladki', 'up-kanya-sumangala']
  },
  food: {
    keywords: [
      'food', 'ration', 'grain', 'rice', 'wheat', 'hungry', 'nutrition',
      'अन्न', 'राशन', 'धान्य', 'तांदूळ', 'गहूं', 'भूख', 'पोषण', 'खाना'
    ],
    schemes: ['nfsa', 'ujjwala']
  },
  platform: {
    keywords: [
      'website', 'platform', 'features', 'services', 'help', 'support', 'how to use',
      'what can you do', 'capabilities', 'functions', 'pages', 'navigation',
      'वेबसाइट', 'प्लेटफॉर्म', 'सुविधाएं', 'सेवाएं', 'मदद', 'सहायता', 'कैसे उपयोग करें',
      'आप क्या कर सकते हैं', 'क्षमताएं', 'कार्य', 'पृष्ठ', 'नेवीगेशन'
    ],
    schemes: []
  }
};

// Analyze user input and detect problems
export function analyzeUserProblem(input: string): string[] {
  const lowerInput = input.toLowerCase();
  const detectedCategories: string[] = [];

  Object.entries(problemKeywords).forEach(([category, data]) => {
    const hasKeyword = data.keywords.some(keyword => 
      lowerInput.includes(keyword.toLowerCase())
    );
    if (hasKeyword) {
      detectedCategories.push(category);
    }
  });

  return detectedCategories;
}

// Get relevant schemes based on detected problems
export function getRelevantSchemes(categories: string[]): any[] {
  const schemeIds = new Set<string>();
  
  categories.forEach(category => {
    const categoryData = problemKeywords[category as keyof typeof problemKeywords];
    if (categoryData) {
      categoryData.schemes.forEach(id => schemeIds.add(id));
    }
  });

  return schemes.filter(scheme => schemeIds.has(scheme.id));
}

// Generate comprehensive AI response with solutions
export function generateIntelligentResponse(
  userInput: string,
  lang: string = 'en'
): string {
  const categories = analyzeUserProblem(userInput);
  const relevantSchemes = getRelevantSchemes(categories);

  // Check for platform/website related queries
  if (categories.includes('platform') || 
      userInput.toLowerCase().includes('website') ||
      userInput.toLowerCase().includes('platform') ||
      userInput.toLowerCase().includes('features') ||
      userInput.toLowerCase().includes('services') ||
      userInput.toLowerCase().includes('help') ||
      userInput.toLowerCase().includes('what can you do') ||
      userInput.toLowerCase().includes('वेबसाइट') ||
      userInput.toLowerCase().includes('प्लेटफॉर्म') ||
      userInput.toLowerCase().includes('सुविधाएं')) {
    return generatePlatformInfoResponse(lang);
  }

  // If no specific schemes found, provide general guidance
  if (relevantSchemes.length === 0) {
    return getGeneralGuidance(userInput, lang);
  }

  return generateSchemeResponse(relevantSchemes, lang, userInput);
}

// Generate comprehensive platform information response
function generatePlatformInfoResponse(lang: string): string {
  const responses = {
    en: `🌟 **Welcome to Government & Student Help Platform!**

🎯 **Our Platform Features:**
${websiteServices.platformFeatures.en.join('\n')}

📱 **Available Pages & Services:**
${websiteServices.availablePages.en.join('\n')}

🌍 **Supported Languages:**
${websiteServices.supportedLanguages.en}

📞 **Important Helplines:**
${websiteServices.helplineNumbers.en.join('\n')}

🏛️ **Official Government Websites:**
${websiteServices.governmentWebsites.en.join('\n')}

💡 **How to Use:**
1. Browse schemes by category or state
2. Use voice commands or type your queries
3. Get personalized scheme recommendations
4. Track your applications in real-time
5. Access document guidance and support

🤖 **AI Assistant Capabilities:**
• Understand problems in 12 languages
• Provide scheme recommendations
• Voice interaction support
• Real-time application guidance
• Document assistance
• Navigation help

Need specific help? Just ask me about any scheme, service, or feature!`,

    hi: `🌟 **सरकारी व छात्र सहायता प्लेटफॉर्म में आपका स्वागत है!**

🎯 **हमारी प्लेटफॉर्म सुविधाएं:**
${websiteServices.platformFeatures.hi.join('\n')}

📱 **उपलब्ध पृष्ठ और सेवाएं:**
${websiteServices.availablePages.hi.join('\n')}

🌍 **समर्थित भाषाएं:**
${websiteServices.supportedLanguages.hi}

📞 **महत्वपूर्ण हेल्पलाइन:**
${websiteServices.helplineNumbers.hi.join('\n')}

🏛️ **आधिकारिक सरकारी वेबसाइट:**
${websiteServices.governmentWebsites.hi.join('\n')}

💡 **उपयोग कैसे करें:**
1. श्रेणी या राज्य के अनुसार योजनाएं ब्राउज़ करें
2. आवाज कमांड का उपयोग करें या अपने प्रश्न टाइप करें
3. व्यक्तिगत योजना सुझाव प्राप्त करें
4. अपने आवेदनों को रियल-टाइम में ट्रैक करें
5. दस्तावेज़ मार्गदर्शन और सहायता प्राप्त करें

🤖 **AI सहायक क्षमताएं:**
• 12 भाषाओं में समस्याओं को समझना
• योजना सुझाव प्रदान करना
• आवाज इंटरैक्शन सहायता
• रियल-टाइम आवेदन मार्गदर्शन
• दस्तावेज़ सहायता
• नेवीगेशन सहायता

विशिष्ट सहायता चाहिए? किसी भी योजना, सेवा या सुविधा के बारे में मुझसे पूछें!`,

    mr: `🌟 **सरकारी व विद्यार्थी मदत प्लॅटफॉर्मवर आपले स्वागत आहे!**

🎯 **आमच्या प्लॅटफॉर्मची वैशिष्ट्ये:**
${websiteServices.platformFeatures.mr.join('\n')}

📱 **उपलब्ध पृष्ठे आणि सेवा:**
${websiteServices.availablePages.mr.join('\n')}

🌍 **समर्थित भाषा:**
${websiteServices.supportedLanguages.mr}

📞 **महत्वाच्या हेल्पलाइन:**
${websiteServices.helplineNumbers.mr.join('\n')}

🏛️ **अधिकृत सरकारी वेबसाइट:**
${websiteServices.governmentWebsites.mr.join('\n')}

💡 **वापर कसा करावा:**
1. श्रेणी किंवा राज्यानुसार योजना ब्राउझ करा
2. आवाज कमांड वापरा किंवा तुमचे प्रश्न टाइप करा
3. वैयक्तिक योजना सुचवणे मिळवा
4. तुमचे अर्ज रिअल-टाइममध्ये ट्रॅक करा
5. कागदपत्र मार्गदर्शन आणि सहाय्य मिळवा

🤖 **AI सहाय्यक क्षमता:**
• 12 भाषांमध्ये समस्या समजून घेणे
• योजना सुचवणे प्रदान करणे
• आवाज संवाद सहाय्य
• रिअल-टाइम अर्ज मार्गदर्शन
• कागदपत्र सहाय्य
• नेव्हिगेशन सहाय्य

विशिष्ट मदत हवी आहे? कोणत्याही योजना, सेवा किंवा वैशिष्ट्याबद्दल मला विचारा!`
  };

  return responses[lang as keyof typeof responses] || responses.en;
}

// Enhanced conversation state management
interface ConversationState {
  lastInput: string;
  lastResponse: string;
  timestamp: number;
  responseCount: number;
  context: string[];
}

const conversationStates = new Map<string, ConversationState>();
const CACHE_DURATION = 60000; // 1 minute
const MAX_SAME_RESPONSE = 2; // Maximum times same response can be given

// Generate contextual response with conversation memory
export function generateCachedResponse(userInput: string, lang: string = 'en'): string {
  const sessionId = 'default'; // In real app, use user session ID
  const normalizedInput = userInput.toLowerCase().trim();
  
  // Get or create conversation state
  let state = conversationStates.get(sessionId);
  if (!state) {
    state = {
      lastInput: '',
      lastResponse: '',
      timestamp: 0,
      responseCount: 0,
      context: []
    };
  }

  // Check if user is asking the same thing repeatedly
  const isSimilarInput = state.lastInput && 
    (normalizedInput === state.lastInput || 
     normalizedInput.includes(state.lastInput) || 
     state.lastInput.includes(normalizedInput));

  if (isSimilarInput && state.responseCount >= MAX_SAME_RESPONSE) {
    const clarificationMessages = {
      en: "🤔 I notice you're asking about the same thing. Let me help differently!\n\n💡 **What would be most helpful?**\n• Should I explain the application process step-by-step?\n• Do you need help finding documents?\n• Would you like me to find the nearest office?\n• Do you want to speak to a human agent?\n\n📞 **Or call our helpline directly: 1077**\n\nJust tell me: 'I need help with documents' or 'Find nearest office' or 'Call agent'",
      mr: "🤔 तुम्ही त्याच गोष्टीबद्दल विचारत आहात असे दिसते. मी वेगळ्या पद्धतीने मदत करतो!\n\n💡 **काय सर्वात उपयुक्त असेल?**\n• मी अर्ज प्रक्रिया चरण-दर-चरण समजावू का?\n• कागदपत्रे शोधण्यात मदत हवी आहे का?\n• जवळचे कार्यालय शोधू का?\n• तुम्हाला माणसाशी बोलायचे आहे का?\n\n📞 **किंवा थेट आमच्या हेल्पलाइनवर कॉल करा: 1077**\n\nफक्त सांगा: 'कागदपत्रांसाठी मदत हवी' किंवा 'जवळचे कार्यालय शोधा' किंवा 'एजंटला कॉल करा'",
      hi: "🤔 लगता है आप वही चीज़ बार-बार पूछ रहे हैं। मैं अलग तरीके से मदद करता हूं!\n\n💡 **सबसे ज्यादा क्या मददगार होगा?**\n• क्या मैं आवेदन प्रक्रिया चरण-दर-चरण समझाऊं?\n• क्या दस्तावेज़ खोजने में मदद चाहिए?\n• क्या निकटतम कार्यालय खोजूं?\n• क्या आप किसी इंसान से बात करना चाहते हैं?\n\n📞 **या सीधे हमारी हेल्पलाइन पर कॉल करें: 1077**\n\nबस बताएं: 'दस्तावेज़ों में मदद चाहिए' या 'निकटतम कार्यालय खोजें' या 'एजेंट को कॉल करें'"
    };
    
    // Reset state for fresh conversation
    state.responseCount = 0;
    state.context = [];
    
    return clarificationMessages[lang as keyof typeof clarificationMessages] || clarificationMessages.en;
  }

  // Generate new response with context
  let response: string;
  
  // Check for specific follow-up queries
  if (normalizedInput.includes('documents') || normalizedInput.includes('कागदपत्र') || normalizedInput.includes('दस्तावेज़')) {
    response = handleSpecificQuery(userInput, lang) || generateIntelligentResponse(userInput, lang);
  } else if (normalizedInput.includes('office') || normalizedInput.includes('कार्यालय')) {
    response = getOfficeLocationHelp(lang);
  } else if (normalizedInput.includes('agent') || normalizedInput.includes('human') || normalizedInput.includes('व्यक्ती') || normalizedInput.includes('इंसान')) {
    response = getHumanAgentHelp(lang);
  } else {
    response = generateIntelligentResponse(userInput, lang);
  }

  // Update conversation state
  if (isSimilarInput) {
    state.responseCount++;
  } else {
    state.responseCount = 1;
    state.context.push(normalizedInput);
    if (state.context.length > 5) {
      state.context = state.context.slice(-5); // Keep last 5 interactions
    }
  }

  state.lastInput = normalizedInput;
  state.lastResponse = response;
  state.timestamp = Date.now();
  
  conversationStates.set(sessionId, state);

  // Clean old conversation states
  if (conversationStates.size > 100) {
    const now = Date.now();
    for (const [key, value] of conversationStates.entries()) {
      if (now - value.timestamp > CACHE_DURATION * 10) { // 10 minutes
        conversationStates.delete(key);
      }
    }
  }

  return response;
}

// Helper function for office location assistance
function getOfficeLocationHelp(lang: string): string {
  const messages = {
    en: "📍 **Find Nearest Government Office:**\n\n🏛️ **Common Offices:**\n• **Tehsil Office** - For income/caste certificates\n• **Block Development Office** - For rural schemes\n• **District Collector Office** - For major schemes\n• **Anganwadi Center** - For women/child schemes\n• **Primary Health Center** - For health schemes\n\n🔍 **How to Find:**\n1. Visit: **locator.gov.in**\n2. Enter your PIN code\n3. Select office type\n4. Get address & phone number\n\n📞 **Or call 1077** and say 'Find nearest office for [scheme name]'\n\n💡 **Pro Tip:** Call the office before visiting to confirm timings and required documents!",
    mr: "📍 **जवळचे सरकारी कार्यालय शोधा:**\n\n🏛️ **सामान्य कार्यालये:**\n• **तहसील कार्यालय** - उत्पन्न/जात प्रमाणपत्रांसाठी\n• **खंड विकास कार्यालय** - ग्रामीण योजनांसाठी\n• **जिल्हाधिकारी कार्यालय** - मोठ्या योजनांसाठी\n• **अंगणवाडी केंद्र** - महिला/बाल योजनांसाठी\n• **प्राथमिक आरोग्य केंद्र** - आरोग्य योजनांसाठी\n\n🔍 **कसे शोधावे:**\n1. भेट द्या: **locator.gov.in**\n2. तुमचा पिन कोड टाका\n3. कार्यालयाचा प्रकार निवडा\n4. पत्ता आणि फोन नंबर मिळवा\n\n📞 **किंवा 1077 वर कॉल करा** आणि म्हणा 'Find nearest office for [योजनेचे नाव]'\n\n💡 **प्रो टिप:** भेट देण्यापूर्वी कार्यालयात कॉल करून वेळ आणि आवश्यक कागदपत्रे पुष्टी करा!",
    hi: "📍 **निकटतम सरकारी कार्यालय खोजें:**\n\n🏛️ **सामान्य कार्यालय:**\n• **तहसील कार्यालय** - आय/जाति प्रमाण पत्र के लिए\n• **खंड विकास कार्यालय** - ग्रामीण योजनाओं के लिए\n• **जिला कलेक्टर कार्यालय** - बड़ी योजनाओं के लिए\n• **आंगनवाड़ी केंद्र** - महिला/बाल योजनाओं के लिए\n• **प्राथमिक स्वास्थ्य केंद्र** - स्वास्थ्य योजनाओं के लिए\n\n🔍 **कैसे खोजें:**\n1. विजिट करें: **locator.gov.in**\n2. अपना पिन कोड डालें\n3. कार्यालय प्रकार चुनें\n4. पता और फोन नंबर पाएं\n\n📞 **या 1077 पर कॉल करें** और कहें 'Find nearest office for [योजना का नाम]'\n\n💡 **प्रो टिप:** जाने से पहले कार्यालय में कॉल करके समय और आवश्यक दस्तावेज़ों की पुष्टि करें!"
  };
  return messages[lang as keyof typeof messages] || messages.en;
}

// Helper function for human agent assistance
function getHumanAgentHelp(lang: string): string {
  const messages = {
    en: "👨‍💼 **Talk to Human Agent:**\n\n📞 **Immediate Help:**\n• **Call 1077** - National Citizen Helpline (24x7)\n• **Call 155261** - PM-KISAN Helpline\n• **Call 14555** - Ayushman Bharat Helpline\n• **Call 0120-6619540** - Scholarship Helpline\n\n🏛️ **Visit Local Office:**\n• Tehsil Office (9 AM - 5 PM)\n• Block Development Office (10 AM - 4 PM)\n• District Collector Office (10 AM - 5 PM)\n\n💬 **What to Say:**\n'I need help with [scheme name] application'\n'I want to check my application status'\n'I need help with documents'\n\n⏰ **Best Time to Call:** 10 AM - 4 PM (Monday to Friday)\n\n🆔 **Keep Ready:** Your Aadhar number, mobile number, and application ID (if any)",
    mr: "👨‍💼 **माणसाशी बोला:**\n\n📞 **तत्काळ मदत:**\n• **1077 वर कॉल करा** - राष्ट्रीय नागरिक हेल्पलाइन (24x7)\n• **155261 वर कॉल करा** - PM-KISAN हेल्पलाइन\n• **14555 वर कॉल करा** - आयुष्मान भारत हेल्पलाइन\n• **0120-6619540 वर कॉल करा** - शिष्यवृत्ती हेल्पलाइन\n\n🏛️ **स्थानिक कार्यालयाला भेट द्या:**\n• तहसील कार्यालय (सकाळी 9 - संध्याकाळी 5)\n• खंड विकास कार्यालय (सकाळी 10 - दुपारी 4)\n• जिल्हाधिकारी कार्यालय (सकाळी 10 - संध्याकाळी 5)\n\n💬 **काय म्हणावे:**\n'मला [योजनेचे नाव] अर्जासाठी मदत हवी'\n'मला माझ्या अर्जाची स्थिती तपासायची आहे'\n'मला कागदपत्रांसाठी मदत हवी'\n\n⏰ **कॉल करण्याची सर्वोत्तम वेळ:** सकाळी 10 - दुपारी 4 (सोमवार ते शुक्रवार)\n\n🆔 **तयार ठेवा:** तुमचा आधार नंबर, मोबाइल नंबर आणि अर्ज आयडी (असल्यास)",
    hi: "👨‍💼 **इंसान से बात करें:**\n\n📞 **तत्काल मदद:**\n• **1077 पर कॉल करें** - राष्ट्रीय नागरिक हेल्पलाइन (24x7)\n• **155261 पर कॉल करें** - PM-KISAN हेल्पलाइन\n• **14555 पर कॉल करें** - आयुष्मान भारत हेल्पलाइन\n• **0120-6619540 पर कॉल करें** - छात्रवृत्ति हेल्पलाइन\n\n🏛️ **स्थानीय कार्यालय जाएं:**\n• तहसील कार्यालय (सुबह 9 - शाम 5)\n• खंड विकास कार्यालय (सुबह 10 - दोपहर 4)\n• जिला कलेक्टर कार्यालय (सुबह 10 - शाम 5)\n\n💬 **क्या कहें:**\n'मुझे [योजना का नाम] आवेदन में मदद चाहिए'\n'मैं अपने आवेदन की स्थिति जांचना चाहता हूं'\n'मुझे दस्तावेज़ों में मदद चाहिए'\n\n⏰ **कॉल करने का सबसे अच्छा समय:** सुबह 10 - दोपहर 4 (सोमवार से शुक्रवार)\n\n🆔 **तैयार रखें:** आपका आधार नंबर, मोबाइल नंबर और आवेदन आईडी (यदि कोई हो)"
  };
  return messages[lang as keyof typeof messages] || messages.en;
}

// Generate detailed scheme response with solutions
function generateSchemeResponse(
  schemes: any[],
  lang: string,
  userInput: string
): string {
  const header = {
    en: "🎯 I found the perfect solutions for you!\n\n",
    mr: "🎯 मला तुमच्यासाठी योग्य उपाय सापडले!\n\n",
    hi: "🎯 मुझे आपके लिए सही समाधान मिल गए!\n\n"
  };

  let response = header[lang as keyof typeof header] || header.en;

  schemes.slice(0, 3).forEach((scheme, index) => {
    const name = scheme[`name_${lang}`] || scheme.name_en;
    const description = scheme[`description_${lang}`] || scheme.description_en;
    const benefits = scheme[`benefits_${lang}`] || scheme.benefits_en;

    response += `${index + 1}. 📋 **${name}**\n`;
    response += `   ${description}\n\n`;
    
    response += `   ✅ ${lang === 'mr' ? 'मुख्य फायदे' : lang === 'hi' ? 'मुख्य लाभ' : 'Key Benefits'}:\n`;
    benefits.slice(0, 2).forEach((benefit: string) => {
      response += `   • ${benefit}\n`;
    });
    response += '\n';

    // Add eligibility info
    if (scheme.eligibility.income) {
      response += `   💰 ${lang === 'mr' ? 'उत्पन्न मर्यादा' : lang === 'hi' ? 'आय सीमा' : 'Income Limit'}: ${scheme.eligibility.income}\n`;
    }
    
    response += `   📞 ${lang === 'mr' ? 'हेल्पलाइन' : lang === 'hi' ? 'हेल्पलाइन' : 'Helpline'}: ${scheme.helpline}\n`;
    
    if (scheme.website) {
      response += `   🌐 ${lang === 'mr' ? 'अधिकृत वेबसाइट' : lang === 'hi' ? 'आधिकारिक वेबसाइट' : 'Official Website'}: ${scheme.website}\n`;
    }
    response += '\n';
  });

  const actionSteps = {
    en: "🚀 **Next Steps:**\n1. Click 'Schemes' page to see full details\n2. Prepare required documents\n3. Call helpline for guidance\n4. Apply online or visit office\n\n💬 Need help with documents or application? Just ask me!",
    mr: "🚀 **पुढील पायऱ्या:**\n1. संपूर्ण तपशील पाहण्यासाठी 'योजना' पृष्ठावर क्लिक करा\n2. आवश्यक कागदपत्रे तयार करा\n3. मार्गदर्शनासाठी हेल्पलाइनवर कॉल करा\n4. ऑनलाइन अर्ज करा किंवा कार्यालयाला भेट द्या\n\n💬 कागदपत्रे किंवा अर्जात मदत हवी? मला विचारा!",
    hi: "🚀 **अगले कदम:**\n1. पूरी जानकारी के लिए 'योजनाएं' पृष्ठ पर क्लिक करें\n2. आवश्यक दस्तावेज़ तैयार करें\n3. मार्गदर्शन के लिए हेल्पलाइन पर कॉल करें\n4. ऑनलाइन आवेदन करें या कार्यालय जाएं\n\n💬 दस्तावेज़ या आवेदन में मदद चाहिए? मुझसे पूछें!"
  };

  response += actionSteps[lang as keyof typeof actionSteps] || actionSteps.en;

  return response;
}

// Provide general guidance when no specific schemes match
function getGeneralGuidance(userInput: string, lang: string): string {
  const lowerInput = userInput.toLowerCase();
  
  // Check for common queries
  if (lowerInput.match(/hello|hi|hey|नमस्ते|नमस्कार/i)) {
    const greetings = {
      en: "👋 Hello! I'm your Government Schemes Assistant.\n\n🎯 I can help you find:\n• Health insurance schemes\n• Education scholarships\n• Financial assistance\n• Employment programs\n• Housing schemes\n• Pension benefits\n\n💬 Tell me your problem, like:\n'I need medical treatment'\n'My daughter needs school fees'\n'I'm a farmer, need financial help'\n\nHow can I help you today?",
      mr: "👋 नमस्कार! मी तुमचा सरकारी योजना सहाय्यक आहे.\n\n🎯 मी तुम्हाला शोधण्यात मदत करू शकतो:\n• आरोग्य विमा योजना\n• शिक्षण शिष्यवृत्ती\n• आर्थिक सहाय्य\n• रोजगार कार्यक्रम\n• गृहनिर्माण योजना\n• पेन्शन लाभ\n\n💬 मला तुमची समस्या सांगा, जसे:\n'मला वैद्यकीय उपचार हवे'\n'माझ्या मुलीला शाळेच्या फीसाठी मदत हवी'\n'मी शेतकरी आहे, आर्थिक मदत हवी'\n\nआज मी तुमची कशी मदत करू शकतो?",
      hi: "👋 नमस्ते! मैं आपका सरकारी योजना सहायक हूं।\n\n🎯 मैं आपको खोजने में मदद कर सकता हूं:\n• स्वास्थ्य बीमा योजनाएं\n• शिक्षा छात्रवृत्ति\n• वित्तीय सहायता\n• रोजगार कार्यक्रम\n• आवास योजनाएं\n• पेंशन लाभ\n\n💬 मुझे अपनी समस्या बताएं, जैसे:\n'मुझे चिकित्सा उपचार चाहिए'\n'मेरी बेटी को स्कूल की फीस चाहिए'\n'मैं किसान हूं, वित्तीय मदद चाहिए'\n\nआज मैं आपकी कैसे मदद कर सकता हूं?"
    };
    return greetings[lang as keyof typeof greetings] || greetings.en;
  }

  // Default helpful response
  const defaultResponses = {
    en: "🤔 I understand you need help, but I need more specific information.\n\n💡 **Please tell me:**\n• What specific problem are you facing?\n• What kind of help do you need?\n\n📋 **I can help with:**\n✅ Health & Medical schemes\n✅ Education & Scholarships\n✅ Financial assistance\n✅ Employment & Skills\n✅ Housing & Shelter\n✅ Pension & Welfare\n\n💬 **Examples:**\n'I need money for my daughter's education'\n'I'm sick and need free treatment'\n'I lost my job and need financial help'\n'I want to start a small business'\n\nJust describe your situation in simple words!",
    mr: "🤔 मला समजते की तुम्हाला मदत हवी आहे, पण मला अधिक विशिष्ट माहिती हवी आहे.\n\n💡 **कृपया मला सांगा:**\n• तुम्हाला नेमकी कोणती समस्या आहे?\n• तुम्हाला कोणत्या प्रकारची मदत हवी आहे?\n\n📋 **मी यामध्ये मदत करू शकतो:**\n✅ आरोग्य आणि वैद्यकीय योजना\n✅ शिक्षण आणि शिष्यवृत्ती\n✅ आर्थिक सहाय्य\n✅ रोजगार आणि कौशल्य\n✅ गृहनिर्माण आणि निवारा\n✅ पेन्शन आणि कल्याण\n\n💬 **उदाहरणे:**\n'माझ्या मुलीच्या शिक्षणासाठी पैसे हवेत'\n'मी आजारी आहे आणि मला मोफत उपचार हवेत'\n'माझी नोकरी गेली आहे आणि आर्थिक मदत हवी'\n'मला छोटा व्यवसाय सुरू करायचा आहे'\n\nफक्त तुमची परिस्थिती सोप्या शब्दांत सांगा!",
    hi: "🤔 मैं समझता हूं कि आपको मदद चाहिए, लेकिन मुझे अधिक विशिष्ट जानकारी चाहिए।\n\n💡 **कृपया मुझे बताएं:**\n• आपको वास्तव में क्या समस्या है?\n• आपको किस प्रकार की मदद चाहिए?\n\n📋 **मैं इनमें मदद कर सकता हूं:**\n✅ स्वास्थ्य और चिकित्सा योजनाएं\n✅ शिक्षा और छात्रवृत्ति\n✅ वित्तीय सहायता\n✅ रोजगार और कौशल\n✅ आवास और आश्रय\n✅ पेंशन और कल्याण\n\n💬 **उदाहरण:**\n'मेरी बेटी की शिक्षा के लिए पैसे चाहिए'\n'मैं बीमार हूं और मुफ्त इलाज चाहिए'\n'मेरी नौकरी चली गई है और वित्तीय मदद चाहिए'\n'मैं छोटा व्यवसाय शुरू करना चाहता हूं'\n\nबस अपनी स्थिति सरल शब्दों में बताएं!"
  };

  return defaultResponses[lang as keyof typeof defaultResponses] || defaultResponses.en;
}

// Handle specific queries
export function handleSpecificQuery(query: string, lang: string): string | null {
  const lowerQuery = query.toLowerCase();

  // Track application
  if (lowerQuery.match(/track|status|check|application|अर्ज|ट्रॅक|आवेदन|स्थिति/)) {
    const responses = {
      en: "📍 **Track Your Application:**\n\n🔍 **Method 1: Online Tracking**\n1. Go to 'Tracking' page on our website\n2. Enter your Application ID\n3. View real-time status updates\n\n📞 **Method 2: Helpline**\n• Call: 1077 (24x7 Citizen Helpline)\n• Have your Application ID ready\n\n📧 **Method 3: SMS**\n• You'll get SMS updates automatically\n• Check your registered mobile number\n\n❓ **Don't have Application ID?**\nEnter your mobile number or email on tracking page.\n\nNeed help finding your application?",
      mr: "📍 **तुमचा अर्ज ट्रॅक करा:**\n\n🔍 **पद्धत 1: ऑनलाइन ट्रॅकिंग**\n1. आमच्या वेबसाइटवर 'ट्रॅकिंग' पृष्ठावर जा\n2. तुमचा अर्ज आयडी प्रविष्ट करा\n3. रिअल-टाइम स्थिती अपडेट पहा\n\n📞 **पद्धत 2: हेल्पलाइन**\n• कॉल करा: 1077 (24x7 नागरिक हेल्पलाइन)\n• तुमचा अर्ज आयडी तयार ठेवा\n\n📧 **पद्धत 3: SMS**\n• तुम्हाला आपोआप SMS अपडेट मिळतील\n• तुमचा नोंदणीकृत मोबाइल नंबर तपासा\n\n❓ **अर्ज आयडी नाही?**\nट्रॅकिंग पृष्ठावर तुमचा मोबाइल नंबर किंवा ईमेल प्रविष्ट करा.\n\nतुमचा अर्ज शोधण्यात मदत हवी आहे का?",
      hi: "📍 **अपने आवेदन को ट्रैक करें:**\n\n🔍 **तरीका 1: ऑनलाइन ट्रैकिंग**\n1. हमारी वेबसाइट पर 'ट्रैकिंग' पृष्ठ पर जाएं\n2. अपना आवेदन आईडी दर्ज करें\n3. रीयल-टाइम स्थिति अपडेट देखें\n\n📞 **तरीका 2: हेल्पलाइन**\n• कॉल करें: 1077 (24x7 नागरिक हेल्पलाइन)\n• अपना आवेदन आईडी तैयार रखें\n\n📧 **तरीका 3: SMS**\n• आपको स्वचालित रूप से SMS अपडेट मिलेंगे\n• अपना पंजीकृत मोबाइल नंबर जांचें\n\n❓ **आवेदन आईडी नहीं है?**\nट्रैकिंग पृष्ठ पर अपना मोबाइल नंबर या ईमेल दर्ज करें।\n\nअपना आवेदन खोजने में मदद चाहिए?"
    };
    return responses[lang as keyof typeof responses] || responses.en;
  }

  // Contact/helpline
  if (lowerQuery.match(/contact|helpline|phone|call|number|संपर्क|हेल्पलाइन|फोन|नंबर/)) {
    const responses = {
      en: "📞 **Important Helplines & Contacts:**\n\n🏛️ **Government Helplines:**\n• National Citizen Helpline: 1077 (24x7)\n• PM-KISAN: 155261\n• Ayushman Bharat: 14555\n• Scholarship Portal: 0120-6619540\n\n🚨 **Emergency Services:**\n• Police: 100\n• Ambulance: 108\n• Fire: 101\n• Women Helpline: 181\n• Child Helpline: 1098\n\n📧 **Email Support:**\n• General: support@govhelp.in\n• Technical: tech@govhelp.in\n\n🕒 **Office Hours:**\n• Monday to Friday: 10:00 AM - 6:00 PM\n• Saturday: 10:00 AM - 2:00 PM\n\nWhich specific helpline do you need?",
      mr: "📞 **महत्त्वाच्या हेल्पलाइन आणि संपर्क:**\n\n🏛️ **सरकारी हेल्पलाइन:**\n• राष्ट्रीय नागरिक हेल्पलाइन: 1077 (24x7)\n• पीएम-किसान: 155261\n• आयुष्मान भारत: 14555\n• शिष्यवृत्ती पोर्टल: 0120-6619540\n\n🚨 **आपत्कालीन सेवा:**\n• पोलीस: 100\n• रुग्णवाहिका: 108\n• अग्निशामक: 101\n• महिला हेल्पलाइन: 181\n• बाल हेल्पलाइन: 1098\n\n📧 **ईमेल सपोर्ट:**\n• सामान्य: support@govhelp.in\n• तांत्रिक: tech@govhelp.in\n\n🕒 **कार्यालयीन वेळ:**\n• सोमवार ते शुक्रवार: सकाळी 10:00 - संध्याकाळी 6:00\n• शनिवार: सकाळी 10:00 - दुपारी 2:00\n\nतुम्हाला कोणती विशिष्ट हेल्पलाइन हवी आहे?",
      hi: "📞 **महत्वपूर्ण हेल्पलाइन और संपर्क:**\n\n🏛️ **सरकारी हेल्पलाइन:**\n• राष्ट्रीय नागरिक हेल्पलाइन: 1077 (24x7)\n• पीएम-किसान: 155261\n• आयुष्मान भारत: 14555\n• छात्रवृत्ति पोर्टल: 0120-6619540\n\n🚨 **आपातकालीन सेवाएं:**\n• पुलिस: 100\n• एम्बुलेंस: 108\n• दमकल: 101\n• महिला हेल्पलाइन: 181\n• बाल हेल्पलाइन: 1098\n\n📧 **ईमेल सपोर्ट:**\n• सामान्य: support@govhelp.in\n• तकनीकी: tech@govhelp.in\n\n🕒 **कार्यालय समय:**\n• सोमवार से शुक्रवार: सुबह 10:00 - शाम 6:00\n• शनिवार: सुबह 10:00 - दोपहर 2:00\n\nआपको कौन सी विशिष्ट हेल्पलाइन चाहिए?"
    };
    return responses[lang as keyof typeof responses] || responses.en;
  }

  // Documents help
  if (lowerQuery.match(/document|aadhar|ration|income|caste|certificate|कागदपत्र|आधार|प्रमाणपत्र|दस्तावेज़/)) {
    const responses = {
      en: "📄 **Document Assistance Center:**\n\n🆔 **Essential Documents:**\n• Aadhar Card (Identity)\n• Ration Card (Address + Family)\n• Income Certificate\n• Caste Certificate\n• Domicile Certificate\n• Bank Account Details\n\n🏢 **Where to Get:**\n• Aadhar: Nearest Aadhar Center\n• Income/Caste: Tehsil Office\n• Ration Card: Food & Supply Office\n• Bank Account: Any Bank Branch\n\n💡 **Pro Tips:**\n• Keep 10 photocopies of each\n• Scan and save digital copies\n• Never give originals to anyone\n• Apply 30 days before needed\n\n🔗 **Online Services:**\n• Aadhar: uidai.gov.in\n• Income/Caste: State Portal\n\nWhich document do you need help with?",
      mr: "📄 **कागदपत्र सहाय्य केंद्र:**\n\n🆔 **आवश्यक कागदपत्रे:**\n• आधार कार्ड (ओळख)\n• रेशन कार्ड (पत्ता + कुटुंब)\n• उत्पन्न प्रमाणपत्र\n• जात प्रमाणपत्र\n• अधिवास प्रमाणपत्र\n• बँक खाते तपशील\n\n🏢 **कुठे मिळेल:**\n• आधार: जवळचे आधार केंद्र\n• उत्पन्न/जात: तहसील कार्यालय\n• रेशन कार्ड: अन्न व पुरवठा कार्यालय\n• बँक खाते: कोणत्याही बँक शाखा\n\n💡 **उपयुक्त टिप्स:**\n• प्रत्येकाच्या 10 फोटोकॉपी ठेवा\n• स्कॅन करून डिजिटल प्रती सेव्ह करा\n• मूळ कागदपत्रे कोणालाही देऊ नका\n• गरज पडण्याच्या 30 दिवस आधी अर्ज करा\n\n🔗 **ऑनलाइन सेवा:**\n• आधार: uidai.gov.in\n• उत्पन्न/जात: राज्य पोर्टल\n\nतुम्हाला कोणत्या कागदपत्रासाठी मदत हवी आहे?",
      hi: "📄 **दस्तावेज़ सहायता केंद्र:**\n\n🆔 **आवश्यक दस्तावेज़:**\n• आधार कार्ड (पहचान)\n• राशन कार्ड (पता + परिवार)\n• आय प्रमाण पत्र\n• जाति प्रमाण पत्र\n• अधिवास प्रमाण पत्र\n• बैंक खाता विवरण\n\n🏢 **कहां मिलेगा:**\n• आधार: निकटतम आधार केंद्र\n• आय/जाति: तहसील कार्यालय\n• राशन कार्ड: खाद्य एवं आपूर्ति कार्यालय\n• बैंक खाता: किसी भी बैंक शाखा\n\n💡 **उपयोगी टिप्स:**\n• प्रत्येक की 10 फोटोकॉपी रखें\n• स्कैन करके डिजिटल कॉपी सेव करें\n• मूल दस्तावेज़ किसी को न दें\n• जरूरत से 30 दिन पहले आवेदन करें\n\n🔗 **ऑनलाइन सेवाएं:**\n• आधार: uidai.gov.in\n• आय/जाति: राज्य पोर्टल\n\nआपको किस दस्तावेज़ के लिए मदद चाहिए?"
    };
    return responses[lang as keyof typeof responses] || responses.en;
  }

  return null;
}