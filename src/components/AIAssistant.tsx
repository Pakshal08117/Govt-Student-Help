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
import { generateCachedResponse, handleSpecificQuery } from "@/services/aiService";

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

  // Generate AI response using intelligent service
  const generateAIResponse = useCallback(async (userInput: string): Promise<ChatMessage> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const input = userInput.toLowerCase();

    // Voice commands for navigation
    if (input.includes('open schemes') || input.includes('योजना उघडा') || input.includes('योजनाएं खोलें')) {
      setTimeout(() => window.location.href = '/schemes', 500);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: lang === 'mr' ? '✅ योजना पृष्ठ उघडत आहे...' : lang === 'hi' ? '✅ योजना पृष्ठ खोल रहे हैं...' : '✅ Opening schemes page...',
        timestamp: new Date()
      };
    }

    if (input.includes('open admin') || input.includes('प्रशासक') || input.includes('एडमिन')) {
      setTimeout(() => window.location.href = '/admin', 500);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: lang === 'mr' ? '✅ प्रशासक पॅनेल उघडत आहे...' : lang === 'hi' ? '✅ एडमिन पैनल खोल रहे हैं...' : '✅ Opening admin panel...',
        timestamp: new Date()
      };
    }

    // Use intelligent AI service for problem analysis and solutions
    const intelligentResponse = generateCachedResponse(userInput, lang);

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: intelligentResponse,
      timestamp: new Date()
    };
  }, [lang]);

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
      recognition.maxAlternatives = 1;
      recognition.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      
      // Log microphone status
      console.log('🎤 Initializing voice recognition...');
      console.log('📍 Language:', recognition.lang);

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
          toast.error(
            lang === 'mr' 
              ? '🔒 मायक्रोफोन परवानगी द्या! ब्राउझर अॅड्रेस बारमधील 🔒 आयकॉनवर क्लिक करा.' 
              : lang === 'hi' 
              ? '🔒 माइक्रोफ़ोन अनुमति दें! ब्राउज़र एड्रेस बार में 🔒 आइकन पर क्लिक करें।' 
              : '🔒 Please allow microphone! Click the 🔒 icon in browser address bar.',
            { duration: 5000 }
          );
        } else if (event.error === 'no-speech') {
          toast.error(
            lang === 'mr' 
              ? '🎤 आवाज ऐकू आला नाही. मोठ्याने बोला आणि पुन्हा प्रयत्न करा!' 
              : lang === 'hi' 
              ? '🎤 आवाज़ नहीं सुनाई दी। जोर से बोलें और फिर से प्रयास करें!' 
              : '🎤 No speech detected. Speak louder and try again!',
            { duration: 4000 }
          );
        } else if (event.error === 'audio-capture') {
          toast.error(
            lang === 'mr' 
              ? '🎤 मायक्रोफोन सापडला नाही! Windows Sound Settings तपासा.' 
              : lang === 'hi' 
              ? '🎤 माइक्रोफ़ोन नहीं मिला! Windows Sound Settings जांचें।' 
              : '🎤 Microphone not found! Check Windows Sound Settings.',
            { duration: 5000 }
          );
        } else if (event.error === 'network') {
          toast.error(
            lang === 'mr' 
              ? '🌐 इंटरनेट कनेक्शन तपासा' 
              : lang === 'hi' 
              ? '🌐 इंटरनेट कनेक्शन जांचें' 
              : '🌐 Check internet connection',
            { duration: 4000 }
          );
        } else {
          toast.error(
            lang === 'mr' 
              ? '❌ व्हॉइस त्रुटी. पुन्हा प्रयत्न करा किंवा टाइप करा.' 
              : lang === 'hi' 
              ? '❌ वॉइस त्रुटि। फिर से प्रयास करें या टाइप करें।' 
              : '❌ Voice error. Try again or type instead.',
            { duration: 4000 }
          );
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
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-center text-orange-600 font-medium animate-pulse">
                    🎤 {lang === 'mr' ? 'ऐकत आहे... मोठ्याने बोला!' : lang === 'hi' ? 'सुन रहे हैं... जोर से बोलें!' : 'Listening... Speak loudly!'}
                  </p>
                  <p className="text-xs text-center text-gray-500">
                    {lang === 'mr' ? 'तुमचे शब्द वर दिसतील' : lang === 'hi' ? 'आपके शब्द ऊपर दिखेंगे' : 'Your words will appear above'}
                  </p>
                </div>
              )}
              {!isListening && (
                <p className="text-xs text-center mt-2 text-gray-500">
                  💡 {lang === 'mr' ? 'टीप: Chrome ब्राउझर सर्वोत्तम काम करतो' : lang === 'hi' ? 'टिप: Chrome ब्राउज़र सबसे अच्छा काम करता है' : 'Tip: Chrome browser works best'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper function for welcome message
function getWelcomeMessage(lang: string): string {
  const messages = {
    en: "👋 Hello! I'm your Intelligent AI Assistant for Government & Student Help Platform.\n\n🎯 **What I Can Help You With:**\n• Find perfect government schemes for your needs\n• Voice & text interaction in 12 languages\n• Real-time application guidance\n• Document assistance & requirements\n• Navigate platform features\n\n🎤 **Voice Commands Examples:**\n• 'I need medical treatment'\n• 'My daughter needs school fees'\n• 'I'm a farmer, need financial help'\n• 'Open schemes page'\n• 'What features does this website have?'\n\n🌟 **Platform Features:**\n• 40+ Government Schemes & Scholarships\n• Support in 12 Indian Languages\n• 24x7 Helpline Support (1077)\n• Government Verified Information\n• Real-time Application Tracking\n\n✨ Just click the microphone and tell me your problem, or ask about any platform feature!",
    mr: "👋 नमस्कार! मी तुमचा बुद्धिमान AI सहाय्यक आहे सरकारी व विद्यार्थी मदत प्लॅटफॉर्मसाठी.\n\n🎯 **मी तुम्हाला यामध्ये मदत करू शकतो:**\n• तुमच्या गरजेनुसार योग्य सरकारी योजना शोधणे\n• 12 भाषांमध्ये आवाज व मजकूर संवाद\n• रिअल-टाइम अर्ज मार्गदर्शन\n• कागदपत्र सहाय्य व आवश्यकता\n• प्लॅटफॉर्म वैशिष्ट्यांमध्ये नेव्हिगेट करणे\n\n🎤 **आवाज कमांड उदाहरणे:**\n• 'मला वैद्यकीय उपचार हवे'\n• 'माझ्या मुलीला शाळेच्या फीसाठी मदत हवी'\n• 'मी शेतकरी आहे, आर्थिक मदत हवी'\n• 'योजना पृष्ठ उघडा'\n• 'या वेबसाइटची कोणती वैशिष्ट्ये आहेत?'\n\n🌟 **प्लॅटफॉर्म वैशिष्ट्ये:**\n• 40+ सरकारी योजना आणि शिष्यवृत्ती\n• 12 भारतीय भाषांमध्ये सहाय्य\n• 24x7 हेल्पलाइन सहाय्य (1077)\n• सरकार सत्यापित माहिती\n• रिअल-टाइम अर्ज ट्रॅकिंग\n\n✨ फक्त मायक्रोफोनवर क्लिक करा आणि तुमची समस्या सांगा, किंवा कोणत्याही प्लॅटफॉर्म वैशिष्ट्याबद्दल विचारा!",
    hi: "👋 नमस्ते! मैं आपका बुद्धिमान AI सहायक हूं सरकारी व छात्र सहायता प्लेटफॉर्म के लिए।\n\n🎯 **मैं आपकी इनमें मदद कर सकता हूं:**\n• आपकी जरूरतों के अनुसार सही सरकारी योजनाएं खोजना\n• 12 भाषाओं में आवाज व टेक्स्ट बातचीत\n• रियल-टाइम आवेदन मार्गदर्शन\n• दस्तावेज़ सहायता व आवश्यकताएं\n• प्लेटफॉर्म फीचर्स में नेवीगेट करना\n\n🎤 **आवाज कमांड उदाहरण:**\n• 'मुझे चिकित्सा उपचार चाहिए'\n• 'मेरी बेटी को स्कूल की फीस चाहिए'\n• 'मैं किसान हूं, वित्तीय मदद चाहिए'\n• 'योजनाएं पेज खोलें'\n• 'इस वेबसाइट की क्या विशेषताएं हैं?'\n\n🌟 **प्लेटफॉर्म विशेषताएं:**\n• 40+ सरकारी योजनाएं और छात्रवृत्ति\n• 12 भारतीय भाषाओं में सहायता\n• 24x7 हेल्पलाइन सहायता (1077)\n• सरकार सत्यापित जानकारी\n• रियल-टाइम आवेदन ट्रैकिंग\n\n✨ बस माइक्रोफ़ोन पर क्लिक करें और अपनी समस्या बताएं, या किसी भी प्लेटफॉर्म फीचर के बारे में पूछें!"
  };
  return messages[lang as keyof typeof messages] || messages.en;
}
