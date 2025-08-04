
import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';
import Tour from './tour.model';

export class TourPrices extends Model {
    public id! : number;
    public tourId! : number;
    public personCount! : number;
    public price! : number;
    public createdAt! : Date;
    public updatedAt! : Date;
}

TourPrices.init({
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
    personCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'tour_prices', // Adjust the table name if needed
    timestamps: true,
});

TourPrices.belongsTo(Tour, { foreignKey: 'tourId' });
Tour.hasMany(TourPrices, { foreignKey: 'tourId' });

export default TourPrices;
