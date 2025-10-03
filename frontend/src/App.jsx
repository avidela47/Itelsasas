import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import background from "./assets/Imagen de WhatsApp 2025-09-30 a las 09.25.32_2d304c7f.jpg";
import theme from "./theme";

// 📄 Páginas
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutFailure from "./pages/CheckoutFailure";
import CheckoutPending from "./pages/CheckoutPending";
import CheckoutCancel from "./pages/CheckoutCancel";
import MyOrders from "./pages/MyOrders";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCatalog from "./pages/admin/AdminCatalog";
import AdminDocumentos from "./pages/admin/AdminDocumentos"; // ✅ Nuevo
import AdminClientes from "./pages/admin/AdminClientes";     // ✅ Nuevo
import AdminProveedores from "./pages/admin/AdminProveedores"; // ✅ Nuevo

// 🆕 Intro con video
import IntroPage from "./pages/IntroPage"; 

// 🧩 Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot"; 
import { useAuthStore } from "./store/useAuthStore";

// 🔹 Rutas protegidas
function PrivateRoute({ children, adminOnly = false }) {
  const { token, user } = useAuthStore();

  if (!token || !user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="div"
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Router>
          <Routes>
            <Route path="/" element={<IntroPage />} />

            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route
                      path="/catalogo"
                      element={
                        <>
                          <CatalogPage />
                          <Footer />
                        </>
                      }
                    />

                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/cart"
                      element={
                        <PrivateRoute>
                          <CartPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <PrivateRoute>
                          <CheckoutPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/orders/my"
                      element={
                        <PrivateRoute>
                          <MyOrders />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/checkout-success" element={<CheckoutSuccess />} />
                    <Route path="/checkout-failure" element={<CheckoutFailure />} />
                    <Route path="/checkout-pending" element={<CheckoutPending />} />
                    <Route path="/checkout-cancel" element={<CheckoutCancel />} />

                    {/* ADMIN */}
                    <Route
                      path="/admin"
                      element={
                        <PrivateRoute adminOnly>
                          <AdminLayout />
                        </PrivateRoute>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="orders" element={<AdminOrders />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="catalog" element={<AdminCatalog />} />
                      {/* ✅ Nuevos */}
                      <Route path="documentos" element={<AdminDocumentos />} />
                      <Route path="clientes" element={<AdminClientes />} />
                      <Route path="proveedores" element={<AdminProveedores />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/catalogo" replace />} />
                  </Routes>
                  <ChatBot />
                </>
              }
            />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;




