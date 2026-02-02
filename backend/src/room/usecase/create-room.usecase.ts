import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RoomNode } from '../models/room.model';
import { CreateRoomInput } from '../models/room.input';
import { IRoomRepository } from '../room.repository.interface';

@Injectable()
export class CreateRoomUsecase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(input: CreateRoomInput): Promise<RoomNode> {
    const isRoomExists = await this.roomRepository.isNameAlreadyExists(
      input.name,
    );
    if (isRoomExists) {
      throw new BadRequestException('このルーム名は使用できません');
    }
    return await this.roomRepository.createRoom(input);
  }
}
