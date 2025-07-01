import { MessageProps } from "@/interface/props/Logs";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export default function MessageDisplayTab({ message }: MessageProps) {
  const { username } = useContext(GlobalContext);

  const getStatusColor = () => {
    switch (message.status) {
      case "open":
        return "bg-blue-500/20 border-blue-500/40 text-blue-300";
      case "accepted":
        return "bg-green-500/20 border-green-500/40 text-green-300";
      case "rejected":
        return "bg-red-500/20 border-red-500/40 text-red-300";
      case "time out":
        return "bg-gray-500/20 border-gray-500/40 text-gray-300";
      default: // new
        return "bg-cyan-500/20 border-cyan-500/40 text-cyan-300";
    }
  };

  const getDirectionStyle = () => {
    const isUplink = message.direction === "uplink";
    return {
      bgColor: isUplink ? "bg-dark-blue/10" : "bg-green/10",
      borderColor: isUplink ? "border-dark-blue" : "border-green",
      accentColor: isUplink ? "text-dark-blue" : "text-green",
      icon: isUplink ? "↗" : "↙",
      label: isUplink ? "uplink" : "downlink",
      description: isUplink ? "Incoming Message" : "Outgoing Message"
    };
  };

  const style = getDirectionStyle();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header Card */}
      <div className={`${style.bgColor} ${style.borderColor} border-2 rounded-lg p-4`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Direction Icon */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${style.bgColor} ${style.borderColor} border-2 ${style.accentColor}`}>
              {style.icon}
            </div>
            
            {/* Message Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-bold ${style.accentColor} uppercase tracking-wider`}>
                  {style.description}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-4">
                <span className="text-white/40 uppercase font-medium">
                  {message.direction === "uplink" ? "FROM" : "TO"}
                </span>
                <span className="text-white font-semibold">
                  {username}
                </span>
              </div>
              
              {/* Message Content - Integrated */}
              <div className="mt-3">
                <div className="text-white/50 text-xs uppercase tracking-wider font-medium">
                  Content
                </div>
                <p className="text-white text-lg font-bold leading-relaxed">
                  {message.element}
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor()} border-2`}>
            {message.status.toUpperCase()}
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex justify-end text-white/40 text-sm font-medium mt-[-25px]">
          <span className="uppercase tracking-wider"></span> {message.timeStamp}
        </div>
      </div>
    </div>
  );
}