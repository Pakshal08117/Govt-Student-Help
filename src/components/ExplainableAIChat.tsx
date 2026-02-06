/**
 * Explainable AI Chat Component
 * 
 * Interactive chat interface for the explainable AI assistant
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/contexts/LanguageContext';
import { 
  explainableAIAssistant, 
  type UserProfile, 
  type AIResponse 
} from '@/services/explainableAI';
import { 
  MessageCircle, 
  Send, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  FileText,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function ExplainableAIChat() {
  const { lang, t } = useLang();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Demo user profile - in real app, this would come from user context
  const [userProfile] = useState<UserProfile>({
    age: 25,
    gender: 'male',
    category: 'obc',
    annualIncome: 500000,
    state: 'Maharashtra',
    isStudent: true,
    hasAadhar: true,
    hasBankAccount: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      const result = explainableAIAssistant(query, userProfile);
      setResponse(result);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-blue-600" />
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
          <form onSubmit={handleSubmit} className="flex gap-2">
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
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
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
                  Eligible Schemes ({response.eligibleSchemes.length})
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
                      <p className="text-sm font-semibold">Why you're eligible:</p>
                      {result.reasons.filter(r => r.startsWith('✓')).map((reason, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{reason.substring(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-sm font-semibold mb-2">Required Documents:</p>
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
                      onClick={() => window.open(result.scheme.officialLink, '_blank')}
                    >
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Not Eligible Schemes */}
          {response.notEligibleSchemes.length > 0 && (
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="w-5 h-5" />
                  Not Eligible Schemes ({response.notEligibleSchemes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {response.notEligibleSchemes.map((result, idx) => (
                  <div key={idx} className="bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{result.scheme.name}</h4>
                        <p className="text-sm text-gray-600">{result.scheme.nameHi}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Why you're not eligible:</p>
                      {result.reasons.filter(r => r.startsWith('✗')).map((reason, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{reason.substring(2)}</span>
                        </div>
                      ))}
                      
                      {result.missingInfo.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-orange-700">Missing Information:</p>
                          {result.missingInfo.map((info, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-orange-600">
                              <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{info}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
                  To Find More Schemes, Please Answer:
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

      {/* Example Queries */}
      {!response && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Try These Examples:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {[
                "I need scholarship for college",
                "Show me health insurance schemes",
                "मुझे किसान योजना चाहिए",
                "Housing schemes for low income",
                "Business loan schemes"
              ].map((example, idx) => (
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
