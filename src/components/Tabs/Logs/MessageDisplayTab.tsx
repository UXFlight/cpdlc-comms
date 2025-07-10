import { MessageProps } from "@/interface/props/Logs";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { getStatusColor } from "@/utils/getStatus";

export default function MessageDisplayTab({ message }: MessageProps) {
  const { username } = useContext(GlobalContext);

  const getDirectionStyle = () => {
    const isUplink = message.direction === "uplink";
    return {
      bgColor: isUplink ? "bg-green/10" : "bg-dark-blue/10",
      borderColor: isUplink ? "border-green" : "border-dark-blue",
      accentColor: isUplink ? "text-green" : "text-dark-blue",
      icon: isUplink ? "↗" : "↙",
      label: isUplink ? "uplink" : "downlink",
      description: isUplink ? "Incoming Message" : "Outgoing Message",
    };
  };

  const style = getDirectionStyle();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div
        className={`${style.bgColor} ${style.borderColor} border-2 rounded-lg p-4`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 pb-1 rounded-full flex items-center justify-center text-[40px] font-black ${style.bgColor} ${style.borderColor} border-2 ${style.accentColor}`}
            >
              {style.icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-sm font-bold ${style.accentColor} uppercase tracking-wider`}
                >
                  {style.description}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-4">
                <span className="text-white/40 uppercase font-medium">
                  {message.direction === "uplink" ? "FROM" : "TO"}
                </span>
                <span className="text-white font-semibold">{username}</span>
              </div>

              <div className="mt-3">
                <div className="text-white/50 text-xs uppercase tracking-wider font-medium">
                  Content
                </div>
                <p className="text-white text-lg font-bold leading-relaxed">
                  {message.element}
                </p>
              </div>

              {message.additional && message.additional.length > 0 && (
                <div className="mt-4">
                  <div className="text-white/50 text-xs uppercase tracking-wider font-medium mb-2">
                    Additional Information
                  </div>
                  <div className="space-y-1">
                    {message.additional.map((item, index) => (
                      <div
                        key={index}
                        className="text-white/80 text-sm bg-white/5 p-2 rounded border-l-2 border-white/20"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(message)} border-2`}
          >
            {message.status.toUpperCase()}
          </div>
        </div>

        <div className="flex justify-end text-white/40 text-sm font-medium mt-[-35px]">
          <span className="uppercase tracking-wider"></span> {message.timeStamp}
        </div>
      </div>
    </div>
  );
}
