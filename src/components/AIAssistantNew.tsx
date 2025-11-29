import { useState, useEffect, useRef, useCallback } from "react";
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
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export default function AIAssistant() {
  const { t, lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize welcome message
  useEffect(() => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: getWelcomeMessage(lang),
      timestamp: new Date()
    }]);
  }, [lang]);

  // Speak AI messages
  const speakMessage = useCallback((text: string) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  }, [isMuted, lang]);

  // Analyze and suggest schemes
  const analyzeAndSuggestSchemes = useCallback((userInput: string): string => {
    const input = userInput.toLowerCase();
    const suggestedSchemes: string[] = [];

    // Health keywords
    if (input.match(/health|hospital|medical|treatment|doctor|surgery|illness|disease|बीमार|आजार|उपचार|रुग्णालय|डॉक्टर|इलाज|बीमारी|चिकित्सा/i)) {
      suggestedSchemes.push('health');
    }

    // Education keywords
    if (input.match(/education|school|college|study|scholarship|fees|student|girl|daughter|शिक्षण|शाळा|महाविद्यालय|अभ्यास|शिष्यवृत्ती|फी|विद्यार्थी|मुलगी|मुलीचे|शिक्षा|छात्रवृत्ति|बेटी/i)) {
      suggestedSchemes.push('education');
    }

    // Agriculture keywords
    if (input.match(/farm|agriculture|crop|irrigation|pump|water|farmer|खेती|शेती|शेतकरी|पीक|सिंचन|पंप|पाणी|किसान|कृषि/i)) {
      suggestedSchemes.push('agriculture');
    }

    // Financial keywords
    if (input.match(/money|financial|income|poor|poverty|help|assistance|पैसे|आर्थिक|उत्पन्न|गरीब|मदत|सहाय्य|आय|गरीबी|सहायता/i)) {
      suggestedSchemes.push('financial');
    }

    if (suggestedSchemes.length > 0) {
      return generateSchemeResponse(suggestedSchemes, lang);
    }

    return '';
  }, [lang]);

  // Generate AI response
  const generateAIResponse = useCallback(async (userInput: string): Promise<ChatMessage> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const input = userInput.toLowerCase();

    // Check for scheme suggestions first
    const schemeRecommendation = analyzeAndSuggestSchemes(userInput);
    if (schemeRecommendation) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: schemeRecommendation,
        timestamp: new Date()
      };
    }

    // Voice commands
    if (input.includes('open schemes') || input.includes('योजना') || input.includes('योजनाएं')) {
      setTimeout(() => window.location.href = '/schemes', 500);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: lang === 'mr' ? 'योजना पृष्ठ उघडत आहे...' : lang === 'hi' ? 'योजना पृष्ठ खोल रहे हैं...' : 'Opening schemes page...',
        timestamp: new Date()
      };
    }

    // Default response
    const responses = {
      en: "I can help you with:\n\n• Government schemes (Free)\n• Application tracking (Free)\n• Contact information (Free)\n\nTry saying: 'I need help with medical treatment' or 'My daughter needs school fees'",
      mr: "मी तुम्हाला मदत करू शकतो:\n\n• सरकारी योजना (मोफत)\n• अर्ज ट्रॅकिंग (मोफत)\n• संपर्क माहिती (मोफत)\n\nप्रयत्न करा: 'मला वैद्यकीय उपचारासाठी मदत हवी आहे' किंवा 'माझ्या मुलीला शाळेच्या फीसाठी मदत हवी आहे'",
      hi: "मैं आपकी मदद कर सकता हूं:\n\n• सरकारी योजनाएं (मुफ्त)\n• आवेदन ट्रैकिंग (मुफ्त)\n• संपर्क जानकारी (मुफ्त)\n\nकहें: 'मुझे चिकित्सा उपचार के लिए मदद चाहिए' या 'मेरी बेटी को स्कूल की फीस के लिए मदद चाहिए'"
    };

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: responses[lang as keyof typeof responses] || responses.en,
      timestamp: new Date()
    };
  }, [analyzeAndSuggestSchemes, lang]);

  // Handle voice input
  const handleVoiceInput = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error(lang === 'mr' ? 'तुमचा ब्राउझर व्हॉइस इनपुट सपोर्ट करत नाही. Chrome वापरा.' : 
                 lang === 'hi' ? 'आपका ब्राउज़र वॉइस इनपुट सपोर्ट नहीं करता। Chrome का उपयोग करें।' : 
                 'Your browser does not support voice input. Please use Chrome.');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        console.log('🎤 Voice recognition started');
        setIsListening(true);
        toast.success(lang === 'mr' ? '🎤 बोला...' : lang === 'hi' ? '🎤 बोलें...' : '🎤 Speak now...');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('📝 Recognized:', transcript);
        setInputValue(transcript);

        // Auto-submit on final result
        if (event.results[event.results.length - 1].isFinal) {
          console.log('✅ Final result, submitting...');
          setTimeout(async () => {
            if (transcript.trim()) {
              const userMessage: ChatMessage = {
                id: Date.now().toString(),
                type: 'user',
                content: transcript.trim(),
                timestamp: new Date(),
                isVoice: true
              };

              setMessages(prev => [...prev, userMessage]);
              setInputValue('');
              setIsLoading(true);

              try {
                const aiResponse = await generateAIResponse(transcript.trim());
                setMessages(prev => [...prev, aiResponse]);
                speakMessage(aiResponse.content);
              } catch (error) {
                console.error('❌ Error:', error);
              } finally {
                setIsLoading(false);
              }
            }
          }, 500);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('❌ Recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          toast.error(lang === 'mr' ? 'मायक्रोफोन परवानगी द्या' : lang === 'hi' ? 'माइक्रोफ़ोन अनुमति दें' : 'Please allow microphone access');
        } else if (event.error === 'no-speech') {
          toast.error(lang === 'mr' ? 'आवाज ऐकू आला नाही' : lang === 'hi' ? 'आवाज़ नहीं सुनाई दी' : 'No speech detected');
        }
      };

      recognition.onend = () => {
        console.log('🛑 Voice recognition ended');
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (error) {
      console.error('❌ Failed to start recognition:', error);
      setIsListening(false);
      toast.error(lang === 'mr' ? 'व्हॉइस इनपुट सुरू करता आले नाही' : lang === 'hi' ? 'वॉइस इनपुट शुरू नहीं हो सका' : 'Could not start voice input');
    }
  }, [isListening, lang, generateAIResponse, speakMessage]);

  // Handle send message
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      isVoice: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      setMessages(prev => [...prev, aiResponse]);
      speakMessage(aiResponse.content);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, generateAIResponse, speakMessage]);

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle speech
  const toggleSpeech = () => {
    setIsMuted(!isMuted);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (!isMuted) {
        window.speechSynthesis.cancel();
      }
    }
  };

  // Handle close
  const handleClose = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 animate-pulse"
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
                🎤 Voice & Text
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
                  placeholder={lang === 'mr' ? 'तुमची समस्या सांगा...' : lang === 'hi' ? 'अपनी समस्या बताएं...' : 'Tell me your problem...'}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleVoiceInput}
                  size="sm"
                  variant={isListening ? "destructive" : "outline"}
                  disabled={isLoading}
                  className="px-3"
                >
                  {isListening ? <MicOff className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4" />}
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
                <p className="text-xs text-center mt-2 text-orange-600 font-medium animate-pulse">
                  🎤 {lang === 'mr' ? 'ऐकत आहे...' : lang === 'hi' ? 'सुन रहे हैं...' : 'Listening...'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper functions
function getWelcomeMessage(lang: string): string {
  const messages = {
    en: "Hello! 👋 I'm your AI Assistant.\n\n🎤 Click the microphone and tell me your problem!\n\nI can help with:\n• Health issues → Health schemes\n• Education needs → Education schemes\n• Farming problems → Agriculture schemes\n• Financial help → Support schemes\n\nTry saying: 'I need help with medical treatment'",
    mr: "नमस्कार! 👋 मी तुमचा AI सहाय्यक आहे.\n\n🎤 मायक्रोफोन क्लिक करा आणि तुमची समस्या सांगा!\n\nमी मदत करू शकतो:\n• आरोग्य समस्या → आरोग्य योजना\n• शिक्षण गरजा → शिक्षण योजना\n• शेती समस्या → कृषी योजना\n• आर्थिक मदत → सहाय्य योजना\n\nबोला: 'मला वैद्यकीय उपचारासाठी मदत हवी आहे'",
    hi: "नमस्ते! 👋 मैं आपका AI सहायक हूं।\n\n🎤 माइक्रोफ़ोन क्लिक करें और अपनी समस्या बताएं!\n\nमैं मदद कर सकता हूं:\n• स्वास्थ्य समस्याएं → स्वास्थ्य योजनाएं\n• शिक्षा जरूरतें → शिक्षा योजनाएं\n• खेती समस्याएं → कृषि योजनाएं\n• वित्तीय मदद → सहायता योजनाएं\n\nकहें: 'मुझे चिकित्सा उपचार के लिए मदद चाहिए'"
  };
  return messages[lang as keyof typeof messages] || messages.en;
}

function generateSchemeResponse(categories: string[], lang: string): string {
  const schemes: any = {
    health: {
      en: "🏥 Mahatma Jyotiba Phule Jan Arogya Yojana\n   Free health insurance up to ₹1.5 lakh",
      mr: "🏥 महात्मा ज्योतिबा फुले जन आरोग्य योजना\n   ₹1.5 लाख पर्यंत मोफत आरोग्य विमा",
      hi: "🏥 महात्मा ज्योतिबा फुले जन आरोग्य योजना\n   ₹1.5 लाख तक मुफ्त स्वास्थ्य बीमा"
    },
    education: {
      en: "📚 Lek Ladki Yojana\n   Financial aid for girl education (up to ₹75,000)",
      mr: "📚 लेक लाडकी योजना\n   मुलींच्या शिक्षणासाठी आर्थिक मदत (₹75,000 पर्यंत)",
      hi: "📚 लेक लाडकी योजना\n   बालिका शिक्षा के लिए वित्तीय सहायता (₹75,000 तक)"
    },
    agriculture: {
      en: "🌾 Namo Shetkari Sanman Nidhi\n   ₹6,000 per year for farmers",
      mr: "🌾 नमो शेतकरी सन्मान निधी\n   शेतकऱ्यांसाठी दरवर्षी ₹6,000",
      hi: "🌾 नमो शेतकारी सन्मान निधि\n   किसानों के लिए प्रति वर्ष ₹6,000"
    },
    financial: {
      en: "💰 Multiple schemes available for financial assistance",
      mr: "💰 आर्थिक सहाय्यासाठी अनेक योजना उपलब्ध",
      hi: "💰 वित्तीय सहायता के लिए कई योजनाएं उपलब्ध"
    }
  };

  const header = {
    en: "🎯 Based on your problem, I recommend:\n\n",
    mr: "🎯 तुमच्या समस्येवर आधारित, मी सुचवतो:\n\n",
    hi: "🎯 आपकी समस्या के आधार पर, मैं सुझाता हूं:\n\n"
  };

  const footer = {
    en: "\n\n📋 Visit 'Schemes' page to apply!\n\nNeed more details? Just ask!",
    mr: "\n\n📋 अर्ज करण्यासाठी 'योजना' पृष्ठाला भेट द्या!\n\nअधिक तपशील हवे? विचारा!",
    hi: "\n\n📋 आवेदन के लिए 'योजनाएं' पृष्ठ पर जाएं!\n\nअधिक जानकारी चाहिए? पूछें!"
  };

  let message = header[lang as keyof typeof header] || header.en;
  
  categories.forEach((cat, index) => {
    if (schemes[cat]) {
      message += `${index + 1}. ${schemes[cat][lang] || schemes[cat].en}\n\n`;
    }
  });

  message += footer[lang as keyof typeof footer] || footer.en;
  
  return message;
}
