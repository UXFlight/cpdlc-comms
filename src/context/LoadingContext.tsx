// "use client";
// import React, { createContext, useContext, useState } from "react";
// import type { FlightDetails } from "@/interfaces/FlightDetails";
// import { defaultFlightDetails } from "@/constants/flightDetails";

// // Structure du contexte
// type LoadingContextType = {
//   state: string;
//   setState: (state: string) => void;
// };

// // Valeur par défaut
// export const GlobalContext = createContext<LoadingContextType>({

// });

// // Provider
// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [connectionState, setConnectionState] = useState<boolean>(null);
//   const [isConnectionPossible, setIsConnectionPossible] = useState<boolean>(false);
//   const [username, setUsername] = useState<string>("");
//   const [flightDetails, setFlightDetails] = useState<FlightDetails>(defaultFlightDetails);

//   return (
//     <GlobalContext.Provider
//       value={{
//         connectionState,
//         setConnectionState,
//         isConnectionPossible,
//         setIsConnectionPossible,
//         username,
//         setUsername,
//         flightDetails,
//         setFlightDetails,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };
