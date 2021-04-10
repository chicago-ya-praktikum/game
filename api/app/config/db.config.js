module.exports = {
    HOST: "postgres",
    USER: "chicago",
    PASSWORD: "password",
    DB: "sokobandb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };