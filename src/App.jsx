import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Aside from './components/aside/Aside'
import Footer from './components/footer/Footer'
import Main from './components/main/Main'
import Navbar from './components/navbar/Navbar'
import Admin from './pages/Admin/Admin'

function App() {

  return (
    <div>
      <Navbar />
      <div class="container-fluid d-flex">
        <Aside />
        <Main />


      </div>
      <Footer />
    </div>
  )

}

export default App
