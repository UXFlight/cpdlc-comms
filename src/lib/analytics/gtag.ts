export const GA_MEASUREMENT_ID = "G-11YLVCVEQM";

type GtagCommand = "config" | "event" | "js" | "set";

type GtagFunction = (
  command: GtagCommand,
  targetId: string | Date,
  config?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

export const pageView = (url: string) => {
  if (
    typeof window === "undefined" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_location: window.location.href,
  });
};