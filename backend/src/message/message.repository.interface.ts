import { CreateMessageInput } from './inputs/create-message.input';
import { SearchOptionInput } from './inputs/search-option.input';
import { MessageDomain } from './message.domain';

export interface IMessageRepository {
  createMessage(createMessageInput: CreateMessageInput): Promise<MessageDomain>;
  getMessages(searchOptionInput: SearchOptionInput): Promise<MessageDomain[]>;
}
