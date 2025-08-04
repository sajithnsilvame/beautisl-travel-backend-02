
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('tours', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      labels: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      itinerary: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      faq: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      metaKeywords: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      slug: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      duration: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      location: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      metaTitle: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      metaDescription: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      coverImage: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      featuredImage: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      status: {
          type: DataTypes.ENUM('active', 'inactive', 'draft', 'deleted', 'popular', 'unpopular'),
          allowNull: false,
          defaultValue: 'active',
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
    await queryInterface.dropTable('tours');
  },
};
