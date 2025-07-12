import { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import CharacterInput from "@/components/General/CharacterInput";
import { socketService } from "@/api/communications/socket/socketService";
import { useDelay } from "@/hooks/useDelay";
import { useSocketListeners } from "@/hooks/useSocketListeners";

export default function Logon() {
  const length = 4;
  const {
    connectionState,
    setConnectionState,
    isConnectionPossible,
    username,
    setUsername,
  } = useContext(GlobalContext);
  const { delay } = useDelay();
  const [isLoading, setIsLoading] = useState(false);

  const validValue = () => {
    return username.length === length;
  };

  const handleLogon = () => {
    socketService.send("logon", { username: username });
    setIsLoading(true);
  };

  useSocketListeners([
    {
      event: "logon_success",
      callback: () => {
        setIsLoading(false);
        setConnectionState(true);
      },
    },
    {
      event: "logon_failure",
      callback: () => {
        setIsLoading(false);
        setConnectionState(false);
      },
    },
  ]);

  return (
    <div className="container flex items-center justify-start gap-4">
      <h2
        className={`${!isConnectionPossible ? "text-white/40" : "text-white"}`}
      >
        Logon to
      </h2>
      <div>
        <CharacterInput
          value={username}
          length={length}
          disabled={!isConnectionPossible}
          onChange={(val) => {
            if(val.length < 3) {
              setConnectionState(null);
            }
            setUsername(val)
          }}
        />
      </div>
      <div className="ml-52">
        {isLoading ? (
          <button
            disabled
            className="btn-3d flex items-center justify-center gap-2 px-4 py-2 w-[149px] h-[48px] bg-gray-400 text-white text-sm font-semibold rounded-md"
          >
            <span className="text-white-80 text-[14px] leading-[18px] font-bold text-center tracking-wide uppercase">
              Connecting...
            </span>
            <div className="w-4 h-4 ml-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
          </button>
        ) : connectionState && isConnectionPossible ? (
          <button
            disabled
            className="btn-3d flex items-center justify-center gap-2 px-4 py-2 w-[149px] h-[48px] bg-green text-white text-sm font-semibold rounded-md"
          >
            <span className="text-white-80 text-[16px] leading-[18px] whitespace-nowrap font-bold text-center tracking-wide uppercase">
              Connected
            </span>
          </button>
        ) : (
          <button
            disabled={!validValue() || !isConnectionPossible}
            onClick={handleLogon}
            className={`flex items-center justify-center gap-2 px-4 py-2 w-[149px] h-[48px] ${
              validValue()
                ? "bg-dark-blue hover:bg-dark-blue/70 cursor-pointer btn-3d"
                : "bg-white-10"
            } text-white text-sm font-semibold rounded-md`}
          >
            <img
              src="/send.svg"
              alt="Send Icon"
              className="w-[20px] h-[20px]"
            />
            <span className="text-white-80 text-[14px] leading-[18px] whitespace-nowrap font-bold text-center">
              SEND LOGON
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
