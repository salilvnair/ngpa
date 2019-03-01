export interface INgpaReadRespository<T> {
  find(entity: T): Promise<T[]>;
  selectAll(entity: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
}
