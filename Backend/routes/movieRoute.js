import express from "express";
import { movieBySearch } from "../controllers/movieController.js";

const router=express.Router();

router.get('/movie',movieBySearch);

export default router;