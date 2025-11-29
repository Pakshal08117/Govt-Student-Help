import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Bot, 
  User, 
  Volume2,
  VolumeX,
  Loader2,
  IndianRupee
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  requiresPayment?: boolean;
  amount?: number;
}

export default function AIAssistant() {
  const { t, lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: getWelcomeMessage(lang),
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
          // Auto-submit after voice input
          setTimeout(() => {
            if (transcript.trim()) {
              handleVoiceSubmit(transcript.trim());
            }
          }, 500);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          
          // Show user-friendly error messages
          if (event.error === 'no-speech') {
            toast.error(lang === 'mr' ? 'कोणताही आवाज ऐकू आला नाही. पुन्हा प्रयत्न करा.' : 
                       lang === 'hi' ? 'कोई आवाज़ नहीं सुनाई दी। फिर से प्रयास करें।' : 
                       'No speech detected. Please try again.');
          } else if (event.error === 'audio-capture') {
            toast.error(lang === 'mr' ? 'मायक्रोफोन उपलब्ध नाही. परवानगी तपासा.' : 
                       lang === 'hi' ? 'माइक्रोफ़ोन उपलब्ध नहीं है। अनुमति जांचें।' : 
                       'Microphone not available. Check permissions.');
          } else if (event.error === 'not-allowed') {
            toast.error(lang === 'mr' ? 'मायक्रोफोन परवानगी नाकारली. सेटिंग्ज तपासा.' : 
                       lang === 'hi' ? 'माइक्रोफ़ोन अनुमति अस्वीकृत। सेटिंग्स जांचें।' : 
                       'Microphone permission denied. Check settings.');
          } else {
            toast.error(lang === 'mr' ? 'आवाज ओळखण्यात त्रुटी. पुन्हा प्रयत्न करा.' : 
                       lang === 'hi' ? 'आवाज़ पहचान में त्रुटि। फिर से प्रयास करें।' : 
                       'Voice recognition error. Please try again.');
          }
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }

      // Speech Synthesis
      if ('speechSynthesis' in window) {
        setSpeechSynthesis(window.speechSynthesis);
      }
    }
  }, [lang]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update welcome message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].type === 'ai') {
      setMessages([{
        id: '1',
        type: 'ai',
        content: getWelcomeMessage(lang),
        timestamp: new Date()
      }]);
    }
  }, [lang]);

  // Speak AI messages
  const speakMessage = (text: string, language: string = lang) => {
    if (speechSynthesis && !isMuted) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      switch (language) {
        case 'mr':
          utterance.lang = 'mr-IN';
          break;
        case 'hi':
          utterance.lang = 'hi-IN';
          break;
        default:
          utterance.lang = 'en-IN';
      }
      
      utterance.rate = 0.9;
      utterance.volume = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!recognition) {
      toast.error(lang === 'mr' ? 'तुमच्या ब्राउझरमध्ये व्हॉइस इनपुट उपलब्ध नाही' : 
                 lang === 'hi' ? 'आपके ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है' : 
                 'Voice input not available in your browser');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
        toast.success(lang === 'mr' ? 'बोलणे सुरू करा...' : 
                     lang === 'hi' ? 'बोलना शुरू करें...' : 
                     'Start speaking...');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
        toast.error(lang === 'mr' ? 'व्हॉइस इनपुट सुरू करता आले नाही' : 
                   lang === 'hi' ? 'वॉइस इनपुट शुरू नहीं हो सका' : 
                   'Could not start voice input');
      }
    }
  };

  // Handle voice submission
  const handleVoiceSubmit = async (transcript: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: transcript,
      timestamp: new Date(),
      isVoice: true
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(transcript);
      setMessages(prev => [...prev, aiResponse]);
      speakMessage(aiResponse.content, lang);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze user problem and suggest relevant schemes
  const analyzeAndSuggestSchemes = (userInput: string, language: string): string => {
    const input = userInput.toLowerCase();
    const suggestedSchemes: string[] = [];

    // Health-related keywords
    if (input.match(/health|hospital|medical|treatment|doctor|surgery|illness|disease|बीमार|आजार|उपचार|रुग्णालय|डॉक्टर|इलाज|बीमारी|चिकित्सा/i)) {
      suggestedSchemes.push('mahatma-jyotiba-phule-jan-arogya-yojana');
    }

    // Education-related keywords
    if (input.match(/education|school|college|study|scholarship|fees|student|girl|daughter|शिक्षण|शाळा|महाविद्यालय|अभ्यास|शिष्यवृत्ती|फी|विद्यार्थी|मुलगी|मुलीचे|शिक्षा|छात्रवृत्ति|बेटी/i)) {
      suggestedSchemes.push('lek-ladki-yojana');
      if (input.match(/obc|backward|scholarship|शिष्यवृत्ती|ओबीसी|मागासवर्ग|छात्रवृत्ति/i)) {
        suggestedSchemes.push('rajarshi-shahu-scholarship');
      }
    }

    // Agriculture/Farmer keywords
    if (input.match(/farm|agriculture|crop|irrigation|pump|water|farmer|खेती|शेती|शेतकरी|पीक|सिंचन|पंप|पाणी|किसान|कृषि/i)) {
      suggestedSchemes.push('shetkari-sanman-nidhi');
      if (input.match(/pump|electricity|solar|power|पंप|वीज|सौर|ऊर्जा|बिजली/i)) {
        suggestedSchemes.push('solar-pump-subsidy');
      }
    }

    // Financial assistance keywords
    if (input.match(/money|financial|income|poor|poverty|help|assistance|पैसे|आर्थिक|उत्पन्न|गरीब|मदत|सहाय्य|आय|गरीबी|सहायता/i)) {
      suggestedSchemes.push('shetkari-sanman-nidhi');
      suggestedSchemes.push('lek-ladki-yojana');
    }

    // Generate response with scheme suggestions
    if (suggestedSchemes.length > 0) {
      const uniqueSchemes = [...new Set(suggestedSchemes)];
      return generateSchemeRecommendation(uniqueSchemes, language);
    }

    return '';
  };

  // Generate scheme recommendation message
  const generateSchemeRecommendation = (schemeIds: st
    mes = [
      {
        id: "mahatma-jyotiba-phule-jan-arogya-yojana",
        name_en: "Mahatma Jyotiba Phule 
        name_m,
        name_hi: "महात्मा ज्योतिबा,
        desc_en: "Fh",
        desc_mr: "₹1.5 लाख पर्यंत मोफत आरोग्य विमा",
        desc_hi: "₹1.5 लाख तक
      },
      {
ana",
        name_en: "Lek Ladki Yojana",
        name_mr: "लेक लाडकी योजना",
        name_h
        desc_en: "Financial aid fo,
        desc_mr: "म
        desc_hi: "बालिका शिक्षा के लिए वित्तीय सहायता (₹75,000 तक)"
      },
      {
     ,
",
        name_mr: "नमो शेतकरी सन्मान निधी",
        name_hi: "नमो शेतकारी सन्मान निधि,
        desc_es",
        desc_mr: "शेतकऱ्यांसाठी दरत्पन्न",
        desc_hi: "क"
      },
      {
        hip",
     p",
",
        name_hi: "राजर्",
        desc_en: "Scholarship for OBC students",
        desc_m
        desc_hi: "ओबीसी छात्रों के
      },
      {
        id: "solar-pump-subsi
        ,
     
ी",
        desc_en: "Up to 95% subsidy for solar agricultural pumps",
        desc_m",
        desc_hi: "सौर कृषि पंपों कडी"
      }
    ];

    consd));
    
    = {
      en: "🎯 Based on your problem, I recommend ",
      mr: "🎯 तुमच्या समस्येवर आधारित, मी या योजना सुचवतो:\n\n",
      hi: "🎯 \n"
    };

    const footer = {
      en: "\n\n📋 Click on 'Sc,
      mr: "\n\n📋 या योजनांसाठ,
      hi: "\n\n📋"
    };

