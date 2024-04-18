import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.errors";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "../services/auth.service";


export class AuthController {
  constructor(
    public readonly authService: AuthService,
  ) { }

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  registerUser = async (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService.registerUser(registerDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(error, res))

  }
}