import Sequelize from 'sequelize';

const SQL_database = new Sequelize('trackyoscore', 'root', '', { //set username and password for deployment
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    handleDisconnects: true,
  },
})

SQL_database
  .authenticate()
  .then(() => console.log('SQL DB connected!!'))
  .catch(err => console.error('SQL DB error: ', err));

export default SQL_database;