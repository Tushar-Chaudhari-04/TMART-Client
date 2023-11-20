import './App.css';
import About from './components/about/About';
import Notfound from './components/notfound/Notfound';
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/service' element={<Home />}/>
          <Route path='/contact-us' element={<Home />}/>
          <Route path='*' element={<Notfound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
