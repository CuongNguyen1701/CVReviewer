import express from "express";
import session from "express-session";
import http from "http";
import passport from "passport";
import { router } from "./routes/routes.js";
// import keys from "./auth/key.js";
// import cookieSession from "cookie-session";
import "./auth/passport.js";
const app = express();
const port = process.env.PORT || 8000;

const server = http.createServer(app);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port} ...`);
});

process.on("SIGINT", () => {
  console.log("🤖 Server closed");
});
