import hero from "../assets/hero.png";
import {
  Phone,
  Calendar,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";

import maps from "../components/ui/maps.svg";
import calendar from "../components/ui/calendar.svg";
import whatsapp from "../components/ui/whatsapp.svg";
import call from "../components/ui/call.svg";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[45vh] bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src={hero}
        alt="Salon Hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
        width={1024}
        height={625}
      />

      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Floating Service Panel */}
      <div className="absolute inset-0 flex justify-end items-center px-4 md:px-16">
        {/* VERTICALLY CENTERED PANEL */}
        <div
          className="
        relative z-10
        bg-black/60 backdrop-blur-2xl
        p-4 md:p-8 w-[200px] md:w-[330px]
        rounded-3xl
border border-2 border-[#c9a36b]        shadow-[0_20px_60px_rgba(0,0,0,0.6),_0_0_100px_rgba(201,163,107,0.25)]
        ring-1 ring-white/10
        animate-fadeIn
      "
          style={{
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.6), inset 0 0 25px rgba(255,255,255,0.08), 0 0 60px rgba(201,163,107,0.25)",
          }}
        >
          <div className="flex flex-col gap-5 text-white text-md font-medium">
            {/* RDV */}
            <a
              href="#rdv"
              className="
            flex items-center gap-3 
            py-2 px-4 rounded-xl
            bg-gradient-to-br from-white to-gray-200
            text-black font-semibold
            shadow-[0_8px_20px_rgba(0,0,0,0.25)]
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
            hover:translate-y-[-2px]
            transition-all duration-300
          "
              style={{
                animation: "floatSmooth 4s ease-in-out infinite",
              }}
            >
              <img src={calendar} className="w-6 h-6" /> Prendre RDV
            </a>

            {/* Call */}
            <a
              href="tel:12345678"
              className="
            flex items-center gap-3 
            py-2 px-4 rounded-xl
            bg-gradient-to-br from-white to-gray-200
            text-black font-semibold
            shadow-[0_8px_20px_rgba(0,0,0,0.25)]
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
            hover:translate-y-[-2px]
            transition-all duration-300
          "
              style={{
                animation: "floatSmooth 4s ease-in-out infinite",
              }}
            >
              <img src={call} className="w-6 h-6" /> Appeler
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/21600000000"
              className="
            flex items-center gap-3 
            py-2 px-4 rounded-xl
            bg-gradient-to-br from-white to-gray-200
            text-black font-semibold
            shadow-[0_8px_20px_rgba(0,0,0,0.25)]
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
            hover:translate-y-[-2px]
            transition-all duration-300
          "
              style={{
                animation: "floatSmooth 4s ease-in-out infinite",
              }}
            >
              <img src={whatsapp} className="w-6 h-6" /> WhatsApp
            </a>

            {/* Maps */}
            <a
              href="#rdv"
              className="
            flex items-center gap-3 
            py-2 px-4 rounded-xl
            bg-gradient-to-br from-white to-gray-200
            text-black font-semibold
            shadow-[0_8px_20px_rgba(0,0,0,0.25)]
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
            hover:translate-y-[-2px]
            transition-all duration-300
          "
              style={{
                animation: "floatSmooth 4s ease-in-out infinite",
              }}
            >
              <img src={maps} className="w-6 h-6" /> Emplacement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
