// app.post("/login/password", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       console.log(err);
//       return next(err);
//     }
//     if (!user) {
//       const message = "No user found or credentials incorrect";
//       console.log("No user found or credentials incorrect");
//       return res.render("index", {
//         title: "Log in",
//         partial: "partials/login",
//         error: message,
//       });
//     }
//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       return res.redirect(`/${user.id}`);
//     });
//   })(req, res, next);
// });

// app.get("/log-out", (req, res, next) => {
//   req.logOut((err) => {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// });

// app.use((err, req, res, next) => {
//   console.error(err);
//   let statusCode = 404;
//   let message = "Not found";
//   switch (err.code) {
//     case "P2002":
//       message = "Username already taken";
//       statusCode = 400;
//   }
//   res.status(statusCode).render("index", {
//     title: "ERROR",
//     partial: "partials/error",
//     error: err,
//     code: res.statusCode,
//     message: message,
//     link: req.url,
//   });
//   next();
// });
