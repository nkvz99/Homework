import { booksData } from "./BooksData";
import './BookList.css'; 

export const BookList = () => {
    return (
        <div className="book-list-container">
            <ul className="book-list">
                {booksData.map((book) => (
                    <li key={book.id} className="book-item">
                        <div className="book-title">
                            <strong>{book.title}</strong>
                        </div>
                        <div className="book-author">
                            By: {book.author}
                        </div>
                        <div className="book-year">
                            Published: {book.year}
                        </div>
                        <div className={`book-status ${book.isRead ? 'read' : 'not-read'}`}>
                            {book.isRead ? "Read ✅" : "Not Read ❌"}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};