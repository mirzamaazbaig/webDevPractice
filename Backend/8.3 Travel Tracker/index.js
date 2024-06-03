import bodyParser from "body-parser";
import express from "express";
import pg from 'pg';
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "maaz12345",
  port: 5433,
})
db.connect();

async function visitedCountry() {
  let visitedCountryList = [];
  const result = await db.query('SELECT country_code FROM visited_countries');
  visitedCountryList = result.rows.map(m => m.country_code);
  return visitedCountryList
}

app.post('/add', async (req, res) => {
  const userInput = req.body.country;
  console.log(userInput)
  try {
    console.log('in try block')
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [userInput.toLowerCase()]);
    const country_code = result.rows[0].country_code
    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [country_code]);
      res.redirect('/');
    } catch (error) {
      const countries = await visitedCountry();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (error) {
    const countries = await visitedCountry();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }

})

app.get("/", async (req, res) => {
  const visitedCountryList = await visitedCountry();
  res.render("index.ejs", { countries: visitedCountryList, total: visitedCountryList.length });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
