import ScheduleEvents from '../models/scheduleEvents.model.js'
import db from '../config/db.connect.js'

export const createScheduleEvent = async (req) => {
    try {
        const invoke_time = req.invokeTime;
        const reminder_id = req.reminderId;
        console.log('inside createScheduleEvent');
        console.log(req, invoke_time, reminder_id);
        
        const event = await ScheduleEvents.create({
            invoke_time,
            reminder_id
          });
        return event;  
    } catch (error) {
        console.error(`Failed to create reminder ${error}`);
        return null;
    }
};

export const deleteSchedulerEvent = async(req) => {
    try {
        const {id, reminder_id} = req;
        await ScheduleEvents.delete({
            id,
            reminder_id,
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getAllRemindersBetweenTimeRange  = async (req) => {
    try {
        const {from_time, to_time} = req;
        console.log('getAllRemindersBetweenTimeRange params-', from_time, to_time);
        
        const query = `select r.name, s.* from reminders r, schedule_events s where r.id = s.reminder_id and s.invoke_time between ${from_time} and ${to_time}`;
        return await db.sequelize.query(query, {
            type: db.sequelize.QueryTypes.SELECT,
            model: ScheduleEvents,
            mapToModel: true,
            raw: true,
          });
    } catch (error) {
        console.error(`Failed to fetch reminders. Err# ${error}`);
        return null;
    }
};