import express from "express";
import fs from 'fs/promises'

const app = express();

const PORT = 3000;
const HOSTNAME ='localhost';

app.use(express.json())

const BOOKS_FILE_PATH = "./data/books.json";

// TO CREATE A NEW BOOK

app.post('/books', async(req, res)=>{
    const books = await fs.readFile(BOOKS_FILE_PATH, 'utf-8');
    const parsedBooks = JSON.parse(books);
    console.log(parsedBooks);

    const newBook ={
        id: parsedBooks.length + 1,
        ...req.body,
        
    }
    parsedBooks.push(newBook);
    await fs.writeFile(BOOKS_FILE_PATH, JSON.stringify(parsedBooks, null , 2))
    res.status(201).send(newBook)
})


// TO GET "READ" ALL BOOKS  with QUERY to read the author            

app.get('/books', async (req, res) => {
    const books = JSON.parse(await fs.readFile(BOOKS_FILE_PATH, 'utf-8'));

    if (req.query.author) {
        const filteredBooks = books.filter(book =>
            book.author.toLowerCase().includes(req.query.author.toLowerCase())
        );
        return res.json(filteredBooks);
    }

    res.json(books);
});



// TO GET THE BOOK BY ID
app.get('/books/:id', async(req, res)=>{
    const books = await fs.readFile(BOOKS_FILE_PATH, 'utf-8');
    const parsedBooks = JSON.parse(books);
    const book = parsedBooks.find(b => b.id === parseInt(req.params.id))
    if (!book){
        return res.status(404).json({messsage: 'Book not found'})
    }
    res.json(book)
    
})

// TO DELETE BOOK BY ID
app.delete('/books/:id', async(req,res)=>{
    const { id } = req.params
    console.log("REQUEST", id)
    const books = await fs.readFile(BOOKS_FILE_PATH, 'utf-8');
    const parsedBooks = JSON.parse(books);

    const deleteBooks = parsedBooks.filter(books => books.id !== parseInt(id));
    await fs.writeFile(BOOKS_FILE_PATH, JSON.stringify(deleteBooks , null , 2))
    res.sendStatus(204)

})

// STATS FOR NUMBER OF BOOKS PER AUTHOR , OLDEST BOOKS , NEWEST BOOKS
app.get('/stats', async (req, res) => {
    const books = JSON.parse(await fs.readFile(BOOKS_FILE_PATH, 'utf-8'));
    if (!books.length) return res.status(404).json({ error: "No books found" });

    const booksPerAuthor = {};
    let oldestBook = null, newestBook = null;

    for (const book of books) {
        booksPerAuthor[book.author] = (booksPerAuthor[book.author] || 0) + 1;

        if (typeof book.year === 'number') {
            if (!oldestBook || book.year < oldestBook.year) oldestBook = book;
            if (!newestBook || book.year > newestBook.year) newestBook = book;
        }
    }

    if (!oldestBook || !newestBook) return res.status(400).json({ error: "No valid book years found" });

    res.json({
        totalBooks: books.length,
        booksPerAuthor,
        oldestBook,
        newestBook
    });
});



app.listen(PORT, HOSTNAME,()=>{
    console.log(`Server is now listening at: http://${HOSTNAME}:${PORT}`)
})