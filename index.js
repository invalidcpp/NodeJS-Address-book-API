const express = require('express');
const serverless = require("serverless-http");
const cors = require('cors');
const app = express();

const pool = require("./Helpers/SQLConnection");
const addressBook = require("./API/addressBook");


app.use(cors()); // use CORS middleware

app.engine('html', require('ejs').renderFile); // use EJS as engine
app.use(express.static('public')) // server public folder as static

app.use(express.json()); // allow json data
app.use("/API/addressBook", addressBook); // use addressBook router

// Create table if non existent
pool.query("CREATE TABLE IF NOT EXISTS Contacts (ID int NOT NULL AUTO_INCREMENT, Name varchar(255) NOT NULL, Company varchar(255) DEFAULT NULL, Address varchar(255) DEFAULT NULL, PhoneNumber varchar(22) NOT NULL, EmailAddress varchar(255) DEFAULT NULL, Notes varchar(500) DEFAULT NULL, PRIMARY KEY (ID));", function(err, result) {
    if (err) throw err;
});

// HOME PAGE
app.get('/', (req, res) => {
    res.status(200).render("./public/index.html");
})


// export serverless handler
module.exports.handler = serverless(app);