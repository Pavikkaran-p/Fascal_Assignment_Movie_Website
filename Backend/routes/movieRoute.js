import express from "express";
import { movieById } from "../controllers/movieController.js";

const router=express.Router();

router.get('/byid',movieById);

export default router;