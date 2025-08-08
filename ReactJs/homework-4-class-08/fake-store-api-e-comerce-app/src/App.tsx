
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Products from './pages/Products/Products'

import { Navigation } from './components/Navigation/Navigation'
import { HomePage } from './pages/HomePage/HomePage'


function App() {


  return (
    <>
    < BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/products" element={<Products />} />
      <Route path="/category/:categoryName" element={<HomePage />} />
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
