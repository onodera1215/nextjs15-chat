export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class UserDomain {
  id: string;
  oauthProvider: string;
  email: string;
  name: string;
  status: UserStatusEnum;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    oauthProvider,
    email,
    name,
    status,
    createdAt,
    updatedAt,
  }: {
    id: string;
    oauthProvider: string;
    email: string;
    name: string;
    status: UserStatusEnum;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.oauthProvider = oauthProvider;
    this.email = email;
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isActive(): boolean {
    return this.status === UserStatusEnum.ACTIVE;
  }

  isTheSameOauthProvider(oauthProvider: string): boolean {
    return this.oauthProvider === oauthProvider;
  }
}
