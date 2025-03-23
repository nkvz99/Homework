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
        const bookIndex = books.findIndex(book => book.id === parseInt(id));
        if (bookIndex === -1){
            return null;
        }
        const deletedBook = books.splice(bookIndex, 1)[0];
        await writeFile(BOOKS_FILE,books);
        return deletedBook
    },

    async getStats() {
        const books = await readFile(BOOKS_FILE);
        const booksPerAuthor = {};
        let oldestBook = null, newestBook = null;
        
        books.forEach(book => {
            booksPerAuthor[book.author] = (booksPerAuthor[book.author] || 0) + 1;
            if (!oldestBook || book.year < oldestBook.year) oldestBook = book;
            if (!newestBook || book.year > newestBook.year) newestBook = book;
        });

        return { totalBooks: books.length, booksPerAuthor, oldestBook, newestBook };
    }
};

export default Book;
