import {
  DEFAULT_DESCRIPTION,
  LOGO_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Open-source CPDLC interface research web application.",
  logo: LOGO_IMAGE_URL,
};

const StructuredData = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  </>
);

export default StructuredData;
