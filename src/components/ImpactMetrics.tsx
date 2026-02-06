import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, FileCheck, TrendingUp } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

interface ImpactMetricsProps {
  variant?: 'full' | 'compact';
}

export function ImpactMetrics({ variant = 'full' }: ImpactMetricsProps) {
  const { lang } = useLang();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      timeSaved: {
        en: 'Time Saved',
        hi: 'समय बचाया',
        mr: 'वेळ वाचवली',
      },
      timeSavedDesc: {
        en: 'vs manual search',
        hi: 'मैनुअल खोज की तुलना में',
        mr: 'मॅन्युअल शोधाच्या तुलनेत',
      },
      awareness: {
        en: 'Schemes Discovered',
        hi: 'योजनाएं खोजी गईं',
        mr: 'योजना शोधल्या',
      },
      awarenessDesc: {
        en: 'avg per user',
        hi: 'प्रति उपयोगकर्ता औसत',
        mr: 'प्रति वापरकर्ता सरासरी',
      },
      accuracy: {
        en: 'Eligibility Match',
        hi: 'पात्रता मिलान',
        mr: 'पात्रता जुळणी',
      },
      accuracyDesc: {
        en: 'based on criteria',
        hi: 'मानदंड के आधार पर',
        mr: 'निकषांवर आधारित',
      },
      languages: {
        en: 'Languages',
        hi: 'भाषाएं',
        mr: 'भाषा',
      },
      languagesDesc: {
        en: 'supported',
        hi: 'समर्थित',
        mr: 'समर्थित',
      },
    };
    return texts[key]?.[lang] || texts[key]?.en || key;
  };

  const metrics = [
    {
      icon: Clock,
      value: '~15 min',
      label: getText('timeSaved'),
      description: getText('timeSavedDesc'),
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: FileCheck,
      value: '3-5',
      label: getText('awareness'),
      description: getText('awarenessDesc'),
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: TrendingUp,
      value: '85%+',
      label: getText('accuracy'),
      description: getText('accuracyDesc'),
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      icon: Users,
      value: '12',
      label: getText('languages'),
      description: getText('languagesDesc'),
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className={`${metric.bg} rounded-lg p-3 text-center`}>
              <Icon className={`w-5 h-5 ${metric.color} mx-auto mb-1`} />
              <div className="text-lg font-bold text-gray-900">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <Card key={idx} className="border-2">
            <CardContent className="pt-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${metric.bg} rounded-lg mb-3`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm font-semibold text-gray-700">{metric.label}</div>
              <div className="text-xs text-gray-500">{metric.description}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
