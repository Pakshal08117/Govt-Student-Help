/**
 * Explainable AI Chat Component
 * 
 * Interactive chat interface for the explainable AI assistant
 * Complete scholarship guidance flow with voice input and Supabase integration
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/contexts/LanguageContext';
import { useEssentialMode } from '@/contexts/EssentialModeContext';
import { useScholarshipGuidance } from '@/hooks/useScholarshipGuidance';
import { useProfile } from '@/hooks/useProfile';
import { AIDisclaimer } from '@/components/AIDisclaimer';
import { ImpactMetrics } from '@/components/ImpactMetrics';
import { type UserProfile } from '@/services/explainableAI';
import { 
  MessageCircle, 
  Send, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  FileText,
  ExternalLink,
  Sparkles,
  Mic,
  MicOff,
  Loader2,
  AlertCircle,
  History,
  AlertTriangle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ExplainableAIChat() {
  const { lang, t } = useLang();
  const { isEssentialMode } = useEssentialMode();
  const [query, setQuery] = useState('');
  const { profile: dbProfile } = useProfile();
  
  const {
    loading,
    response,
    error,
    isListening,
    processQuery,
    startVoiceInput,
    stopVoiceInput,
    clearResponse,
  } = useScholarshipGuidance();

  // Build user profile from database or use defaults
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 25,
    gender: 'male',
    category: 'obc',
    annualIncome: 500000,
    state: 'Maharashtra',
    isStudent: true,
    hasAadhar: true,
    hasBankAccount: true
  });

  // Update profile when database profile loads
  useEffect(() => {
    if (dbProfile) {
      setUserProfile(prev => ({
        ...prev,
        age: dbProfile.age || prev.age,
        gender: dbProfile.gender || prev.gender,
        category: dbProfile.category || prev.category,
        annualIncome: dbProfile.annual_income || prev.annualIncome,
        state: dbProfile.state || prev.state,
        isStudent: dbProfile.is_student || prev.isStudent,
      }));
    }
  }, [dbProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    
    await processQuery(query, userProfile, lang);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopVoiceInput();
    } else {
      const languageMap: Record<string, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        mr: 'mr-IN',
        bn: 'bn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        gu: 'gu-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        pa: 'pa-IN',
        or: 'or-IN',
        as: 'as-IN',
      };
      
      startVoiceInput((text) => {
        setQuery(text);
      }, languageMap[lang] || 'en-IN');
    }
  };

  const handleNewQuery = () => {
    setQuery('');
    clearResponse();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className={isEssentialMode ? "border border-gray-300 bg-white" : "bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200"}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            {!isEssentialMode && <Sparkles className="w-6 h-6 text-blue-600" />}
            {lang === "hi" ? "व्याख्यात्मक AI सहायक" : lang === "mr" ? "स्पष्टीकरणात्मक AI सहाय्यक" : "Explainable AI Assistant"}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {lang === "hi" 
              ? "मुझसे सरकारी योजनाओं के बारे में सामान्य भाषा में पूछें। मैं बताऊंगा कि आप पात्र क्यों हैं या नहीं।"
              : lang === "mr"
              ? "मला सरकारी योजनांबद्दल सामान्य भाषेत विचारा. मी स्पष्ट करेन की तुम्ही पात्र का आहात किंवा नाही."
              : "Ask me about government schemes in natural language. I'll explain exactly why you're eligible or not eligible."}
          </p>
        </CardHeader>
      </Card>

      {/* AI Disclaimer */}
      <AIDisclaimer />

      {/* Impact Metrics */}
      {!response && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {lang === "hi" ? "प्रभाव मेट्रिक्स" : lang === "mr" ? "प्रभाव मेट्रिक्स" : "Impact Metrics"}
          </h3>
          <ImpactMetrics variant="compact" />
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* User Profile Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {lang === "hi" ? "आपकी प्रोफ़ाइल" : lang === "mr" ? "तुमची प्रोफाइल" : "Your Profile"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Badge variant="outline">
              {lang === "hi" ? "आयु" : lang === "mr" ? "वय" : "Age"}: {userProfile.age}
            </Badge>
            <Badge variant="outline">
              {lang === "hi" ? "श्रेणी" : lang === "mr" ? "श्रेणी" : "Category"}: {userProfile.category?.toUpperCase()}
            </Badge>
            <Badge variant="outline">
              {lang === "hi" ? "आय" : lang === "mr" ? "उत्पन्न" : "Income"}: ₹{userProfile.annualIncome?.toLocaleString()}
            </Badge>
            <Badge variant="outline">
              {userProfile.isStudent 
                ? (lang === "hi" ? "छात्र" : lang === "mr" ? "विद्यार्थी" : "Student")
                : (lang === "hi" ? "नागरिक" : lang === "mr" ? "नागरिक" : "Citizen")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Query Input */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === "hi" 
                    ? "मुझसे पूछें: 'मुझे छात्रवृत्ति चाहिए' या 'स्वास्थ्य योजनाएं दिखाएं'"
                    : lang === "mr"
                    ? "मला विचारा: 'मला शिष्यवृत्ती हवी' किंवा 'आरोग्य योजना दाखवा'"
                    : "Ask me: 'I need scholarship' or 'Show me health schemes'"
                }
                className="flex-1"
                disabled={loading || isListening}
              />
              
              {/* Voice Input Button */}
              <Button
                type="button"
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                onClick={handleVoiceInput}
                disabled={loading}
                title={isListening ? "Stop listening" : "Voice input"}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 animate-pulse" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>

              {/* Submit Button */}
              <Button type="submit" disabled={loading || isListening || !query.trim()}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Voice Input Status */}
            {isListening && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Mic className="w-4 h-4 animate-pulse" />
                <span>
                  {lang === "hi" ? "सुन रहा हूं... बोलें" : lang === "mr" ? "ऐकत आहे... बोला" : "Listening... Speak now"}
                </span>
              </div>
            )}

            {/* Loading Status */}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>
                  {lang === "hi" ? "प्रोसेस हो रहा है..." : lang === "mr" ? "प्रक्रिया करत आहे..." : "Processing..."}
                </span>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Response Display */}
      {response && (
        <div className="space-y-4">
          {/* Intent Detection */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">
                  {lang === "hi" ? "पहचाना गया इरादा:" : lang === "mr" ? "ओळखलेला हेतू:" : "Detected Intent:"}
                </span>
                <Badge className="bg-blue-100 text-blue-700">
                  {response.intent}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {lang === "hi" 
                  ? `मैं समझ गया कि आप ${response.intent} से संबंधित योजनाएं खोज रहे हैं।`
                  : lang === "mr"
                  ? `मला समजले की तुम्ही ${response.intent} संबंधित योजना शोधत आहात.`
                  : `I understood you're looking for ${response.intent} related schemes.`}
              </p>
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card className="bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                {lang === "hi" ? "स्पष्टीकरण" : lang === "mr" ? "स्पष्टीकरण" : "Explanation"}
              </h3>
              <p className="text-sm whitespace-pre-line">{response.explanation}</p>
            </CardContent>
          </Card>

          {/* Eligible Schemes */}
          {response.eligibleSchemes.length > 0 && (
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  {lang === "hi" 
                    ? `पात्र योजनाएं (${response.eligibleSchemes.length})`
                    : lang === "mr"
                    ? `पात्र योजना (${response.eligibleSchemes.length})`
                    : `Eligible Schemes (${response.eligibleSchemes.length})`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {response.eligibleSchemes.map((result, idx) => (
                  <div key={idx} className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{result.scheme.name}</h4>
                        <p className="text-sm text-gray-600">{result.scheme.nameHi}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {result.confidence}% Confident
                      </Badge>
                    </div>
                    
                    <p className="text-sm mb-3">{result.scheme.benefits}</p>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">
                        {lang === "hi" ? "आप पात्र क्यों हैं:" : lang === "mr" ? "तुम्ही पात्र का आहात:" : "Why you're eligible:"}
                      </p>
                      {result.reasons.filter(r => r.startsWith('✓')).map((reason, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{reason.substring(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-sm font-semibold mb-2">
                        {lang === "hi" ? "आवश्यक दस्तावेज़:" : lang === "mr" ? "आवश्यक कागदपत्रे:" : "Required Documents:"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.scheme.requiredDocuments.map((doc, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="mt-3 w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        // Save query before redirecting
                        window.open(result.scheme.officialLink, '_blank');
                      }}
                    >
                      {lang === "hi" ? "अभी आवेदन करें" : lang === "mr" ? "आता अर्ज करा" : "Apply Now"}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Not Eligible Schemes - Enhanced */}
          {response.notEligibleSchemes.length > 0 && (
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="w-5 h-5" />
                  {lang === "hi" 
                    ? `अपात्र योजनाएं (${response.notEligibleSchemes.length})`
                    : lang === "mr"
                    ? `अपात्र योजना (${response.notEligibleSchemes.length})`
                    : `Not Eligible - Here's Why (${response.notEligibleSchemes.length})`}
                </CardTitle>
                <p className="text-sm text-orange-600 font-normal mt-1">
                  {lang === "hi" 
                    ? "समझें कि आप इन योजनाओं के लिए पात्र क्यों नहीं हैं और क्या करना होगा"
                    : lang === "mr"
                    ? "तुम्ही या योजनांसाठी पात्र का नाही आणि काय करावे लागेल हे समजून घ्या"
                    : "Understand why you don't qualify and what would need to change"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {response.notEligibleSchemes.map((result, idx) => (
                  <div key={idx} className="bg-orange-50 border-2 border-orange-200 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{result.scheme.name}</h4>
                        <p className="text-sm text-gray-600">{result.scheme.nameHi}</p>
                      </div>
                      <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                        {lang === "hi" ? "अपात्र" : lang === "mr" ? "अपात्र" : "Not Eligible"}
                      </Badge>
                    </div>
                    
                    {/* Why Not Eligible - Clear Explanation */}
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-orange-200">
                        <p className="text-sm font-semibold text-orange-900 mb-2 flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          {lang === "hi" ? "आप पात्र क्यों नहीं हैं:" : lang === "mr" ? "तुम्ही पात्र का नाही:" : "Why You're Not Eligible:"}
                        </p>
                        <ul className="space-y-2">
                          {result.reasons.filter(r => r.startsWith('✗')).map((reason, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-red-500 font-bold mt-0.5">✗</span>
                              <span className="flex-1">{reason.substring(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Missing Information */}
                      {result.missingInfo.length > 0 && (
                        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                          <p className="text-sm font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            {lang === "hi" ? "अधिक जानकारी चाहिए:" : lang === "mr" ? "अधिक माहिती आवश्यक:" : "Need More Information:"}
                          </p>
                          <ul className="space-y-1">
                            {result.missingInfo.map((info, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-yellow-600 mt-0.5">•</span>
                                <span className="flex-1">{info}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* What You Can Do */}
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          {lang === "hi" ? "आप क्या कर सकते हैं:" : lang === "mr" ? "तुम्ही काय करू शकता:" : "What You Can Do:"}
                        </p>
                        <p className="text-xs text-blue-700">
                          {lang === "hi" 
                            ? "यदि आपकी परिस्थितियां बदलती हैं (जैसे आय, शिक्षा, या दस्तावेज़), तो फिर से जांचें। आधिकारिक वेबसाइट पर अपवाद या विशेष मामलों की जांच करें।"
                            : lang === "mr"
                            ? "जर तुमची परिस्थिती बदलते (जसे की उत्पन्न, शिक्षण, किंवा कागदपत्रे), तर पुन्हा तपासा. अधिकृत वेबसाइटवर अपवाद किंवा विशेष प्रकरणे तपासा."
                            : "If your circumstances change (income, education, documents), check again. Visit the official website for exceptions or special cases."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Follow-up Questions */}
          {response.followUpQuestions.length > 0 && (
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <HelpCircle className="w-5 h-5" />
                  {lang === "hi" 
                    ? "अधिक योजनाएं खोजने के लिए, कृपया उत्तर दें:"
                    : lang === "mr"
                    ? "अधिक योजना शोधण्यासाठी, कृपया उत्तर द्या:"
                    : "To Find More Schemes, Please Answer:"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {response.followUpQuestions.map((question, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="font-semibold text-orange-600">{idx + 1}.</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* New Query Button */}
      {response && (
        <div className="flex justify-center">
          <Button onClick={handleNewQuery} variant="outline" size="lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            {lang === "hi" ? "नया प्रश्न पूछें" : lang === "mr" ? "नवीन प्रश्न विचारा" : "Ask New Question"}
          </Button>
        </div>
      )}

      {/* Example Queries */}
      {!response && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {lang === "hi" ? "ये उदाहरण आज़माएं:" : lang === "mr" ? "हे उदाहरणे वापरून पहा:" : "Try These Examples:"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {(lang === "hi" ? [
                "मुझे कॉलेज के लिए छात्रवृत्ति चाहिए",
                "स्वास्थ्य बीमा योजनाएं दिखाएं",
                "मुझे किसान योजना चाहिए",
                "कम आय के लिए आवास योजनाएं",
                "व्यवसाय ऋण योजनाएं"
              ] : lang === "mr" ? [
                "मला महाविद्यालयासाठी शिष्यवृत्ती हवी",
                "आरोग्य विमा योजना दाखवा",
                "मला शेतकरी योजना हवी",
                "कमी उत्पन्नासाठी गृहनिर्माण योजना",
                "व्यवसाय कर्ज योजना"
              ] : [
                "I need scholarship for college",
                "Show me health insurance schemes",
                "मुझे किसान योजना चाहिए",
                "Housing schemes for low income",
                "Business loan schemes"
              ]).map((example, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start text-left"
                  onClick={() => setQuery(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
