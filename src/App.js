import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import AddBucks from "./pages/AddBucks";
import AddTopping from "./pages/AddTopping";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import AddCart from "./pages/AddCart";

import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    if (state.isLogin == false) {
      navigate("/");
    } else {
      if (state.user.status == "admin") {
        navigate("/transaction");
      } else if (state.user.status == "customer") {
        navigate("/homepage");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/add-bucks" element={<AddBucks />} />
      <Route path="/add-topping" element={<AddTopping />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/add-cart/:id" element={<AddCart />} />
    </Routes>
  );
}

export default App;
