import { Model, DataTypes } from 'sequelize';
import sequelize from '@/config/database';
import Role from '@/models/role.model';

export class User extends Model {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public mobile?: string;
  public roleId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly Role?: Role;

  // Add any custom methods for the User model here if needed
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: 'Full name must be between 2 and 100 characters long.',
        },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_roles',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address.',
        },
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [10, 15],
          msg: 'Mobile number must be between 10 and 15 characters long.',
        },
        isValidMobile(value: string) {
          if (value && !/^\+?[\d\s\-\(\)]+$/.test(value)) {
            throw new Error('Mobile number format is invalid.');
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters long.',
        },
      },
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
    sequelize,
    tableName: 'users', // Adjust the table name if needed
    timestamps: true,
  }
);

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

export default User;
