import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CustomDialog from "./ui/Dialog";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export default function PrendreRDVModal({ open, setOpen }) {
  const today = dayjs();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: null,
    time: "",
  });

  const isFormValid =
    form.date &&
    form.time &&
    form.name.trim().length > 0 &&
    form.phone.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;

    // You can later replace this with API call
    alert(
      `✅ Rendez-vous confirmé !\n\n📅 Date : ${dayjs(form.date).format(
        "DD/MM/YYYY"
      )}\n⏰ Heure : ${form.time}\n👤 Nom : ${form.name}\n📞 Téléphone : ${
        form.phone
      }`
    );

    // Reload page (clean reset like FB)
    window.location.reload();
  };

  // 🔹 Monday-based current week
  const [weekStart, setWeekStart] = useState(today.startOf("isoWeek"));

  // ✅ Monday → Sunday (CORRECT)
  const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const currentWeekStart = today.startOf("isoWeek");
  const isCurrentWeek = weekStart.isSame(currentWeekStart, "week");

  const handlePrevWeek = () => {
    if (isCurrentWeek) return;
    setWeekStart((prev) => prev.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setWeekStart((prev) => prev.add(7, "day"));
  };

  const handleDateSelect = (day) => {
    if (day.isBefore(today, "day")) return;
    setForm((prev) => ({
      ...prev,
      date: day.format("YYYY-MM-DD"),
    }));
  };

  return (
    <CustomDialog open={open} onClose={() => setOpen(false)} position="bottom">
      <div className="relative p-6 max-h-[80vh] overflow-y-auto bg-white">
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-black/60 hover:text-black"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-black">
          Sélectionner une date
        </h2>

        {/* CALENDAR */}
        <div className="border border-black/10 rounded-lg p-3 shadow-xl">
          {/* HEADER */}
          {/* HEADER */}
          <div className="flex justify-between items-center mb-3">
            <button
              type="button"
              onClick={handlePrevWeek}
              disabled={isCurrentWeek}
              className={`
      px-3 py-1 rounded border text-black transition
      ${
        isCurrentWeek
          ? "border-black/10 text-black/30 cursor-not-allowed"
          : "border-black/20 hover:bg-black/5"
      }
    `}
            >
              ←
            </button>

            <span className="font-semibold text-black capitalize">
              {weekStart.format("MMMM YYYY")}
            </span>

            <button
              type="button"
              onClick={handleNextWeek}
              className="px-3 py-1 rounded border border-black/20 text-black hover:bg-black/5"
            >
              →
            </button>
          </div>

          {/* WEEKDAYS */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-black/60 mb-1">
            {weekdays.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 7 }).map((_, i) => {
              const day = weekStart.add(i, "day");
              const isToday = day.isSame(today, "day");
              const isPast = day.isBefore(today, "day");
              const isSelected = form.date === day.format("YYYY-MM-DD");

              return (
                <button
                  key={day.format("YYYY-MM-DD")}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDateSelect(day)}
                  className={`
                    py-2 rounded-md text-sm font-medium transition
                    ${
                      isSelected
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

        {/* TIME */}
        <div className="mt-5">
          <p className="font-semibold mb-2 text-black">Heure</p>

          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {Array.from({ length: 13 }).map((_, i) => {
              const hour = 10 + i;
              const label = `${hour.toString().padStart(2, "0")}:00`;
              const selected = form.time === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, time: label }))}
                  className={`
                    px-4 py-2 rounded-md whitespace-nowrap border transition shadow-md
                    ${
                      selected
                        ? "bg-black text-white border-black shadow-xl"
                        : "bg-white text-black border-black/20 hover:bg-black/5"
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        {/* CONTACT INFO */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3 text-black">Vos coordonnées</h3>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="
        w-full px-4 py-3 rounded-lg
        border border-black/20
        text-black placeholder-black/40
        focus:outline-none focus:ring-2 focus:ring-black
      "
            />

            <input
              type="tel"
              placeholder="Numéro de téléphone"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="
        w-full px-4 py-3 rounded-lg
        border border-black/20
        text-black placeholder-black/40
        focus:outline-none focus:ring-2 focus:ring-black
      "
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`
    mt-6 w-full py-3 rounded-lg font-semibold transition
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
