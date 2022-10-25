// modules/user.model.js
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: true, 
          // notNull: true, // won't allow null //not nned this as is email will make sure it is not null
        }
      },
      // username: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      //   unique: true
      // },
      hashedPassword: {
        type: Sequelize.STRING(64),
        // validate: {
        //   is: /^[0-9a-f]{64}$/i
        // }
      }
    });
  
    return User;
  };
  