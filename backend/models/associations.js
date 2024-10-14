
// associations.js
export const createReminderAssociations = (Reminder, ScheduleEvent) => {
    // A Reminder has many ScheduleEvents
    Reminder.hasMany(ScheduleEvent, {
      foreignKey: 'reminder_id',
      as: 'scheduleEvents',
      onDelete: 'CASCADE', // Optional: handle deletions
    });
  
    // A ScheduleEvent belongs to one Reminder
    ScheduleEvent.belongsTo(Reminder, {
      foreignKey: 'reminder_id',
      as: 'reminder',
    });
  };