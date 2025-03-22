import Book from "../models/books.models.js";

const BookController = {
    async createBook(req, res) {
        const { title, author, year } = req.body;

        if (!title || !author || !year || typeof year !== "number") {
            return res.status(400).json({ message: "Invalid book data. Title, author, and year (as a number) are required." });
        }

        const newBook = await Book.createBook({ title, author, year });
        res.status(201).json({ message: "Book created successfully", book: newBook });
    },

    async getBooks(req, res) {
        const books = await Book.getAllBooks();
        const { author } = req.query;

        if (author) {
            const filteredBooks = books.filter(book => 
                book.author && book.author.toLowerCase().includes(author.toLowerCase())
            );
            return res.json(filteredBooks);
        }

        res.json(books);
    },

    async getBookById(req, res) {
        const { id } = req.params;
        const book = await Book.getBookById(id);

        if (!book) return res.status(404).json({ message: "Book not found" });

        res.json(book);
    },

    async deleteBook(req, res) {
        try{
        const { id } = req.params;
        if (!id) return res.status(400).json({message:"Book ID is required"});
        const deletedBook = await Book.deleteBook(id);
        if (!deletedBook) return res.status(404).json({message:"Book not found"});
        res.json({message:"Book deleted succesfully", deletedBook})
    }catch(error){
        console.error("Error deleting book:", error);
        res.status(500).json({message:"Internal Server Error"})

    }
    },

    async getStats(req, res) {
        const stats = await Book.getStats();

        if (stats.error) {
            return res.status(404).json(stats);
        }

        res.json(stats);
    }
};

export default BookController;
