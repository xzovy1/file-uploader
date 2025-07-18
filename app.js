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

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log("errored");
      return next(err);
    }
    req.app.locals.user = undefined;
    res.redirect("/login");
  });
});

const saveUserToApp = (req, res, next) => {
  if (req.user) {
    req.app.locals.user = req.user;
  }
  next();
};

app.get("/login", (req, res) => {
  if (req.app.locals.user) {
    return res.redirect("/");
  }
  res.render("index", { title: "Log in", partial: "partials/login" });
});

app.post(
  "/login",
  saveUserToApp,
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.use("/", router);

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
    link: "/",
  });
});

app.listen(3000, () =>
  console.log("app listening: http://localhost:3000/login")
);
