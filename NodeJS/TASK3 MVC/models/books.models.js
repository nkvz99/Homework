import { readFile, writeFile } from "../services/files.services.js";

const BOOKS_FILE = "books.json";

const Book = {
    async createBook(bookData) {
        const books = await readFile(BOOKS_FILE);
        const newBook = { id: books.length + 1, ...bookData };
        books.push(newBook);
        await writeFile(BOOKS_FILE, books);
        return newBook;
    },

    async getAllBooks() {
        return await readFile(BOOKS_FILE);
    },

    async getBookById(id) {
        const books = await readFile(BOOKS_FILE);
        return books.find(book => book.id === parseInt(id));
    },

    async deleteBook(id) {
        const books = await readFile(BOOKS_FILE);
        const filteredBooks = books.filter(book => book.id !== parseInt(id));
        
        if (filteredBooks.length === books.length) {
            return false; // No book was deleted
        }

        await writeFile(BOOKS_FILE, filteredBooks);
        return true;
    },

    async getStats() {
        const books = await readFile(BOOKS_FILE);
        if (!books.length) return { error: "No books found" };

        const booksPerAuthor = {};
        let oldestBook = null, newestBook = null;
        
        books.forEach(book => {
            booksPerAuthor[book.author] = (booksPerAuthor[book.author] || 0) + 1;
            if (typeof book.year === "number") {
                if (!oldestBook || book.year < oldestBook.year) oldestBook = book;
                if (!newestBook || book.year > newestBook.year) newestBook = book;
            }
        });

        return { totalBooks: books.length, booksPerAuthor, oldestBook, newestBook };
    }
};

export default Book;