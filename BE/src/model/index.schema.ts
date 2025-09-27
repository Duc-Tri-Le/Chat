import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  user_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop({ enum: ['male', 'female', 'other'], default: 'other' })
  gender: string;

  @Prop()
  birthDate: Date;

  @Prop({ unique: true, sparse: true }) 
  phoneNumber: string;
}

@Schema({ timestamps: true })
export class Conversation extends Document {
  @Prop({ required: true })
  conversation_name: string;

  @Prop({ default: [], type: [{type :mongoose.Schema.Types.ObjectId, ref : 'User'}], })
  participants: [];

  @Prop({type : mongoose.Schema.Types.ObjectId, ref : 'User'})
  admin : string

  @Prop()
  last_message : string
}

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref : "User" })
  senderId: User;

  @Prop({ type : mongoose.Schema.Types.ObjectId, ref : "Conversation" })
  conversationId: Conversation;

  @Prop({ required: true })
  content: string;

  @Prop({type: [String], default: []})
  attachments: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
export const MessageSchema = SchemaFactory.createForClass(Message);

export type UserDocument = User & Document;
export type ConversationDocument = Conversation & Document;
export type MessageDocument = Message & Document;
