import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/authPage/Register";
import Nav from "./components/nav/Nav";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/productPage/ProductDetails.jsx";
import SidebarProvider from "./contexts/SidebarContext.jsx";
import SideBar from "./components/sideBar/SideBar.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import Footer from "./components/footer/Footer.jsx";
import OrderPage from "./pages/order/OrderPage.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import UserProfile from "./pages/userProfile/UserProfile.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AddProductPage from "./pages/addProductPage/AddProductPage.jsx";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <CartProvider>
          <Router>
            <SideBar />
            <Nav />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />

              <Route path="/product/:id" element={<ProductDetails />} />
              <Route
                path="/add-products"
                element={
                  <ProtectedRoute adminOnly>
                    <AddProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/order" element={<OrderPage />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
export default App;
