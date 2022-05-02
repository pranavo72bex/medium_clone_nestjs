import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
    async createUser(createDto: CreateUserDto): Promise<any> {
        return await createDto;
    }
}