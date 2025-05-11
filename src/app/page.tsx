"use client"
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ResponsiveAppBar from "../components/ResponsiveAppBar"; /*"@/components/ResponsiveAppBar" alias fonctionne pas */
import "./globals.css"; 

export default function App() {
  const [coms, setComs] = React.useState("FANS 1/A");

  const handleChange = (event: SelectChangeEvent) => {
    setComs(event.target.value);
  };

  return (
    <div
      className="overflow-hidden bg-[#020202] flex flex-col justify-between w-full h-[800px]"
      id="LogonRoot"
    >
      <div className="flex flex-col">
        <ResponsiveAppBar />

        <div
          className="bg-[#020202] flex flex-row justify-between h-16 shrink-0 items-end pb-2 px-8"
          id="Fond"
        >
          <div className="text-xl font-['Noto_Sans'] text-white w-16 shrink-0">
            LOGON
          </div>
          <div
            className="overflow-hidden bg-white/10 flex flex-row justify-center gap-px h-8 items-center px-3 py-2 rounded"
            id="NETWORK"
          >
            <img
              src="https://file.rendit.io/n/3sx2HBeGvOlcV2nmObNV.svg"
              className="w-6 shrink-0"
              id="Mdilocalareanetwork"
            />
            <div className="w-3/4">
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  COMS TYPE
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={coms}
                  onChange={handleChange}
                  autoWidth
                  label="COMS TYPE"
                  className="font-['Noto_Sans'] font-semibold text-white/80"
                >
                  <MenuItem value={"FANS 1/A"}>FANS 1/A</MenuItem>
                  <MenuItem value={"FANS 2/B"}>FANS 2/B</MenuItem>
                  <MenuItem value={"FANS 3/C"}>FANS 3/C</MenuItem>
                  <MenuItem value={"ATN"}>ATN</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6 items-start ml-8 mr-1">
          <div className="flex flex-col gap-3 w-[538px]">
            <div
              className="bg-[#242424] flex flex-row justify-between h-24 shrink-0 items-center px-3 rounded"
              id="RouteRequest"
            >
              <div className="flex flex-col gap-5 h-16">
                <div className="font-['Inter'] font-semibold text-white ml-px">
                  CONNECTION
                </div>
                <div className="text-right whitespace-nowrap font-['Inter'] font-semibold text-white/80 mr-4">
                  ATC Data Link
                </div>
              </div>
              <div className="flex flex-col gap-2 w-16 shrink-0 items-end">
                <img
                  src="https://file.rendit.io/n/bDQ5LYUtLwypkT9VlW43.svg"
                  className="w-6"
                  id="ArrowsupArrow"
                />
                <div className="border-solid border-white/10 bg-[#2b2b2c] flex flex-col w-16 items-center px-2 py-1 border rounded">
                  <div
                    className="border-solid border-white/10 shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] flex flex-col w-12 items-start border-[20px] rounded"
                    id="RectFond"
                  >
                    <div
                      className="bg-[#d24b4b] flex flex-col ml-[-19.5px] w-6 h-5 shrink-0 px-0 py-1 rounded"
                      id="RectOff"
                    >
                      <div
                        className="text-center text-xs font-['Open_Sans'] text-white/80 h-[78.57%]"
                        id="Off"
                      >
                        OFF
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-[#242424] flex flex-row gap-20 h-20 shrink-0 items-center pl-4 pr-3 rounded"
              id="OffsetRequest"
            >
              <div className="text-right whitespace-nowrap font-['Inter'] font-semibold text-white mr-5 w-20 shrink-0">
                LOGON TO
              </div>
              <div className="border-solid border-white/10 bg-[#2b2b2c] flex flex-col w-16 shrink-0 p-1 border rounded">
                <div className="text-center font-['Inter'] font-semibold text-white/80 ml-px">
                  XXXX
                </div>
              </div>
              <div className="relative flex flex-col w-48 shrink-0">
                <div className="blur-[1px] w-48 h-10 bg-black absolute top-0 left-0 rounded" />
                <div className="bg-[#539fda] relative flex flex-row justify-center gap-1 items-center rounded">
                  <img
                    src="https://file.rendit.io/n/k2AvfMo9RAD3fISL40oM.svg"
                    className="w-8 shrink-0 my-1"
                    id="Icsharpsend"
                  />
                  <div className="whitespace-nowrap text-xl font-['Noto_Sans'] font-semibold text-white w-32">
                    SEND LOGON
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-white/10 w-1 shrink-0 h-32 rounded-[20px]"
            id="ScrollBar"
          />
        </div>
      </div>
      <div className="shadow-[0px_-5px_5px_0px_rgba(0,_0,_0,_0.44)] bg-[#020202] flex flex-row justify-between h-6 shrink-0 items-center px-6">
        <div
          className="text-xs font-['Noto_Sans'] font-light text-white/80"
          id="ConnectedToABCDE2"
        >
          Connected to
          <div className="text-white contents" id="ConnectedToABCDE">
            {" "}
          </div>
          <div className="font-bold contents" id="ConnectedToABCDE1">
            ABCDE
          </div>
        </div>
        <div
          className="text-xs font-['Noto_Sans'] font-bold text-white/80"
          id="PMUTC2"
        >
          11:30 PM
          <div className="text-white contents" id="PMUTC">
            {" "}
          </div>
          <div className="text-xs font-light contents" id="PMUTC1">
            UTC
          </div>
        </div>
      </div>
    </div>
  );
};