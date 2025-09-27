import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserModule } from './model/users/user.module';
import { AuthModule } from './model/auth/auth.module';
import { MessageModule } from './model/message/message.module';
import { ConversationModule } from './model/conversation/conversation.module';

const ListModule = [
  UserModule, AuthModule, MessageModule, ConversationModule
]
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri = config.get<string>('MONGO_DB');
        return {
          uri,
        };
      },
    }),
    ...ListModule
  ],
})
export class AppModule {}
