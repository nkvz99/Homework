import Book from "../models/books.models.js"
import { readFile } from "../services/files.services.js";

const BookController = {
    async createBook(req, res) {
        const newBook = await Book.createBook(req.body);
        res.status(201).json(newBook);
    },

    async getBooks(req, res) {
        const books = await readFile("books.json");
        const { author } = req.query;
    
        console.log("Query Author:", author); 
    
        if (author) {
            const filteredBooks = books.filter(book => 
                book.author && book.author.toLowerCase().includes(author.toLowerCase())
            );
    
            console.log("Filtered Books:", filteredBooks); 
    
            return res.json(filteredBooks);
        }
    
        res.json(books);
    },

    async getBookById(req, res) {
        const { params: { id } } = req;
        const book = await Book.getBookById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    },

    async deleteBook(req, res) {
        const { params: { id } } = req;
        await Book.deleteBook(id);
        res.sendStatus(204);
    },

    async getStats(req, res) {
        const stats = await Book.getStats();
        if (stats.error) return res.status(404).json(stats);
        res.json(stats);
    }
};

export default BookController;



