const { DataTypes } = require('sequelize');
// Export a function that defines the model
// Then inject the connection to sequelize.
module.exports = (sequelize) => {
  // Define the model
  sequelize.define('type', {
      //el id queda como numérico autoincremental
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
    {
        timestamps: false,
    }
    );
  };

  