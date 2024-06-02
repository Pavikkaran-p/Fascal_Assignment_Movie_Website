import express from "express";
import { movieById } from "../controllers/movieController.js";

const router=express.Router();

router.get('/movie',movieById);

export default router;