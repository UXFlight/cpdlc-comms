import type { Metadata } from "next";

export const SITE_NAME = "CPDLC AIR";
export const SITE_URL = "https://mycpdlc.com";
export const LOGO_IMAGE_URL = `${SITE_URL}/logo.png`;
export const OG_IMAGE_URL = `${SITE_URL}/og.png`;
export const HOME_TITLE = "CPDLC AIR - Open-Source CPDLC Research Prototype";
export const PROJECT_CATEGORY = "Aviation Human Factors Research Software";

export const DEFAULT_DESCRIPTION =
  "CPDLC AIR is an open-source web application based on CPDLC interface research. It helps explore pilot-controller datalink communication workflows, usability, and interface clarity in aviation.";

export const SHARE_DESCRIPTION =
  "Open-source CPDLC interface research, brought to the web.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  creator: "Irina Maximciuc",
  authors: [
    { name: "Irina Maximciuc" },
    { name: "Sabrina Knappe" },
    { name: "Philippe Doyon-Poulin" },
  ],
  category: PROJECT_CATEGORY,
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "CPDLC",
    "pilot controller communication",
    "aviation communication tool",
    "datalink communication",
    "flight deck messaging",
    "air traffic communication",
    "aviation usability",
    "pilot messaging interface",
    "aviation research prototype",
    "open source aviation tool",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description: SHARE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "CPDLC AIR - Open-Source CPDLC Research Prototype",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: HOME_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};
