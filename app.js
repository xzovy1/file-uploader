require("dotenv").config();
const path = require("node:path");
const express = require("express");
const passport = require("./passport");

const session = require("express-session");

const app = express();

const usersRouter = require("./routes/usersRouter");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.messages = req.session.messages;
  next();
});
app.use("/user", usersRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Log in", partial: "partials/login" });
});

app.use((req, res) => {
  res
    .status(404)
    .render("error", { error: `${req.url}`, code: res.statusCode });
});

app.listen(3000, () => console.log("app listening: http://localhost:3000"));
