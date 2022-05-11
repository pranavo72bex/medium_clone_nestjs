import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { ExpressRequest } from "../type/expressRequest.interfrace";
import { verify } from "jsonwebtoken";
import { UserService } from "../user.service";

export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }
    async use(req: ExpressRequest, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null
            next()
            return
        }
        const token = req.headers.authorization.split(' ')[1]
        try {
            // const decodeToken = jwt.verify(token, 'jwt_key');
            // const user = await this.userService.findUserById(decodeToken.);
            next()

        } catch (error) {
            req.user = null
            next()
        }
        next();
    }

}