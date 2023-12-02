/* eslint-disable @typescript-eslint/ban-types */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DOMAIN_EXCEPTIONS_MAPPING } from './domain-exceptions.mapping';

function getCustomMappedHttpStatus(clazz: Function): number {
  return (
    DOMAIN_EXCEPTIONS_MAPPING.find((ex) => clazz instanceof ex.clazz)
      ?.httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR
  );
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : getCustomMappedHttpStatus(exception as Function);

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.toString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
