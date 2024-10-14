import db from './db.connect.js'
import Reminder from '../models/reminder.model.js'
import ScheduleEvent from '../models/scheduleEvents.model.js'
import {createReminderAssociations} from '../models/associations.js'


export const initDb = () => {
    createReminderAssociations(Reminder, ScheduleEvent)
    db.sequelize.sync()
}


//module.exports = {Reminder, ScheduleEvent}
