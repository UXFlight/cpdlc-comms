import path from "path";

export const TABS = [
  { page: "logon",
    id: "logon",
    icon: "/login.svg",
    active: false,
  },
  {page: "message log",
    id: "logs",
    icon: "/forum.svg",
    active: false,
  },
  {page: "request",
    id: "request",
    icon: "/chat_add_on.svg",
    active: false,
  },
  {page: "reports",
    id: "reports",
    icon: "/analytics.svg",
    active: false,
  },
  {page: "emergency",
    id: "emergency",
    icon: "/emergency.svg",
    active: false,
  },
  {page: "settings",
    id: "settings",
    icon: "/settings.svg",
    active: false,
  },
  {page: "print",
    id: "print",
    icon: "/print.svg",
    active: false,
  },
] as const; // "as const" garde exactement les valeurs

export type TabKey = typeof TABS[number]['id'];
//type TabKey = "logon" | "logs" | "request" | "reports" | "emergency" | "settings" | "print"; (resultat)


