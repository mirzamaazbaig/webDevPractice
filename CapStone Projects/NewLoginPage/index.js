import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const usersList = [
    {
        "id": 1,
        "firstName": "Emily",
        "lastName": "Johnson",
        "maidenName": "Smith",
        "age": 28,
        "gender": "female",
        "email": "emily.johnson@x.dummyjson.com",
        "phone": "+81 965-431-3024",
        "username": "emilys",
        "password": "emilyspass"
    }, {
        "id": 2,
        "firstName": "Michael",
        "lastName": "Williams",
        "maidenName": "",
        "age": 35,
        "gender": "male",
        "email": "michael.williams@x.dummyjson.com",
        "phone": "+49 258-627-6644",
        "username": "michaelw",
        "password": "michaelwpass"
    }
];
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = usersList.find(u => u.username === username);

    if (user) {
        if (user.password === password) {
            res.send("Login successful");
        } else {
            alert('Incorrect password')
        }
    } else {
        res.send("Username not found");
    }

    console.log(req.body);
});
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
