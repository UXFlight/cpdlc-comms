"use client";
import Time from "../Time/time";

type Props = {
  isLogonSuccessful: boolean | null;
};

export default function ConnectionBar({ isLogonSuccessful }: Props) {
  return (
    <footer
      className={`h-[24px] flex justify-between items-center px-4 w-full
        ${isLogonSuccessful ? "bg-green" : "bg-nav-bar"}`}
    >
      <div className="flex items-center gap-2">
        <img
          src={isLogonSuccessful ? "/connected.svg" : "/disconnected.svg"}
          alt={isLogonSuccessful ? "Connected" : "Not Connected"}
          className="w-4 h-4"
        />
        <p className="text-white-100 text-[12px] uppercase">
          {isLogonSuccessful ? "Connected" : "Not Connected"}
        </p>
      </div>
      <div>
        <div className="text-white-100 text-[12px] uppercase">
          <Time />
        </div>
      </div>
    </footer>
  );
}
