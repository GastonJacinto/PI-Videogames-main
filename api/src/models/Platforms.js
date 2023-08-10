const { DataTypes } = require("sequelize")

module.exports = (sequelize)=>{
  sequelize.define("platforms",{
id:{
  type: DataTypes.INTEGER,
  allowNull: true,
  primaryKey: true,
  autoIncrement:true
},
name:{
  type: DataTypes.STRING,
  allowNull: false
}
  },
  {
    timestamps:false
  })
}