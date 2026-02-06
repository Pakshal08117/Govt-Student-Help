// AI Service for handling chat responses with intelligent problem analysis

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Enhanced AI response service with problem analysis
export function generateCachedResponse(message: string, lang: string = 'en'): string {
  const input = message.toLowerCase();
  
  // Quick responses for common queries
  const responses = getResponseTemplates(lang);
  
  // Education & Scholarships
  if (input.includes('scholarship') || input.includes('छात्रवृत्ति') || input.includes('शिष्यवृत्ती') || 
      input.includes('education') || input.includes('study') || input.includes('college') || 
      input.includes('school fees') || input.includes('शिक्षा') || input.includes('फीस')) {
    return responses.scholarship;
  }
  
  // Medical & Health
  if (input.includes('medical') || input.includes('health') || input.includes('hospital') || 
      input.includes('treatment') || input.includes('doctor') || input.includes('वैद्यकीय') || 
      input.includes('आरोग्य') || input.includes('इलाज') || input.includes('दवा')) {
    return responses.medical;
  }
  
  // Financial Help
  if (input.includes('money') || input.includes('loan') || input.includes('financial') || 
      input.includes('poor') || input.includes('poverty') || input.includes('पैसा') || 
      input.includes('कर्ज') || input.includes('आर्थिक') || input.includes('गरीब')) {
    return responses.financial;
  }
  
  // Agriculture & Farming
  if (input.includes('farmer') || input.includes('agriculture') || input.includes('crop') || 
      input.includes('farming') || input.includes('शेतकरी') || input.includes('कृषि') || 
      input.includes('पिक') || input.includes('खेती')) {
    return responses.agriculture;
  }
  
  // Documents
  if (input.includes('birth certificate') || input.includes('जन्म प्रमाण') || input.includes('जन्म दाखला')) {
    return responses.birthCert;
  }
  
  if (input.includes('ration card') || input.includes('राशन कार्ड') || input.includes('रेशन कार्ड')) {
    return responses.rationCard;
  }
  
  if (input.includes('income certificate') || input.includes('आय प्रमाण') || input.includes('उत्पन्न दाखला')) {
    return responses.incomeCert;
  }
  
  // Navigation commands
  if (input.includes('open schemes') || input.includes('योजना') || input.includes('schemes')) {
    return responses.navigation.schemes;
  }
  
  if (input.includes('open services') || input.includes('सेवा') || input.includes('services')) {
    return responses.navigation.services;
  }
  
  // Helplines
  if (input.includes('helpline') || input.includes('help') || input.includes('contact') || 
      input.includes('phone') || input.includes('number') || input.includes('हेल्पलाइन')) {
    return responses.helplines;
  }
  
  // Platform features
  if (input.includes('feature') || input.includes('what can') || input.includes('how to use') || 
      input.includes('वैशिष्ट्य') || input.includes('कैसे उपयोग')) {
    return responses.features;
  }
  
  // Default intelligent response
  return responses.default;
}

