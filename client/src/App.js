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
import ResetPassword from './componentes/ResetPassword/ResetPassword';
import RecoverPassword from './componentes/RecoverPassword/RecoverPassword';
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';
import { CartProvider } from './context/CartContext/CartContext';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './componentes/ScrollToTop/ScrollToTop';
import Breadcrumbs from './componentes/Breadcrumbs/Breadcrumbs';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
          <Breadcrumbs />
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
              <ProtectedRoute>
                <HeaderManage />
                <SalesManagement />
              </ProtectedRoute>
            } />
            <Route path="/ProductManage" element={
              <ProtectedRoute>
                <HeaderManage />
                <ProductManage />
              </ProtectedRoute>
            } />
            <Route path="/UserManage" element={
              <ProtectedRoute>
                <HeaderManage />
                <UserManage />
              </ProtectedRoute>
            } />
            <Route path="/AccountManage" element={
              <ProtectedRoute>
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
            <Route path="/RecoverPassword" element={
              <>
                <Header />
                <RecoverPassword />
                <Footer />
              </>
            } />
            <Route path="/reset-password/:token" element={
              <ProtectedRoute allowAccessWithoutAuth={true}>
                <Header />
                <ResetPassword />
                <Footer />
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;