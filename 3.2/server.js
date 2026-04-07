var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

const mongoose = require('mongoose');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ravenclaw_library');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB – Ravenclaw Library DB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

 
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1000
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 600
    }
});

const Book = mongoose.model('Book', BookSchema);

// GET /api/books – fetch all books from MongoDB
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.json({ statusCode: 200, data: books, message: 'Success' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
});

// POST /api/books – safe write: allowlist fields, validate via schema
app.post('/api/books', async (req, res) => {
    try {
        const { title, author, genre, year, image, description } = req.body;
        const book = new Book({ title, author, genre, year, image, description });
        await book.save();
        res.status(201).json({ statusCode: 201, message: 'Book added to the library!', data: book });
    } catch (err) {
        res.status(400).json({ statusCode: 400, message: err.message });
    }
});

app.listen(port, () => {
    console.log('Ravenclaw Library app listening on port: ' + port);
});
