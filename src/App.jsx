import './App.css'
import Aside from './components/aside/Aside'
import Footer from './components/footer/Footer'
import Main from './components/main/Main'
import Navbar from './components/navbar/navbar'

function App() {
 
return (
  <div>
    <img src="https://w.forfun.com/fetch/71/71bb6cbac943138cae75e91c7402a79d.jpeg" alt="" className='bg_img' />
    <Navbar/>
    <div class="container-fluid d-flex">
     <Aside/>
     <Main/>
    

    </div>
    <Footer/>
  </div>
)

}

export default App
