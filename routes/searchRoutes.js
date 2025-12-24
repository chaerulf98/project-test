import express from "express";
import { renderHome, searchPlace } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", renderHome);
router.post("/search", searchPlace);

export default router;
