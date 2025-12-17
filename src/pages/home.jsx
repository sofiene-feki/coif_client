import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ServicesCarousel from "../components/ServicesCarousel";
import { getLandingPage } from "../functions/landingPage";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLandingPage()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header profile={data.profile} />
      <Hero actions={data.actions} />
      <ServicesCarousel services={data.services} />
    </div>
  );
}
