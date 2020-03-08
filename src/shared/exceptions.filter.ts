import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();


    const error = exception instanceof HttpException
      ? exception.getResponse() : {};

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let newResponse: any = {
      statusCode: status,
      method: request.method,
      timestamp: new Date().toISOString(),
      path: request.url
    }
    if (typeof error === 'string') {
      newResponse.error = error
    } else {
      newResponse = { ...newResponse, ...error }
    }

    response.status(status).json(newResponse);
  }
}