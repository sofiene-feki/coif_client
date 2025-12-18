import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import photos from "../components/ui/photos.svg";

/* ---------------- ARROWS ---------------- */
function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                 bg-black/70 text-white rounded-full p-3
                 hover:bg-white hover:text-black transition"
    >
      <ChevronRight size={20} />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                 bg-black/70 text-white rounded-full p-3
                 hover:bg-white hover:text-black transition"
    >
      <ChevronLeft size={20} />
    </button>
  );
}

/* ---------------- COMPONENT ---------------- */
export default function ServicesCarousel({ services = [] }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [reelIndex, setReelIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);

  const videoRefs = useRef([]);
  const progressRefs = useRef([]);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (!services.length) return null;

  /* ---------------- VIDEO HELPERS ---------------- */
  const pauseAllVideos = () => {
    videoRefs.current.forEach((v) => v && v.pause());
    progressRefs.current.forEach((p) => p && (p.style.width = "0%"));
    setPlayingIndex(null);
  };

  const togglePlay = (i, e) => {
    e.stopPropagation();
    const video = videoRefs.current[i];
    if (!video) return;

    if (video.paused) {
      pauseAllVideos();
      video.play();
      setPlayingIndex(i);
    } else {
      video.pause();
      setPlayingIndex(null);
    }
  };

  const handleTimeUpdate = (i) => {
    const video = videoRefs.current[i];
    const progress = progressRefs.current[i];
    if (!video || !progress) return;

    progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
  };

  /* ---------------- SLIDER SETTINGS ---------------- */
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: isMobile ? 1.5 : 4,
    slidesToScroll: 1,
    arrows: !isMobile,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: pauseAllVideos,
  };

  return (
    <>
      {/* ================= CAROUSEL ================= */}
      <section className="bg-black relative h-full">
        <div
          className="absolute top-2 left-2 z-20 flex items-center gap-2
                        bg-black/40 backdrop-blur px-3 py-1 rounded-full"
        >
          <img src={photos} className="w-5 h-5" />
          <Link to="/admin">
            <span className="text-white text-sm">Gallery</span>
          </Link>
        </div>

        <Slider {...settings}>
          {services.map((service, i) => (
            <div
              key={service._id}
              className="px-2 cursor-pointer"
              onClick={() => setReelIndex(i)}
            >
              <div className="relative overflow-hidden border border-gray-200 bg-black">
                {service.media?.type === "image" && (
                  <img
                    src={service.media.url}
                    className="w-full h-72 object-cover"
                  />
                )}

                {service.media?.type === "video" && (
                  <>
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      src={service.media.url}
                      muted
                      loop
                      playsInline
                      onTimeUpdate={() => handleTimeUpdate(i)}
                      className="w-full h-72 object-cover"
                    />

                    {/* Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
                      <div
                        ref={(el) => (progressRefs.current[i] = el)}
                        className="h-full bg-white"
                        style={{ width: "0%" }}
                      />
                    </div>

                    <button
                      onClick={(e) => togglePlay(i, e)}
                      className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2"
                    >
                      {playingIndex === i ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} />
                      )}
                    </button>
                  </>
                )}

                <div className="bg-black/80 text-white text-center py-3">
                  {service.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ================= FULLSCREEN REELS ================= */}
      {reelIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => {
              pauseAllVideos();
              setReelIndex(null);
            }}
            className="absolute top-4 right-4 z-50 text-white"
          >
            <X size={28} />
          </button>

          <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory">
            {services.map((item, i) => (
              <div
                key={item._id}
                className="h-screen w-full snap-start flex items-center justify-center relative"
              >
                {item.media?.type === "image" ? (
                  <img
                    src={item.media.url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.media.url}
                    autoPlay={i === reelIndex}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute bottom-20 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm opacity-90 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
