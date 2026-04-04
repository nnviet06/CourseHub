import { DataTypes, Sequelize } from "sequelize";
import { Course } from "../types/courseTypes";

export const initCourseModel = (sequelize: Sequelize): typeof Course => {
  Course.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      instructorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
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
      tableName: "courses",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      underscored: false,
    }
  );

  return Course;
};
