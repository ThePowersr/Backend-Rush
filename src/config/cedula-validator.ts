export class CedulaValidator {

  static validate(cedula: string): [boolean, string] {

    if (cedula.length !== 10) {
      return [false, 'Cedula length must be 10 digits'];
    }

    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];

    const province = parseInt(cedula.substring(0, 2), 10);
    if (province < 0 || province > 24) {
      return [false, 'Invalid province code'];
    }

    const thirdDigit = parseInt(cedula.charAt(2), 10);
    if (thirdDigit > 5) {
      return [false, 'Third digit must be less than or equal to 5'];
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(cedula.charAt(i), 10) * coefficients[i];
      sum += digit >= 10 ? digit - 9 : digit;
    }

    const verificationDigit = (sum % 10) === 0 ? 0 : 10 - (sum % 10);
    const expectedVerificationDigit = parseInt(cedula.charAt(9), 10);

    const isValid = verificationDigit === expectedVerificationDigit;
    const message = isValid ? 'Cedula is valid' : 'Invalid cedula';

    return [isValid, message];
  }
}
