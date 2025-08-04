
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('tour_prices', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tours',
          key: 'id'
        }
      },
      personCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
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
      charset: 'utf8mb4', 
      collate: 'utf8mb4_general_ci', 
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('tour_prices');
  },
};
