import { Field, ObjectType } from '@nestjs/graphql';
import { InvitationNode } from './invitation.model';
import { RoomNode } from 'src/room/models/room.model';

@ObjectType()
export class AcceptInvitationPayload {
  @Field(() => InvitationNode)
  invitation: InvitationNode;

  @Field(() => RoomNode)
  room: RoomNode;
}
