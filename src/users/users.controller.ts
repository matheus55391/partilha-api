import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  // @Post()
  // @ApiOperation({ summary: 'Create a new user' })
  // @ApiBody({ type: CreateUserDto })
  // @ApiResponse({
  //   status: 201,
  //   description: 'User created successfully',
  //   type: User,
  // })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  // @Get()
  // @ApiOperation({ summary: 'Get all users' })
  // @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  // findAll() {
  //   return this.usersService.findAll();
  // }
  // @Get(':id')
  // @ApiOperation({ summary: 'Get a user by ID' })
  // @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  // @ApiResponse({ status: 200, description: 'User found', type: User })
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }
  // @Patch(':id')
  // @ApiOperation({ summary: 'Update a user by ID' })
  // @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  // @ApiBody({ type: UpdateUserDto })
  // @ApiResponse({ status: 200, description: 'User updated', type: User })
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a user by ID' })
  // @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  // @ApiResponse({ status: 204, description: 'User deleted' })
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
