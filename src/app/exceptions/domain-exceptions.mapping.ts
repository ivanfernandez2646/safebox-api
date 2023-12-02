/* eslint-disable @typescript-eslint/ban-types */
import { SafeboxNotFound } from '../../contexts/safebox/domain/SafeboxNotFound';
import { SafeboxNameNotMatch } from '../../contexts/safebox/domain/SafeboxNameNotMatch';
import { SafeboxPasswordNotMatch } from '../../contexts/safebox/domain/SafeboxPasswordNotMatch';
import { HttpStatus } from '@nestjs/common';

export const DOMAIN_EXCEPTIONS_MAPPING: {
  clazz: Function;
  httpStatus: number;
}[] = [
  {
    clazz: SafeboxNotFound,
    httpStatus: HttpStatus.NOT_FOUND,
  },
  {
    clazz: SafeboxNameNotMatch,
    httpStatus: HttpStatus.UNAUTHORIZED,
  },
  {
    clazz: SafeboxPasswordNotMatch,
    httpStatus: HttpStatus.UNAUTHORIZED,
  },
];
