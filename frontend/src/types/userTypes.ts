export type Role = 'instructor' | 'learner'

export interface User {
  id: string;
  role: Role;
  username: string;
}
