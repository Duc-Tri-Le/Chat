import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../index.schema';
import { NotFoundException } from '@nestjs/common';
import { GetUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() : Promise<GetUserDto[]>{
    return await this.userModel.find().exec();
  }

  async getById(id: string): Promise<GetUserDto> {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    const { _id, ...rest } = user;
    return rest;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true }).lean().exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`User with id ${id} not found`);
  }

}
