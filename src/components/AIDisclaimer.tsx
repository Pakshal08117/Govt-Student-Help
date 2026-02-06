import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Info } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

interface AIDisclaimerProps {
  variant?: 'default' | 'compact';
}

export function AIDisclaimer({ variant = 'default' }: AIDisclaimerProps) {
  const { lang } = useLang();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: {
        en: 'About AI Assistance',
        hi: 'AI सहायता के बारे में',
        mr: 'AI सहाय्याबद्दल',
      },
      message: {
        en: 'This AI assistant helps identify schemes you may be eligible for based on the information you provide. It is not a guarantee of approval. Always verify eligibility criteria on official government websites before applying.',
        hi: 'यह AI सहायक आपके द्वारा प्रदान की गई जानकारी के आधार पर उन योजनाओं की पहचान करने में मदद करता है जिनके लिए आप पात्र हो सकते हैं। यह अनुमोदन की गारंटी नहीं है। आवेदन करने से पहले हमेशा आधिकारिक सरकारी वेबसाइटों पर पात्रता मानदंड सत्यापित करें।',
        mr: 'हा AI सहाय्यक तुम्ही दिलेल्या माहितीच्या आधारे तुम्ही पात्र असू शकता अशा योजना ओळखण्यात मदत करतो. ही मंजुरीची हमी नाही. अर्ज करण्यापूर्वी नेहमी अधिकृत सरकारी वेबसाइटवर पात्रता निकष सत्यापित करा.',
      },
      compact: {
        en: 'AI suggestions are not guaranteed. Verify on official websites.',
        hi: 'AI सुझाव गारंटीकृत नहीं हैं। आधिकारिक वेबसाइटों पर सत्यापित करें।',
        mr: 'AI सूचना हमीदार नाहीत. अधिकृत वेबसाइटवर सत्यापित करा.',
      },
    };
    return texts[key]?.[lang] || texts[key]?.en || key;
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-2 text-xs text-gray-600 bg-blue-50 p-2 rounded border border-blue-200">
        <Info className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-600" />
        <span>{getText('compact')}</span>
      </div>
    );
  }

  return (
    <Alert className="bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-gray-700">
        <span className="font-semibold text-blue-900">{getText('title')}: </span>
        {getText('message')}
      </AlertDescription>
    </Alert>
  );
}
