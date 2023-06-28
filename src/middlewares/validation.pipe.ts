import { ValidationPipe as BaseValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';

export class ValidationPipe extends BaseValidationPipe {
  async transform(value, metadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await super.validate(object);

    if (errors.length) {
      // throw new ValidationError(errors);
    }

    return object;
  }
}
