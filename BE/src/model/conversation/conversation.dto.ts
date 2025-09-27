import { IsString, IsArray, IsNotEmpty, IsOptional } from "class-validator";
export class CreateConversationDto {
    @IsNotEmpty()
    @IsString()
    conversation_name : string

    @IsNotEmpty()
    @IsArray()
    participants : []

    @IsOptional()
    @IsString()
    admin : string

    @IsString()
    @IsOptional()
    last_message : string
}

export class GetConversationDto extends CreateConversationDto{};