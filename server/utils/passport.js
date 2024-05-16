import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const passportSetup = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Use connect-mongo for session store
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      }, (acessToken, refreshToken, profile, callback) => {
        callback(null, profile)
      }
    ))

  passport.serializeUser((user, done) => {
    
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
   
    done(null, user);
  });
};

export default passportSetup;
