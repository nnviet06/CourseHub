import { DataTypes, Model, Sequelize } from "sequelize";

export type Role = 'instructor' | 'learner';

export interface UserAttributes {
  id: uuid;
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
  public role!: Role;

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
        type: DataTypes.enum('instructor', 'learner'),
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
