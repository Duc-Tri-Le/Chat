import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, GetUserDto } from '../users/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth') // Nhóm API này vào mục "Auth" trong Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Đăng ký tài khoản
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' }) // Mô tả ngắn về API
  @ApiResponse({
    status: 201,
    description: 'Tạo tài khoản thành công',
    type: GetUserDto, // Kiểu dữ liệu trả về
  })
  @ApiResponse({ status: 409, description: 'Email hoặc số điện thoại đã tồn tại' })
  @ApiBody({ type: CreateUserDto }) // Kiểu dữ liệu body request
  async register(@Body() body: CreateUserDto) {
    return this.authService.Register(body);
  }

  // Đăng nhập tài khoản
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công',
    type: GetUserDto,
  })
  @ApiResponse({ status: 401, description: 'Sai mật khẩu' })
  @ApiResponse({ status: 409, description: 'Email không tồn tại' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'example@gmail.com' },
        password: { type: 'string', example: '123456' },
      },
    },
  })
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.Login(body.email, body.password);
  }
}
