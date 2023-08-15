import './App.css'
import Aside from './components/aside/Aside'
import Footer from './components/footer/Footer'
import Main from './components/main/Main'

import { Form } from './components/form/form'
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <div>
      <Navbar />
      <div class="container-fluid d-flex">
        <Form />
        <Aside />
        <Main />


      </div>
      <Footer />
    </div>
  )

}

export default App
