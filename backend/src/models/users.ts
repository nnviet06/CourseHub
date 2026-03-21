import { DataTypes, Model, Sequelize, Optional } from "sequelize";

export type Role = "instructor" | "learner";

export interface UserAttributes {
  id: string;
  username: string;
  passwordHash: string;
  role: Role;
  createdAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "createdAt">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
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
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.ENUM("instructor", "learner"),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: true,
      updatedAt: true,
      underscored: true,
    },
  );

  return User;
};
