import { Router } from "express";
import { registerLoginRouter } from "./register-login";
import { notesRouter } from "./notes";

const router = Router();

router.use(registerLoginRouter);
router.use(notesRouter);

export default router;

