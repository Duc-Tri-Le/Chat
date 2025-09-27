import { PickType, OmitType } from "@nestjs/mapped-types";
import { Message } from "../index.schema";
import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateMessageDto {
  @IsMongoId({ message: 'senderId phải là một ObjectId hợp lệ' })
  @IsNotEmpty({ message: 'senderId là bắt buộc' })
  senderId: string | object;

  @IsMongoId({ message: 'conversationId phải là một ObjectId hợp lệ' })
  @IsNotEmpty({ message: 'conversationId là bắt buộc' })
  conversationId: string;

  @IsString({ message: 'content phải là chuỗi' })
  @IsNotEmpty({ message: 'content không được để trống' })
  content: string;

  @IsArray({ message: 'attachments phải là một mảng chuỗi' })
  @IsOptional()
  attachments?: string[];
}

export class UpdateMessageDto extends PickType(Message, ['content']){}
export class GetMessageDto extends OmitType(CreateMessageDto,['conversationId']){}