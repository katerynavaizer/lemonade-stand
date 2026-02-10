import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shop from "./pages/Shop/Shop.jsx";
import Orders from "./pages/Orders/Orders.jsx";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastContainer position="top-center" hideProgressBar={true} />

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
