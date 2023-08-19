import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Main from './components/main/Main'
import Navbar from './components/navbar/navbar'

function App() {

  return (
    <div className='principal'>
      <Navbar />
      <Main />
      <Footer class="footer" />
    </div>
  )

}

export default App
