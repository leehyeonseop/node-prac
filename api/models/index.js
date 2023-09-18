const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;

const basename = path.basename(__filename); // index.js
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  })

// initiate 를 전부 하고 나서 associate를 해야하기 때문에 위에서 하지 않고, 아래에서 진행

Object.keys(db).forEach(modelName => {

  console.log(db, modelName);

  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})


module.exports = db;