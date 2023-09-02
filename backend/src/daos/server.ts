import express from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from "mongoose";
import { mongoURL, port, originURL, secretMongo } from './config/config';
import session from "express-session";
import passport from "passport";
import UserMongoDao from './daos/user.dao';
import { passportStrategies } from './lib/passport.lib';
import router from './routes/index';
import cors from 'cors';
import MongoStore from "connect-mongo";

const userMongo = UserMongoDao.getInstance();

const app = express();

app.set("trust proxy", 1)

app.use(cors({
    origin: originURL,
    credentials: true
  }));

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(
    session({
        secret: secretMongo,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            httpOnly:true,
            secure:true,
            sameSite:'none',
        },
        store: new MongoStore({
            mongoUrl: mongoURL,
            ttl: 24 * 60 * 60,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use("login", passportStrategies.loginStrategy);
passport.use("register", passportStrategies.registerStrategy);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id:any, done) => {
    const user = await userMongo.getById(id);
    done(null, user);
});

app.use(router);

mongoose.connect(mongoURL);
console.log("Database connected!");

const expressServer = app.listen(port, () => {
    console.log(`Server listening port ${port}`);
})

expressServer.on('error', (err:Error) => {
    console.log(err);
})

