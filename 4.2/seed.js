 

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ravenclaw_library');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB for seeding...');
});

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2 },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true, min: 1000 },
    image: { type: String, required: true },
    description: { type: String, required: true, maxlength: 600 }
});

const Book = mongoose.model('Book', BookSchema);

const sampleBooks = [
    {
        title: "The Philosopher's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 1997,
        image: "images/hp1.png",
        description: "The young Harry Potter discovers he is a wizard on his eleventh birthday and begins his first extraordinary year at Hogwarts School of Witchcraft and Wizardry."
    },
    {
        title: "The Chamber of Secrets",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 1998,
        image: "images/hp2.png",
        description: "Harry returns to Hogwarts for his second year, only to find the school under threat as students are found petrified and a mysterious message declares the Chamber of Secrets has been opened."
    },
    {
        title: "The Prisoner of Azkaban",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 1999,
        image: "images/hp3.png",
        description: "Harry's third year at Hogwarts is overshadowed by the escape of Sirius Black from the wizarding prison of Azkaban and the revelation of dark secrets about his past."
    },
    {
        title: "The Goblet of Fire",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 2000,
        image: "images/hp4.png",
        description: "Harry is unexpectedly entered into the dangerous Triwizard Tournament, a magical competition between three schools, leading to a terrifying encounter with Lord Voldemort."
    },
    {
        title: "The Order of the Phoenix",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 2003,
        image: "images/hp5.png",
        description: "Harry faces the return of Voldemort while battling the Ministry of Magic's interference at Hogwarts, and learns of a secret Order working to protect the wizarding world."
    },
    {
        title: "The Half-Blood Prince",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 2005,
        image: "images/hp6.png",
        description: "As Voldemort's power grows ever stronger, Harry and Dumbledore work together to discover the Dark Lord's weaknesses and prepare for the inevitable final confrontation."
    },
    {
        title: "The Deathly Hallows",
        author: "J.K. Rowling",
        genre: "Fantasy",
        year: 2007,
        image: "images/hp1.png",
        description: "Harry, Ron, and Hermione embark on a perilous quest to destroy Voldemort's Horcruxes, leading to a climactic battle that will determine the fate of the wizarding world."
    }
];

const seedDatabase = async () => {
    try {
        
        await Book.deleteMany({});
        console.log('Cleared existing books.');

        await Book.insertMany(sampleBooks);
        console.log(`Successfully seeded ${sampleBooks.length} books into ravenclaw_library!`);
    } catch (err) {
        console.error('Error seeding database:', err.message);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

mongoose.connection.once('open', seedDatabase);
