import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDomain } from './message.domain';
import { SearchMessagesInput } from './models/search-messages.input';

export interface IMessageRepository {
  createMessage(createMessageDto: CreateMessageDto): Promise<MessageDomain>;
  getMessages(searchOptionInput: SearchMessagesInput): Promise<MessageDomain[]>;
}
