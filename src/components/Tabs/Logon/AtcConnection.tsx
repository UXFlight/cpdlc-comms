import React from "react";

export default function AtcConnection() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-teal-500 to-teal-300">
      <h1 className="text-4xl font-bold text-white mb-4">ATC Connection</h1>
      <p className="text-lg text-white mb-8">Connecting to ATC...</p>
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 16px solid #f3f3f3; /* Light grey */
          border-top: 16px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}