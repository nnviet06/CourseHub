import { DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number;
  username: string;
  passwordHash: string;
  role: string;
  createdAt?: Date;
}

export class User
  extends Model<UserAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public passwordHash!: string;
  public role!: string;

  public readonly createdAt!: Date;
}

export const initUserModel = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password_hash",
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: true,
      underscored: true,
    },
  );

  return User;
};
