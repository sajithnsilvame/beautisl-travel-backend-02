
import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';
import { StatusEnum } from '@/enums/status.enum';

export class Tour extends Model {
    public id! : number;
    public title! : string;
    public description! : string;
    public labels! : string;
    public itinerary! : string;
    public faq! : string;
    public metaKeywords! : string;
    public slug! : string;
    public duration! : string;
    public location! : string;
    public metaTitle! : string;
    public metaDescription! : string;
    public coverImage! : string;
    public featuredImage! : string;
    public status! : StatusEnum;
}

Tour.init({
    // Define your schema fields here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
}, {
    sequelize,
    tableName: 'tours', // Adjust the table name if needed
    timestamps: true,
});

export default Tour;
