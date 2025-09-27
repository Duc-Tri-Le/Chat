import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {
  Conversation,
  ConversationDocument,
  MessageDocument,
} from '../index.schema';
import { Model } from 'mongoose';
import { CreateConversationDto, GetConversationDto } from './conversation.dto';
import { GetMessageDto } from '../message/message.dto';
import { Message } from '../index.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  //tao cac cuoc hoi thoai
  CreateConversation(data: CreateConversationDto): Promise<GetConversationDto> {
    const conversation = new this.conversationModel(data);
    return conversation.save();
  }

  //lay tin cac cuoc hoi thoai
  GetAllConversation(): Promise<GetConversationDto[]> {
    return this.conversationModel.find().sort({ updatedAt: -1 }).lean().exec();
  }

  //lay thong tin chi tiet 1 cuoc hoi thoai\
  GetConversationId(id: string): Promise<GetMessageDto[]> {
    return this.messageModel
      .find({ conversationId: id })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  //xoa cuoc hoi thoai
  async DeleteConversation(id : string) : Promise<{success : boolean}> {
    const deleted = await this.messageModel.findByIdAndDelete(id);
    return { success: true };
  }
}