n;
    
    relevantSc
      const name = scheme[`name_${;
      const desc = n;
      message += `${index + 1}. ${name}\n   ${desc}\n`;
    });

    message += fo
    
    r
  };

  // Generate 
  const generateAIResponse = async {
    await new Promi00));
    const input = userInput.toLowerCase();

    // First, check if user's s
    const schemeR;
    if (
     
,
        type: 'ai',
        content: schemeRecommendation,
        timestw Date()
      };
    }p: neamtoString()Date.now().        id:  { returnon) {datimmenhemeRecoscput, lang)emes(userInndSuggestScheAanalyz = ndationecomme schemes anytcheem mablprom() * 15ndo+ Math.ra 1000 olve,ressetTimeout(esolve => se(rMessage> =>mise<Chatg): Prout: strin (userInpnsepoAI resessage;eturn m.en;oteroter] || fo foyof typeofge as keoter[langua\n.desc_e| schemescheme] |typeof eyof  kage}` as{langu_$escscheme[`dme_en.name || sche scheme]typeof}` as keyof language) => {dexinscheme, rEach((hemes.foer.e head||ader] typeof heof as key[language  = headerssagemelet     ंगे?नकारी चाहे में अधिक जाजना के बारे्ट यो किसी विशिष्या आपnकn\\रें!पर क्लिक कष्ठ ोजनाएं' पृ के लिए 'येदन करनेआवं के लिए जनाओ इन योे आहेत का?"शील हव अधिक तपदल योजनेबद्िशिष्टही वहाला कोणत्या\nतुम्ा!\n्लिक करष्ठावर क पृाठी 'योजना' करण्यासी अर्ज"c scheme?any specifi about ils detaore like m you\n\nWouldemes!hese schly for tappe to aghemes' pा हूं:\nुझात सएंजनाे यो यार पर, मैं के आधस्यापकी समआmes:\n\nschethese nst header coudes(s.inclIds.iemeer(s => schmes.filt= scheSchemes ntt releva95% तक सब्सिे लिए ानंत अनुदाठी 95% पर्य पंपांसौर कृषीr: "स्सिड"सौर पंप सब e_hi:        namन",र पंप अनुदाr: "सौe_mam   nSubsidy" Pump Solarname_en: "",dyत्ति"त्रवृए छा लि्ती",्यवृतयांसाठी शिष विद्यार्थ्"ओबीसीr: छात्रवृत्तिाराज ाहू महषी शष्यवृत्तीशिशाहू महाराज ी r: "राजर्ष_m   name     olarshiaraj Schu Mahaharshi Shaj: "R name_en  cholarsshahu-s"rajarshi-id: क्ष आय्रत्य₹6,000 पति वर्ष ं के लिए प्रिसानो थेट उ6,000षी ₹वर्merrt for fare supporect incomyear di"₹6,000 per n: "an Nidhitkari SanmShemo ame_en: "Na        nhi"i-sanman-nidetkar   id: "shंत)",पर्य,000 (₹75क मदत  आर्थिणासाठींच्या शिक्षुली75,000)"ion (up to ₹ucat child edr girl",ोजना लाडकी य "लेकi:-yojdki"lek-la  id:       ्थ्य बीमा" मुफ्त स्वासo ₹1.5 lakce up tanth insurree heal्य योजना"रोगुले जन आ फ्य योजना"ुले जन आरोगयोतिबा फा ज्हात्म "मr:ojana",an Arogya YJconst sche=> {): string ge: stringguang[], lanri
    
    // Voice commands
    if (input.includes('open schemes') || input.includes('योजना उघडा') || input.includes('योजनाएं खोलें')) {
      window.location.href = '/schemes';
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: lang === 'mr' ? 'योजना पृष्ठ उघडत आहे...' : lang === 'hi' ? 'योजना पृष्ठ खोल रहे हैं...' : 'Opening schemes page...',
        timestamp: new Date()
      };
    }

    if (input.includes('open admin') || input.includes('प्रशासक') || input.includes('एडमिन')) {
      window.location.href = '/admin';
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: lang === 'mr' ? 'प्रशासक पॅनेल उघडत आहे...' : lang === 'hi' ? 'एडमिन पैनल खोल रहे हैं...' : 'Opening admin panel...',
        timestamp: new Date()
      };
    }

    if (input.includes('track application') || input.includes('अर्ज ट्रॅक') || input.includes('आवेदन ट्रैक')) {
      window.location.href = '/tracking';
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: lang === 'mr' ? 'ट्रॅकिंग पृष्ठ उघडत आहे...' : lang === 'hi' ? 'ट्रैकिंग पृष्ठ खोल रहे हैं...' : 'Opening tracking page...',
        timestamp: new Date()
      };
    }

    // Vehicle services
    if (input.includes('driving license') || input.includes('ड्रायव्हिंग') || input.includes('ड्राइविंग')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: getVehicleServiceResponse('driving-license', lang),
        timestamp: new Date()
      };
    }

    if (input.includes('vehicle registration') || input.includes('वाहन नोंदणी') || input.includes('वाहन पंजीकरण')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: getVehicleServiceResponse('vehicle-registration', lang),
        timestamp: new Date()
      };
    }
    
    // Document assistance queries (paid service)
    if (input.includes('aadhar') || input.includes('आधार') || input.includes('आधार')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: getDocumentResponse('aadhar', lang),
        timestamp: new Date(),
        requiresPayment: true,
        amount: 2
      };
    }

    if (input.includes('income') || input.includes('उत्पन्न') || input.includes('आय')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: getDocumentResponse('income', lang),
        timestamp: new Date(),
        requiresPayment: true,
        amount: 2
      };
    }

    if (input.includes('caste') || input.includes('जात') || input.includes('जाति')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: getDocumentResponse('caste', lang),
        timestamp: new Date(),
        requiresPayment: true,
        amount: 2
      };
    }

    // Free queries
    if (input.includes('scheme') || input.includes('योजना') || input.includes('yojana')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: getSchemeResponse(lang),
        timestamp: new Date()
      };
    }

    if (input.includes('track') || input.includes('ट्रॅक') || input.includes('ट्रैक')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: getTrackingResponse(lang),
        timestamp: new Date()
      };
    }

    if (input.includes('contact') || input.includes('संपर्क')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: getContactResponse(lang),
        timestamp: new Date()
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: getDefaultResponse(lang),
      timestamp: new Date()
    };
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      isVoice: isListening
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      setMessages(prev => [...prev, aiResponse]);
      speakMessage(aiResponse.content, lang);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle speech
  const toggleSpeech = () => {
    setIsMuted(!isMuted);
    if (speechSynthesis) {
      if (isMuted) {
        speechSynthesis.resume();
      } else {
        speechSynthesis.pause();
      }
    }
  };

  // Handle closing
  const handleClose = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
    setIsOpen(false);
  };

  const handlePayForInfo = (amount: number) => {
    toast.success(`Payment of ₹${amount} processed! Full guide unlocked.`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-96 h-[600px] shadow-2xl border-2 border-orange-200 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSpeech}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="w-fit text-xs">
                Voice & Text
              </Badge>
              <Badge variant="outline" className="w-fit text-xs bg-white/20 text-white border-white/30">
                {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col max-w-[80%]">
                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm",
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {message.isVoice && <span className="ml-2">🎤</span>}
                        </p>
                      </div>
                      {message.requiresPayment && message.amount && (
                        <Button
                          size="sm"
                          className="mt-2 w-full"
                          onClick={() => handlePayForInfo(message.amount!)}
                        >
                          <IndianRupee className="h-3 w-3 mr-1" />
                          Pay ₹{message.amount} for Full Guide
                        </Button>
                      )}
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("askAboutServices")}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleVoiceInput}
                  size="sm"
                  variant={isListening ? "destructive" : "outline"}
                  disabled={!recognition || isLoading}
                  className="px-3"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!inputValue.trim() || isLoading}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {isListening && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {t("listening")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper functions for responses
function getWelcomeMessage(lang: string): string {
  const messages = {
    en: "Hello! I'm your AI Assistant. I can help you with:\n\n• Government schemes information (Free)\n• Document guidance (₹2 per document)\n• Application tracking (Free)\n• Contact information (Free)\n\nHow can I help you today?",
    mr: "नमस्कार! मी तुमचा AI सहाय्यक आहे. मी तुम्हाला मदत करू शकतो:\n\n• सरकारी योजना माहिती (मोफत)\n• कागदपत्र मार्गदर्शन (₹2 प्रति कागदपत्र)\n• अर्ज ट्रॅकिंग (मोफत)\n• संपर्क माहिती (मोफत)\n\nआज मी तुमची कशी मदत करू शकतो?",
    hi: "नमस्ते! मैं आपका AI सहायक हूं। मैं आपकी मदद कर सकता हूं:\n\n• सरकारी योजना जानकारी (मुफ्त)\n• दस्तावेज़ मार्गदर्शन (₹2 प्रति दस्तावेज़)\n• आवेदन ट्रैकिंग (मुफ्त)\n• संपर्क जानकारी (मुफ्त)\n\nआज मैं आपकी कैसे मदद कर सकता हूं?"
  };
  return messages[lang as keyof typeof messages] || messages.en;
}

function getDocumentResponse(type: string, lang: string): string {
  const responses = {
    aadhar: {
      en: "📄 Aadhar Card Guidance (₹2)\n\nI can provide detailed step-by-step guidance for obtaining your Aadhar card including:\n\n• Where to apply\n• Required documents\n• Form filling help\n• Biometric process\n• Tracking your application\n\nClick 'Pay ₹2' below to unlock the complete guide!",
      mr: "📄 आधार कार्ड मार्गदर्शन (₹2)\n\nमी तुमचे आधार कार्ड मिळविण्यासाठी तपशीलवार चरण-दर-चरण मार्गदर्शन देऊ शकतो:\n\n• कुठे अर्ज करावा\n• आवश्यक कागदपत्रे\n• फॉर्म भरण्यात मदत\n• बायोमेट्रिक प्रक्रिया\n• तुमचा अर्ज ट्रॅक करा\n\nसंपूर्ण मार्गदर्शक अनलॉक करण्यासाठी खाली '₹2 भरा' क्लिक करा!",
      hi: "📄 आधार कार्ड मार्गदर्शन (₹2)\n\nमैं आपका आधार कार्ड प्राप्त करने के लिए विस्तृत चरण-दर-चरण मार्गदर्शन प्रदान कर सकता हूं:\n\n• कहां आवेदन करें\n• आवश्यक दस्तावेज़\n• फॉर्म भरने में मदद\n• बायोमेट्रिक प्रक्रिया\n• अपने आवेदन को ट्रैक करें\n\nपूर्ण गाइड अनलॉक करने के लिए नीचे '₹2 भुगतान करें' पर क्लिक करें!"
    },
    income: {
      en: "📄 Income Certificate Guidance (₹2)\n\nGet complete guidance for income certificate:\n\n• Document preparation\n• Affidavit format\n• Tehsil office procedure\n• Application tracking\n• Expected timeline\n\nPay ₹2 to access the full guide!",
      mr: "📄 उत्पन्न प्रमाणपत्र मार्गदर्शन (₹2)\n\nउत्पन्न प्रमाणपत्रासाठी संपूर्ण मार्गदर्शन मिळवा:\n\n• कागदपत्र तयारी\n• प्रतिज्ञापत्र फॉरमॅट\n• तहसील कार्यालय प्रक्रिया\n• अर्ज ट्रॅकिंग\n• अपेक्षित वेळ\n\nसंपूर्ण मार्गदर्शक मिळविण्यासाठी ₹2 भरा!",
      hi: "📄 आय प्रमाण पत्र मार्गदर्शन (₹2)\n\nआय प्रमाण पत्र के लिए पूर्ण मार्गदर्शन प्राप्त करें:\n\n• दस्तावेज़ तैयारी\n• शपथ पत्र प्रारूप\n• तहसील कार्यालय प्रक्रिया\n• आवेदन ट्रैकिंग\n• अपेक्षित समयरेखा\n\nपूर्ण गाइड प्राप्त करने के लिए ₹2 का भुगतान करें!"
    },
    caste: {
      en: "📄 Caste Certificate Guidance (₹2)\n\nComplete guidance for caste certificate:\n\n• Required documents\n• Parent's certificate\n• Affidavit preparation\n• Submission process\n• Verification tracking\n\nUnlock full guide for ₹2!",
      mr: "📄 जात प्रमाणपत्र मार्गदर्शन (₹2)\n\nजात प्रमाणपत्रासाठी संपूर्ण मार्गदर्शन:\n\n• आवश्यक कागदपत्रे\n• पालकांचे प्रमाणपत्र\n• प्रतिज्ञापत्र तयारी\n• सबमिशन प्रक्रिया\n• पडताळणी ट्रॅकिंग\n\n₹2 साठी संपूर्ण मार्गदर्शक अनलॉक करा!",
      hi: "📄 जाति प्रमाण पत्र मार्गदर्शन (₹2)\n\nजाति प्रमाण पत्र के लिए पूर्ण मार्गदर्शन:\n\n• आवश्यक दस्तावेज़\n• माता-पिता का प्रमाण पत्र\n• शपथ पत्र तैयारी\n• सबमिशन प्रक्रिया\n• सत्यापन ट्रैकिंग\n\n₹2 के लिए पूर्ण गाइड अनलॉक करें!"
    }
  };
  return responses[type as keyof typeof responses]?.[lang as keyof typeof responses.aadhar] || responses.aadhar.en;
}

function getSchemeResponse(lang: string): string {
  const responses = {
    en: "I can help you find government schemes! Visit the 'Schemes' page to browse all available schemes. You can filter by category and district. Would you like to know about any specific scheme?",
    mr: "मी तुम्हाला सरकारी योजना शोधण्यात मदत करू शकतो! सर्व उपलब्ध योजना पाहण्यासाठी 'योजना' पृष्ठाला भेट द्या. तुम्ही श्रेणी आणि जिल्ह्यानुसार फिल्टर करू शकता. तुम्हाला कोणत्याही विशिष्ट योजनेबद्दल जाणून घ्यायचे आहे का?",
    hi: "मैं आपको सरकारी योजनाएं खोजने में मदद कर सकता हूं! सभी उपलब्ध योजनाओं को देखने के लिए 'योजनाएं' पृष्ठ पर जाएं। आप श्रेणी और जिले के अनुसार फ़िल्टर कर सकते हैं। क्या आप किसी विशिष्ट योजना के बारे में जानना चाहेंगे?"
  };
  return responses[lang as keyof typeof responses] || responses.en;
}

function getTrackingResponse(lang: string): string {
  const responses = {
    en: "To track your application, visit the 'Tracking' page. You'll need your application ID or contact details. I can guide you through the process!",
    mr: "तुमचा अर्ज ट्रॅक करण्यासाठी, 'ट्रॅकिंग' पृष्ठाला भेट द्या. तुम्हाला तुमचा अर्ज आयडी किंवा संपर्क तपशील लागतील. मी तुम्हाला प्रक्रियेद्वारे मार्गदर्शन करू शकतो!",
    hi: "अपने आवेदन को ट्रैक करने के लिए, 'ट्रैकिंग' पृष्ठ पर जाएं। आपको अपनी आवेदन आईडी या संपर्क विवरण की आवश्यकता होगी। मैं आपको प्रक्रिया के माध्यम से मार्गदर्शन कर सकता हूं!"
  };
  return responses[lang as keyof typeof responses] || responses.en;
}

function getContactResponse(lang: string): string {
  const responses = {
    en: "📞 Contact Information:\n\n• Helpline: 1077 (24x7)\n• Email: support@mahahelp.in\n• Women Helpline: 1091\n• Child Helpline: 1098\n• Police: 100\n• Ambulance: 108\n\nHow else can I help you?",
    mr: "📞 संपर्क माहिती:\n\n• हेल्पलाइन: 1077 (24x7)\n• ईमेल: support@mahahelp.in\n• महिला हेल्पलाइन: 1091\n• बाल हेल्पलाइन: 1098\n• पोलीस: 100\n• रुग्णवाहिका: 108\n\nमी तुम्हाला आणखी कशी मदत करू शकतो?",
    hi: "📞 संपर्क जानकारी:\n\n• हेल्पलाइन: 1077 (24x7)\n• ईमेल: support@mahahelp.in\n• महिला हेल्पलाइन: 1091\n• बाल हेल्पलाइन: 1098\n• पुलिस: 100\n• एम्बुलेंस: 108\n\nमैं आपकी और कैसे मदद कर सकता हूं?"
  };
  return responses[lang as keyof typeof responses] || responses.en;
}

function getDefaultResponse(lang: string): string {
  const responses = {
    en: "I can help you with Government schemes, Document guidance, Application tracking, Vehicle services, and Contact information. Try voice commands like Open schemes, Open admin, or Track application!",
    mr: "मी तुम्हाला सरकारी योजना, कागदपत्र मार्गदर्शन, अर्ज ट्रॅकिंग, वाहन सेवा आणि संपर्क माहितीमध्ये मदत करू शकतो. व्हॉइस कमांड वापरा जसे योजना उघडा, प्रशासक उघडा!",
    hi: "मैं सरकारी योजनाओं, दस्तावेज़ मार्गदर्शन, आवेदन ट्रैकिंग, वाहन सेवाओं और संपर्क जानकारी में मदद कर सकता हूं। वॉइस कमांड आज़माएं जैसे योजनाएं खोलें, एडमिन खोलें!"
  };
  return responses[lang as keyof typeof responses] || responses.en;
}

function getVehicleServiceResponse(type: string, lang: string): string {
  const responses = {
    'driving-license': {
      en: "🚗 Driving License Service\n\nTo apply for a driving license:\n\n1. Visit nearest RTO office\n2. Required documents:\n   • Age proof (18+ for cars)\n   • Address proof\n   • Medical certificate\n   • Passport size photos\n3. Pass learner's test\n4. Complete driving training\n5. Pass driving test\n\nHelpline: 020-27492828\n\nWould you like help with documents?",
      mr: "🚗 ड्रायव्हिंग लायसन्स सेवा\n\nड्रायव्हिंग लायसन्ससाठी अर्ज करण्यासाठी:\n\n1. जवळच्या आरटीओ कार्यालयात भेट द्या\n2. आवश्यक कागदपत्रे:\n   • वय पुरावा (कारसाठी 18+)\n   • पत्ता पुरावा\n   • वैद्यकीय प्रमाणपत्र\n   • पासपोर्ट आकाराचे फोटो\n3. शिकाऊ चाचणी उत्तीर्ण करा\n4. ड्रायव्हिंग प्रशिक्षण पूर्ण करा\n5. ड्रायव्हिंग चाचणी उत्तीर्ण करा\n\nहेल्पलाइन: 020-27492828\n\nतुम्हाला कागदपत्रांसाठी मदत हवी आहे का?",
      hi: "🚗 ड्राइविंग लाइसेंस सेवा\n\nड्राइविंग लाइसेंस के लिए आवेदन करने के लिए:\n\n1. निकटतम आरटीओ कार्यालय पर जाएं\n2. आवश्यक दस्तावेज़:\n   • आयु प्रमाण (कारों के लिए 18+)\n   • पता प्रमाण\n   • चिकित्सा प्रमाण पत्र\n   • पासपोर्ट साइज़ फोटो\n3. लर्नर टेस्ट पास करें\n4. ड्राइविंग प्रशिक्षण पूरा करें\n5. ड्राइविंग टेस्ट पास करें\n\nहेल्पलाइन: 020-27492828\n\nक्या आपको दस्तावेज़ों में मदद चाहिए?"
    },
    'vehicle-registration': {
      en: "🚙 Vehicle Registration Service\n\nTo register your vehicle:\n\n1. Visit RTO office\n2. Required documents:\n   • Invoice/Bill of sale\n   • Insurance certificate\n   • PUC certificate\n   • Address proof\n   • ID proof\n3. Pay registration fees\n4. Get number plate\n\nHelpline: 020-27492828\n\nNeed help with the process?",
      mr: "🚙 वाहन नोंदणी सेवा\n\nतुमचे वाहन नोंदणी करण्यासाठी:\n\n1. आरटीओ कार्यालयात भेट द्या\n2. आवश्यक कागदपत्रे:\n   • चलन/विक्री बिल\n   • विमा प्रमाणपत्र\n   • पीयूसी प्रमाणपत्र\n   • पत्ता पुरावा\n   • ओळखपत्र\n3. नोंदणी शुल्क भरा\n4. नंबर प्लेट मिळवा\n\nहेल्पलाइन: 020-27492828\n\nप्रक्रियेसाठी मदत हवी आहे का?",
      hi: "🚙 वाहन पंजीकरण सेवा\n\nअपने वाहन को पंजीकृत करने के लिए:\n\n1. आरटीओ कार्यालय पर जाएं\n2. आवश्यक दस्तावेज़:\n   • चालान/बिक्री बिल\n   • बीमा प्रमाण पत्र\n   • पीयूसी प्रमाण पत्र\n   • पता प्रमाण\n   • पहचान प्रमाण\n3. पंजीकरण शुल्क का भुगतान करें\n4. नंबर प्लेट प्राप्त करें\n\nहेल्पलाइन: 020-27492828\n\nक्या प्रक्रिया में मदद चाहिए?"
    }
  };
  return responses[type as keyof typeof responses]?.[lang as keyof typeof responses['driving-license']] || responses['driving-license'].en;
}
