import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../index.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export class CreateUserDto {
  @ApiProperty({ example: 'JohnDoe', description: 'Tên người dùng' })
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiProperty({ example: 'john@gmail.com', description: 'Email người dùng' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password_123', description: 'Mật khẩu' })
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other'], description: 'Giới tính' })
  @IsEnum(Gender)
  @IsOptional()
  gender: string;

  @ApiPropertyOptional({ example: '1990-01-01', description: 'Ngày sinh' })
  @IsOptional()
  birthDate: Date;

  @ApiPropertyOptional({ example: '0123456789', description: 'Số điện thoại' })
  @IsOptional()
  phoneNumber: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}
export class GetUserDto extends OmitType(User, ['password_hash', '_id']){}