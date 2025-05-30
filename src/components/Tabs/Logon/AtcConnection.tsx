import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export default function AtcConnection() {
  const { connectionState } = useContext(UserContext);

  return (
    <div className="container flex flex-col items-start">
      <h2>Connection</h2>
      <div className="flex items-center justify-between w-full">
        <p className="secondary-text pt-[10px]">ATC Data Link</p>
        <label className="relative inline-block w-[49px] h-[31px]">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={connectionState ? true : false}
            readOnly
          />
          <div className="absolute inset-0 bg-gray-300 peer-checked:bg-green rounded-md transition-colors duration-300"></div>
          <div
            className="absolute left-1 top-1 w-[24px] h-[24px] bg-light-gray text-white-80 font-sans text-[10px] not-italic font-semibold leading-normal flex items-center justify-center rounded-md
            transition-all duration-300 peer-checked:translate-x-[18px]
            before:content-['OFF'] peer-checked:before:content-['ON']"
          ></div>
        </label>
      </div>

      <div className="loader"></div>
    </div>
  );
}
