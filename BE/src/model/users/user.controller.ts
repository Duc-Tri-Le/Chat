import {
  Controller,
  Get,
  Put,
  Param,
  Delete,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, GetUserDto } from './user.dto';

@ApiTags('users') //  nhóm các route dưới tag "users"
@Controller('users')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  // GET /users
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Trả về danh sách tất cả user',
    type: [GetUserDto],
  })
  findAll() {
    return this.user_service.findAll();
  }

  // GET /users/:id
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID của người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Trả về thông tin người dùng theo ID',
    type: GetUserDto,
  })
  findById(@Param('id') id: string) {
    return this.user_service.getById(id);
  }

  // PUT /users/:id
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: GetUserDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.user_service.update(id, dto);
  }

  // DELETE /users/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa người dùng theo ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  remove(@Param('id') id: string) {
    return this.user_service.remove(id);
  }
}
