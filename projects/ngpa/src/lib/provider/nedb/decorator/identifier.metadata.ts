import "reflect-metadata";
export const ID_PROPERTY_DECORATOR_KEY = "Id";
export class Test {
  SEQ_TABLE_NAME: string;
}
export const Id = (options: Test): PropertyDecorator => {
  return (target, property) => {
    var classConstructor = target.constructor;
    const metadata = Reflect.getMetadata(ID_PROPERTY_DECORATOR_KEY, classConstructor) || {};
    metadata[property] = options;
    Reflect.defineMetadata(ID_PROPERTY_DECORATOR_KEY, metadata, classConstructor);
  };
};
