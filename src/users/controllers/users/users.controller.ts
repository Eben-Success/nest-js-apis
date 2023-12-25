import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { createUserType } from './utils/CustomTypes';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';

@Controller('users')
export class UsersController {
    // inject service in controller
    constructor(private UsersService: UsersService){}

    @Get('fetch')
    @UseGuards(AuthGuard)
    getUsers(){
    return this.UsersService.fetchUsers();
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body(ValidateCreateUserPipe) userData: createUserType){
        return this.UsersService.createUser(userData);
    }

    @Get('user/:id')
    getUserById(@Param('id', ParseIntPipe) id: string){
        return this.UsersService.fetchUserById(parseInt(id))
    }
}
