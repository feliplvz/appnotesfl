import { UserModel, User } from "../models/user.model";
import MongoDao from "./mongo.dao";

let instance: UserMongoDao;

export default class UserMongoDao extends MongoDao<User> {
  constructor() {
    super(UserModel);
  }
  static getInstance() {
    if (!instance) instance = new UserMongoDao();

    return instance;
  }
}

