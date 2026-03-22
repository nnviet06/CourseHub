import { Model } from 'sequelize'

export interface CourseAttributes {
  id: string,
  instructorId: string,
  title: string,
  createdAt?: Date;
  updatedAt?: Date;
}

export type CourseCreationAttributes = Omit<CourseAttributes, 'id' | 'createdAt' | 'updatedAt'>

export class Course
  extends Model<CourseAttributes, CourseCreationAttributes>
  implements CourseAttributes
{
  public id!: string;
  public instructorId!: string;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


