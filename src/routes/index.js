import React from "react";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import EmptyComponent from "../Pages/home/EmptyComponent";
import Overview from "../Pages/overview";
import FoodSecurity from "../Pages/food-security";
import Consumption from "../Pages/consumption";
import ProductionTrade from "../Pages/production-trade";
import Investment from "../Pages/investment";
import FoodPrice from "../Pages/food-price";
import Sustainability from "../Pages/sustainability";
import Others from "../Pages/others";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../components/login";

const MainRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" Component={Overview} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/Overview"
        element={
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        }
      />
      <Route
        path="/food-security"
        element={
          <PrivateRoute>
            <FoodSecurity />
          </PrivateRoute>
        }
      />
      <Route
        path="/consumption"
        element={
          <PrivateRoute>
            <Consumption />
          </PrivateRoute>
        }
      />
      <Route
        path="/production-trade"
        element={
          <PrivateRoute>
            <ProductionTrade />
          </PrivateRoute>
        }
      />
      <Route
        path="/investment"
        element={
          <PrivateRoute>
            <Investment />
          </PrivateRoute>
        }
      />
      <Route
        path="/food-price"
        element={
          <PrivateRoute>
            <FoodPrice />
          </PrivateRoute>
        }
      />
      <Route
        path="/sustainability"
        element={
          <PrivateRoute>
            <Sustainability />
          </PrivateRoute>
        }
      />
      <Route
        path="/others"
        element={
          <PrivateRoute>
            <Others />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/Overview" />} />
      <Route />
    </Routes>
  );
};

export default MainRouter;
