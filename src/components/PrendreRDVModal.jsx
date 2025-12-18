import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CustomDialog from "./ui/Dialog";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import {
  createAppointment,
  getAvailabilityByDate,
} from "../functions/appointment";

dayjs.locale("fr");

export default function PrendreRDVModal({ open, setOpen }) {
  const today = dayjs();

  /* ================= STATE ================= */

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: null,
    time: "",
  });

  const [availability, setAvailability] = useState({});
  const [loadingHours, setLoadingHours] = useState(false);

  const isFormValid =
    Boolean(form.date) &&
    Boolean(form.time) &&
    form.name.trim().length > 0 &&
    form.phone.trim().length > 0;

  /* ================= CALENDAR ================= */

  const [weekStart, setWeekStart] = useState(today.startOf("isoWeek"));
  const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const isCurrentWeek = weekStart.isSame(today.startOf("isoWeek"), "week");

  const handleDateSelect = (day) => {
    if (day.isBefore(today, "day")) return;

    setForm((prev) => ({
      ...prev,
      date: day.format("YYYY-MM-DD"),
      time: "",
    }));
  };

  /* ================= AVAILABILITY ================= */

  useEffect(() => {
    if (!form.date) return;

    const fetchAvailability = async () => {
      setLoadingHours(true);
      try {
        const data = await getAvailabilityByDate(form.date);
        setAvailability(data);

        // Reset time if it becomes unavailable
        if (form.time && data[form.time] === false) {
          setForm((prev) => ({ ...prev, time: "" }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingHours(false);
      }
    };

    fetchAvailability();
  }, [form.date]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      await createAppointment(form);
      alert("✅ Rendez-vous confirmé");
      setOpen(false);

      setForm({
        name: "",
        phone: "",
        date: null,
        time: "",
      });
    } catch (err) {
      alert("❌ Ce créneau est déjà complet");
    }
  };

  /* ================= RENDER ================= */

  return (
    <CustomDialog open={open} onClose={() => setOpen(false)} position="bottom">
      <div className="relative p-6 max-h-[85vh] overflow-y-auto bg-gray-100">
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-black/60"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-black">
          Prendre rendez-vous
        </h2>

        {/* ================= CALENDAR ================= */}
        <div className="border border-black/10 rounded-lg p-3 shadow-xl bg-white">
          <div className="flex justify-between items-center mb-3">
            <button
              disabled={isCurrentWeek}
              onClick={() => setWeekStart((p) => p.subtract(7, "day"))}
              className="px-2"
            >
              ←
            </button>

            <span className="font-semibold capitalize">
              {weekStart.format("MMMM YYYY")}
            </span>

            <button
              onClick={() => setWeekStart((p) => p.add(7, "day"))}
              className="px-2"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 text-xs mb-1 text-center text-black/60">
            {weekdays.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => {
              const day = weekStart.add(i, "day");
              const selected = form.date === day.format("YYYY-MM-DD");
              const isPast = day.isBefore(today, "day");
              const isToday = day.isSame(today, "day");

              return (
                <button
                  key={i}
                  disabled={isPast}
                  onClick={() => handleDateSelect(day)}
                  className={`
                    py-2 rounded-md text-sm font-medium transition
                    ${
                      selected
                        ? "bg-black text-white"
                        : isToday
                        ? "border border-black"
                        : "hover:bg-black/5"
                    }
                    ${
                      isPast ? "text-black/30 cursor-not-allowed" : "text-black"
                    }	
                  `}
                >
                  {day.date()}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= HOURS ================= */}
        <div className="mt-5">
          <p className="font-semibold mb-2 text-black">Heure</p>

          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {Array.from({ length: 13 }).map((_, i) => {
              const hour = 10 + i;
              const label = `${hour.toString().padStart(2, "0")}:00`;

              const isAvailable = availability[label] !== false;

              return (
                <button
                  key={label}
                  disabled={!isAvailable || loadingHours}
                  onClick={() => setForm((p) => ({ ...p, time: label }))}
                  className={`
px-4 py-2 rounded-md whitespace-nowrap border transition shadow-xl                    ${
                    form.time === label
                      ? "bg-black text-white border-black shadow-2xl"
                      : isAvailable
                      ? "bg-white text-black border-black/20 hover:bg-black/5"
                      : "opacity-40 cursor-not-allowed"
                  }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= CONTACT ================= */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold mb-3 text-black">Vos coordonnées</h3>
          <input
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="
        w-full px-4 py-3 rounded-lg shadow-xl
        border border-black/20 bg-white
        text-black placeholder-black/40
        focus:outline-none focus:ring-2 focus:ring-black
      "
          />

          <input
            placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="
        w-full px-4 py-3 rounded-lg shadow-xl
        border border-black/20 bg-white
        text-black placeholder-black/40
        focus:outline-none focus:ring-2 focus:ring-black
      "
          />
        </div>

        {/* ================= SUBMIT ================= */}
        <button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`
            mt-6 w-full py-3 rounded font-semibold transition shadow-xl
            ${
              isFormValid
                ? "bg-black text-white hover:opacity-90"
                : "bg-black/20 text-black/40 cursor-not-allowed"
            }
          `}
        >
          Confirmer le rendez-vous
        </button>
      </div>
    </CustomDialog>
  );
}
