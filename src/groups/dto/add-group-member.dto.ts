import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddGroupMemberDto {
  @ApiProperty({
    description: 'ID do usuário a ser adicionado ao grupo',
    example: 'c1a2b3d4-e5f6-7890-abcd-1234567890ef',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
