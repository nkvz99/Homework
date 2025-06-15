import './Footer.css'
import { booksData } from "../BookList/BooksData";

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='footer'>
            <p> Today is: {currentYear}</p>
            <p> Books in library: {booksData.length}</p>
        </footer>
    )
}