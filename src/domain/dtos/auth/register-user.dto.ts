import { CedulaValidator } from "../../../config/cedula-validator";
import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {

  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly cedula: string,
    public readonly uid: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, cedula, uid } = object;

    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password too short'];

    const [isValidCedula, cedulaMessage] = CedulaValidator.validate(cedula);
    if (!isValidCedula) { return [cedulaMessage] }

    return [undefined, new RegisterUserDto(name, email, password, cedula, uid)];
  }

}
