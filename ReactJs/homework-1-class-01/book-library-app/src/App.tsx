import { BookList } from "./components/BookList/BookList"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import './App.css'; 
function App() {

  return (
    <>
      <Header title={'Book Library'}/>
      <BookList/>
      <Footer/>
    </>
  )
}

export default App
