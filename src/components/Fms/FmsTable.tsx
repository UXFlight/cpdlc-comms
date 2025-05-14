import React from "react";

type Waypoint = {
  name: string;
  eta: string;
  alt: string;
  lat: string;
  long: string;
};

const waypoints: Waypoint[] = [
  { name: "CYUL", eta: "2003", alt: "0", lat: "45.468", long: "-73.744" },
  { name: "OBTAX", eta: "2018", alt: "20,000", lat: "45.695", long: "-73.268" },
  { name: "CATOG", eta: "2022", alt: "22,900", lat: "45.917", long: "-72.884" },
  { name: "PENTU", eta: "2031", alt: "35,000", lat: "46.562", long: "-71.722" },
  { name: "OBTEK", eta: "2034", alt: "35,000", lat: "46.235", long: "-71.321" },
  { name: "SIMTO", eta: "2038", alt: "35,000", lat: "47.056", long: "-70.829" },
  { name: "MIVAX", eta: "2043", alt: "35,000", lat: "47.439", long: "-70.159" },
  { name: "YRI", eta: "2047", alt: "35,000", lat: "47.757", long: "-69.589" },
  { name: "AVOGI", eta: "2114", alt: "35,000", lat: "48.882", long: "-64.731" },
  { name: "5160N", eta: "2114", alt: "35,000", lat: "51", long: "-60" },
  { name: "PELTU", eta: "2209", alt: "35,000", lat: "52.1", long: "-55.167" },
  { name: "H5350", eta: "2237", alt: "35,000", lat: "53", long: "-50" },
  { name: "H545N", eta: "2301", alt: "35,000", lat: "54.5", long: "-45" },
  { name: "H5440", eta: "2324", alt: "35,000", lat: "54.5", long: "-40" },
  { name: "5535N", eta: "2347", alt: "35,000", lat: "55", long: "-35" },
  { name: "5530N", eta: "0010", alt: "35,000", lat: "55", long: "-30" },
  { name: "5525N", eta: "0033", alt: "35,000", lat: "55", long: "-25" },
  { name: "5518N", eta: "0105", alt: "35,000", lat: "55", long: "-18" },
  { name: "NAVEM", eta: "0145", alt: "35,000", lat: "53.926", long: "-9.399" },
  { name: "WD2", eta: "0221", alt: "35,000", lat: "52.383", long: "-2.466" },
  { name: "SOPIT", eta: "0225", alt: "35,000", lat: "51.958", long: "-1.1072" },
  { name: "WCO", eta: "0229", alt: "35,000", lat: "51.853", long: "-0.962" },
  { name: "BETPO", eta: "0229", alt: "22,900", lat: "51.798", long: "-0.724" },
  { name: "BNN", eta: "0232", alt: "22,900", lat: "51.726", long: "-0.550" },
  { name: "EGLL", eta: "0233", alt: "0", lat: "51.471", long: "-0.461" },
];

export default function FmsTable() {
  return (
    <div className="bg-black text-white font-mono w-full h-full flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">FMS</h2>
        <button className="text-xs px-2 py-1 border border-white text-white hover:bg-white hover:text-black">
          MODIFY
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-5 gap-2 border-b border-white pb-1 text-[12px] font-semibold">
        <div>WAYPOINT</div>
        <div>ETA</div>
        <div>ALT</div>
        <div>LAT</div>
        <div>LONG</div>
      </div>

      {/* Table body with scroll and full height */}
      <div className="flex-1 overflow-y-auto mt-1 text-sm text-white/90">
        {waypoints.map((wp, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-2 border-b border-white/10 py-1"
          >
            <div>{wp.name}</div>
            <div>{wp.eta}</div>
            <div>{wp.alt}</div>
            <div>{wp.lat}</div>
            <div>{wp.long}</div>
          </div>
        ))}
      </div>
    </div>
  );
}