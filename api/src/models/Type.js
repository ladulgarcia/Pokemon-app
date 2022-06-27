const { DataTypes } = require('sequelize');
// Export a function that defines the model
// Then inject the connection to sequelize.
module.exports = (sequelize) => {
  // Define the model
  sequelize.define('type', {
      //The ID remains as autoincremental number
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true
      },
    },
    {
        timestamps: false,
    }
    );
  };

