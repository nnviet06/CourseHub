import { Model } from 'sequelize'

export type Role = "instructor" | "learner";

export interface UserAttributes {
  id: string;
  username: string;
  passwordHash: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Omit<UserAttributes, "id" | "createdAt" | "updatedAt">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public username!: string;
  public passwordHash!: string;
  public role!: Role;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


