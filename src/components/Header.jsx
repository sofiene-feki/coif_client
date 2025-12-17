import instagram from "../components/ui/instagram.svg";
import facebook from "../components/ui/facebook.svg";
import tiktok from "../components/ui/tiktok.svg";

export default function Header({ profile }) {
  const { cover, logo, socials } = profile;

  return (
    <div className="relative overflow-visible z-50">
      <header className="relative h-[200px] md:h-[480px] bg-black overflow-visible">
        {/* Cover */}
        {cover && (
          <img
            src={cover.url}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Socials */}
        <div className="relative z-10 flex justify-end items-end h-full px-4 pb-1">
          <div className="flex gap-3">
            {socials.facebook && <Social icon={facebook} label="Facebook" />}
            {socials.instagram && <Social icon={instagram} label="Instagram" />}
            {socials.tiktok && <Social icon={tiktok} label="TikTok" />}
          </div>
        </div>

        {/* Profile */}
        <div className="absolute left-2 md:left-16 bottom-[-32px] md:bottom-[-64px]">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-[3px] bg-white shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-black">
              {logo && (
                <img src={logo.url} className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

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
