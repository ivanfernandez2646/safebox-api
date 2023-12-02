import RequiredStringValueObject from '../../shared/domain/RequiredStringValueObject';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class SafeboxPassword extends RequiredStringValueObject {
  constructor(value: string) {
    super(value);
  }

  // To simplify design i'm going with sync bcrypts methods.
  // It would be better to use async methods in a real app
  hashPassword(plainPassword: string) {
    const saltRounds = 10,
      salt = genSaltSync(saltRounds),
      hashedPassword = hashSync(plainPassword, salt);

    return new SafeboxPassword(hashedPassword);
  }

  static isPasswordMatches(
    userEnteredPassword: SafeboxPassword,
    hashedPassword: SafeboxPassword,
  ): boolean {
    return compareSync(userEnteredPassword.value, hashedPassword.value);
  }
}
