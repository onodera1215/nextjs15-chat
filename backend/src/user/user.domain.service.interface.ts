export interface IUserDomainService {
  isActiveUser(email: string): Promise<boolean>;
}
