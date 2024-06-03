import bodyParser from "body-parser";
import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let bandName = '';

function bandNameGenerator(req, res, next) {
  bandName = req.body['street'] + req.body['pet'];
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bandNameGenerator);

app.post('/submit', (req, res) => {
  res.send(`<h1>Your Band Name is : </h1><h2>${bandName}</h2>`);
});

app.get('/', (req, res) => {
  res.sendFile(_dirname + '/public/index.html')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
