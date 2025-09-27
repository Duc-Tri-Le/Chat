import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Body,
  } from '@nestjs/common';
  import { MessageService } from './message.service';
  import { CreateMessageDto, UpdateMessageDto } from './message.dto';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
  } from '@nestjs/swagger';
  import { Message } from '../index.schema';
  
  @ApiTags('messages') // 📌 Nhóm API trong Swagger
  @Controller('messages')
  export class MessageController {
    constructor(private readonly message_service: MessageService) {}
  
    // ✅ 1. Gửi tin nhắn mới
    @Post()
    @ApiOperation({ summary: 'Gửi tin nhắn mới trong cuộc hội thoại' })
    @ApiBody({
      schema: {
        example: {
          senderId: '66dff4b91f17e9482f41b7f1',
          conversationId: '66e0a0b1f1f84c03d2a1a2d5',
          content: 'Xin chào, bạn khỏe không?',
          attachments: ['https://example.com/image.png'],
        },
      },
    })
    @ApiResponse({
      status: 201,
      description: 'Tin nhắn được gửi thành công',
      type: Message,
    })
    Create(@Body() dto: CreateMessageDto) {
      return this.message_service.SendMessage(dto);
    }
  
    // ✅ 2. Lấy danh sách tin nhắn của 1 cuộc hội thoại
    @Get(':conversationId')
    @ApiOperation({ summary: 'Lấy danh sách tin nhắn theo conversationId' })
    @ApiParam({
      name: 'conversationId',
      description: 'ID của cuộc hội thoại',
      example: '66e0a0b1f1f84c03d2a1a2d5',
    })
    @ApiResponse({
      status: 200,
      description: 'Danh sách tin nhắn',
      type: [Message],
    })
    GetAllMessages(@Param('conversationId') conversationId: string) {
      return this.message_service.GetMessage(conversationId);
    }
  
    // ✅ 3. Cập nhật nội dung tin nhắn
    @Patch(':id')
    @ApiOperation({ summary: 'Cập nhật nội dung của tin nhắn' })
    @ApiParam({
      name: 'id',
      description: 'ID của tin nhắn cần cập nhật',
      example: '66e0a0b1f1f84c03d2a1a2d9',
    })
    @ApiBody({
      schema: {
        example: {
          content: 'Nội dung tin nhắn đã được chỉnh sửa',
        },
      },
    })
    @ApiResponse({
      status: 200,
      description: 'Tin nhắn được cập nhật thành công',
    })
    UpdateMessage(@Param('id') id: string, @Body() dto: UpdateMessageDto) {
      return this.message_service.EditMessage(id, dto);
    }
  
    // ✅ 4. Xoá tin nhắn
    @Delete(':id')
    @ApiOperation({ summary: 'Xoá một tin nhắn theo ID' })
    @ApiParam({
      name: 'id',
      description: 'ID của tin nhắn cần xoá',
      example: '66e0a0b1f1f84c03d2a1a2d9',
    })
    @ApiResponse({ status: 200, description: 'Xoá tin nhắn thành công' })
    DeleteMessage(@Param('id') id: string) {
      return this.message_service.DeleteMessage(id);
    }
  }
  