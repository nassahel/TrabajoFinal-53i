import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbarr from './components/navbar/Navbarr'
import Carrito from './pages/carrito/Carrito'
import Home from './pages/home/Home'
import Admin from './pages/Admin2/Admin'
import AboutUs from './pages/aboutUs/AboutUs'
import Register from './pages/register/Register'
import Login from './pages/login/Login'




function App() {

  return (
    <div className='principal'>
      <Navbarr />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/carrito' element={<Carrito/>}/>
        <Route path='/admin' element={<Admin />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer className="footer" />
    </div>
  )

}

export default App
