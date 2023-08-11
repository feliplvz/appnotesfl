import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import UserMongoDao from "../daos/user.dao";
import NoteMongoDao from "../daos/note.dao";
import { sendUserMail } from "../services/nodemailer";

const userMongo = UserMongoDao.getInstance();
const NoteMongo = NoteMongoDao.getInstance();

export const hashPassword = (password:string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (plainPassword: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username:string, password:string, done:any) => {
    try {
        const user = await userMongo.getByFilter( {username} );

        if (!user || typeof user.password === 'undefined' || !validatePassword(password, user.password)) {
            return done("Invalid credentials", null);
        }

        return done(null, user);
    } catch (err) {
        return done("Error while login in", null);
    }
});

const registerStrategy = new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        try {
            const existingUser = await userMongo.getByFilter({ username });

            if (existingUser) {
                return done("Username already in use", false);
            }

            const newUser = {
                username,
                password: hashPassword(password),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
            };
            const createdUser = await userMongo.create(newUser);

            NoteMongo.create({username, notes: []});

            await sendUserMail(username, req.body.firstname, req.body.lastname, req.body.email, password);

            return done(null, createdUser);
        } catch (err) {
            return done("Error while register", false);
        }
    }
);

export const passportStrategies = { loginStrategy, registerStrategy };