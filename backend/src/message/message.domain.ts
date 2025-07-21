export class MessageDomain {
  id: string;
  roomId: string;
  senderId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    roomId,
    senderId,
    body,
    createdAt,
    updatedAt,
  }: {
    id: string;
    roomId: string;
    senderId: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.roomId = roomId;
    this.senderId = senderId;
    this.body = body;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
