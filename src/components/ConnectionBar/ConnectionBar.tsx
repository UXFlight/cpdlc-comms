"use client";
import React, { useState, useEffect } from "react";

export default function ConnectionBar() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <footer
      className={`h-[24px] flex justify-between items-center px-4 w-full
        ${isConnected ? "bg-green" : "bg-nav-bar"}`}
    >
      <div className="flex items-center gap-2">
        <img
          src={isConnected ? "/connected.svg" : "/disconnected.svg"}
          alt={isConnected ? "Connected" : "Not Connected"}
          className="w-4 h-4"
        />
        <p className="text-white-100 text-[12px] uppercase">
          {isConnected ? "Connected" : "Not Connected"}
        </p>
      </div>
      <div>
        <p className="text-white-100 text-[12px] uppercase">{formattedTime}</p>
      </div>
    </footer>
  );
}

 /* return (
    <footer className="bg-nav-bar h-[16px] flex justify-between items-center w-full ">
    <div className="bg-nav-bar h-[16px] grid grid-col-3">
      <div>
        <img
          src="/connected.svg"
          className=""
          alt="connected"
        />
        <h3 className="">Connected</h3>
        <img
          src="/disconnected.svg"
          className=""
          alt="connected"
        />
        <h3 className="">Not Connected</h3>
      </div>
      <div></div>
      <div>
        <img
            src="/disconnected.svg"
            className=""
            alt="connected"
          />
      </div>
    </div>
    </footer>
  );
}*/

