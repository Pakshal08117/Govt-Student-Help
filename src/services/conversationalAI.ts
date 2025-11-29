// Advanced Conversational AI - Voice-First Interface
// Understands complex life situations and provides empathetic responses

export interface ConversationalResponse {
  message: string;
  schemes: string[];
  offerHelp: boolean;
  empathetic: boolean;
}

// Life situation patterns with empathetic responses
const lifeSituations = {
  widowPension: {
    patterns: [
      /husband.*died|husband.*death|husband.*passed|widow|विधवा|पती.*मरण|पति.*मृत्यु/i,
      /lost.*husband|husband.*no more|남편.*사망/i
    ],
    response: {
      en: "I'm very sorry for your loss. 🙏\n\nYes, you are eligible for help!\n\n💰 Sanjay Gandhi Niradhar Yojana (Widow Pension)\n• You will get ₹1,000 per month\n• For widows aged 18-60 years\n• Additional ₹500 if you have disabled child\n\n📋 What you need:\n• Husband's death certificate\n• Your Aadhar card\n• Bank account\n• Income proof (if any)\n\n✅ Shall I help you apply right now? I can guide you step-by-step.",
      mr: "तुमच्या दुःखात मी सहभागी आहे. 🙏\n\nहो, तुम्हाला मदत मिळू शकते!\n\n💰 संजय गांधी निराधार योजना (विधवा पेन्शन)\n• तुम्हाला दरमहा ₹1,000 मिळतील\n• 18-60 वर्षांच्या विधवांसाठी\n• अपंग मूल असल्यास अतिरिक्त ₹500\n\n📋 तुम्हाला काय लागेल:\n• पतीचे मृत्यू प्रमाणपत्र\n• तुमचे आधार कार्ड\n• बँक खाते\n• उत्पन्न पुरावा (असल्यास)\n\n✅ मी आत्ता अर्ज करण्यात मदत करू का? मी तुम्हाला चरण-दर-चरण मार्गदर्शन करू शकतो.",
      hi: "आपके दुख में मैं शामिल हूं। 🙏\n\nहां, आप सहायता के लिए पात्र हैं!\n\n💰 संजय गांधी निराधार योजना (विधवा पेंशन)\n• आपको हर महीने ₹1,000 मिलेंगे\n• 18-60 वर्ष की विधवाओं के लिए\n• विकलांग बच्चा होने पर अतिरिक्त ₹500\n\n📋 आपको क्या चाहिए:\n• पति का मृत्यु प्रमाण पत्र\n• आपका आधार कार्ड\n• बैंक खाता\n• आय प्रमाण (यदि कोई हो)\n\n✅ क्या मैं अभी आवेदन में मदद करूं? मैं आपको चरण-दर-चरण मार्गदर्शन कर सकता हूं।"
    }
  },
  
  disabledChild: {
    patterns: [
      /disabled.*child|handicapped.*child|special.*child|अपंग.*मूल|दिव्यांग.*बच्चा/i,
      /child.*disability|child.*handicap/i
    ],
    response: {
      en: "I understand your concern for your child. 💙\n\nYes, there is help available!\n\n💰 Disability Pension Scheme\n• ₹1,500 per month for disabled child\n• Free medical treatment\n• Free education support\n• Assistive devices (wheelchair, etc.)\n\n📋 What you need:\n• Disability certificate (40% or more)\n• Child's Aadhar card\n• Your Aadhar card\n• Bank account\n\n✅ Would you like me to help you apply? I can also tell you where to get disability certificate.",
      mr: "तुमच्या मुलाबद्दलची तुमची काळजी मला समजते. 💙\n\nहो, मदत उपलब्ध आहे!\n\n💰 अपंगत्व पेन्शन योजना\n• अपंग मुलासाठी दरमहा ₹1,500\n• मोफत वैद्यकीय उपचार\n• मोफत शिक्षण सहाय्य\n• सहाय्यक उपकरणे (व्हीलचेअर इ.)\n\n📋 तुम्हाला काय लागेल:\n• अपंगत्व प्रमाणपत्र (40% किंवा अधिक)\n• मुलाचे आधार कार्ड\n• तुमचे आधार कार्ड\n• बँक खाते\n\n✅ मी अर्ज करण्यात मदत करू का? अपंगत्व प्रमाणपत्र कुठे मिळेल ते देखील सांगू शकतो.",
      hi: "मैं आपके बच्चे के लिए आपकी चिंता समझता हूं। 💙\n\nहां, मदद उपलब्ध है!\n\n💰 विकलांगता पेंशन योजना\n• विकलांग बच्चे के लिए हर महीने ₹1,500\n• मुफ्त चिकित्सा उपचार\n• मुफ्त शिक्षा सहायता\n• सहायक उपकरण (व्हीलचेयर आदि)\n\n📋 आपको क्या चाहिए:\n• विकलांगता प्रमाण पत्र (40% या अधिक)\n• बच्चे का आधार कार्ड\n• आपका आधार कार्ड\n• बैंक खाता\n\n✅ क्या मैं आवेदन में मदद करूं? मैं यह भी बता सकता हूं कि विकलांगता प्रमाण पत्र कहां मिलेगा।"
    }
  },

  unemployment: {
    patterns: [
      /no.*job|lost.*job|unemployed|बेरोजगार|नोकरी.*नाही|बेरोज़गार/i,
      /need.*job|looking.*job|want.*job/i
    ],
    response: {
      en: "I understand finding a job is difficult. Don't worry! 💪\n\nHere's what you can do:\n\n💰 Unemployment Allowance\n• ₹1,500 per month while you search\n• For educated unemployed youth\n• Age 18-35 years\n\n🎓 Free Skill Training\n• Learn new skills (computer, tailoring, etc.)\n• 100% free training\n• Job placement assistance\n• Certificate provided\n\n📋 What you need:\n• Educational certificates\n• Aadhar card\n• Bank account\n\n✅ Shall I help you register? I can also suggest training programs near you.",
      mr: "नोकरी शोधणे कठीण आहे हे मला समजते. काळजी करू नका! 💪\n\nतुम्ही हे करू शकता:\n\n💰 बेरोजगारी भत्ता\n• शोध करताना दरमहा ₹1,500\n• शिक्षित बेरोजगार तरुणांसाठी\n• वय 18-35 वर्षे\n\n🎓 मोफत कौशल्य प्रशिक्षण\n• नवीन कौशल्ये शिका (संगणक, शिवणकाम इ.)\n• 100% मोफत प्रशिक्षण\n• नोकरी मिळविण्यात मदत\n• प्रमाणपत्र दिले जाते\n\n📋 तुम्हाला काय लागेल:\n• शैक्षणिक प्रमाणपत्रे\n• आधार कार्ड\n• बँक खाते\n\n✅ मी नोंदणी करण्यात मदत करू का? तुमच्या जवळचे प्रशिक्षण कार्यक्रम देखील सुचवू शकतो.",
      hi: "मैं समझता हूं कि नौकरी ढूंढना मुश्किल है। चिंता न करें! 💪\n\nआप यह कर सकते हैं:\n\n💰 बेरोजगारी भत्ता\n• खोज करते समय हर महीने ₹1,500\n• शिक्षित बेरोजगार युवाओं के लिए\n• आयु 18-35 वर्ष\n\n🎓 मुफ्त कौशल प्रशिक्षण\n• नए कौशल सीखें (कंप्यूटर, सिलाई आदि)\n• 100% मुफ्त प्रशिक्षण\n• नौकरी प्लेसमेंट सहायता\n• प्रमाण पत्र प्रदान किया गया\n\n📋 आपको क्या चाहिए:\n• शैक्षिक प्रमाण पत्र\n• आधार कार्ड\n• बैंक खाता\n\n✅ क्या मैं पंजीकरण में मदद करूं? मैं आपके पास के प्रशिक्षण कार्यक्रम भी सुझा सकता हूं।"
    }
  },

  pregnancy: {
    patterns: [
      /pregnant|pregnancy|expecting|baby.*coming|गर्भवती|गर्भावस्था/i,
      /going.*have.*baby|delivery/i
    ],
    response: {
      en: "Congratulations on your pregnancy! 🤰\n\nYes, you get financial help!\n\n💰 Pradhan Mantri Matru Vandana Yojana\n• ₹5,000 in 3 installments\n• ₹1,000 after registration\n• ₹2,000 after 6 months\n• ₹2,000 after delivery\n\n🏥 Free Benefits:\n• Free delivery at government hospitals\n• Free medicines and tests\n• Free nutritious food\n• Free health checkups\n\n📋 What you need:\n• Aadhar card\n• Bank account\n• Pregnancy registration at Anganwadi\n\n✅ Shall I help you register at nearest Anganwadi? It's very important!",
      mr: "तुमच्या गर्भावस्थेचे अभिनंदन! 🤰\n\nहो, तुम्हाला आर्थिक मदत मिळते!\n\n💰 प्रधानमंत्री मातृ वंदना योजना\n• 3 हप्त्यांमध्ये ₹5,000\n• नोंदणीनंतर ₹1,000\n• 6 महिन्यांनंतर ₹2,000\n• प्रसूतीनंतर ₹2,000\n\n🏥 मोफत फायदे:\n• सरकारी रुग्णालयात मोफत प्रसूती\n• मोफत औषधे आणि चाचण्या\n• मोफत पौष्टिक अन्न\n• मोफत आरोग्य तपासणी\n\n📋 तुम्हाला काय लागेल:\n• आधार कार्ड\n• बँक खाते\n• अंगणवाडीत गर्भावस्था नोंदणी\n\n✅ जवळच्या अंगणवाडीत नोंदणी करण्यात मदत करू का? हे खूप महत्त्वाचे आहे!",
      hi: "आपकी गर्भावस्था पर बधाई! 🤰\n\nहां, आपको वित्तीय सहायता मिलती है!\n\n💰 प्रधानमंत्री मातृ वंदना योजना\n• 3 किस्तों में ₹5,000\n• पंजीकरण के बाद ₹1,000\n• 6 महीने के बाद ₹2,000\n• प्रसव के बाद ₹2,000\n\n🏥 मुफ्त लाभ:\n• सरकारी अस्पतालों में मुफ्त प्रसव\n• मुफ्त दवाएं और परीक्षण\n• मुफ्त पौष्टिक भोजन\n• मुफ्त स्वास्थ्य जांच\n\n📋 आपको क्या चाहिए:\n• आधार कार्ड\n• बैंक खाता\n• आंगनवाड़ी में गर्भावस्था पंजीकरण\n\n✅ क्या मैं निकटतम आंगनवाड़ी में पंजीकरण में मदद करूं? यह बहुत महत्वपूर्ण है!"
    }
  },

  oldAge: {
    patterns: [
      /old.*age|elderly|senior.*citizen|60.*year|वृद्ध|बुजुर्ग|वयोवृद्ध/i,
      /retired|pension.*old/i
    ],
    response: {
      en: "I understand the challenges of old age. 👴👵\n\nYes, you are eligible for pension!\n\n💰 Old Age Pension (Shravan Bal Seva Yojana)\n• ₹1,500 per month\n• For citizens above 60 years\n• No income limit if above 65\n\n🏥 Additional Benefits:\n• Free health insurance (₹1.5 lakh)\n• Free bus travel\n• Discounts on train tickets\n• Priority in government offices\n\n📋 What you need:\n• Age proof (birth certificate/school leaving)\n• Aadhar card\n• Bank account\n• Income certificate (if below 65)\n\n✅ Shall I help you apply? Many elderly people miss this benefit!",
      mr: "वृद्धावस्थेतील आव्हाने मला समजतात. 👴👵\n\nहो, तुम्ही पेन्शनसाठी पात्र आहात!\n\n💰 वृद्धापकाळ पेन्शन (श्रावण बाल सेवा योजना)\n• दरमहा ₹1,500\n• 60 वर्षांवरील नागरिकांसाठी\n• 65 वर्षांवर असल्यास उत्पन्न मर्यादा नाही\n\n🏥 अतिरिक्त फायदे:\n• मोफत आरोग्य विमा (₹1.5 लाख)\n• मोफत बस प्रवास\n• रेल्वे तिकिटांवर सवलत\n• सरकारी कार्यालयात प्राधान्य\n\n📋 तुम्हाला काय लागेल:\n• वय पुरावा (जन्म प्रमाणपत्र/शाळा सोडल्याचा दाखला)\n• आधार कार्ड\n• बँक खाते\n• उत्पन्न प्रमाणपत्र (65 खाली असल्यास)\n\n✅ मी अर्ज करण्यात मदत करू का? अनेक वृद्ध लोक हा फायदा चुकवतात!",
      hi: "मैं बुढ़ापे की चुनौतियों को समझता हूं। 👴👵\n\nहां, आप पेंशन के लिए पात्र हैं!\n\n💰 वृद्धावस्था पेंशन (श्रावण बाल सेवा योजना)\n• हर महीने ₹1,500\n• 60 वर्ष से अधिक नागरिकों के लिए\n• 65 से अधिक होने पर कोई आय सीमा नहीं\n\n🏥 अतिरिक्त लाभ:\n• मुफ्त स्वास्थ्य बीमा (₹1.5 लाख)\n• मुफ्त बस यात्रा\n• ट्रेन टिकटों पर छूट\n• सरकारी कार्यालयों में प्राथमिकता\n\n📋 आपको क्या चाहिए:\n• आयु प्रमाण (जन्म प्रमाण पत्र/स्कूल छोड़ने का प्रमाण)\n• आधार कार्ड\n• बैंक खाता\n• आय प्रमाण पत्र (यदि 65 से कम)\n\n✅ क्या मैं आवेदन में मदद करूं? कई बुजुर्ग लोग यह लाभ चूक जाते हैं!"
    }
  }
};

