// Dependencies to install
const express = require('express');
// npm for Mongodb
const mongoose = require('mongoose');
// body-parser: used to parse incoming request bodies in a middleware
const bodyParser = require('body-parser');

const passport = require('passport');

const users = require('./routes/api/users');

const app = express();
const port = process.env.PORT || 3080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

if(process.env.NODE_ENV === "production") {
    app.use(express.static("sempiternal/build"));
}

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});