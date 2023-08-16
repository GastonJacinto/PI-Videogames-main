const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len:{
          args:[5,30],
          msg:"The name must be between 5 and 30 characters long."
        },
      }
    },
    
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:{
          args:[10,200],
          msg:"The description must be between 10 and 200 characters long."
        },
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    imagen:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    released:{
      type: DataTypes.STRING,
      allowNull: false
    },
    rating:{
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    onDB:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }

  },
  {
    timestamps:false
  });
};
