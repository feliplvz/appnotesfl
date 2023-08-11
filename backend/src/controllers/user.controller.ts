import { Response, Request } from "express";
import { User } from "../models/user.model";
import UserMongoDao from "../daos/user.dao";
import { sendPasswordMail } from "../services/nodemailer";
import { hashPassword } from "../lib/passport.lib";
import { v4 as uuidv4 } from 'uuid';

const userMongo = UserMongoDao.getInstance();

const getLogin = (req: Request, res: Response) => {
    try {
        if (req.isAuthenticated()) {
            const user = req.user as User;  
            return res.json({
                user: user.username,
                name: user.firstname,
                lastname: user.lastname,
                email: user.email,
            });
        }
    } catch (err) {
        console.error(`error logging user: ${err}`);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const logout = (req: any, res: Response) => {
    try {
      req.logout((err:any) => {
				if(err){
					console.error(`Error logging out: ${err}`);
				}
				return res.status(200).json({ message: "Logged out successfully" });
			}); 
    } catch (err) {
      console.error(`Error logging out: ${err}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

const resetToken = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const token = uuidv4();
      const user = await userMongo.getByFilter({email});
      
      if (!user) {
        return res.status(404).json({ error: 'user not found.' });
      }
      await userMongo.update({ username:user.username }, { resetToken:token, 
        resetTokenExpiry: new Date(Date.now() + 3600000) });
      await sendPasswordMail(email, token)
      res.status(200).json({ message: 'Email sent successfully.' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  };

const resetPassword = async (req:Request, res:Response) => {
  const { token, newPassword } = req.body;

  try {
    const user = await userMongo.getByFilter({resetToken: token});
    
    if (!user) {
      return res.status(404).json({ error: 'Invalid token.' });
    }
    if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ error: 'The token has expired.' });
    }
    await userMongo.update({username:user.username}, { password: hashPassword(newPassword)} )
    return res.status(200).json({ message: 'Password reset successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reset password.' });
  }
}

export const userController = {
    getLogin,
    logout,
    resetToken,
    resetPassword,
};