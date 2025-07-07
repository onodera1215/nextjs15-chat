import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchOptionInput } from './inputs/searchOption.input';
import { Message } from './models/message.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class MessageResolver {
  /**
   *
   * 一旦べたがきでDBとの疎通確認
   */

  constructor(private prisma: PrismaService) {}

  @Query(() => [Message])
  async messages(@Args('input') input: SearchOptionInput) {
    console.log('input: ', input);
    const users = await this.prisma.user.findMany();
    console.log('users: ', users);
    return [];
  }
}
