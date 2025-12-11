import React, { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  TruckIcon,
  StarIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import o1 from "../assets/1.jpg";
import o2 from "../assets/2.png";
import o3 from "../assets/3.jpg";
import o4 from "../assets/4.png";

import logo from "../assets/logo.png";
import MediaGallery from "../components/MediaGallery ";
import ProductSelector from "../components/ProductSelector ";
import FeatureSection from "../components/FeatureSection";
import { IoIosLeaf } from "react-icons/io";
import CheckoutForm from "../components/Form";
import { createOrder } from "../functions/order";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ServicesCarousel from "../components/ServicesCarousel";

const products = {
  "600g": {
    title: "600 غ",
    price: 14, // base unit price
    desc: "Léger et moelleux, idéal pour ceux qui dorment sur le ventre",
  },
  "800g": {
    title: "800 غ",
    price: 17,
    desc: "Excellent maintien pour un sommeil réparateur",
  },
  "1kg": {
    title: "1 كغ ",
    price: 22,
    desc: "Finition haut de gamme, idéal pour un confort ferme",
  },
};

export default function Home() {
  useEffect(() => {
    // optional: initialize any animation libs or pixel here
  }, []);

  function trackEvent(name, data = {}) {
    try {
      if (window.fbq) window.fbq("track", name, data);
      if (window.gtag) window.gtag("event", name, data);
    } catch (e) {
      // ignore
    }
  }

  const weights = Object.keys(products);
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [selectedPack, setSelectedPack] = useState(2);

  const basePrice = products[selectedWeight].price;

  // Discount logic: bigger packs = cheaper per item
  const discount = selectedPack > 2 ? (selectedPack - 1) * 0.03 : 0; // 3% off per extra item
  const total = (basePrice * selectedPack * (1 - discount)).toFixed(2);
  const perUnit = (total / selectedPack).toFixed(2);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    gouvernorat: "",
  });

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      productId: "08101994",
      name: "Oreillers Premium 70×50",
      price: total,
      quantity: selectedPack,
      selectedSize: selectedWeight,
    },
  ];

  //   const subtotal = cartItems.reduce(
  //     (acc, item) => acc + item.price * item.quantity,
  //     0
  //   );

  const shipping = total > 0 ? 8.0 : 0;
  const totalDelivery = total + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Manual validation for when called outside <form>
    const missingField = Object.entries(formData).find(
      ([key, value]) => !value.trim()
    );
    if (missingField) {
      const fieldName = missingField[0];
      const el = document.querySelector(`[name="${fieldName}"]`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    const orderData = {
      customer: formData,
      items,
      subtotal: total,
      shipping,
      paymentMethod,
      total: totalDelivery,
    };

    try {
      const response = await createOrder(orderData);
      console.log("✅ Order placed successfully:", response);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        gouvernorat: "",
      });
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Une erreur s’est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
      setIsOpen(true);
    }
  };
  const [count, setCount] = useState(400); // start at 50

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1); // increment by 1
    }, 10000); // every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 antialiased">
      <Header />
      <Hero />
      <ServicesCarousel />
    </div>
  );
}
