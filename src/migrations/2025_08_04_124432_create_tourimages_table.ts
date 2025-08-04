
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('tour_images', {
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
      img_url: {
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
      charset: 'utf8mb4', 
      collate: 'utf8mb4_general_ci', 
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('tour_images');
  },
};
