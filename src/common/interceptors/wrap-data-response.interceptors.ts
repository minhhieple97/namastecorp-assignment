import { plainToClass } from 'class-transformer';

function WrapData() {
  return function (_target, _key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const response = await originalMethod.apply(this, args);

      // Wrap the data in a JSON object with a "data" key
      const wrappedResponse = {
        data: response,
      };

      // Transform the wrapped response object to a plain JavaScript object
      const plainResponse = plainToClass(Object, wrappedResponse);

      // Return the wrapped response
      return plainResponse;
    };

    return descriptor;
  };
}
export default WrapData;
