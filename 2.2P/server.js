const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/addTwoNumbers', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({ data: null, statusCode: 400, message: 'Invalid input' });
    } else {
        const result = num1 + num2;
        res.status(200).json({ data: result, statusCode: 200, message: 'success' });
    }
});

app.get('/subtractTwoNumbers', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({ data: null, statusCode: 400, message: 'Invalid input' });
    } else {
        const result = num1 - num2;
        res.status(200).json({ data: result, statusCode: 200, message: 'success' });
    }
});

app.get('/multiplyTwoNumbers', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({ data: null, statusCode: 400, message: 'Invalid input' });
    } else {
        const result = num1 * num2;
        res.status(200).json({ data: result, statusCode: 200, message: 'success' });
    }
});

app.get('/divideTwoNumbers', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({ data: null, statusCode: 400, message: 'Invalid input' });
    } else if (num2 === 0) {
        res.status(400).json({ data: null, statusCode: 400, message: 'Division by zero' });
    } else {
        const result = num1 / num2;
        res.status(200).json({ data: result, statusCode: 200, message: 'success' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
