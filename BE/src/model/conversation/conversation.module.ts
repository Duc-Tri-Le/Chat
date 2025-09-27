import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ConversationDocument,
  Conversation,
  ConversationSchema,
} from '../index.schema';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { MessageModule } from '../message/message.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    MessageModule,
  ],
  providers: [ConversationService],
  controllers: [ConversationController],
  exports: [MongooseModule, ConversationService],
})
export class ConversationModule {}
