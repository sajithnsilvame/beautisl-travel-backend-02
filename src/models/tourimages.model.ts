
import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';
import Tour from './tour.model';

export class Tourimages extends Model {
    public id! : number;
    public tourId! : number;
    public img_url! : string;
    public createdAt! : Date;
    public updatedAt! : Date;
}

Tourimages.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
}, {
    sequelize,
    tableName: 'tour_images', // Adjust the table name if needed
    timestamps: true,
});

Tourimages.belongsTo(Tour, { foreignKey: 'tourId' });
Tour.hasMany(Tourimages, { foreignKey: 'tourId' });

export default Tourimages;
