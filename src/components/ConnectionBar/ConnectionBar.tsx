"use client";
import React, { useState, useEffect } from "react";

export default function ConnectionBar({ isLogonSuccessful }) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

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
        <p className="text-white-100 text-[12px] uppercase">{formattedTime}</p>
      </div>
    </footer>
  );
}
