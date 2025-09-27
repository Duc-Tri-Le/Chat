import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { User, UserDocument, UserSchema } from "../index.schema";

@Module(
    {
        imports : [MongooseModule.forFeature([{name : User.name, schema : UserSchema}])],
        providers : [AuthService],
        controllers : [AuthController],
        exports : [MongooseModule, AuthService]
    }
)

export class AuthModule{}
