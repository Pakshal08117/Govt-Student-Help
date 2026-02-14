import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import { CheckCircle2, FileText, MapPin, Clock, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import GatewayBackground from "@/components/GatewayBackground";

interface DocumentGuide {
  id: string;
  name_en: string;
  name_mr: string;
  name_hi: string;
  description_en: string;
  description_mr: string;
  description_hi: string;
  steps: {
    step_en: string;
    step_mr: string;
    step_hi: string;
  }[];
  requiredDocs: string[];
  office: string;
  processingTime: string;
  fees: string;
}

const documentGuides: DocumentGuide[] = [
  {
    id: "aadhar",
    name_en: "Aadhar Card",
    name_mr: "आधार कार्ड",
    name_hi: "आधार कार्ड",
    description_en: "Unique identification document for Indian residents",
    description_mr: "भारतीय रहिवाशांसाठी अद्वितीय ओळख दस्तऐवज",
    description_hi: "भारतीय निवासियों के लिए विशिष्ट पहचान दस्तावेज़",
    steps: [
      {
        step_en: "Visit nearest Aadhar Enrollment Center",
        step_mr: "जवळच्या आधार नोंदणी केंद्राला भेट द्या",
        step_hi: "निकटतम आधार नामांकन केंद्र पर जाएं"
      },
      {
        step_en: "Fill enrollment form with personal details",
        step_mr: "वैयक्तिक तपशीलांसह नोंदणी फॉर्म भरा",
        step_hi: "व्यक्तिगत विवरण के साथ नामांकन फॉर्म भरें"
      },
      {
        step_en: "Provide biometric data (fingerprints and iris scan)",
        step_mr: "बायोमेट्रिक डेटा प्रदान करा (फिंगरप्रिंट आणि आयरिस स्कॅन)",
        step_hi: "बायोमेट्रिक डेटा प्रदान करें (फिंगरप्रिंट और आईरिस स्कैन)"
      },
      {
        step_en: "Submit proof of identity and address",
        step_mr: "ओळख आणि पत्त्याचा पुरावा सबमिट करा",
        step_hi: "पहचान और पते का प्रमाण जमा करें"
      },
      {
        step_en: "Receive acknowledgment slip with enrollment number",
        step_mr: "नोंदणी क्रमांकासह पावती पर्ची प्राप्त करा",
        step_hi: "नामांकन संख्या के साथ पावती पर्ची प्राप्त करें"
      },
      {
        step_en: "Track status online using enrollment number",
        step_mr: "नोंदणी क्रमांक वापरून ऑनलाइन स्थिती ट्रॅक करा",
        step_hi: "नामांकन संख्या का उपयोग करके ऑनलाइन स्थिति ट्रैक करें"
      },
      {
        step_en: "Receive Aadhar card by post within 90 days",
        step_mr: "90 दिवसांच्या आत पोस्टाने आधार कार्ड प्राप्त करा",
        step_hi: "90 दिनों के भीतर डाक द्वारा आधार कार्ड प्राप्त करें"
      }
    ],
    requiredDocs: ["Proof of Identity", "Proof of Address", "Date of Birth Proof"],
    office: "Aadhar Enrollment Center",
    processingTime: "90 days",
    fees: "Free"
  },
  {
    id: "income-certificate",
    name_en: "Income Certificate",
    name_mr: "उत्पन्न प्रमाणपत्र",
    name_hi: "आय प्रमाण पत्र",
    description_en: "Certificate showing annual family income",
    description_mr: "वार्षिक कौटुंबिक उत्पन्न दर्शविणारे प्रमाणपत्र",
    description_hi: "वार्षिक पारिवारिक आय दिखाने वाला प्रमाण पत्र",
    steps: [
      {
        step_en: "Visit Tehsil office or apply online on Aaplesarkar portal",
        step_mr: "तहसील कार्यालयात भेट द्या किंवा आपलेसरकार पोर्टलवर ऑनलाइन अर्ज करा",
        step_hi: "तहसील कार्यालय पर जाएं या आपलेसरकार पोर्टल पर ऑनलाइन आवेदन करें"
      },
      {
        step_en: "Fill application form with family income details",
        step_mr: "कौटुंबिक उत्पन्न तपशीलांसह अर्ज फॉर्म भरा",
        step_hi: "पारिवारिक आय विवरण के साथ आवेदन पत्र भरें"
      },
      {
        step_en: "Attach salary slips, bank statements, or affidavit",
        step_mr: "पगार पर्च्या, बँक स्टेटमेंट किंवा प्रतिज्ञापत्र जोडा",
        step_hi: "वेतन पर्ची, बैंक स्टेटमेंट या शपथ पत्र संलग्न करें"
      },
      {
        step_en: "Submit Aadhar card and ration card copies",
        step_mr: "आधार कार्ड आणि रेशन कार्डच्या प्रती सबमिट करा",
        step_hi: "आधार कार्ड और राशन कार्ड की प्रतियां जमा करें"
      },
      {
        step_en: "Pay prescribed fees (if applicable)",
        step_mr: "विहित शुल्क भरा (लागू असल्यास)",
        step_hi: "निर्धारित शुल्क का भुगतान करें (यदि लागू हो)"
      },
      {
        step_en: "Receive acknowledgment receipt",
        step_mr: "पावती पावती प्राप्त करा",
        step_hi: "पावती रसीद प्राप्त करें"
      },
      {
        step_en: "Collect certificate from Tehsil office after verification",
        step_mr: "पडताळणीनंतर तहसील कार्यालयातून प्रमाणपत्र गोळा करा",
        step_hi: "सत्यापन के बाद तहसील कार्यालय से प्रमाण पत्र एकत्र करें"
      }
    ],
    requiredDocs: ["Aadhar Card", "Ration Card", "Salary Slips/Bank Statement", "Affidavit"],
    office: "Tehsil Office",
    processingTime: "7-15 days",
    fees: "₹20-50"
  },
  {
    id: "caste-certificate",
    name_en: "Caste Certificate",
    name_mr: "जात प्रमाणपत्र",
    name_hi: "जाति प्रमाण पत्र",
    description_en: "Certificate for SC/ST/OBC category verification",
    description_mr: "अनुसूचित जाती/जमाती/ओबीसी श्रेणी पडताळणीसाठी प्रमाणपत्र",
    description_hi: "अनुसूचित जाति/जनजाति/ओबीसी श्रेणी सत्यापन के लिए प्रमाण पत्र",
    steps: [
      {
        step_en: "Visit Tehsil office with required documents",
        step_mr: "आवश्यक कागदपत्रांसह तहसील कार्यालयात भेट द्या",
        step_hi: "आवश्यक दस्तावेजों के साथ तहसील कार्यालय पर जाएं"
      },
      {
        step_en: "Fill caste certificate application form",
        step_mr: "जात प्रमाणपत्र अर्ज फॉर्म भरा",
        step_hi: "जाति प्रमाण पत्र आवेदन पत्र भरें"
      },
      {
        step_en: "Submit parent's caste certificate (if available)",
        step_mr: "पालकांचे जात प्रमाणपत्र सबमिट करा (उपलब्ध असल्यास)",
        step_hi: "माता-पिता का जाति प्रमाण पत्र जमा करें (यदि उपलब्ध हो)"
      },
      {
        step_en: "Provide school leaving certificate showing caste",
        step_mr: "जात दर्शविणारे शाळा सोडल्याचे प्रमाणपत्र प्रदान करा",
        step_hi: "जाति दिखाने वाला स्कूल छोड़ने का प्रमाण पत्र प्रदान करें"
      },
      {
        step_en: "Submit affidavit on stamp paper",
        step_mr: "स्टॅम्प पेपरवर प्रतिज्ञापत्र सबमिट करा",
        step_hi: "स्टाम्प पेपर पर शपथ पत्र जमा करें"
      },
      {
        step_en: "Verification by Tehsildar",
        step_mr: "तहसीलदारांकडून पडताळणी",
        step_hi: "तहसीलदार द्वारा सत्यापन"
      },
      {
        step_en: "Collect certificate after approval",
        step_mr: "मंजुरीनंतर प्रमाणपत्र गोळा करा",
        step_hi: "अनुमोदन के बाद प्रमाण पत्र एकत्र करें"
      }
    ],
    requiredDocs: ["Aadhar Card", "School Leaving Certificate", "Parent's Caste Certificate", "Affidavit"],
    office: "Tehsil Office",
    processingTime: "15-30 days",
    fees: "₹30-100"
  },
  {
    id: "domicile-certificate",
    name_en: "Domicile Certificate",
    name_mr: "अधिवास प्रमाणपत्र",
    name_hi: "अधिवास प्रमाण पत्र",
    description_en: "Certificate proving residence in your state",
    description_mr: "तुमच्या राज्यात राहत असल्याचे सिद्ध करणारे प्रमाणपत्र",
    description_hi: "आपके राज्य में निवास साबित करने वाला प्रमाण पत्र",
    steps: [
      {
        step_en: "Visit Tehsil office or apply online",
        step_mr: "तहसील कार्यालयात भेट द्या किंवा ऑनलाइन अर्ज करा",
        step_hi: "तहसील कार्यालय पर जाएं या ऑनलाइन आवेदन करें"
      },
      {
        step_en: "Fill domicile certificate application form",
        step_mr: "अधिवास प्रमाणपत्र अर्ज फॉर्म भरा",
        step_hi: "अधिवास प्रमाण पत्र आवेदन पत्र भरें"
      },
      {
        step_en: "Provide proof of residence in your state (duration varies by state)",
        step_mr: "तुमच्या राज्यातील निवासाचा पुरावा प्रदान करा",
        step_hi: "अपने राज्य में निवास का प्रमाण प्रदान करें"
      },
      {
        step_en: "Submit school certificates, ration card, property documents",
        step_mr: "शाळा प्रमाणपत्रे, रेशन कार्ड, मालमत्ता कागदपत्रे सबमिट करा",
        step_hi: "स्कूल प्रमाण पत्र, राशन कार्ड, संपत्ति दस्तावेज जमा करें"
      },
      {
        step_en: "Attach Aadhar card and birth certificate",
        step_mr: "आधार कार्ड आणि जन्म प्रमाणपत्र जोडा",
        step_hi: "आधार कार्ड और जन्म प्रमाण पत्र संलग्न करें"
      },
      {
        step_en: "Pay fees and get acknowledgment",
        step_mr: "शुल्क भरा आणि पावती मिळवा",
        step_hi: "शुल्क का भुगतान करें और पावती प्राप्त करें"
      },
      {
        step_en: "Collect certificate after verification",
        step_mr: "पडताळणीनंतर प्रमाणपत्र गोळा करा",
        step_hi: "सत्यापन के बाद प्रमाण पत्र एकत्र करें"
      }
    ],
    requiredDocs: ["Aadhar Card", "Birth Certificate", "School Certificates", "Ration Card", "Property Documents"],
    office: "Tehsil Office",
    processingTime: "15-30 days",
    fees: "₹50-100"
  }
];

export default function DocumentHelper() {
  const { t, lang } = useLang();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>{t("documentHelper")} | Government & Student Help Platform</title>
        <meta name="description" content="Step-by-step guide to obtain government documents across India" />
      </Helmet>

      {/* Gateway of India Background */}
      <GatewayBackground />

      <section className="relative container mx-auto px-4 py-10 z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("documentHelper")}</h1>
          <p className="text-muted-foreground">{t("documentHelperDesc")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {documentGuides.map(doc => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {doc[`name_${lang}` as keyof typeof doc]}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {doc[`description_${lang}` as keyof typeof doc]}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.office}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{t("processingTime")}: {doc.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary">{t("fees")}: {doc.fees}</Badge>
                  </div>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="steps">
                    <AccordionTrigger>{t("stepByStepGuide")}</AccordionTrigger>
                    <AccordionContent>
                      <ol className="space-y-3">
                        {doc.steps.map((step, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                              {idx + 1}
                            </span>
                            <span className="text-sm">{step[`step_${lang}` as keyof typeof step]}</span>
                          </li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="docs">
                    <AccordionTrigger>{t("requiredDocuments")}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {doc.requiredDocs.map((reqDoc, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-orange-600" />
                            {reqDoc}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-4 p-3 bg-orange-50 dark:bg-blue-950 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    {t("documentTip")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
