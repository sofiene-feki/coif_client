import React from "react";
import confort from "../assets/confort.png";
import forme from "../assets/forme.PNG";
import chemical from "../assets/chemical.PNG";
import machine from "../assets/machine.PNG";

const features = [
  {
    img: confort,
    title: "Confortable",
    desc: "Moelleux et respirant pour un sommeil profond et apaisé",
  },
  {
    img: forme,
    title: "Garde sa forme",
    desc: "Résiste à l'affaissement, même après des mois d’utilisation",
  },
  {
    img: chemical,
    title: "0% Produit chimique",
    desc: "Tissu et garnissage naturels sans substances nocives",
  },
  {
    img: machine,
    title: "Lavable en machine",
    desc: "Entretien facile à 30°C, garde sa douceur lavage après lavage",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-2 bg-white">
      <div className="grid grid-cols-4 md:grid-cols-4 gap-1 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src={f.img}
                alt={f.title}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>{" "}
            <h3 className="text-[8px] text-slate-800">{f.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
