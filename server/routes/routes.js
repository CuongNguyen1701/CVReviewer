import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
const router = express.Router();
import passport from "passport";
import upload_process from "../middlewares/multer.js";
import cors from "cors";
router.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

router.post("/upload", upload_process);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/", (req, res) => {
  res.send("Hello");
});
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    // Successful authentication, redirect to the main page with the user's profile information
    const userProfile = req.user;
    res.redirect(
      `${process.env.FRONTEND_URL}/?name=${userProfile.displayName}&email=${userProfile.email}`
    );
    // res.send(
    //   "<script>" + req.user.script + 'window.location.href="/login";</script>'
    // );
  }
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["public_profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/failure",
  }),
  (req, res) => {
    // Successful authentication, redirect to the main page with the user's profile information
    const userProfile = req.user;
    res.redirect(
      `${process.env.FRONTEND_URL}/?name=${userProfile.displayName}&email=${userProfile.emails[0].value}`
    );
  }
);
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.send("Logged out");
  });
});

router.get("/api/current_user", isLoggedIn, (req, res) => {
  res.send(req.user);
});

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
router.get("/auth/facebook/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

export { router };
