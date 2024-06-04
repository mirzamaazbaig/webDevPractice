import express from "express";

const app = express();
const port = 3000;
let currentUser = null;
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

const authenticateUser = (username, password) => {
    const user = usersList.find(u => u.username === username);
    if (user && user.password === password) {
        currentUser = user; // Set global currentUser
        return true;
    }
    return false;
};

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/userinfo', (req, res) => {
    if (currentUser) {
        res.render('userinfo.ejs', { user: currentUser }); // Pass currentUser as user to EJS
    } else {
        res.send("You need to login");
    }
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (authenticateUser(username, password)) {
        res.render('dashboard.ejs'); // Pass currentUser as user to EJS
    } else {
        res.send("Invalid username or password");
    }

});
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
