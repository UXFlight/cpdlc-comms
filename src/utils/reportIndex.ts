import type { IndexReport } from "@/context/ContractContext";
import { Log } from "@/interface/Logs";

export const ARMABLE_UM_REFS = new Set<string>([
  "UM130", // REPORT PASSING [position]
  "UM129", // REPORT MAINTAINING [level]
  "UM128", // REPORT LEAVING [level]
  "UM200", // REPORT MAINTAINING (avec level clearance)
  "UM180", // REPORT REACHING BLOCK [level] TO [level]
  "UM181", // REPORT DISTANCE to/from [position]
]);

export const isAckDM = (ref?: string) => ref === "DM0" || ref === "DM3";

export function buildLabelFromUM(umRef: string, formatted = ""): string {
  if (umRef === "UM130") {
    const m = /REPORT\s+PASSING\s+(.+)/i.exec(formatted);
    return m ? `REPORT PASSING ${m[1].trim()}` : "REPORT PASSING";
  }
  if (umRef === "UM129") {
    const m = /(REPORT\s+(?:MAINTAINING|LEVEL)\s+.+)/i.exec(formatted);
    return m ? m[1].toUpperCase() : "REPORT MAINTAINING";
  }
  if (umRef === "UM128") {
    const m = /(REPORT\s+LEAVING\s+.+)/i.exec(formatted);
    return m ? m[1].toUpperCase() : "REPORT LEAVING";
  }
  if (umRef === "UM180") {
    const m = /(REPORT\s+REACHING\s+BLOCK\s+.+)/i.exec(formatted);
    return m ? m[1].toUpperCase() : "REPORT REACHING BLOCK";
  }
  if (umRef === "UM181") {
    const m = /(REPORT\s+DISTANCE\s+.+)/i.exec(formatted);
    return m ? m[1].toUpperCase() : "REPORT DISTANCE";
  }
  if (umRef === "UM200") return "REPORT MAINTAINING";
  return formatted || "REPORT ARMED";
}

export function maybeArmFromLog(log: Log) {
  const ref = log.ref;
  const label = log.element;
  const sender = log.direction === "uplink" ? "ATC" : "PILOT";

  if (!ARMABLE_UM_REFS.has(ref)) return null;
  if (!["ATC", "ATC1", "ATC2", "ATC3"].includes(sender)) return null;

  const thread = log.communication_thread;
  const res = thread.find((m) => m?.ref === "DM0");

  if (!res) return null;

  const id = log.id;

  const entry: IndexReport = { ref, id, label, status: "ARMED" };
  return entry;
}
