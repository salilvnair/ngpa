export interface INgpaWriteRespository<T> {
  save(entity: T): Promise<T>;
  update(oldEntity: T, newEntity: T): Promise<T>;
  delete(entity: T): Promise<number>;
  deleteById(id: string): Promise<number>;
  deleteAll(): Promise<number>;
}
