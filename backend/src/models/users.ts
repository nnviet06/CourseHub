import { DataTypes, Sequelize } from "sequelize";
import { User } from '../types/userTypes'

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
