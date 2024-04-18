import { FirebaseAdmin } from '../../config/firebase/firebase.adapter';
import prisma from '../../data/database';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { CustomError } from '../../domain/errors/custom.errors';

const firebase = new FirebaseAdmin();
const auth = firebase;


export class AuthService {

  public async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password, cedula } = registerUserDto;
    try {
      const user = await auth.createUser(email, password, name);
      const userSave = await prisma.user.create({
        data: {
          name,
          email,
          email_validated: user.emailVerified,
          cedula,
          uid: user.uid,
        }
      })
      return userSave;
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        throw new CustomError(400, 'El correo electrónico ya está registrado');
      }
      console.log(error);
      throw new CustomError(500, 'Error interno del servidor');

    }
  }
} 