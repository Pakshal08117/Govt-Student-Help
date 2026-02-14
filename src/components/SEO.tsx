import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

export const SEO = ({
  title = 'Government & Student Help Platform | 40+ Schemes in 12 Languages',
  description = 'Access 40+ government schemes, scholarships & services across India. AI-powered assistance in 12 Indian languages. Find PM-KISAN, Ayushman Bharat, NSP scholarships & more.',
  keywords = 'government schemes India, scholarships, NSP, PM-KISAN, Ayushman Bharat, student help, citizen services, education schemes, welfare schemes',
  image = '/maha-help-logo.svg',
  url = 'https://govt-student-help.vercel.app/',
  type = 'website',
  noindex = false,
}: SEOProps) => {
  const fullImageUrl = image.startsWith('http') ? image : `https://govt-student-help.vercel.app${image}`;
  const fullUrl = url.startsWith('http') ? url : `https://govt-student-help.vercel.app${url}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Government & Student Help Platform" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};
