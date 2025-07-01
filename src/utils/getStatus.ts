import { Log } from "@/interface/Logs";

export function getStatusColor(message: Log) {
    switch (message.status) {
      case "open":
        return "bg-blue-500/20 border-blue-500/40 text-blue-300";
      case "accepted":
        return "bg-green-500/20 border-green-500/40 text-green-300";
      case "rejected":
        return "bg-red-500/20 border-red-500/40 text-red-300";
      case "time out":
        return "bg-gray-500/20 border-gray-500/40 text-gray-300";
      default:
        return "bg-cyan-500/20 border-cyan-500/40 text-cyan-300";
    }
  };

  export function getStatusClass(message: Log) {
    switch (message.status) {
      case "open":
        return "status-open";
      case "accepted":
        return "status-accepted";
      case "rejected":
        return "status-rejected";
      case "time out":
        return "status-timeout";
      default:
        return "status-new";
    }
  };