import { useEffect, useState } from "react";
import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
//import "./App.css";
import { ToastContainer } from "react-toastify";
//import { initFacebookPixel } from "./service/fbPixel";
const LazyHome = lazy(() => import("./pages/home"));
const LazyLogin = lazy(() => import("./pages/login"));
const LazyOrders = lazy(() => import("./pages/Orders"));
const LazyOrderDetail = lazy(() => import("./pages/OrderDetail"));

function App() {
  const location = useLocation();

  // Pages where we DON'T want the header and headerBottom to show
  // useEffect(() => {
  //   initFacebookPixel();
  // }, []);
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh", // 100% of the viewport height
            }}
          >
            <p style={{ marginTop: "10px" }}>chargement ... </p>
          </div>
        }
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition={Bounce}
        />

        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="login" element={<LazyLogin />} />
          <Route path="orders" element={<LazyOrders />} />
          <Route path="/order/:id" element={<LazyOrderDetail />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
