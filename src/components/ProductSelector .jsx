import { GiWeight } from "react-icons/gi";
import pillow600 from "../assets/600g.png";
import pillow800 from "../assets/800g.png";
import pillow1kg from "../assets/1kg.png";

const imageMap = {
  "600g": pillow600,
  "800g": pillow800,
  "1kg": pillow1kg,
};

const ProductSelector = ({
  products,
  weights,
  selectedWeight,
  setSelectedWeight,
  selectedPack,
  setSelectedPack,
}) => {
  // 🧮 Discount tiers
  const getDiscountRate = (pack) => {
    if (pack < 3) return 0;
    if (pack < 5) return 0.05;
    if (pack < 7) return 0.08;
    if (pack < 9) return 0.1;
    return 0.12;
  };

  const basePrice = products[selectedWeight].price;
  const discountRate = getDiscountRate(selectedPack);
  const discountedPrice = basePrice * (1 - discountRate);
  const total = Math.round(discountedPrice * selectedPack);
  const perUnit = Math.round(discountedPrice);

  return (
    <div className="bg-white rounded-3xl p-4 shadow-md mt-8" dir="rtl">
      {/* 🧱 1️⃣ Weight Selector */}
      <h3 className="text-md font-bold text-gray-900 mb-2">
        ⚖️ اختار وزن المخدة اللي يريح رقبتك : {selectedWeight}{" "}
      </h3>
      <div className="flex gap-4 overflow-x-auto py-3 hide-scrollbar pr-2">
        {weights.map((w) => {
          const isSelected = selectedWeight === w;
          return (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={`relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ease-out
          shadow-md hover:shadow-lg min-w-[90px] overflow-hidden group
          ${
            isSelected
              ? "border-green-600 ring-2 ring-green-200 scale-105 bg-green-50"
              : "border-gray-300 bg-white hover:border-green-400"
          }`}
            >
              {/* Floating Icon */}
              <div
                className={`absolute -top-2 -right-1.5 flex items-center justify-center w-8 h-8 rounded-full border bg-white transition-colors
            ${
              isSelected
                ? "border-green-600 text-green-600"
                : "border-gray-300 text-gray-600"
            }`}
              >
                <GiWeight className="w-4 h-4" />
              </div>

              {/* Image (Animated height) */}
              <div className="w-full flex justify-center items-center bg-gradient-to-b from-gray-50 to-white h-24">
                <img
                  src={imageMap[w]}
                  alt={products[w].title}
                  className={`object-contain transition-all duration-500 ease-in-out group-hover:scale-110
              ${
                isSelected
                  ? "h-24"
                  : w === "600g"
                  ? "h-20"
                  : w === "800g"
                  ? "h-22"
                  : "h-24"
              }`}
                />
              </div>

              {/* Label */}
              <div className="mt-2 text-center">
                <div className="text-xs text-gray-500">الوزن</div>
                <div className="text-lg font-bold text-gray-800">
                  {products[w].title}
                </div>
              </div>

              {/* Decorative line */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-600 rounded-b-2xl"></div>
              )}
            </button>
          );
        })}
      </div>
      {/* Divider */}
      <div className="border-b border-gray-200 my-3"></div>
      {/* 📦 2️⃣ Pack Selector */}
      <h3 className="text-md font-bold mb-2">
        🔢 اختار الكمية اللي تحب عليها : {selectedPack}
      </h3>{" "}
      <div className="flex gap-4 overflow-x-auto py-3 hide-scrollbar pr-2">
        {[...Array(9)].map((_, i) => {
          const n = i + 2;
          const rate = getDiscountRate(n);
          const totalWithoutDiscount = basePrice * n;
          const totalWithDiscount = Math.round(
            totalWithoutDiscount * (1 - rate)
          );
          const savings = totalWithoutDiscount - totalWithDiscount;
          const isSelected = selectedPack === n;

          return (
            <button
              key={n}
              onClick={() => setSelectedPack(n)}
              className={`relative flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ease-out
          shadow-md hover:shadow-lg min-w-[100px] overflow-hidden group
          ${
            isSelected
              ? "border-green-600 ring-2 ring-green-200 scale-105 bg-green-50"
              : "border-gray-300 bg-white hover:border-green-400"
          }`}
            >
              <div className="flex items-end justify-center gap-1 mt-1">
                <span className="text-2xl font-bold leading-none text-gray-800">
                  {n}
                </span>
                <span className="text-xs text-gray-500 mb-1">مخادد </span>
              </div>

              {savings > 0 && (
                <div className="my-2 bg-green-100 text-green-700 text-[11px] font-medium px-2 py-1 rounded-full">
                  توفّر {savings} دت 💰
                </div>
              )}

              {isSelected && (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-600 rounded-b-2xl"></div>
              )}
            </button>
          );
        })}
      </div>
      {/* Divider */}
      <div className="border-b border-gray-200 my-3"></div>
      {/* 💵 3️⃣ Dynamic Price Display */}
      <div className="mt-4">
        <div className="flex items-baseline gap-2 text-gray-800 mt-2">
          <span className="text-lg font-medium text-slate-600">المجموع:</span>
          <span className="text-xl font-bold text-gray-800">
            {total},000 دت
          </span>
        </div>
        {discountRate > 0 && (
          <div className="text-xs text-green-600 mt-1">
            توفّر {(discountRate * 100).toFixed(0)}% على كل مخدة 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSelector;
