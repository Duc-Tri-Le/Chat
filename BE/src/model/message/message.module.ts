import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageService } from "./message.service";
import { MessageSchema, Message } from "../index.schema";
import { MessageController } from "./message.controller";

@Module({
    imports : [MongooseModule.forFeature([{name : Message.name, schema : MessageSchema}])],
    providers : [MessageService],
    controllers : [MessageController],
    exports : [MongooseModule, MessageService]
})

export class MessageModule{}