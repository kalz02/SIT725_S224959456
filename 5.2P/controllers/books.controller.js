const booksService = require('../services/books.service');

const getAllBooks = (req, res) => {
    try {
        const books = booksService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
};

const getBookById = (req, res) => {
    try {
        const bookId = req.params.id;
        const book = booksService.getBookById(bookId);
        
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details" });
    }
};

module.exports = {
    getAllBooks,
    getBookById
};
