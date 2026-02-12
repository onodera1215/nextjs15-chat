import { Field, ObjectType } from '@nestjs/graphql';
import { InvitationNode } from './invitation.model';

@ObjectType()
export class CreateInvitationPayload {
  @Field(() => InvitationNode)
  invitation: InvitationNode;
}
