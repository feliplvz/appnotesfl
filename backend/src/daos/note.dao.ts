import { NoteModel, UserNotes } from "../models/note.model";
import MongoDao from "./mongo.dao";

let instance: NoteMongoDao;

export default class NoteMongoDao extends MongoDao<UserNotes> {
  constructor() {
    super(NoteModel);
  }

  async deleteNote(username: string, noteId: string): Promise<boolean> {
    try {
      const userNotes = await this.getByFilter({ username });
      const updatedNotes = userNotes?.notes?.filter((note:any) => note._id != noteId);
      await this.update({ username }, { notes: updatedNotes });
      return true;

    } catch (err) {
      console.log("Error deleting note", err);
      return false;
    }
  }
  
  static getInstance() {
    if (!instance) instance = new NoteMongoDao();

    return instance;
  }
}