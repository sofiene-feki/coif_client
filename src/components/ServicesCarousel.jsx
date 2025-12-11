// ServicesCarousel.jsx
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bro from "../assets/bro.jpg";
import color from "../assets/color.webp";
import coup from "../assets/coup.jpg";
import liss from "../assets/liss.webp";
import nail from "../assets/nails.jpg";
import bal from "../assets/nails.jpg";
import photos from "../components/ui/photos.svg";

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 
                 bg-black/70 text-white border border-white/20 
                 rounded-full p-3 shadow-lg backdrop-blur-md
                 hover:bg-white hover:text-black transition duration-300"
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
                 bg-black/70 text-white border border-white/20 
                 rounded-full p-3 shadow-lg backdrop-blur-md
                 hover:bg-white hover:text-black transition duration-300"
    >
      <ChevronLeft size={20} />
    </button>
  );
}

export default function ServicesCarousel() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ⭐ Services data
  const services = [
    { id: 1, title: "Coupe", image: coup },
    { id: 2, title: "Brushing", image: bro },
    { id: 3, title: "Couleur", image: color },
    { id: 4, title: "Balayage", image: bal },
    { id: 5, title: "Lissage", image: liss },
    { id: 6, title: "nails", image: nail },
  ];

  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3200,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  return (
    <section className="bg-black relative ">
      {/* Floating Gallery Icon */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-2 bg-black/10 backdrop-blur-xl px-3 py-1 rounded-full shadow-lg border border-white/10">
        <img
          src={photos}
          alt="Gallery"
          className="w-6 h-6 hover:scale-110 transition-transform"
        />
        <span className="text-white text-sm font-medium tracking-wide">
          Gallery
        </span>
      </div>

      <div className="relative h-full md:h-96">
        <Slider {...(isMobile ? mobileSettings : desktopSettings)}>
          {services.map((service) => (
            <div key={service.id} className="border border-gray-600">
              <div className="overflow-hidden border border-2 border-[#c9a36b] shadow-xl bg-black/40 backdrop-blur">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-72 object-cover"
                />
                <div className="bg-black/80 text-white text-center py-3 font-medium tracking-wide">
                  {service.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
