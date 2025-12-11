import coifBanne from "../assets/coifBanner.png";
import instagram from "../components/ui/instagram.svg";
import facebook from "../components/ui/facebook.svg";
import tiktok from "../components/ui/tiktok.svg";

export default function Header() {
  return (
    <header className="relative w-full h-[420px] md:h-[480px] overflow-hidden border border-2 border-[#c9a36b]  shadow-lg">
      {/* Background Image */}
      <img
        src={coifBanne}
        alt="Salon Élégance"
        className="absolute inset-0 w-full h-auto object-cover"
      />

      {/* Gradient Overlay (luxury effect) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 pt-10 pb-4 w-full">
        {/* CENTER – Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wide leading-tight drop-shadow-xl text-center">
          Salon <span className="text-[#c9a36b]">Élégance</span>
        </h1>

        {/* Social Media Title */}

        {/* Social Media Icons */}
        <div className="flex flex-col items-center">
          <div>
            {" "}
            <p className="text-white text-md font-semibold tracking-wide mt-6 mb-2">
              Suivez-nous
            </p>
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* Facebook */}
            <div className="flex flex-col items-center">
              <img
                src={facebook}
                alt="Facebook"
                className="w-8 h-8 hover:scale-110 transition-transform"
              />
              <span className="text-white mt-2 text-xs">Facebook</span>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center">
              <img
                src={instagram}
                alt="Instagram"
                className="w-8 h-8 hover:scale-110 transition-transform"
              />
              <span className="text-white mt-2 text-xs">Instagram</span>
            </div>

            {/* TikTok */}
            <div className="flex flex-col items-center">
              <img
                src={tiktok}
                alt="TikTok"
                className="w-10 h-10 hover:scale-110 transition-transform"
              />
              <span className="text-white mt-1 text-xs">TikTok</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
