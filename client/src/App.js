import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from './pagina/Productos/Productos';
import Login from './pagina/Auth/Login/Login';
import Index from './pagina/Index/Index';
import AboutUs from './pagina/About Us/Aboutus';
import Contact from './pagina/Contact/Contact';
import Footer from './componentes/Footer/Footer';
import SalesManagement from './pagina/SalesManagement/SalesManagement';
import ProductManage from './pagina/ProductManage/ProductManage';
import UserManage from './pagina/UserManage/UserManage';
import AccountManage from './pagina/AccountManage/AccountManage';
import HeaderManage from './componentes/HeaderManage/HeaderManage';
import Header from './componentes/Header/Header';
import ProductDetails from './pagina/ProductDetails/ProductDetails'; 
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';
import { CartProvider } from './context/CartContext/CartContext';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './componentes/ScrollToTop/ScrollToTop';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <ToastContainer
            position="top-right"
            autoClose={1500} // Tiempo de cierre automático más rápido
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false} // No pausar al perder el foco
            draggable
            pauseOnHover={false} // No pausar al pasar el mouse
          />
          <Routes>
            <Route path="/Login" element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            } />
            <Route path="/Nosotros" element={
              <>
                <Header />
                <AboutUs />
                <Footer />
              </>
            } />
            <Route path="/Productos" element={
              <>
                <Header />
                <Productos />
                <Footer />
              </>
            } />
            <Route path="/Contacto" element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/" element={<Index />} />
            <Route path="/SalesManagement" element={
              <ProtectedRoute allowedRoles={[1, 2]}> {/* Admin y Empleado */}
                <HeaderManage />
                <SalesManagement />
              </ProtectedRoute>
            } />
            <Route path="/ProductManage" element={
              <ProtectedRoute allowedRoles={[1, 2]}> {/* Admin y Empleado */}
                <HeaderManage />
                <ProductManage />
              </ProtectedRoute>
            } />
            <Route path="/UserManage" element={
              <ProtectedRoute allowedRoles={[1]}> {/* Solo Admin */}
                <HeaderManage />
                <UserManage />
              </ProtectedRoute>
            } />
            <Route path="/AccountManage" element={
              <ProtectedRoute allowedRoles={[1, 2]}> {/* Admin y Empleado */}
                <HeaderManage />
                <AccountManage />
              </ProtectedRoute>
            } />
            <Route path="/ProductDetails/:id" element={
              <>
                <Header />
                <ProductDetails />
                <Footer />
              </>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
