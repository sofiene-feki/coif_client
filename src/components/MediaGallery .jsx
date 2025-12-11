import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StarIcon } from "@heroicons/react/24/solid";

const MediaGallery = ({ mainImages, videoUrl }) => {
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);

  const [navMain, setNavMain] = useState(null);
  const [navThumb, setNavThumb] = useState(null);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    setNavMain(mainSlider.current);
    setNavThumb(thumbSlider.current);
  }, []);

  const settingsMain = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: navThumb,
    swipe: true,
  };

  const settingsThumbs = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "0px",
    asNavFor: navMain,
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y });
  };

  const isMobile = () => window.innerWidth < 768;

  return (
    <div className="relative max-w-xl mx-auto select-none">
      {/* Main Image / Video Slider */}
      <div className="rounded-3xl bg-gradient-to-br from-white to-white p-4 md:p-6 shadow-lg">
        <Slider {...settingsMain} ref={mainSlider}>
          {mainImages.map((src, idx) => (
            <div key={idx}>
              <div
                className="relative w-full h-72 md:h-96 overflow-hidden rounded-xl"
                onMouseMove={(e) => !isMobile() && handleMouseMove(e)}
                onMouseEnter={() => !isMobile() && setIsZooming(true)}
                onMouseLeave={() => !isMobile() && setIsZooming(false)}
              >
                <img
                  src={src}
                  alt={`oreiller-${idx}`}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZooming ? "scale-150" : "scale-100"
                  }`}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                />
              </div>
            </div>
          ))}

          {videoUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-white/80 text-xs font-medium px-2 py-1 rounded">
                🎥 Vidéo démonstration
              </div>
            </div>
          )}
        </Slider>

        {/* Thumbnails */}
        <div className="mt-4">
          <Slider {...settingsThumbs} ref={thumbSlider}>
            {mainImages.map((src, idx) => (
              <div key={idx} className="px-1">
                <img
                  src={src}
                  alt={`thumb-${idx}`}
                  className="h-20 w-full object-cover rounded-lg border border-slate-200 hover:border-amber-400 transition"
                />
              </div>
            ))}
            {/* {videoUrl && (
              <div className="px-1">
                <div className="h-20 w-full rounded-lg border border-slate-200 bg-black flex items-center justify-center text-white text-xs font-semibold">
                  🎬 Vidéo
                </div>
              </div>
            )} */}
          </Slider>
        </div>
      </div>

      {/* Rating Overlay */}
      {/* <div className="absolute -bottom-6 left-6 bg-white rounded-xl p-4 shadow-md flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg">
          <StarIcon className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <div className="text-sm font-semibold">Note moyenne</div>
          <div className="text-xs text-slate-500">
            4.8/5 — Basé sur 320 avis clients
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MediaGallery;
