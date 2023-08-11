import { Router } from "express";
import { noteController} from "../controllers/note.controller";

const router = Router();

router.
    post("/create-note",
    noteController.createNote);

router.
    post("/update-note/:id",
    noteController.updateNote);

router.
    get("/get-notes",
    noteController.getNotes);

router.
    delete("/delete-note/:id",
    noteController.deleteNote);


export const notesRouter = router;