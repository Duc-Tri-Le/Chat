import {
  Controller,
  Patch,
  Post,
  Get,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ConversationService } from '../conversation/conversation.service';
import { CreateConversationDto } from './conversation.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Conversations') // 👈 Nhóm API trong Swagger UI
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversation_service: ConversationService) {}

  // ✅ 1. Tạo cuộc hội thoại mới
  @Post()
  @ApiOperation({ summary: 'Tạo cuộc hội thoại mới' })
  @ApiBody({
    schema: {
      example: {
        conversation_name: 'Nhóm bạn thân cấp 3',
        participants: ['66dff4b91f17e9482f41b7f1', '66dff4b91f17e9482f41b7f2'],
        admin: '66dff4b91f17e9482f41b7f1',
        last_message: 'Chào mọi người nhé!',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo thành công cuộc hội thoại',
  })
  async Create(@Body() dto: CreateConversationDto) {
    return this.conversation_service.CreateConversation(dto);
  }

  // ✅ 2. Lấy tất cả cuộc hội thoại
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả cuộc hội thoại' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách tất cả các cuộc hội thoại',
  })
  async getAll() {
    return this.conversation_service.GetAllConversation();
  }

  // ✅ 3. Lấy chi tiết 1 cuộc hội thoại + danh sách tin nhắn
  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết cuộc hội thoại theo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID của cuộc hội thoại',
    example: '66dff4b91f17e9482f41b7f1',
  })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết cuộc hội thoại và danh sách tin nhắn',
  })
  async getById(@Param('id') id: string) {
    return this.conversation_service.GetConversationId(id);
  }

  // ✅ 4. Xoá cuộc hội thoại
  @Delete(':id')
  @ApiOperation({ summary: 'Xoá cuộc hội thoại theo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID của cuộc hội thoại cần xoá',
    example: '66dff4b91f17e9482f41b7f1',
  })
  @ApiResponse({
    status: 200,
    description: 'Xoá cuộc hội thoại thành công',
  })
  async delete(@Param('id') id: string) {
    return this.conversation_service.DeleteConversation(id);
  }
}
