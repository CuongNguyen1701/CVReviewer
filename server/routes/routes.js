import express from "express";
const router = express.Router();
import passport from "passport";
import upload_process from "../services/getResult.js";
import isUserAuthenticated from "../middlewares/checkAuth.js";

const successLoginUrl = "http://127.0.0.1:5173/login/success";
const failureLoginUrl = "http://127.0.0.1:5173/login/error";

router.post("/upload", upload_process);

router.get("/", (req, res) => {
  res.send("Hello ?");
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "select_account consent",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: successLoginUrl,
    failureRedirect: failureLoginUrl,
  }),
  (req, res) => {
    res.send("LoggedIn");
  }
);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/current_user",
    failureRedirect: "/auth/facebook/failure",
  })
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
router.get("/api/current_user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
router.get("/auth/facebook/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
export { router };
