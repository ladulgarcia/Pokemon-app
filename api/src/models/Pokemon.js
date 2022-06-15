const { DataTypes } = require('sequelize');
// Export a function that defines the model
// Then inject the connection to sequelize.
module.exports = (sequelize) => {
  // Define the model
  sequelize.define('pokemon', {
    id: { // ID (Pokemon Number) * : Cannot be an ID of an existing pokemon in the pokeapi API
      type: DataTypes.UUID, //generate a unique numeric identifier
      defaultValue: DataTypes.UUIDV4, //generate a unique identifier by default
      allowNull: false,
      primaryKey: true,
    },
    name: { // NAME *
      type: DataTypes.STRING,
      allowNull: false,
    },
    // optional values from life to weight --> INTEGER
    hp: { // LIFE (HP - Hit Points; All Pokémon start out with full HP at capture, but HP can be depleted during battle)
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: { // DEFENSE
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    strength: { // STRENGTH
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: { // SPEED
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: { //HEIGHT
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: { // WEIGHT
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  },
  );
};

