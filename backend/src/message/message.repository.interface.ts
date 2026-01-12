import { MessageDomain } from './message.domain';
import { CreateMessageInput } from './models/create-message.input';
import { SearchMessagesInput } from './models/search-messages.input';

export interface IMessageRepository {
  createMessage(createMessageInput: CreateMessageInput): Promise<MessageDomain>;
  getMessages(searchOptionInput: SearchMessagesInput): Promise<MessageDomain[]>;
}
