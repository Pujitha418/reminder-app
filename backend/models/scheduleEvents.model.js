import db from '../config/db.connect.js'
import {DataTypes} from 'sequelize'
import Reminder from './reminder.model.js'

const ScheduleEvent = db.sequelize.define('ScheduleEvent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invoke_time: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    reminder_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Reminder, // Reference the Reminder model
        key: 'id',       // Key in the Reminder model that this is related to
      },
      onDelete: 'CASCADE', // Optional: to specify what happens on deletion (CASCADE, SET NULL, etc.)
    },
  }, {
    tableName: 'schedule_events',
    timestamps: true,
  });


export default ScheduleEvent;