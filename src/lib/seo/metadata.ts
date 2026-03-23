import type { Metadata } from "next";

export const SITE_NAME = "CPDLC AIR";
export const SITE_URL = "https://mycpdlc.com";
export const SOCIAL_IMAGE_URL = `${SITE_URL}/logo.png`;

export const DEFAULT_DESCRIPTION =
  "CPDLC AIR is an open-source web application built from CPDLC interface research, designed to explore pilot-controller datalink communication workflows, usability, and interface clarity in aviation.";

export const SHARE_DESCRIPTION =
  "Open-source CPDLC interface research, brought to the web.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
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
    title: SITE_NAME,
    description: SHARE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: SOCIAL_IMAGE_URL,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SHARE_DESCRIPTION,
    images: [SOCIAL_IMAGE_URL],
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

