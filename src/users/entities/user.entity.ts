import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class User {
  @ApiProperty({
    description: 'Unique identifier',
    example: 'ckl9xyz1230000abc',
  })
  id: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2025-08-30T17:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2025-08-30T17:00:00Z',
  })
  updatedAt: Date;
}
