import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RoomNode } from '../models/room.model';
import { CreateRoomInput } from '../models/room.input';
import { IRoomRepository } from '../room.repository.interface';
import { JwtPayload } from 'src/types';
import { RoomStatusEnum } from '../room.domain';
import { CreateRoomDto } from '../dto/create-room.dto';

@Injectable()
export class CreateRoomUsecase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(createRoomDto: CreateRoomDto): Promise<RoomNode> {
    const isRoomExists = await this.roomRepository.isNameAlreadyExists(
      createRoomDto.name,
    );
    if (isRoomExists) {
      throw new BadRequestException('このルーム名は使用できません');
    }
    return await this.roomRepository.createRoom({
      ...createRoomDto,
      status: RoomStatusEnum.ACTIVE,
    });
  }
}
