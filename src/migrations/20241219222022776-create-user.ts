import { QueryInterface, DataTypes } from 'sequelize';
import { Status, UserRole } from '../enums/Global.enums';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: UserRole.USER,
        references: {
          model: 'user_roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50], // Username length between 3 and 50 characters
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensure it's a valid email format
        },
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [10, 15], // Mobile number length between 10 and 15 characters
        },
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Status.ACTIVE, // Assuming 1 is for active status
        validate: {
          isIn: [[1, 0]], // Assuming 1 is active and 0 is inactive
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, 
    {
  charset: 'utf8mb4', // Character set
  collate: 'utf8mb4_general_ci', // Collation
  });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};
