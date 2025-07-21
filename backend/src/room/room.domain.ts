export enum RoomStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export class RoomDomain {
  id: string;
  name: string;
  description: string;
  status: RoomStatusEnum;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    description,
    createdAt,
    status,
    updatedAt,
  }: {
    id: string;
    name: string;
    description: string;
    status: RoomStatusEnum;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isNameAlreadyExists(room: RoomDomain): boolean {
    return this.status === RoomStatusEnum.ACTIVE && this.name === room.name;
  }
}
