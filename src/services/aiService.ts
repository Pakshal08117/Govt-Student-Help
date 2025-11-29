// AI Service - Intelligent Problem Solving Engine
import { schemes } from '@/data/schemes';

export interface AIResponse {
  message: string;
  schemes: any[];
  actionable: boolean;
  category: string;
}

// Comprehensive keyword mapping for all problems
const problemKeywords = {
  health: {
    keywords: [
      'health', 'hospital', 'medical', 'treatment', 'doctor', 'surgery', 'illness', 'disease',
      'sick', 'medicine', 'operation', 'cancer', 'diabetes', 'heart', 'emergency', 'ambulance',
      'बीमार', 'आजार', 'उपचार', 'रुग्णालय', 'डॉक्टर', 'शस्त्रक्रिया', 'औषध',
      'इलाज', 'बीमारी', 'चिकित्सा', 'अस्पताल', 'दवा', 'ऑपरेशन'
    ],
    schemes: ['mahatma-jyotiba-phule-jan-arogya-yojana']
  },
  education: {
    keywords: [
      'education', 'school', 'college', 'study', 'scholarship', 'fees', 'student', 'exam',
      'university', 'admission', 'books', 'tuition', 'learning', 'class', 'degree',
      'शिक्षण', 'शाळा', 'महाविद्यालय', 'अभ्यास', 'शिष्यवृत्ती', 'फी', 'विद्यार्थी',
      'शिक्षा', 'स्कूल', 'कॉलेज', 'छात्रवृत्ति', 'पढ़ाई', 'परीक्षा'
    ],
    schemes: ['lek-ladki-yojana', 'rajarshi-shahu-scholarship']
  },
  girlChild: {
    keywords: [
      'girl', 'daughter', 'female', 'woman', 'lady', 'sister',
      'मुलगी', 'मुलीचे', 'बेटी', 'लड़की', 'महिला', 'बालिका'
    ],
    schemes: ['lek-ladki-yojana']
  },
  agriculture: {
    keywords: [
      'farm', 'agriculture', 'crop', 'irrigation', 'farmer', 'field', 'harvest', 'land',
      'cultivation', 'seeds', 'fertilizer', 'tractor', 'farming',
      'खेती', 'शेती', 'शेतकरी', 'पीक', 'शेत', 'लागवड', 'बियाणे',
      'किसान', 'कृषि', 'खेत', 'फसल', 'बीज'
    ],
    schemes: ['shetkari-sanman-nidhi', 'solar-pump-subsidy']
  },
  solarPump: {
    keywords: [
      'pump', 'electricity', 'solar', 'power', 'energy', 'electric', 'bijli',
      'पंप', 'वीज', 'सौर', 'ऊर्जा', 'विजेचा', 'बिजली', 'सोलर'
    ],
    schemes: ['solar-pump-subsidy']
  },
  financial: {
    keywords: [
      'money', 'financial', 'income', 'poor', 'poverty', 'help', 'assistance', 'loan',
      'debt', 'payment', 'cash', 'fund', 'support', 'aid',
      'पैसे', 'आर्थिक', 'उत्पन्न', 'गरीब', 'मदत', 'सहाय्य', 'कर्ज',
      'आय', 'गरीबी', 'सहायता', 'रुपये', 'धन'
    ],
    schemes: ['shetkari-sanman-nidhi', 'lek-ladki-yojana']
  },
  obc: {
    keywords: [
      'obc', 'backward', 'caste', 'reservation', 'quota',
      'ओबीसी', 'मागासवर्ग', 'जात', 'आरक्षण', 'जाति'
    ],
    schemes: ['rajarshi-shahu-scholarship']
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

  if (relevantSchemes.length === 0) {
    return getDefaultResponse(lang);
  }

  return generateSchemeResponse(relevantSchemes, lang, userInput);
}

// Generate detailed scheme response with solutions
function generateSchemeResponse(
  schemes: any[],
  lang: string,
  userInput: string
): string {
  const header = {
    en: "🎯 I understand your problem! Here are the solutions:\n\n",
    mr: "🎯 मला तुमची समस्या समजली! येथे उपाय आहेत:\n\n",
    hi: "🎯 मैं आपकी समस्या समझता हूं! यहां समाधान हैं:\n\n"
  };

  let response = header[lang as keyof typeof header] || header.en;

  schemes.forEach((scheme, index) => {
    const name = scheme[`name_${lang}`] || scheme.name_en;
    const description = scheme[`description_${lang}`] || scheme.description_en;
    const benefits = scheme[`benefits_${lang}`] || scheme.benefits_en;

    response += `${index + 1}. 📋 ${name}\n`;
    response += `   ${description}\n\n`;
    
    response += `   ✅ ${lang === 'mr' ? 'फायदे' : lang === 'hi' ? 'लाभ' : 'Benefits'}:\n`;
    benefits.slice(0, 3).forEach((benefit: string) => {
      response += `   • ${benefit}\n`;
    });
    response += '\n';

    response += `   📞 ${lang === 'mr' ? 'हेल्पलाइन' : lang === 'hi' ? 'हेल्पलाइन' : 'Helpline'}: ${scheme.helpline}\n`;
    
    if (scheme.website) {
      response += `   🌐 ${lang === 'mr' ? 'वेबसाइट' : lang === 'hi' ? 'वेबसाइट' : 'Website'}: ${scheme.website}\n`;
    }
    response += '\n';

    // Add eligibility
    response += `   📝 ${lang === 'mr' ? 'पात्रता' : lang === 'hi' ? 'पात्रता' : 'Eligibility'}:\n`;
    if (scheme.eligibility.income) {
      response += `   • ${lang === 'mr' ? 'उत्पन्न' : lang === 'hi' ? 'आय' : 'Income'}: ${scheme.eligibility.income}\n`;
    }
    response += `   • ${lang === 'mr' ? 'निवास' : lang === 'hi' ? 'निवास' : 'Residence'}: ${scheme.eligibility.residence}\n`;
    
    response += `   • ${lang === 'mr' ? 'आवश्यक कागदपत्रे' : lang === 'hi' ? 'आवश्यक दस्तावेज़' : 'Required Documents'}:\n`;
    scheme.eligibility.documents.slice(0, 3).forEach((doc: string) => {
      response += `     - ${doc}\n`;
    });
    response += '\n';
  });

  const footer = {
    en: "📱 Next Steps:\n1. Visit 'Schemes' page to apply\n2. Prepare required documents\n3. Call helpline for guidance\n4. Track your application\n\n💬 Need more help? Ask me anything!",
    mr: "📱 पुढील पायऱ्या:\n1. अर्ज करण्यासाठी 'योजना' पृष्ठाला भेट द्या\n2. आवश्यक कागदपत्रे तयार करा\n3. मार्गदर्शनासाठी हेल्पलाइनवर कॉल करा\n4. तुमचा अर्ज ट्रॅक करा\n\n💬 अधिक मदत हवी? मला काहीही विचारा!",
    hi: "📱 अगले कदम:\n1. आवेदन के लिए 'योजनाएं' पृष्ठ पर जाएं\n2. आवश्यक दस्तावेज़ तैयार करें\n3. मार्गदर्शन के लिए हेल्पलाइन पर कॉल करें\n4. अपने आवेदन को ट्रैक करें\n\n💬 और मदद चाहिए? मुझसे कुछ भी पूछें!"
  };

  response += footer[lang as keyof typeof footer] || footer.en;

  // Add valuable advice and important notes
  response += generateAdviceAndNotes(userInput, lang);

  return response;
}

// Default response when no specific problem detected
function getDefaultResponse(lang: string): string {
  const responses = {
    en: "👋 Hello! I'm here to help you with government schemes.\n\n🎤 Tell me your problem, for example:\n\n• 'I need medical treatment but don't have money'\n• 'My daughter needs help with school fees'\n• 'I am a farmer and need financial support'\n• 'I need help getting documents'\n\n💡 I can help with:\n✅ Health schemes\n✅ Education schemes\n✅ Agriculture schemes\n✅ Financial assistance\n✅ Document guidance\n\nJust tell me what you need!",
    mr: "👋 नमस्कार! मी तुम्हाला सरकारी योजनांमध्ये मदत करण्यासाठी येथे आहे.\n\n🎤 मला तुमची समस्या सांगा, उदाहरणार्थ:\n\n• 'मला वैद्यकीय उपचार हवे पण पैसे नाहीत'\n• 'माझ्या मुलीला शाळेच्या फीसाठी मदत हवी आहे'\n• 'मी शेतकरी आहे आणि मला आर्थिक मदत हवी आहे'\n• 'मला कागदपत्रे मिळविण्यात मदत हवी आहे'\n\n💡 मी मदत करू शकतो:\n✅ आरोग्य योजना\n✅ शिक्षण योजना\n✅ कृषी योजना\n✅ आर्थिक सहाय्य\n✅ कागदपत्र मार्गदर्शन\n\nफक्त मला सांगा तुम्हाला काय हवे आहे!",
    hi: "👋 नमस्ते! मैं सरकारी योजनाओं में आपकी मदद के लिए यहां हूं।\n\n🎤 मुझे अपनी समस्या बताएं, उदाहरण के लिए:\n\n• 'मुझे चिकित्सा उपचार चाहिए लेकिन पैसे नहीं हैं'\n• 'मेरी बेटी को स्कूल की फीस के लिए मदद चाहिए'\n• 'मैं किसान हूं और मुझे वित्तीय सहायता चाहिए'\n• 'मुझे दस्तावेज़ प्राप्त करने में मदद चाहिए'\n\n💡 मैं मदद कर सकता हूं:\n✅ स्वास्थ्य योजनाएं\n✅ शिक्षा योजनाएं\n✅ कृषि योजनाएं\n✅ वित्तीय सहायता\n✅ दस्तावेज़ मार्गदर्शन\n\nबस मुझे बताएं आपको क्या चाहिए!"
  };

  const defaultResponse = responses[lang as keyof typeof responses] || responses.en;
  
  // Add general advice
  const generalAdvice = {
    en: "\n\n💡 QUICK TIPS:\n• All government schemes are FREE\n• No agent or middleman needed\n• Apply online or at government offices\n• Keep documents ready\n• Save helpline: 1077 (24x7)",
    mr: "\n\n💡 द्रुत टिप्स:\n• सर्व सरकारी योजना मोफत आहेत\n• कोणत्याही एजंट किंवा मध्यस्थाची गरज नाही\n• ऑनलाइन किंवा सरकारी कार्यालयात अर्ज करा\n• कागदपत्रे तयार ठेवा\n• हेल्पलाइन सेव्ह करा: 1077 (24x7)",
    hi: "\n\n💡 त्वरित सुझाव:\n• सभी सरकारी योजनाएं मुफ्त हैं\n• किसी एजेंट या बिचौलिए की जरूरत नहीं\n• ऑनलाइन या सरकारी कार्यालयों में आवेदन करें\n• दस्तावेज़ तैयार रखें\n• हेल्पलाइन सेव करें: 1077 (24x7)"
  };

  return defaultResponse + (generalAdvice[lang as keyof typeof generalAdvice] || generalAdvice.en);
}

// Handle specific queries
export function handleSpecificQuery(query: string, lang: string): string | null {
  const lowerQuery = query.toLowerCase();

  // Track application
  if (lowerQuery.match(/track|status|check|application|अर्ज|ट्रॅक|आवेदन|स्थिति/)) {
    const responses = {
      en: "📍 To track your application:\n\n1. Go to 'Tracking' page\n2. Enter your Application ID or contact details\n3. View real-time status\n\nOr call helpline: 1077 (24x7)\n\nNeed help finding your application ID?",
      mr: "📍 तुमचा अर्ज ट्रॅक करण्यासाठी:\n\n1. 'ट्रॅकिंग' पृष्ठावर जा\n2. तुमचा अर्ज आयडी किंवा संपर्क तपशील प्रविष्ट करा\n3. रिअल-टाइम स्थिती पहा\n\nकिंवा हेल्पलाइनवर कॉल करा: 1077 (24x7)\n\nतुमचा अर्ज आयडी शोधण्यात मदत हवी आहे का?",
      hi: "📍 अपने आवेदन को ट्रैक करने के लिए:\n\n1. 'ट्रैकिंग' पृष्ठ पर जाएं\n2. अपना आवेदन आईडी या संपर्क विवरण दर्ज करें\n3. रीयल-टाइम स्थिति देखें\n\nया हेल्पलाइन पर कॉल करें: 1077 (24x7)\n\nअपना आवेदन आईडी खोजने में मदद चाहिए?"
    };
    return responses[lang as keyof typeof responses] || responses.en;
  }

  // Contact/helpline
  if (lowerQuery.match(/contact|helpline|phone|call|number|संपर्क|हेल्पलाइन|फोन|नंबर/)) {
    const responses = {
      en: "📞 Important Helplines:\n\n🏛️ Maharashtra Citizen Helpline: 1077 (24x7)\n👩 Women Helpline: 1091\n👶 Child Helpline: 1098\n🚨 Police: 100\n🚑 Ambulance: 108\n🔥 Fire: 101\n\n📧 Email: support@mahahelp.in\n\nWhich helpline do you need?",
      mr: "📞 महत्त्वाच्या हेल्पलाइन:\n\n🏛️ महाराष्ट्र नागरिक हेल्पलाइन: 1077 (24x7)\n👩 महिला हेल्पलाइन: 1091\n👶 बाल हेल्पलाइन: 1098\n🚨 पोलीस: 100\n🚑 रुग्णवाहिका: 108\n🔥 अग्निशामक: 101\n\n📧 ईमेल: support@mahahelp.in\n\nतुम्हाला कोणती हेल्पलाइन हवी आहे?",
      hi: "📞 महत्वपूर्ण हेल्पलाइन:\n\n🏛️ महाराष्ट्र नागरिक हेल्पलाइन: 1077 (24x7)\n👩 महिला हेल्पलाइन: 1091\n👶 बाल हेल्पलाइन: 1098\n🚨 पुलिस: 100\n🚑 एम्बुलेंस: 108\n🔥 दमकल: 101\n\n📧 ईमेल: support@mahahelp.in\n\nआपको कौन सी हेल्पलाइन चाहिए?"
    };
    return responses[lang as keyof typeof responses] || responses.en;
  }

  // Documents help
  if (lowerQuery.match(/document|aadhar|ration|income|caste|certificate|कागदपत्र|आधार|प्रमाणपत्र|दस्तावेज़/)) {
    const responses = {
      en: "📄 Document Assistance:\n\nI can help you with:\n• Aadhar Card\n• Ration Card\n• Income Certificate\n• Caste Certificate\n• Domicile Certificate\n\nWhich document do you need help with?\n\n💡 Tip: Visit 'Document Assistance' page for detailed guides!",
      mr: "📄 कागदपत्र सहाय्य:\n\nमी तुम्हाला मदत करू शकतो:\n• आधार कार्ड\n• रेशन कार्ड\n• उत्पन्न प्रमाणपत्र\n• जात प्रमाणपत्र\n• अधिवास प्रमाणपत्र\n\nतुम्हाला कोणत्या कागदपत्रासाठी मदत हवी आहे?\n\n💡 टीप: तपशीलवार मार्गदर्शकांसाठी 'कागदपत्र सहाय्य' पृष्ठाला भेट द्या!",
      hi: "📄 दस्तावेज़ सहायता:\n\nमैं आपकी मदद कर सकता हूं:\n• आधार कार्ड\n• राशन कार्ड\n• आय प्रमाण पत्र\n• जाति प्रमाण पत्र\n• अधिवास प्रमाण पत्र\n\nआपको किस दस्तावेज़ के लिए मदद चाहिए?\n\n💡 टिप: विस्तृत गाइड के लिए 'दस्तावेज़ सहायता' पृष्ठ पर जाएं!"
    };
    return responses[lang as keyof typeof responses] || responses.en;
  }

  return null;
}


// Generate valuable advice and important notes based on problem
export function generateAdviceAndNotes(userInput: string, lang: string): string {
  const lowerInput = userInput.toLowerCase();
  let advice = '';

  // Health-related advice
  if (lowerInput.match(/health|hospital|medical|treatment|doctor|surgery|illness|disease|बीमार|आजार|उपचार|रुग्णालय|इलाज|बीमारी|चिकित्सा/i)) {
    const healthAdvice = {
      en: "\n\n⚠️ IMPORTANT HEALTH ADVICE:\n\n💡 Before Treatment:\n• Get health card made immediately (free)\n• Keep all medical reports safely\n• Take second opinion for major surgeries\n• Check if hospital is empaneled\n\n🚨 Emergency Numbers:\n• Ambulance: 108 (Free)\n• Health Helpline: 14444\n\n⏰ Don't Delay:\n• Early treatment is cheaper and more effective\n• Many diseases are 100% curable if caught early\n• Free health checkups available at government hospitals",
      mr: "\n\n⚠️ महत्त्वाचा आरोग्य सल्ला:\n\n💡 उपचारापूर्वी:\n• आरोग्य कार्ड लगेच बनवा (मोफत)\n• सर्व वैद्यकीय अहवाल सुरक्षित ठेवा\n• मोठ्या शस्त्रक्रियेसाठी दुसरे मत घ्या\n• रुग्णालय सूचीबद्ध आहे का तपासा\n\n🚨 आपत्कालीन नंबर:\n• रुग्णवाहिका: 108 (मोफत)\n• आरोग्य हेल्पलाइन: 14444\n\n⏰ उशीर करू नका:\n• लवकर उपचार स्वस्त आणि अधिक प्रभावी\n• अनेक रोग लवकर ओळखले तर 100% बरे होतात\n• सरकारी रुग्णालयात मोफत तपासणी उपलब्ध",
      hi: "\n\n⚠️ महत्वपूर्ण स्वास्थ्य सलाह:\n\n💡 उपचार से पहले:\n• स्वास्थ्य कार्ड तुरंत बनवाएं (मुफ्त)\n• सभी मेडिकल रिपोर्ट सुरक्षित रखें\n• बड़ी सर्जरी के लिए दूसरी राय लें\n• जांचें कि अस्पताल सूचीबद्ध है\n\n🚨 आपातकालीन नंबर:\n• एम्बुलेंस: 108 (मुफ्त)\n• स्वास्थ्य हेल्पलाइन: 14444\n\n⏰ देरी न करें:\n• जल्दी इलाज सस्ता और अधिक प्रभावी\n• कई बीमारियां जल्दी पकड़ी जाएं तो 100% ठीक होती हैं\n• सरकारी अस्पतालों में मुफ्त जांच उपलब्ध"
    };
    advice += healthAdvice[lang as keyof typeof healthAdvice] || healthAdvice.en;
  }

  // Education-related advice
  if (lowerInput.match(/education|school|college|study|scholarship|fees|student|शिक्षण|शाळा|अभ्यास|शिष्यवृत्ती|शिक्षा|छात्रवृत्ति/i)) {
    const educationAdvice = {
      en: "\n\n⚠️ IMPORTANT EDUCATION ADVICE:\n\n💡 For Students:\n• Apply for scholarships BEFORE admission\n• Keep all mark sheets and certificates safe\n• Maintain 75% attendance minimum\n• Open bank account in student's name\n\n📚 Free Resources:\n• Government libraries (free books)\n• Online courses (SWAYAM platform)\n• Study materials at Anganwadi centers\n\n⏰ Application Deadlines:\n• Most scholarships: June-August\n• Don't miss deadlines - no extensions!\n• Apply early to avoid last-minute rush",
      mr: "\n\n⚠️ महत्त्वाचा शिक्षण सल्ला:\n\n💡 विद्यार्थ्यांसाठी:\n• प्रवेशापूर्वी शिष्यवृत्तीसाठी अर्ज करा\n• सर्व गुणपत्रिका आणि प्रमाणपत्रे सुरक्षित ठेवा\n• किमान 75% उपस्थिती राखा\n• विद्यार्थ्याच्या नावावर बँक खाते उघडा\n\n📚 मोफत संसाधने:\n• सरकारी वाचनालये (मोफत पुस्तके)\n• ऑनलाइन अभ्यासक्रम (SWAYAM प्लॅटफॉर्म)\n• अंगणवाडी केंद्रांवर अभ्यास साहित्य\n\n⏰ अर्ज शेवटची तारीख:\n• बहुतेक शिष्यवृत्ती: जून-ऑगस्ट\n• शेवटची तारीख चुकवू नका - वाढ नाही!\n• गर्दी टाळण्यासाठी लवकर अर्ज करा",
      hi: "\n\n⚠️ महत्वपूर्ण शिक्षा सलाह:\n\n💡 छात्रों के लिए:\n• प्रवेश से पहले छात्रवृत्ति के लिए आवेदन करें\n• सभी मार्कशीट और प्रमाण पत्र सुरक्षित रखें\n• न्यूनतम 75% उपस्थिति बनाए रखें\n• छात्र के नाम पर बैंक खाता खोलें\n\n📚 मुफ्त संसाधन:\n• सरकारी पुस्तकालय (मुफ्त किताबें)\n• ऑनलाइन कोर्स (SWAYAM प्लेटफॉर्म)\n• आंगनवाड़ी केंद्रों पर अध्ययन सामग्री\n\n⏰ आवेदन की अंतिम तिथि:\n• अधिकांश छात्रवृत्तियां: जून-अगस्त\n• अंतिम तिथि न चूकें - कोई विस्तार नहीं!\n• भीड़ से बचने के लिए जल्दी आवेदन करें"
    };
    advice += educationAdvice[lang as keyof typeof educationAdvice] || educationAdvice.en;
  }

  // Agriculture/Farming advice
  if (lowerInput.match(/farm|agriculture|crop|irrigation|farmer|खेती|शेती|शेतकरी|किसान|कृषि/i)) {
    const farmingAdvice = {
      en: "\n\n⚠️ IMPORTANT FARMING ADVICE:\n\n💡 For Farmers:\n• Get soil tested before planting (free at Krishi Kendras)\n• Use drip irrigation to save 50% water\n• Buy crop insurance BEFORE sowing\n• Keep 7/12 and 8A extracts updated\n\n🌾 Government Support:\n• Free training at Krishi Vigyan Kendras\n• Subsidized seeds and fertilizers\n• Minimum Support Price (MSP) for crops\n• Weather forecasts via SMS (free)\n\n⚠️ Avoid:\n• Taking loans from private moneylenders (high interest)\n• Using excessive pesticides (harmful)\n• Selling crops immediately after harvest (prices low)\n\n📞 Farmer Helpline: 1800-233-4251",
      mr: "\n\n⚠️ महत्त्वाचा शेती सल्ला:\n\n💡 शेतकऱ्यांसाठी:\n• लागवडीपूर्वी मातीची चाचणी करा (कृषी केंद्रात मोफत)\n• 50% पाणी वाचवण्यासाठी ठिबक सिंचन वापरा\n• पेरणीपूर्वी पीक विमा घ्या\n• 7/12 आणि 8A उतारे अद्ययावत ठेवा\n\n🌾 सरकारी मदत:\n• कृषी विज्ञान केंद्रांवर मोफत प्रशिक्षण\n• अनुदानित बियाणे आणि खते\n• पिकांसाठी किमान आधार मूल्य (MSP)\n• SMS द्वारे हवामान अंदाज (मोफत)\n\n⚠️ टाळा:\n• खाजगी सावकारांकडून कर्ज (जास्त व्याज)\n• जास्त कीटकनाशके (हानिकारक)\n• कापणीनंतर लगेच पीक विकणे (किंमत कमी)\n\n📞 शेतकरी हेल्पलाइन: 1800-233-4251",
      hi: "\n\n⚠️ महत्वपूर्ण खेती सलाह:\n\n💡 किसानों के लिए:\n• बुवाई से पहले मिट्टी की जांच करें (कृषि केंद्रों पर मुफ्त)\n• 50% पानी बचाने के लिए ड्रिप सिंचाई का उपयोग करें\n• बुवाई से पहले फसल बीमा लें\n• 7/12 और 8A उद्धरण अपडेट रखें\n\n🌾 सरकारी सहायता:\n• कृषि विज्ञान केंद्रों पर मुफ्त प्रशिक्षण\n• सब्सिडी वाले बीज और उर्वरक\n• फसलों के लिए न्यूनतम समर्थन मूल्य (MSP)\n• SMS के माध्यम से मौसम पूर्वानुमान (मुफ्त)\n\n⚠️ बचें:\n• निजी साहूकारों से कर्ज (उच्च ब्याज)\n• अत्यधिक कीटनाशकों का उपयोग (हानिकारक)\n• कटाई के तुरंत बाद फसल बेचना (कीमतें कम)\n\n📞 किसान हेल्पलाइन: 1800-233-4251"
    };
    advice += farmingAdvice[lang as keyof typeof farmingAdvice] || farmingAdvice.en;
  }

  // Financial/Money advice
  if (lowerInput.match(/money|financial|income|poor|poverty|loan|debt|पैसे|आर्थिक|उत्पन्न|गरीब|कर्ज|आय|गरीबी|ऋण/i)) {
    const financialAdvice = {
      en: "\n\n⚠️ IMPORTANT FINANCIAL ADVICE:\n\n💡 Money Management:\n• Never take loans from private moneylenders\n• Government loans have 0-4% interest only\n• Keep all income proofs updated\n• Open Jan Dhan bank account (free)\n\n🚨 Beware of Scams:\n• No government scheme asks for money upfront\n• Don't share OTP or bank details with anyone\n• Verify schemes on official websites only\n• Report fraud: 1930 (Cyber Crime Helpline)\n\n💰 Free Financial Help:\n• Financial literacy programs at banks\n• Free insurance schemes available\n• Pension schemes for elderly\n\n📞 Banking Helpline: 1800-425-3800",
      mr: "\n\n⚠️ महत्त्वाचा आर्थिक सल्ला:\n\n💡 पैशांचे व्यवस्थापन:\n• खाजगी सावकारांकडून कधीही कर्ज घेऊ नका\n• सरकारी कर्जावर फक्त 0-4% व्याज\n• सर्व उत्पन्न पुरावे अद्ययावत ठेवा\n• जन धन बँक खाते उघडा (मोफत)\n\n🚨 फसवणुकीपासून सावध:\n• कोणतीही सरकारी योजना आगाऊ पैसे मागत नाही\n• OTP किंवा बँक तपशील कोणाशीही शेअर करू नका\n• अधिकृत वेबसाइटवरच योजना तपासा\n• फसवणूक नोंदवा: 1930 (सायबर क्राईम हेल्पलाइन)\n\n💰 मोफत आर्थिक मदत:\n• बँकांमध्ये आर्थिक साक्षरता कार्यक्रम\n• मोफत विमा योजना उपलब्ध\n• वृद्धांसाठी पेन्शन योजना\n\n📞 बँकिंग हेल्पलाइन: 1800-425-3800",
      hi: "\n\n⚠️ महत्वपूर्ण वित्तीय सलाह:\n\n💡 धन प्रबंधन:\n• निजी साहूकारों से कभी कर्ज न लें\n• सरकारी कर्ज पर केवल 0-4% ब्याज\n• सभी आय प्रमाण अपडेट रखें\n• जन धन बैंक खाता खोलें (मुफ्त)\n\n🚨 घोटालों से सावधान:\n• कोई भी सरकारी योजना अग्रिम पैसे नहीं मांगती\n• OTP या बैंक विवरण किसी के साथ साझा न करें\n• केवल आधिकारिक वेबसाइटों पर योजनाओं की पुष्टि करें\n• धोखाधड़ी की रिपोर्ट करें: 1930 (साइबर क्राइम हेल्पलाइन)\n\n💰 मुफ्त वित्तीय सहायता:\n• बैंकों में वित्तीय साक्षरता कार्यक्रम\n• मुफ्त बीमा योजनाएं उपलब्ध\n• बुजुर्गों के लिए पेंशन योजनाएं\n\n📞 बैंकिंग हेल्पलाइन: 1800-425-3800"
    };
    advice += financialAdvice[lang as keyof typeof financialAdvice] || financialAdvice.en;
  }

  // Women/Girl child specific advice
  if (lowerInput.match(/girl|daughter|woman|female|lady|मुलगी|बेटी|लड़की|महिला|बालिका/i)) {
    const womenAdvice = {
      en: "\n\n⚠️ IMPORTANT ADVICE FOR GIRLS/WOMEN:\n\n💡 Special Rights:\n• Free education up to graduation in government colleges\n• 33% reservation in government jobs\n• Special schemes for girl child\n• Women helpline: 1091 (24x7)\n\n🚨 Safety First:\n• Save emergency numbers in phone\n• Know your rights and laws\n• Report harassment immediately\n• Legal aid available for free\n\n💪 Empowerment:\n• Free skill training programs\n• Self-employment schemes\n• Women entrepreneurship support\n• Free legal counseling",
      mr: "\n\n⚠️ मुली/महिलांसाठी महत्त्वाचा सल्ला:\n\n💡 विशेष हक्क:\n• सरकारी महाविद्यालयात पदवीपर्यंत मोफत शिक्षण\n• सरकारी नोकऱ्यांमध्ये 33% आरक्षण\n• मुलींसाठी विशेष योजना\n• महिला हेल्पलाइन: 1091 (24x7)\n\n🚨 सुरक्षा प्रथम:\n• फोनमध्ये आपत्कालीन नंबर सेव्ह करा\n• तुमचे हक्क आणि कायदे जाणून घ्या\n• छळवणूक लगेच नोंदवा\n• मोफत कायदेशीर मदत उपलब्ध\n\n💪 सशक्तीकरण:\n• मोफत कौशल्य प्रशिक्षण कार्यक्रम\n• स्वयंरोजगार योजना\n• महिला उद्योजकता समर्थन\n• मोफत कायदेशीर सल्ला",
      hi: "\n\n⚠️ लड़कियों/महिलाओं के लिए महत्वपूर्ण सलाह:\n\n💡 विशेष अधिकार:\n• सरकारी कॉलेजों में स्नातक तक मुफ्त शिक्षा\n• सरकारी नौकरियों में 33% आरक्षण\n• बालिकाओं के लिए विशेष योजनाएं\n• महिला हेल्पलाइन: 1091 (24x7)\n\n🚨 सुरक्षा पहले:\n• फोन में आपातकालीन नंबर सेव करें\n• अपने अधिकार और कानून जानें\n• उत्पीड़न की तुरंत रिपोर्ट करें\n• मुफ्त कानूनी सहायता उपलब्ध\n\n💪 सशक्तिकरण:\n• मुफ्त कौशल प्रशिक्षण कार्यक्रम\n• स्वरोजगार योजनाएं\n• महिला उद्यमिता समर्थन\n• मुफ्त कानूनी परामर्श"
    };
    advice += womenAdvice[lang as keyof typeof womenAdvice] || womenAdvice.en;
  }

  // Document-related advice
  if (lowerInput.match(/document|aadhar|ration|income|caste|certificate|कागदपत्र|आधार|प्रमाणपत्र|दस्तावेज़/i)) {
    const documentAdvice = {
      en: "\n\n⚠️ IMPORTANT DOCUMENT ADVICE:\n\n💡 Document Safety:\n• Keep original documents in bank locker\n• Make 10 photocopies of each document\n• Scan and save digital copies\n• Never give originals to anyone\n\n🚨 Beware:\n• No agent needed for government documents\n• All services available online/at offices\n• Don't pay bribes - report corruption: 1064\n• Verify document authenticity online\n\n⏰ Processing Time:\n• Aadhar: 90 days\n• Income Certificate: 30 days\n• Caste Certificate: 30 days\n• Apply early to avoid delays",
      mr: "\n\n⚠️ महत्त्वाचा कागदपत्र सल्ला:\n\n💡 कागदपत्र सुरक्षा:\n• मूळ कागदपत्रे बँक लॉकरमध्ये ठेवा\n• प्रत्येक कागदपत्राच्या 10 फोटोकॉपी काढा\n• स्कॅन करून डिजिटल प्रती सेव्ह करा\n• मूळ कागदपत्रे कोणालाही देऊ नका\n\n🚨 सावध रहा:\n• सरकारी कागदपत्रांसाठी एजंटची गरज नाही\n• सर्व सेवा ऑनलाइन/कार्यालयात उपलब्ध\n• लाच देऊ नका - भ्रष्टाचार नोंदवा: 1064\n• कागदपत्र सत्यता ऑनलाइन तपासा\n\n⏰ प्रक्रिया वेळ:\n• आधार: 90 दिवस\n• उत्पन्न प्रमाणपत्र: 30 दिवस\n• जात प्रमाणपत्र: 30 दिवस\n• विलंब टाळण्यासाठी लवकर अर्ज करा",
      hi: "\n\n⚠️ महत्वपूर्ण दस्तावेज़ सलाह:\n\n💡 दस्तावेज़ सुरक्षा:\n• मूल दस्तावेज़ बैंक लॉकर में रखें\n• प्रत्येक दस्तावेज़ की 10 फोटोकॉपी बनाएं\n• स्कैन करके डिजिटल कॉपी सेव करें\n• मूल दस्तावेज़ किसी को न दें\n\n🚨 सावधान:\n• सरकारी दस्तावेज़ों के लिए एजेंट की जरूरत नहीं\n• सभी सेवाएं ऑनलाइन/कार्यालयों में उपलब्ध\n• रिश्वत न दें - भ्रष्टाचार की रिपोर्ट करें: 1064\n• दस्तावेज़ की प्रामाणिकता ऑनलाइन सत्यापित करें\n\n⏰ प्रसंस्करण समय:\n• आधार: 90 दिन\n• आय प्रमाण पत्र: 30 दिन\n• जाति प्रमाण पत्र: 30 दिन\n• देरी से बचने के लिए जल्दी आवेदन करें"
    };
    advice += documentAdvice[lang as keyof typeof documentAdvice] || documentAdvice.en;
  }

  // General advice for any problem
  if (!advice) {
    const generalAdvice = {
      en: "\n\n💡 GENERAL ADVICE:\n\n✅ Always:\n• Keep all documents safe and updated\n• Apply for schemes before deadlines\n• Verify information on official websites\n• Save helpline numbers in your phone\n• Ask for receipt for any payment\n\n❌ Never:\n• Pay money to agents or middlemen\n• Share OTP or passwords with anyone\n• Sign blank papers\n• Trust unofficial WhatsApp messages\n\n📞 Report Issues:\n• Corruption: 1064\n• Cyber Crime: 1930\n• General Helpline: 1077",
      mr: "\n\n💡 सामान्य सल्ला:\n\n✅ नेहमी:\n• सर्व कागदपत्रे सुरक्षित आणि अद्ययावत ठेवा\n• शेवटच्या तारखेपूर्वी योजनांसाठी अर्ज करा\n• अधिकृत वेबसाइटवर माहिती तपासा\n• हेल्पलाइन नंबर फोनमध्ये सेव्ह करा\n• कोणत्याही पेमेंटसाठी पावती घ्या\n\n❌ कधीही नाही:\n• एजंट किंवा मध्यस्थांना पैसे देऊ नका\n• OTP किंवा पासवर्ड कोणाशीही शेअर करू नका\n• रिकाम्या कागदांवर सही करू नका\n• अनधिकृत WhatsApp संदेशांवर विश्वास ठेवू नका\n\n📞 समस्या नोंदवा:\n• भ्रष्टाचार: 1064\n• सायबर क्राईम: 1930\n• सामान्य हेल्पलाइन: 1077",
      hi: "\n\n💡 सामान्य सलाह:\n\n✅ हमेशा:\n• सभी दस्तावेज़ सुरक्षित और अपडेट रखें\n• अंतिम तिथि से पहले योजनाओं के लिए आवेदन करें\n• आधिकारिक वेबसाइटों पर जानकारी सत्यापित करें\n• हेल्पलाइन नंबर अपने फोन में सेव करें\n• किसी भी भुगतान के लिए रसीद लें\n\n❌ कभी नहीं:\n• एजेंटों या बिचौलियों को पैसे न दें\n• OTP या पासवर्ड किसी के साथ साझा न करें\n• खाली कागजों पर हस्ताक्षर न करें\n• अनौपचारिक WhatsApp संदेशों पर भरोसा न करें\n\n📞 समस्याओं की रिपोर्ट करें:\n• भ्रष्टाचार: 1064\n• साइबर क्राइम: 1930\n• सामान्य हेल्पलाइन: 1077"
    };
    advice += generalAdvice[lang as keyof typeof generalAdvice] || generalAdvice.en;
  }

  return advice;
}
