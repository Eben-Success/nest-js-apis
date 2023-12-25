import { Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { createUserType } from 'src/users/controllers/users/utils/CustomTypes';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, username: "John", email: "john@example.com" },
        { id: 2, username: "Jane", email: "jane@example.com" },
        { id: 3, username: "Mike", email: "mike@example.com" },
        { id: 4, username: "Kate", email: "kate@example.com"},
        { id: 5, username: "Alex", email: "alex@example.com"}
    ];
    fetchUsers(){
        return this.users;
        }

    createUser(userData: createUserType){
        const id = this.users.length + 1;
        userData.id = id;
        this.users.push(userData);
        return {msg: "User created successfully", data: userData};
    }

    fetchUserById(id: number){
        if (!id){
            return HttpErrorByCode[404]
        }
      
        if (id > this.users.length || id < 1) {
            // throw user not found error
            throw HttpErrorByCode[404]
        }

        return this.users.find(user => user.id === id)
    }
}
