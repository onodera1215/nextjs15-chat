import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class MarkRoomReadInput {
  @Field(() => ID)
  roomId!: string;

  @Field(() => Date)
  lastReadAt!: Date;
}
