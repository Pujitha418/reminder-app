import db from '../config/db.connect.js'
import Reminder from '../models/reminder.model.js'

export const findAll = async () => {
    return await db.sequelize.query("SELECT * FROM `reminders`", {
        type: db.sequelize.QueryTypes.SELECT,
        model: Reminder,
        mapToModel: true,
        raw: true,
      });
};

export const findReminderById = async (id) => {
    return await db.sequelize.query(`SELECT * FROM reminders where id=${id}`, {
        type: db.sequelize.QueryTypes.SELECT,
        model: Reminder,
        mapToModel: true,
        raw: true,
      });
};

export const createReminder = async (req) => {
    try {
        const { name, description, original_day_time, repeatFrequency } = req;
        const reminder = await Reminder.create({
            name,
            description,
            original_day_time,
            repeatFrequency,
          });
        return reminder;  
    } catch (error) {
        console.error(`Failed to create reminder ${error}`);
        return null;
    }
    
}