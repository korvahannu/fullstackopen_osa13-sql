const { DATABASE_URL } = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});


const connectToDatabase = async () => {

  try {
    await sequelize.authenticate();
    console.log('database connected');
  }
  catch (err) {
    console.log('connecting database failed');
    return process.exit(1);
  }

  return null;

}

module.exports = { connectToDatabase, sequelize }