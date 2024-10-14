import {findAll, createReminder} from '../repository/reminders.dao.js';
import {createReminderAndSchedule, getClosestReminders} from '../services/reminders.service.js'

export const getAllRemindersApi = async (req, res) => {
    const result = await findAll();
    if (result) {
        return res.status(201).json({success: true, data: result});
    } else {
        return res.status(500).json({success: false, message:"Internal server error"});
    };
};

export const createReminderApi = async (req, res) => {
    //const reminder = await createReminder(req.body);
    const reminder = await createReminderAndSchedule(req.body);
    //console.log('inside reminder controller');
    //console.log(reminder);
    
    if (reminder) {
        return res.status(201).json({success: true, data: reminder});
    } else {
        return res.status(500).json({success: false, message:"Internal server error"});
    }
};

export const getClosestRemindersApi = async(req, res) => {
    const reminders = await getClosestReminders(req.body);
    return res.status(200).json({success: true, data: reminders});
}