import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
//import { clearCart } from "../redux/cart/cartSlice";
import { createOrder } from "../functions/order";
import flag from "../assets/flag.png";
import governorate from "../assets/governorate.png";
import { PiUserLight } from "react-icons/pi";
import { PiMapPinLineThin } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { PiPhone } from "react-icons/pi";

//import { useFacebookPixel } from "../hooks/useFacebookPixel";
//import { sendServerEvent } from "../functions/fbCapi";

export default function CheckoutForm({
  formData,
  setFormData,
  loading,
  isOpen,
  setIsOpen,
  handleSubmit,
  paymentMethod,
  setPaymentMethod,
}) {
  // const cartItems = useSelector((state) => state.cart.items);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { trackPurchase } = useFacebookPixel();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div dir="rtl" className="bg-white rounded-3xl p-4 shadow-md mt-8">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
                  <Dialog.Title className="text-2xl font-bold text-[#87a736]">
                    😊 Bienvenue {formData.fullName} !
                  </Dialog.Title>
                  <p className="mt-4 text-gray-600">
                    Merci pour votre commande. Nous vous confirmerons votre
                    commande par téléphone sous peu.
                  </p>
                  <button
                    className="mt-6 px-6 py-2 bg-[#87a736] text-white rounded-lg hover:bg-[#769030] transition"
                    onClick={() => {
                      // Clear the cart
                      // Close the dialog
                      setIsOpen(false);
                      // Navigate to home page
                      navigate("/");
                    }}
                  >
                    Fermer
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <h2 className="text-md font-bold mb-4 text-gray-800">
        🚚 معلومات التوصيل
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* الاسم الكامل */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الاسم
          </label>
          <div className="relative">
            <PiUserLight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder=" محمد علي"
              className="w-full rounded-md border border-gray-300 pr-10 pl-3 py-2 focus:border-green-600 focus:ring-green-600 sm:text-sm text-right"
            />
          </div>
        </div>

        {/* الهاتف */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            رقم الهاتف
          </label>

          <div className="relative flex items-center bg-gray-100 border border-gray-300 rounded-md overflow-hidden flex-row-reverse">
            {/* Phone Icon */}
            <PiPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            {/* Country Code + Flag */}
            <span className="flex items-center gap-1 h-full px-2 ml-4 text-sm text-gray-700 border-l border-gray-300">
              +216
              <img
                src={flag}
                alt="TN"
                className="w-auto h-5 object-cover rounded-sm"
              />
            </span>

            {/* Input Field */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="20 123 456"
              className="w-full border-0 bg-white focus:ring-0 p-2 pr-10 sm:text-sm text-right"
            />
          </div>
        </div>

        {/* العنوان والولاية */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* العنوان */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان التوصيل
            </label>
            <div className="relative">
              <PiMapPinLineThin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder=" شارع الحبيب بورقيبة، باب بحر"
                className="w-full rounded-md border border-gray-300 pr-10 pl-3 py-2 focus:border-green-600 focus:ring-green-600 sm:text-sm text-right"
              />
            </div>
          </div>

          {/* الولاية */}
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الولاية
            </label>
            <div className="relative">
              <img
                src={governorate}
                alt="خريطة تونس"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-auto h-8"
              />
              <select
                name="gouvernorat"
                value={formData.gouvernorat}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 pr-10 pl-3 py-2 bg-white focus:border-green-600 focus:ring-green-600 sm:text-sm text-right cursor-pointer appearance-none"
              >
                <option value="" disabled hidden className="text-gray-400 mr-4">
                  اختار ولايتك
                </option>
                <option value="Tunis">تونس</option>
                <option value="Ariana">أريانة</option>
                <option value="Ben Arous">بن عروس</option>
                <option value="Manouba">منوبة</option>
                <option value="Nabeul">نابل</option>
                <option value="Zaghouan">زغوان</option>
                <option value="Bizerte">بنزرت</option>
                <option value="Béja">باجة</option>
                <option value="Jendouba">جندوبة</option>
                <option value="Kef">الكاف</option>
                <option value="Siliana">سليانة</option>
                <option value="Sousse">سوسة</option>
                <option value="Monastir">المنستير</option>
                <option value="Mahdia">المهدية</option>
                <option value="Sfax">صفاقس</option>
                <option value="Kairouan">القيروان</option>
                <option value="Kasserine">القصرين</option>
                <option value="Sidi Bouzid">سيدي بوزيد</option>
                <option value="Gabès">قابس</option>
                <option value="Médenine">مدنين</option>
                <option value="Tataouine">تطاوين</option>
                <option value="Gafsa">قفصة</option>
                <option value="Tozeur">توزر</option>
                <option value="Kebili">قبلي</option>
              </select>
            </div>
          </div>
        </div>

        {/* طريقة الدفع */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            طريقة الدفع
          </h3>
          <label className="flex items-center justify-start gap-2 cursor-pointer">
            <CreditCardIcon className="h-4 w-4 text-gray-700" />
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-600"
            />
            <span>الدفع عند التسليم</span>
          </label>
        </div>

        {/* زر الإرسال */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-green-700 text-white"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
              جاري معالجة الطلب...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FaCheckCircle className="w-5 h-5" />
              تأكيد الطلب
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
