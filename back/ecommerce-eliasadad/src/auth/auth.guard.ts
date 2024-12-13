import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers['authorization']?.split(' ')[1];

        if (!token) throw new UnauthorizedException("Bearer token not found")

        try {
            const secret = process.env.JWT_SECRET
            const validPayload = this.jwtService.verify(token, { secret })
            validPayload.iat = new Date(validPayload.iat * 1000)
            validPayload.exp = new Date(validPayload.exp * 1000)
            request.user = validPayload;

            return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid token");
        }

    }

}