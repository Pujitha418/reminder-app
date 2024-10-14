const DB_CONFIG = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "password",
    DB: "remindersdb",
    dialect: "mysql",
    pool: {
      max: 3,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

export default DB_CONFIG;