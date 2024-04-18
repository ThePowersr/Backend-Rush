import { NextFunction, Request, Response } from "express";
import { FirebaseAdmin } from "../../config/firebase/firebase.adapter";
import { CustomError } from "../../domain/errors/custom.errors";
// import firebase from "firebase-admin";

const firebase = new FirebaseAdmin();
const auth = firebase;


export class AuthMiddleware {

  constructor() { }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization;

    if (!headerToken) return res.status(401).json({ error: 'No token provided' });

    if (!headerToken.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });


    try {
      const token = headerToken.split(' ').at(1) || '';
      auth.verifyToken(token)
        .then(user => res.status(201).json(user))
        .catch(error => res.status(401).json(`${error}`));
    } catch (error) {
      return CustomError.badRequest(`${error}`);
    }

  }

}