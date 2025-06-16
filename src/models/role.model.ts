import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Status } from '../enums/Global.enums';

export class Role extends Model {
  public id!: number;
  public role_name!: string;
  public description!: string;
  public status!: Status;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Status.ACTIVE,
      validate: {
        isIn: [[Status.ACTIVE, Status.INACTIVE]],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'user_roles',
    timestamps: true,
  }
);

export default Role;