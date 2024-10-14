import {createReminder} from '../repository/reminders.dao.js'
import {createNextEventForReminder, getNextReminders} from './scheduleEvents.service.js'

export const createReminderAndSchedule = async (req) => {
    try {
        const reminder = await createReminder(req);
        if (!reminder) {
            return;
        }
        await createNextEventForReminder(reminder.dataValues);
        console.log('inside createReminderAndSchedule');
        console.log(reminder.dataValues);
        
        return reminder.dataValues;
    } catch (error) {
        console.error(`Reminder service - Failed to insert reminder. Err ${error}`);
    }
};

export const getClosestReminders = async(req) => {
    try {
        const reminderId = req.reminderId;
        const timeInMinutes = req.timeInMinutes;
        const reminders = await getNextReminders({timeInMinutes, reminderId});
        return reminders;
    } catch (error) {
        console.error(`Error while fetching closest reminders ${error}`);
        return null;
    }
}