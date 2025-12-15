import coifBanner from "../assets/coifBanner.jpg";
import profile from "../assets/profile.jpg";

import instagram from "../components/ui/instagram.svg";
import facebook from "../components/ui/facebook.svg";
import tiktok from "../components/ui/tiktok.svg";

export default function Header() {
  return (
    <div className="relative overflow-visible z-50">
      {/* ================= COVER ================= */}
      <header
        className="
          relative w-full
          h-[200px] md:h-[480px]
          bg-black
          shadow-lg
          overflow-visible
          border-b-3 border-gray-200
        "
      >
        {/* Cover Image */}
        <img
          src={coifBanner}
          alt="Salon Élégance"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Social icons */}
        <div className="relative z-10 flex items-end justify-end h-full px-4 pb-1">
          <div className="flex flex-col items-center">
            {/* <p className="text-white text-sm font-semibold mb-2">Suivez-nous</p> */}
            <div className="flex items-center gap-3">
              <Social icon={facebook} label="Facebook" />
              <Social icon={instagram} label="Instagram" />
              <Social icon={tiktok} label="TikTok" />
            </div>
          </div>
        </div>

        {/* ================= PROFILE AVATAR ================= */}
        <div
          className="
            absolute
            left-2 md:left-16
            bottom-[-32px] md:bottom-[-64px]
            z-[9999]
            pointer-events-auto
          "
        >
          {/* Gold Ring */}
          <div
            className="
    w-32 h-32 md:w-36 md:h-36
    rounded-full
    p-[3px]
    bg-gradient-to-br from-white via-gray-100 to-gray-200
    shadow-[0_20px_50px_rgba(0,0,0,0.15)]
  "
          >
            {/* Profile Image */}
            <div className="w-full h-full rounded-full bg-black overflow-hidden border-4 border-black">
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Spacer (Facebook-style layout push) */}
    </div>
  );
}

/* ================= HELPER ================= */
function Social({ icon, label }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={icon}
        alt={label}
        className="w-7 h-7 hover:scale-110 transition-transform"
      />
      <span className="text-white text-[10px] mt-1">{label}</span>
    </div>
  );
}
