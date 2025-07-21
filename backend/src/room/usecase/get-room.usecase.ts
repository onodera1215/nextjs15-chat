import { Inject, Injectable } from '@nestjs/common';
import { IRoomRepository } from '../room.repository.interface';
import { RoomNode } from '../gql-model/room.model';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class GetRoomUsecase {
  constructor(
    @Inject('IRoomRepository')
    private readonly roomRepository: IRoomRepository,

    private readonly loggerService: LoggerService,
  ) {}

  async execute(roomId: string): Promise<RoomNode | null> {
    // debug ログ出力
    this.loggerService.debug(`Getting room with id: ${roomId}`);
    return await this.roomRepository.findById(roomId);
  }
}
