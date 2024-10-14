import express from "express";
import { helloApi, pingApi } from "../controllers/health.controller.js";

const router = express.Router();

router.get('/', helloApi);
router.get('/ping', pingApi);

export default router;