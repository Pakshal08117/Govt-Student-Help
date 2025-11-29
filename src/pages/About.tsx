import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";

export default function About() {
  const { t, lang } = useLang();
  const canonicalHref = typeof window !== "undefined" ? window.location.href : "";
  
  return (
    <>
      <Helmet>
        <title>MahaHelp Desk | About</title>
        <meta name="description" content="Purpose, benefits, and how MahaHelp Desk helps citizens find local government services." />
        <link rel="canonical" href={canonicalHref} />
      </Helmet>
      
      <section className="container mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {lang === "en" ? "About MahaHelp Desk" : "महा हेल्प डेस्क बद्दल"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            {lang === "en" 
              ? "Your trusted companion for accessing government services across Maharashtra"
              : "महाराष्ट्रातील सरकारी सेवांसाठी तुमचा विश्वसनीय साथी"}
          </p>
          <p className="text-lg font-medium text-primary max-w-3xl mx-auto">
            {t("tagline")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* What is MahaHelp Desk */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {lang === "en" ? "What is MahaHelp Desk?" : "महा हेल्प डेस्क काय आहे?"}
            </h2>
            <p className="text-base leading-relaxed mb-4">
              {lang === "en" 
                ? "MahaHelp Desk is a comprehensive digital platform designed to help citizens of Maharashtra easily find and access local government offices and services. Whether you need health services, education support, agricultural assistance, or any other government service, we help you locate the right office in your area."
                : "महा हेल्प डेस्क हे महाराष्ट्रातील नागरिकांना स्थानिक सरकारी कार्यालये आणि सेवा सहजपणे शोधण्यात आणि त्यांचा वापर करण्यात मदत करण्यासाठी डिझाइन केलेले एक व्यापक डिजिटल प्लॅटफॉर्म आहे. तुम्हाला आरोग्य सेवा, शिक्षण सहाय्य, कृषी सहाय्य किंवा इतर कोणत्याही सरकारी सेवेची गरज असेल तर आम्ही तुम्हाला तुमच्या परिसरातील योग्य कार्यालय शोधण्यात मदत करतो."}
            </p>
          </div>

          {/* Why MahaHelp Desk */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {lang === "en" ? "Why MahaHelp Desk?" : "महा हेल्प डेस्क का?"}
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{lang === "en" ? "Save time by finding exact office locations" : "अचूक कार्यालयाचे स्थान शोधून वेळ वाचवा"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{lang === "en" ? "No need to visit multiple offices" : "अनेक कार्यालयांना भेट देण्याची गरज नाही"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{lang === "en" ? "Get phone numbers and email contacts" : "फोन नंबर आणि ईमेल संपर्क मिळवा"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{lang === "en" ? "Know working hours before visiting" : "भेट देण्यापूर्वी कामकाजाचे तास जाणून घ्या"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Available Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            {lang === "en" ? "Available Services" : "उपलब्ध सेवा"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="text-blue-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{lang === "en" ? "Health Services" : "आरोग्य सेवा"}</h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "Primary Health Centers, Government Hospitals, Community Health Centers"
                  : "प्राथमिक आरोग्य केंद्रे, सरकारी रुग्णालये, सामुदायिक आरोग्य केंद्रे"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="text-green-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{lang === "en" ? "Education Services" : "शिक्षण सेवा"}</h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "Zilla Parishad Schools, District Education Offices, Sarva Shiksha Abhiyan"
                  : "जिल्हा परिषद शाळा, जिल्हा शिक्षण कार्यालये, सर्व शिक्षा अभियान"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
              <div className="text-yellow-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{lang === "en" ? "Agriculture Services" : "कृषी सेवा"}</h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "Krishi Sevak Offices, Agriculture Departments, Soil Testing Labs"
                  : "कृषी सेवक कार्यालये, कृषी विभाग, मृदा चाचणी प्रयोगशाळा"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="text-purple-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{lang === "en" ? "Revenue Services" : "महसूल सेवा"}</h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "Tahsildar Offices, Sub Registrar, Circle Officers"
                  : "तहसीलदार कार्यालये, उप निबंधक, वर्तुळ अधिकारी"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
              <div className="text-red-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{lang === "en" ? "Public Works" : "सार्वजनिक बांधकाम"}</h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "PWD Offices, Water Supply, Municipal Corporations"
                  : "पीडब्ल्यूडी कार्यालये, पाणीपुरवठा, नगर निगम"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
              <div className="text-gray-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{lang === "en" ? "Other Services" : "इतर सेवा"}</h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "Ration Cards, Passport Services, Employment, RTO, Electricity Board"
                  : "रेशन कार्ड, पासपोर्ट सेवा, रोजगार, आरटीओ, वीज मंडळ"}
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            {lang === "en" ? "How to Use MahaHelp Desk" : "महा हेल्प डेस्क कसे वापरावे"}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {lang === "en" ? "Select Your District" : "तुमचा जिल्हा निवडा"}
              </h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "Choose your district from the dropdown menu"
                  : "ड्रॉपडाउन मेनूमधून तुमचा जिल्हा निवडा"}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {lang === "en" ? "Choose Your Taluka" : "तुमचा तालुका निवडा"}
              </h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "Select the specific taluka within your district"
                  : "तुमच्या जिल्ह्यातील विशिष्ट तालुका निवडा"}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {lang === "en" ? "Find Services" : "सेवा शोधा"}
              </h3>
              <p className="text-sm text-gray-600">
                {lang === "en" 
                  ? "Browse available government services in your area"
                  : "तुमच्या परिसरात उपलब्ध सरकारी सेवांचा आढावा घ्या"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">
            {lang === "en" ? "Need Help?" : "मदत हवी आहे?"}
          </h2>
          <p className="text-gray-600 mb-6">
            {lang === "en" 
              ? "If you can't find what you're looking for or need assistance, feel free to contact us."
              : "जर तुम्हाला तुम्ही जे शोधत आहात ते सापडत नसेल किंवा मदतीची गरज असेल तर, कृपया आमच्याशी संपर्क साधा."}
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="tel:+912212345678" 
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              📞 {lang === "en" ? "Call Us" : "आम्हाला कॉल करा"}
            </a>
            <a 
              href="mailto:support@mahahelp.in" 
              className="bg-white border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary/5 transition-colors"
            >
              ✉️ {lang === "en" ? "Email Us" : "आम्हाला ईमेल करा"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
