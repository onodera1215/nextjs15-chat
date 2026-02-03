import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RoomNode } from '../models/room.model';
import { CreateRoomInput } from '../models/room.input';
import { IRoomRepository } from '../room.repository.interface';
import { JwtPayload } from 'src/types';
import { RoomStatusEnum } from '../room.domain';

@Injectable()
export class CreateRoomUsecase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(input: CreateRoomInput, user: JwtPayload): Promise<RoomNode> {
    const isRoomExists = await this.roomRepository.isNameAlreadyExists(
      input.name,
    );
    if (isRoomExists) {
      throw new BadRequestException('このルーム名は使用できません');
    }
    const userId = user?.sub;
    if (!userId) {
      throw new BadRequestException('ユーザー情報が不正です');
    }
    return await this.roomRepository.createRoom({
      ...input,
      status: RoomStatusEnum.ACTIVE,
      createdByUserId: userId,
    });
  }
}
