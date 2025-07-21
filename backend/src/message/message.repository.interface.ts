import { MessageDomain } from './message.domain';
import { CreateMessageInput } from './models/create-message.input';
import { SearchOptionInput } from './models/search-option.input';

export interface IMessageRepository {
  createMessage(createMessageInput: CreateMessageInput): Promise<MessageDomain>;
  getMessages(searchOptionInput: SearchOptionInput): Promise<MessageDomain[]>;
}
