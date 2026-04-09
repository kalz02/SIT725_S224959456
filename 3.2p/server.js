var express = require("express");
var app = express();
var port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
    {
        title: "The Philosopher's Stone",
        image: "images/hp1.png",
        link: "Read Excerpt",
        description: "The young Harry Potter discovers he is a wizard on his eleventh birthday and starts his first year at Hogwarts."
    },
    {
        title: "The Chamber of Secrets",
        image: "images/hp2.png",
        link: "Read Excerpt",
        description: "Harry returns to Hogwarts for his second year, only to find the school in peril as the Chamber of Secrets is opened."
    },
    {
        title: "The Prisoner of Azkaban",
        image: "images/hp3.png",
        link: "Read Excerpt",
        description: "Harry's third year is overshadowed by the escape of Sirius Black from the wizarding prison Azkaban."
    },
    {
        title: "The Goblet of Fire",
        image: "images/hp4.png",
        link: "Read Excerpt",
        description: "Harry is unexpectedly entered into the Triwizard Tournament, a dangerous magical competition."
    },
    {
        title: "The Order of the Phoenix",
        image: "images/hp5.png",
        link: "Read Excerpt",
        description: "Harry faces the return of Lord Voldemort and the interference of the Ministry of Magic at Hogwarts."
    },
    {
        title: "The Half-Blood Prince",
        image: "images/hp6.png",
        link: "Read Excerpt",
        description: "As Voldemort's power grows, Harry learns more about his past and prepares for the final battle."
    },
    {
        title: "The Deathly Hallows",
        image: "images/hp1.png",
        link: "Read Excerpt",
        description: "Harry, Ron, and Hermione set out to destroy Voldemort's final Horcruxes and end his reign once and for all."
    }
];

app.get('/api/books', (req, res) => {
    res.json({ statusCode: 200, data: cardList, message: "Success" });
});

app.listen(port, () => {
    console.log("App listening to: " + port);
});
