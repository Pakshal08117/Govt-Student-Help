import { useLowBandwidth } from '@/contexts/LowBandwidthContext';
import { useLang } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Wifi, WifiOff, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function LowBandwidthToggle() {
  const { isLowBandwidth, toggleLowBandwidth } = useLowBandwidth();
  const { lang, t } = useLang();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      lowBandwidthMode: {
        en: 'Low Bandwidth Mode',
        hi: 'कम बैंडविड्थ मोड',
        mr: 'कमी बँडविड्थ मोड',
      },
      forSlowInternet: {
        en: 'For slow internet connections',
        hi: 'धीमे इंटरनेट कनेक्शन के लिए',
        mr: 'मंद इंटरनेट कनेक्शनसाठी',
      },
      enabled: {
        en: 'Enabled',
        hi: 'सक्षम',
        mr: 'सक्षम',
      },
      disabled: {
        en: 'Disabled',
        hi: 'अक्षम',
        mr: 'अक्षम',
      },
      benefits: {
        en: 'Benefits',
        hi: 'लाभ',
        mr: 'फायदे',
      },
      noImages: {
        en: '✓ No images',
        hi: '✓ कोई चित्र नहीं',
        mr: '✓ चित्रे नाहीत',
      },
      noAnimations: {
        en: '✓ No animations',
        hi: '✓ कोई एनिमेशन नहीं',
        mr: '✓ अॅनिमेशन नाहीत',
      },
      fasterLoading: {
        en: '✓ Faster loading',
        hi: '✓ तेज़ लोडिंग',
        mr: '✓ जलद लोडिंग',
      },
      lessData: {
        en: '✓ Less data usage',
        hi: '✓ कम डेटा उपयोग',
        mr: '✓ कमी डेटा वापर',
      },
    };
    return texts[key]?.[lang] || texts[key]?.en || key;
  };

  return (
    <Card className={isLowBandwidth ? 'border-2 border-green-500' : ''}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {isLowBandwidth ? (
              <WifiOff className="w-6 h-6 text-green-600" />
            ) : (
              <Wifi className="w-6 h-6 text-blue-600" />
            )}
            <div>
              <Label htmlFor="low-bandwidth-toggle" className="text-base font-semibold cursor-pointer">
                {getText('lowBandwidthMode')}
              </Label>
              <p className="text-sm text-gray-600">
                {getText('forSlowInternet')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${isLowBandwidth ? 'text-green-600' : 'text-gray-500'}`}>
              {isLowBandwidth ? getText('enabled') : getText('disabled')}
            </span>
            <Switch
              id="low-bandwidth-toggle"
              checked={isLowBandwidth}
              onCheckedChange={toggleLowBandwidth}
            />
          </div>
        </div>

        {isLowBandwidth && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">
                {getText('benefits')}
              </span>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>{getText('noImages')}</li>
              <li>{getText('noAnimations')}</li>
              <li>{getText('fasterLoading')}</li>
              <li>{getText('lessData')}</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Floating indicator for low bandwidth mode
export function LowBandwidthIndicator() {
  const { isLowBandwidth } = useLowBandwidth();
  const { lang } = useLang();

  if (!isLowBandwidth) return null;

  const text = {
    en: '⚡ Low Bandwidth',
    hi: '⚡ कम बैंडविड्थ',
    mr: '⚡ कमी बँडविड्थ',
  }[lang] || '⚡ Low Bandwidth';

  return (
    <div className="low-bandwidth-indicator">
      {text}
    </div>
  );
}
