import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

type UpsertBook = Omit<Book, 'id'>;

interface BooksSearchParams {
  minPrice?: string;
  author?: string;
}

@Controller('books')
export class BookStoreController {
  private books: Book[] = [];

  @Get()
  getBooks(@Query() searchParams: BooksSearchParams): Book[] {
    console.log('Searching books with params:', { 
      minPrice: searchParams.minPrice, 
      author: searchParams.author 
    });
  
    let filteredBooks = [...this.books];
  
    if (searchParams.minPrice) {
      console.log(`Applying price filter (min ${searchParams.minPrice})`);
      filteredBooks = this.filterByMinPrice(filteredBooks, searchParams.minPrice);
    }
  
    if (searchParams.author) {
      const searchAuthor = searchParams.author.toLowerCase(); 
      console.log(`Applying author filter: "${searchAuthor}"`);
      filteredBooks = filteredBooks.filter(book =>
        book.author.toLowerCase().includes(searchAuthor) 
      );
    }
  
    if (filteredBooks.length === 0) {
      const errorResponse = {
        message: 'No books found',
        filtersApplied: {
          minPrice: searchParams.minPrice || 'none',
          author: searchParams.author || 'none'
        }
      };
      
      console.error('Search failed:', errorResponse);
      throw new NotFoundException(errorResponse);
    }
  
    return filteredBooks;
  }
  
  private filterByMinPrice(books: Book[], minPrice: string): Book[] {
    return books.filter(book => book.price >= Number(minPrice));
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Book | undefined {
    const book = this.books.find((book) => book.id === Number(id));
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBook(@Body() newBook: UpsertBook): Book {
    if (!newBook.title || !newBook.author || newBook.price == null) {
      throw new BadRequestException('Missing required fields');
    }

    const book = {
      ...newBook,
      id: Date.now(),
    };

    this.books.push(book);
    return book;
  }

  @Put(':id')
  updateBook(
    @Body() updateBookData: Partial<UpsertBook>, 
    @Param('id') id: string,
  ): Book {
    const bookIndex = this.books.findIndex((book) => book.id === Number(id));

    if (bookIndex === -1) {
      throw new NotFoundException('Book not found');
    }

    const updatedBook = {
      ...this.books[bookIndex], 
      ...updateBookData, 
      id: Number(id), 
    };

    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK) 
  deleteBook(@Param('id') id: string): { message: string } {
    const initialLength = this.books.length;
    this.books = this.books.filter((book) => book.id !== Number(id));

    if (this.books.length === initialLength) {
      throw new NotFoundException('Book not found');
    }

    return { message: `Book with ID ${id} deleted successfully` };
  }
}
