export type Role = "instructor" | "learner";

export interface UserAttributes {
  id: string;
  username: string;
  passwordHash: string;
  role: Role;
  createdAt?: Date;
}

export type UserCreationAttributes = Omit<UserAttributes, "id" | "createdAt">;

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


