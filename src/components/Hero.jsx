import { useState } from "react";
import maps from "../components/ui/maps.svg";
import calendar from "../components/ui/calendar.svg";
import call from "../components/ui/call.svg";

import PrendreRDVModal from "./PrendreRDVModal";

/* ---------------- STYLES ---------------- */
const linkClass = `
  flex items-center gap-3
  py-1 px-3 rounded-xl
  bg-gradient-to-br from-white to-gray-200
  text-black font-semibold
  shadow-[0_8px_20px_rgba(0,0,0,0.25)]
  hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
  hover:translate-y-[-2px]
  transition-all duration-300
`;

const linkStyle = {
  animation: "floatSmooth 4s ease-in-out infinite",
};

/* ---------------- COMPONENT ---------------- */
export default function Hero({ actions }) {
  const [openRDV, setOpenRDV] = useState(false);

  if (!actions) return null;

  const { rdvEnabled, phone, locationUrl } = actions;

  return (
    <section className="relative w-full min-h-[30vh] overflow-hidden border-b-3 border-gray-200">
      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Floating Action Panel */}
      <div className="absolute inset-0 flex justify-end items-center px-4 md:px-16">
        <div
          className="
            relative z-10
            bg-black/90 backdrop-blur-2xl
            px-3 py-6 md:p-8
            w-[160px] md:w-[330px]
            rounded-3xl
            border-2 border-gray-200
            ring-1 ring-white/10
            animate-fadeIn
          "
          style={{
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.6), inset 0 0 25px rgba(255,255,255,0.08), 0 0 60px rgba(201,163,107,0.25)",
          }}
        >
          <div className="flex flex-col gap-4 text-white text-xs font-medium">
            {/* RDV */}
            {rdvEnabled && (
              <button
                onClick={() => setOpenRDV(true)}
                className={linkClass}
                style={linkStyle}
              >
                <img src={calendar} className="w-6 h-6" />
                Prendre RDV
              </button>
            )}

            {/* Call */}
            {phone && (
              <a href={`tel:${phone}`} className={linkClass} style={linkStyle}>
                <img src={call} className="w-6 h-6" />
                Appeler
              </a>
            )}

            {/* Maps */}
            {locationUrl && (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                <img src={maps} className="w-6 h-6" />
                Emplacement
              </a>
            )}
          </div>
        </div>
      </div>

      {/* RDV MODAL */}
      {rdvEnabled && <PrendreRDVModal open={openRDV} setOpen={setOpenRDV} />}
    </section>
  );
}
