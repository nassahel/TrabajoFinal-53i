import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbarr from './components/navbar/Navbarr'

import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'
import AboutUs from './pages/aboutUs/AboutUs'
import Register from './pages/register/Register'



function App() {

  return (
    <div className='principal'>
      <img className='bg_img' src="src\assets\img\body_background.jpeg" alt="" />
      <Navbarr/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <Footer className="footer" />
    </div>
  )

}

export default App
