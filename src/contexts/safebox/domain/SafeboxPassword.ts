import RequiredStringValueObject from '../../shared/domain/RequiredStringValueObject';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';

// Promisify bcrypt functions for easier use with async/await
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

export class SafeboxPassword extends RequiredStringValueObject {
  constructor(value: string) {
    super(value);
  }

  async hashPassword(plainPassword: string) {
    try {
      const saltRounds = 10;
      const salt = await genSalt(saltRounds);

      const hashedPassword = await hash(plainPassword, salt);
      return new SafeboxPassword(hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  static async isPasswordMatched(
    userEnteredPassword: SafeboxPassword,
    hashedPassword: SafeboxPassword,
  ): Promise<boolean> {
    console.log(userEnteredPassword, hashedPassword);
    try {
      const passwordMatched = await compare(
        userEnteredPassword.value,
        hashedPassword.value,
      );

      return passwordMatched;
    } catch (error) {
      throw error;
    }
  }
}
