import { NextFunction, Request, Response } from "express";


export function globalLogger(req: Request, res: Response, next: NextFunction) {

    const timestamp = new Date().toUTCString();

    console.log(`Route: ${req.url}, Method: ${req.method}, Time: ${timestamp}`);
    next();
}