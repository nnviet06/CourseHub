// Sequelize User model

import { UUID } from "node:crypto";
import { DataTypes, Model, Sequelize } from "sequelize";

export type Role = 'instructor' | 'learner';

export interface UserAttributes {
  id: string;
  username: UUID;
  email: string;
  passwordHash: string;
  role: string;
  createdAt?: Date;
}

export class User
  extends Model<UserAttributes>
  implements UserAttributes
{
<<<<<<< HEAD
  public id!: UUID;
  public username!: string;
  public email!:string;
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
      email: {
        type: DataTypes.STRING(50),
        unique: true

      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password_hash",
      },
      role: {
        type: DataTypes.ENUM('instructor', 'learner'),
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
