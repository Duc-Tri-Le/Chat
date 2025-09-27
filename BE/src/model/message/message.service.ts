import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto, UpdateMessageDto } from './message.dto';
import { MessageDocument, Message } from '../index.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  //gui tin nhan
  SendMessage(message: CreateMessageDto): Promise<Message> {
    const newMessage = new this.messageModel(message);
    const savedMessage = newMessage.save();
    return savedMessage;
  }

  GetMessage(conversationId: string): Promise<Message[]> {
    return this.messageModel
      .find({ conversationId })
      .sort({ createdAt: 1 })
      .populate('senderId', 'user_name')
      .exec();
  }

  async EditMessage(
    id: string,
    updateData: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.messageModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();

    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async DeleteMessage(id: string): Promise<{success : boolean}> {
    const deleted = await this.messageModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Message not found');
    return {success : true}
  }
}
