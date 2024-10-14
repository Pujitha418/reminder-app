import {createScheduleEvent, getAllRemindersBetweenTimeRange} from '../repository/scheduleEvents.dao.js'
import { findReminderById } from '../repository/reminders.dao.js';

export const createNextEventForReminder = async (reminder) => {
    try {
        //if the time is in past, do nothing
        //if the time is future, create next schedule i.e. for original time 
        const currentEpoch = Date.now();
        console.log(currentEpoch, reminder);
        
        if (reminder.original_day_time <= currentEpoch) {
            return;
        } 
        const invokeTime = reminder.original_day_time;
        const reminderId = reminder.id;
        const savedEvent = await createScheduleEvent({invokeTime, reminderId});
        if (savedEvent) {
            console.log(`inserted event id ${savedEvent.id}`);
        }
        return;
    } catch (error) {
        console.error(`Failed to insert next event for the reminder ${reminder.id}`);
    }
};


export const getNextReminders = async (req) => {
    //from=currentTime, to=currentTIme + req.toTime
    const from_time = Date.now(); // Current time in milliseconds
    const toTimeEpochCounter = 60 * 1000 * req.timeInMinutes; // 1 minute = 60 seconds * 1000 milliseconds
    const to_time = from_time + toTimeEpochCounter;
    const reminder_id = req.reminderId;
    console.log(`Attempting to get events from ${from_time} to ${to_time} for reminder ${reminder_id}`);
    
    const events = await getAllRemindersBetweenTimeRange({from_time, to_time});
    insertNextReminder(events);
    return events;
};

const insertNextReminder = async (events) => {
    console.log(events);
    
    for (const event of events) {
        const reminder_id = event.reminder_id;
        const invoke_time = event.invoke_time;
        let reminder = await findReminderById(reminder_id);
        //console.log(reminder[0], reminder[0].reminder_id, reminder[0].repeatFrequency);
        
        if (!reminder | !reminder[0].repeatFrequency) {
            continue;
        } 
        reminder = reminder[0];
        const next_invoke_time = await getNextInvokeTime(reminder.repeatFrequency, reminder.original_day_time);
        const savedEvent = await createScheduleEvent({invokeTime: next_invoke_time, reminderId: reminder_id});
        console.log(`Inserted future event ${savedEvent}`);
    }
};

const getNextInvokeTime = async (repeatFrequency, original_day_time) => {
    console.log('getNextInvokeTime -', original_day_time);
    
    const epochTime = original_day_time; //epoch time (milliseconds)
    // Convert epoch time to Date object
    const currentDate = new Date(epochTime);

    // Extract hour, minute, and second
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    console.log(currentDate, hours, minutes, seconds);
    

    // Create a new Date object for the next day
    const nextDayDate = new Date(currentDate);
    if (repeatFrequency == 'Daily') {
        nextDayDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    if (repeatFrequency == 'Weekly') {
        nextDayDate.setDate(currentDate.getDate() + 7); // Move to the next week
    }
    if (repeatFrequency == 'Yearly') {
        nextDayDate.setFullYear(currentDate.getFullYear() + 1);
        nextDayDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    // Set the time to the extracted hour, minute, and second
    nextDayDate.setHours(hours);
    nextDayDate.setMinutes(minutes);
    nextDayDate.setSeconds(seconds);
    nextDayDate.setMilliseconds(0); // Optional: Reset milliseconds to 0

    // Convert the next day's date to epoch time (milliseconds since 1970)
    const nextDayEpoch = nextDayDate.getTime();
    return nextDayEpoch;
}

//TODO: Add background job to remove expired events
//TODO: Snooze Feature