function getResponseTemplates(lang: string) {
  if (lang === 'mr') {
    return {
      scholarship: "🎓 **शिष्यवृत्ती मिळविण्यासाठी:**\n• NSP पोर्टल: scholarships.gov.in\n• PM स्कॉलरशिप: भूतपूर्व सैनिकांच्या मुलांसाठी\n• हेल्पलाइन: 0120-6619540\n• आमच्या 'योजना' विभागात 40+ शिष्यवृत्ती पहा!",
      
      medical: "🏥 **वैद्यकीय मदतीसाठी:**\n• आयुष्मान भारत योजना\n• राज्य आरोग्य विमा योजना\n• आपत्कालीन: 108 (रुग्णवाहिका)\n• जवळच्या सरकारी हॉस्पिटलमध्ये जा",
      
      financial: "💰 **आर्थिक मदतीसाठी:**\n• PM किसान सम्मान निधी\n• मुद्रा लोन योजना\n• महात्मा गांधी NREGA\n• BPL कार्डधारकांसाठी विशेष योजना",
      
      agriculture: "🌾 **शेतकऱ्यांसाठी:**\n• PM किसान योजना: ₹6000/वर्ष\n• पीक विमा योजना\n• मृदा आरोग्य कार्ड\n• कृषी हेल्पलाइन: 1551",
      
      birthCert: "📋 **जन्म दाखला:** हॉस्पिटल डिस्चार्ज, पालकांचा ओळख पुरावा, पत्ता पुरावा हवा. रजिस्ट्रार कार्यालयात जा. फी: ₹50, वेळ: 7-15 दिवस",
      
      rationCard: "🍚 **रेशन कार्ड:** सर्व कुटुंबीयांचे आधार कार्ड, पत्ता पुरावा, उत्पन्न दाखला हवा. अन्न कार्यालयात जा. मोफत, 15-30 दिवस",
      
      incomeCert: "💼 **उत्पन्न दाखला:** आधार कार्ड, पगार पर्ची, बँक स्टेटमेंट हवे. तहसीलदार कार्यालयात जा. फी: ₹30, वेळ: 7-15 दिवस",
      
      navigation: {
        schemes: "✅ योजना पृष्ठ उघडत आहे... तुम्हाला 40+ सरकारी योजना मिळतील!",
        services: "✅ सेवा पृष्ठ उघडत आहे... सर्व सरकारी सेवा एकाच ठिकाणी!"
      },
      
      helplines: "📞 **महत्वाचे हेल्पलाइन:**\n• राष्ट्रीय नागरिक: 1077 (24x7)\n• NSP: 0120-6619540\n• आपत्कालीन: पोलीस-100, अग्निशामक-101, रुग्णवाहिका-108",
      
      features: "🌟 **प्लॅटफॉर्म वैशिष्ट्ये:**\n• 40+ सरकारी योजना\n• 12 भाषांमध्ये सहाय्य\n• आवाज व मजकूर चॅट\n• रिअल-टाइम अर्ज ट्रॅकिंग\n• 24x7 हेल्पलाइन सहाय्य",
      
      default: "🤖 मी तुम्हाला मदत करू शकतो! विचारा:\n• 'शिष्यवृत्ती हवी'\n• 'वैद्यकीय मदत'\n• 'कागदपत्रे कशी मिळवायची'\n• 'योजना उघडा'\nकाय हवे आहे सांगा!"
    };
  } else if (lang === 'hi') {
    return {
      scholarship: "🎓 **छात्रवृत्ति के लिए:**\n• NSP पोर्टल: scholarships.gov.in\n• PM स्कॉलरशिप: भूतपूर्व सैनिकों के बच्चों के लिए\n• हेल्पलाइन: 0120-6619540\n• हमारे 'योजनाएं' सेक्शन में 40+ छात्रवृत्ति देखें!",
      
      medical: "🏥 **चिकित्सा सहायता के लिए:**\n• आयुष्मान भारत योजना\n• राज्य स्वास्थ्य बीमा योजना\n• आपातकाल: 108 (एम्बुलेंस)\n• नजदीकी सरकारी अस्पताल जाएं",
      
      financial: "💰 **वित्तीय सहायता के लिए:**\n• PM किसान सम्मान निधि\n• मुद्रा लोन योजना\n• महात्मा गांधी NREGA\n• BPL कार्डधारकों के लिए विशेष योजनाएं",
      
      agriculture: "🌾 **किसानों के लिए:**\n• PM किसान योजना: ₹6000/वर्ष\n• फसल बीमा योजना\n• मृदा स्वास्थ्य कार्ड\n• कृषि हेल्पलाइन: 1551",
      
      birthCert: "📋 **जन्म प्रमाण पत्र:** अस्पताल डिस्चार्ज, माता-पिता का पहचान प्रमाण, पता प्रमाण चाहिए। रजिस्ट्रार कार्यालय जाएं। फीस: ₹50, समय: 7-15 दिन",
      
      rationCard: "🍚 **राशन कार्ड:** सभी परिवारजनों के आधार कार्ड, पता प्रमाण, आय प्रमाण पत्र चाहिए। खाद्य कार्यालय जाएं। निःशुल्क, 15-30 दिन",
      
      incomeCert: "💼 **आय प्रमाण पत्र:** आधार कार्ड, वेतन पर्ची, बैंक स्टेटमेंट चाहिए। तहसीलदार कार्यालय जाएं। फीस: ₹30, समय: 7-15 दिन",
      
      navigation: {
        schemes: "✅ योजनाएं पेज खोल रहे हैं... आपको 40+ सरकारी योजनाएं मिलेंगी!",
        services: "✅ सेवाएं पेज खोल रहे हैं... सभी सरकारी सेवाएं एक जगह!"
      },
      
      helplines: "📞 **महत्वपूर्ण हेल्पलाइन:**\n• राष्ट्रीय नागरिक: 1077 (24x7)\n• NSP: 0120-6619540\n• आपातकाल: पुलिस-100, दमकल-101, एम्बुलेंस-108",
      
      features: "🌟 **प्लेटफॉर्म विशेषताएं:**\n• 40+ सरकारी योजनाएं\n• 12 भाषाओं में सहायता\n• आवाज व टेक्स्ट चैट\n• रियल-टाइम आवेदन ट्रैकिंग\n• 24x7 हेल्पलाइन सहायता",
      
      default: "🤖 मैं आपकी मदद कर सकता हूं! पूछें:\n• 'छात्रवृत्ति चाहिए'\n• 'चिकित्सा सहायता'\n• 'दस्तावेज़ कैसे मिलें'\n• 'योजनाएं खोलें'\nक्या चाहिए बताएं!"
    };
  } else {
    return {
      scholarship: "🎓 **For Scholarships:**\n• NSP Portal: scholarships.gov.in\n• PM Scholarship: For ex-servicemen children\n• Helpline: 0120-6619540\n• Check our 'Schemes' section for 40+ scholarships!",
      
      medical: "🏥 **For Medical Help:**\n• Ayushman Bharat Scheme\n• State Health Insurance Schemes\n• Emergency: 108 (Ambulance)\n• Visit nearest government hospital",
      
      financial: "💰 **For Financial Help:**\n• PM Kisan Samman Nidhi\n• Mudra Loan Scheme\n• Mahatma Gandhi NREGA\n• Special schemes for BPL cardholders",
      
      agriculture: "🌾 **For Farmers:**\n• PM Kisan Scheme: ₹6000/year\n• Crop Insurance Scheme\n• Soil Health Card\n• Agriculture Helpline: 1551",
      
      birthCert: "📋 **Birth Certificate:** Need hospital discharge, parents' ID proof, address proof. Visit Registrar Office. Fee: ₹50, Time: 7-15 days",
      
      rationCard: "🍚 **Ration Card:** Need Aadhaar cards of all family members, address proof, income certificate. Visit Food Office. Free, 15-30 days",
      
      incomeCert: "💼 **Income Certificate:** Need Aadhaar card, salary slips, bank statements. Visit Tehsildar Office. Fee: ₹30, Time: 7-15 days",
      
      navigation: {
        schemes: "✅ Opening schemes page... You'll find 40+ government schemes!",
        services: "✅ Opening services page... All government services in one place!"
      },
      
      helplines: "📞 **Important Helplines:**\n• National Citizen: 1077 (24x7)\n• NSP: 0120-6619540\n• Emergency: Police-100, Fire-101, Ambulance-108",
      
      features: "🌟 **Platform Features:**\n• 40+ Government Schemes\n• Support in 12 languages\n• Voice & text chat\n• Real-time application tracking\n• 24x7 helpline support",
      
      default: "🤖 I can help you! Ask:\n• 'Need scholarship'\n• 'Medical help'\n• 'How to get documents'\n• 'Open schemes'\nTell me what you need!"
    };
  }
}

export async function handleSpecificQuery(query: string, lang: string = 'en'): Promise<string> {
  return generateCachedResponse(query, lang);
}