import db from '../config/db.connect.js'
import {DataTypes} from 'sequelize'

const Reminder = db.sequelize.define('Reminder', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(140), // Limiting to 140 characters
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // Can be HTML or plain text
      allowNull: true,
    },
    original_day_time: {
      type: DataTypes.BIGINT, // Storing epoch time
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('inprogress', 'completed'),
      defaultValue: 'inprogress',
    },
    repeatFrequency: {
      type: DataTypes.ENUM('Daily', 'Weekly', 'Yearly'), // Can be used to store frequencies like 'daily', 'weekly', etc.
      allowNull: true,
    },
  }, {
    tableName: 'reminders', // Optional: Define custom table name
    timestamps: true, // Adds createdAt and updatedAt fields
  });
  
// Sync the model (creates table if it doesn't exist)
//await Reminder.sync();
/*Reminder.sync()
    .then(() => console.log('Reminder table created successfully.'))
    .catch((error) => console.log('Error creating Reminder table:', error));
    */
  
export default Reminder;