const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');  // Import bcrypt for hashing passwords
const sequelize = require('../config/Config');

// Define the User model
const User = sequelize.define('CustomUsers', {  // CustomUsers is the new table name
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  }
}, {
  tableName: 'CustomUsers',
  timestamps: true,
});

// Hash the password before saving the user to the database
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Add an instance method to compare passwords
User.prototype.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare entered password with hashed password
};

module.exports = User;
