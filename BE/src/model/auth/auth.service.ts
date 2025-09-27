import { CreateUserDto, GetUserDto } from '../users/user.dto';
import { UserDocument, User } from '../index.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { CreateToken } from 'src/common/providers/create.token';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly user_model: Model<UserDocument>,
  ) {}

  async Register(
    user: CreateUserDto,
  ): Promise<{ user: GetUserDto; token: string }> {
    //Email or phone exist check
    const user_exist = await this.user_model
      .findOne({
        $or: [{ email: user.email }, { phoneNumber: user.phoneNumber }],
      })
      .exec();
    if (user_exist) {
      throw new ConflictException('Email or Phone already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);

    // Tạo tài khoản mới
    const newUser = new this.user_model({
      ...user,
      password_hash: passwordHash,
    });
    const savedUser = await newUser.save();
    const token = CreateToken(savedUser.user_name, savedUser.id.toString());
    const { _id, password_hash, __v, ...rest } = savedUser.toObject();
    return { user: rest as GetUserDto, token };
  }

  async Login(
    email: string,
    password: string,
  ): Promise<{ user: GetUserDto; token: string }> {
    const user = await this.user_model.findOne({ email: email }).exec();
    if (!user) {
      throw new ConflictException('Email error');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = CreateToken(user.user_name, user.id.toString());
    const { _id, password_hash, __v, ...rest } = user.toObject();
    return { user: rest as GetUserDto, token };
  }
}
