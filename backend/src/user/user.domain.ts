export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class UserDomain {
  id: string;
  email: string;
  name: string;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    email,
    name,
    status,
    createdAt,
    updatedAt,
  }: {
    id: string;
    email: string;
    name: string;
    status: UserStatusEnum;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isActive(): boolean {
    return this.status === UserStatusEnum.ACTIVE;
  }
}