// Detect life situation and provide empathetic response
export function detectLifeSituation(userInput: string, lang: string = 'en'): string | null {
  const lowerInput = userInput.toLowerCase();

  for (const [key, situation] of Object.entries(lifeSituations)) {
    const matches = situation.patterns.some(pattern => pattern.test(lowerInput));
    if (matches) {
      return situation.response[lang as keyof typeof situation.response] || situation.response.en;
    }
  }

  return null;
}

// Generate conversational follow-up questions
export function generateFollowUpQuestion(userInput: string, lang: string): string {
  const lowerInput = userInput.toLowerCase();

  // If user mentions children
  if (lowerInput.match(/child|children|kids|मूल|बच्चे/i)) {
    const questions = {
      en: "\n\n❓ To help you better:\n• How many children do you have?\n• What are their ages?\n• Are they going to school?",
      mr: "\n\n❓ तुम्हाला चांगल्या प्रकारे मदत करण्यासाठी:\n• तुमची किती मुले आहेत?\n• त्यांचे वय काय आहे?\n• ते शाळेत जातात का?",
      hi: "\n\n❓ आपकी बेहतर मदद के लिए:\n• आपके कितने बच्चे हैं?\n• उनकी उम्र क्या है?\n• क्या वे स्कूल जाते हैं?"
    };
    return questions[lang as keyof typeof questions] || questions.en;
  }

  // If user mentions income/money problems
  if (lowerInput.match(/money|income|poor|गरीब|पैसे|आय/i)) {
    const questions = {
      en: "\n\n❓ To find the best schemes:\n• Do you have a ration card?\n• What is your monthly income?\n• Do you own any land?",
      mr: "\n\n❓ सर्वोत्तम योजना शोधण्यासाठी:\n• तुमच्याकडे रेशन कार्ड आहे का?\n• तुमचे मासिक उत्पन्न किती आहे?\n• तुमच्याकडे काही जमीन आहे का?",
      hi: "\n\n❓ सर्वश्रेष्ठ योजनाएं खोजने के लिए:\n• क्या आपके पास राशन कार्ड है?\n• आपकी मासिक आय कितनी है?\n• क्या आपके पास कोई जमीन है?"
    };
    return questions[lang as keyof typeof questions] || questions.en;
  }

  return '';
}
