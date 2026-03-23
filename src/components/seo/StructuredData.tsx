import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_URL,
} from "@/lib/seo/metadata";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Research-based open-source CPDLC web application.",
  logo: SOCIAL_IMAGE_URL,
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

