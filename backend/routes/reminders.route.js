import express from "express";
import {createReminderApi, getAllRemindersApi, getClosestRemindersApi} from '../controllers/reminders.controller.js'

const router = express.Router();

router.post('/create', createReminderApi);
router.post('/get', getClosestRemindersApi);
router.get('/getAll', getAllRemindersApi);

export default router;