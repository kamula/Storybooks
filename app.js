const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const connectDb = require("./config/db");
//load config
dotenv.config({ path: "./config/config.env" });

//load passport
require("./config/passport")(passport);

//connectDb()
//environment
const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
//Handlebars
app.engine("hbs", exphs({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
//sessions
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,

    })
);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//static
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index.js"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app running in ${process.env.NODE_ENV} mode on port ${port}`);
});