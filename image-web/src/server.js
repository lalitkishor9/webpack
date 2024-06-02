const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Middleware to serve static files from the 'dist' directory
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html');
    res.send("Hi");
    // Read the HTML file asynchronously and send the response
    // fs.readFile(pathToHtmlFile, 'utf-8', (err, content) => {
    //     if (err) {
    //         console.error('Error reading the HTML file', err);
    //         return res.status(500).send('Internal Server Error');
    //     }
    //     res.send(content);
    // });
});

app.listen(3002, () => {
    console.log('App is running on port 3002');
});