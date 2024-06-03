import express from 'express';

const app = express();
const port = 3000;
const d = new Date();
let day = d.getDay();

app.get('/', (req, res) => {

    let type = 'A Weekday';
    let adv = 'Time to work hard';

    if (day === 0 || day === 6) {
        type = 'The WeekEnd';
        adv = 'Time to have fun';
    }

    res.render('index.ejs', { dayType: type, advice: adv });
});

app.listen(port, () => {
    console.log(`Server Running on Port ${port}.`);
});