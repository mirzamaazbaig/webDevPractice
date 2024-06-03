//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import bodyParser from 'body-parser';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const _dirName = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

function handler(req, res, next) {
    if (req.body.password === 'ILoveProgramming') {
        next();
    } else {
        res.sendFile(_dirName + '/public/index.html');
    }
};

app.use(handler);

app.post('/check', (req, res) => {
    res.sendFile(_dirName + '/public/secret.html');
});

app.get('/', (req, res) => {
    res.sendFile(_dirName + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});