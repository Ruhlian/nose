import React, { Fragment } from 'react';
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
import AllProducts from './pagina/AllProducts/AllProducts';
import HeaderManage from './componentes/HeaderManage/HeaderManage';
import Header from './componentes/Header/Header';
import ProductDetails from './pagina/ProductDetails/ProductDetails'; 
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';
import { CartProvider } from './context/CartContext/CartContext';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { ToastContainer } from 'react-toastify';  // Importar ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './componentes/ScrollToTop/ScrollToTop' // Importar el nuevo componente

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Fragment>
          <Router>
            <ScrollToTop /> {/* Asegura que al cambiar de ruta, se scrollee hacia arriba */}
            <Routes>
              <Route path="/Login" exact element={
                <>
                  <Header />
                  <Login />
                  <Footer />
                </>
              } />

              <Route path="/Nosotros" exact element={
                <>
                  <AboutUs />
                </>
              } />

              <Route path="/Productos" exact element={
                <>
                  <Productos/>
                </>
              } />

              <Route path="/Contacto" exact element={
                <>
                  <Contact />
                </>
              } />

              
              <Route path="/AllProducts" exact element={
              <>
              <AllProducts />
              </>
              } />

              <Route path="/" exact element={
                <>
                  <Index/>
                </>
              } />

              <Route path="/SalesManagement" exact element={
                <ProtectedRoute allowedRoles={['Administrador', 'Empleado']}>
                  <HeaderManage />
                  <SalesManagement />
                </ProtectedRoute>
              } />

              <Route path="/ProductManage" exact element={
                <ProtectedRoute allowedRoles={['Administrador', 'Empleado']}>
                  <HeaderManage />
                  <ProductManage />
                </ProtectedRoute>
              } />

              <Route path="/UserManage" exact element={
                <ProtectedRoute allowedRoles={['Administrador']}>
                  <HeaderManage />
                  <UserManage />
                </ProtectedRoute>
              } />

              <Route path="/AccountManage" exact element={<AccountManage />} />

              <Route path="/ProductDetails/:id" exact element={
                <>
                  <ProductDetails />
                </>
              } />
            </Routes>
          </Router>
          <ToastContainer />
        </Fragment>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
