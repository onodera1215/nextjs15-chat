import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDomain } from './message.domain';
import { SearchMessagesInput } from './models/search-messages.input';

export interface SearchMessagesDto {
  messages: MessageDomain[];
  totalCount: number;
  hasNextPage: boolean;
}

export interface IMessageRepository {
  createMessage(createMessageDto: CreateMessageDto): Promise<MessageDomain>;
  searchMessages(
    searchOptionInput: SearchMessagesInput,
  ): Promise<SearchMessagesDto>;
  countUnreadMessages(
    roomId: string,
    userId: string,
    lastReadAt: Date,
  ): Promise<number>;
}
