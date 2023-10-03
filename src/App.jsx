import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbarr from './components/navbar/Navbarr'
import Home from './pages/home/Home'
import Admin from './pages/Admin2/Admin'
import AboutUs from './pages/aboutUs/AboutUs'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Orders from './pages/orders/Orders'
import ProtectedRoutes from './routes/ProtectedRoutes';




function App() {
  const [auth, setAuth] = useState(false);

  const userAdmin = () => {
    setAuth(true);
  };

  return (
    <div className='principal'>
      <Navbarr auth={auth} userAdmin={userAdmin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/*' element={<ProtectedRoutes auth={auth} userAdmin={userAdmin} />} />
      </Routes>
      <Footer className='footer' />
    </div>
  );
}


export default App
