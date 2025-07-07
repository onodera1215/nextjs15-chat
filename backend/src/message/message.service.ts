import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchOptionInput } from './inputs/searchOption.input';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async findMessages(input: SearchOptionInput) {
    // ここでPrismaを使ってDBからメッセージを取得するロジックを実装
    return [];
  }
}
