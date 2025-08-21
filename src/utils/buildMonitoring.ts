import { MonitoringData } from "@/context/ContractContext";

export const normalizeVhf = (s: string) => {
  const trimmed = s.trim();
  if (!trimmed) return "";
  const m = trimmed.match(/^(\d{3})(?:\.(\d{1,3}))?$/);
  if (!m) return trimmed;
  const decimals = (m[2] || "").padEnd(3, "0").slice(0, 3);
  return `${m[1]}.${decimals}`;
};

export const isVhfValid = (s: string) =>
  !s || /^\d{3}\.\d{3}$/.test(normalizeVhf(s));

export const buildMonitoringTokens = (d: MonitoringData): string[] => {
  const tokens: string[] = [];
  if (d.facility) tokens.push(`FACILITY ${d.facility}`);
  if (d.designation) tokens.push(`DESIGNATION ${d.designation.toUpperCase()}`);
  if (d.name) tokens.push(`NAME ${d.name.toUpperCase()}`);
  if (d.vhf) {
    const v = normalizeVhf(d.vhf);
    if (v) tokens.push(`VHF ${v}`);
  }
  return tokens;
};

export const buildMonitoringMainText = (d: MonitoringData) =>
  `MONITORING ${d.name ? ` ${d.name}` : "[missing unit name]"} AT ${d.vhf} FREQUENCY`;
