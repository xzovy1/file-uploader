require("dotenv").config();
const path = require("node:path");
const express = require("express");
const passport = require("./passport");

const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./prisma/client");

const app = express();

const router = require("./routes/router");
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
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdFunction: undefined,
      dbRecordIdIsSessionId: true,
    }),
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/user", router);
app.get("/", (req, res) => {
  res.render("index", { title: "Log in", partial: "partials/login" });
});

app.post("/login/password", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      const message = "No user found or credentials incorrect";
      console.log("No user found or credentials incorrect");
      return res.render("index", {
        title: "Log in",
        partial: "partials/login",
        error: message,
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect(`/user/${user.id}`);
    });
  })(req, res, next);
});

app.get("/log-out", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  let statusCode = 404;
  let message = "Not found";
  switch (err.code) {
    case "P2002":
      message = "Username already taken";
      statusCode = 400;
  }
  res.status(statusCode).render("index", {
    title: "ERROR",
    partial: "partials/error",
    error: err,
    code: res.statusCode,
    message: message,
    link: req.url,
  });
  next();
});

app.listen(3000, () => console.log("app listening: http://localhost:3000"));
