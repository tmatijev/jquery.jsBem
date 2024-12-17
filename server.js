const express = require('express');
const path = require('path');
const app = express();

// Serve static files from project root
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));

// Serve demo page at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo/index.html'));
});

// Prevent serving index.html
app.get('/index.html', (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
}); 