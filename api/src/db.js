require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Read all the files from the Models folder, require them and add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inject the connection (sequelize) to all models
modelDefiners.forEach(model => model(sequelize));
// Change Model names to uppercase ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// In sequelize.models are all imported models as properties
// Do destructuring to relate them
const { Pokemon, Type } = sequelize.models;

// Here come the table relationships
// Product.hasMany(Reviews);
Pokemon.belongsToMany(Type, { through: 'Pokemon_type' });
Type.belongsToMany(Pokemon, { through: 'Pokemon_type' });

module.exports = {
  ...sequelize.models, // to be able to import the models: const { Product, User } = require('./db.js');
  conn: sequelize,     // to import the connection { conn } = require('./db.js');
};
