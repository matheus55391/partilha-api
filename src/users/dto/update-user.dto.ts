import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
