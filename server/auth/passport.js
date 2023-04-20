import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import keys from "./key.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const domain = process.env.BACKEND_URL;
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: `${domain}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // const sessionToken = req.sessionID;
      // req.session.userProfile = profile;
      // req.session.sessionToken = sessionToken;
      if (profile.id) {
        const existingUser = await prisma.user.findUnique({
          where: {
            userId: profile.id,
          },
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        let photoUrl = profile.picture ? profile.picture : null;
        let newUser = await prisma.user.create({
          data: {
            userId: profile.id,
            email: profile.emails[0].value,
            name: profile.name.familyName + " " + profile.name.givenName,
            photo: photoUrl,
          },
        });
        return done(null, newUser);
      }
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: `${domain}/auth/facebook/callback`,
      passReqToCallback: true,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      if (profile.id) {
        const existingUser = await prisma.user.findUnique({
          where: {
            userId: profile.id,
          },
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        let newUser = await prisma.user.create({
          data: {
            userId: profile.id,
            email: profile.emails === undefined ? "" : profile.emails[0].value,
            name: profile.displayName,
            photo: profile.photos[0].value,
          },
        });
        done(null, newUser);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (id, done) => {
  let user = await prisma.user.findUnique({
    where: {
      userId: id,
    },
  });
  done(null, user);
});
