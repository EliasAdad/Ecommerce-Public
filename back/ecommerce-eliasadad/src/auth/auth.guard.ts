import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

function validateRequest(req: Request) {

    const authorization = req.headers['authorization']
    if (!authorization) {
        throw new UnauthorizedException("Authorization header doesn't exist")
    }

    return authorization === 'Basic email:password'

}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest()

        return validateRequest(request)

    }

}