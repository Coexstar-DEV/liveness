// index.js
const express = require('express');
const runScript = require('./save');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/run-script', (req, res) => {
    runScript();
    res.send('Script executed successfully.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});