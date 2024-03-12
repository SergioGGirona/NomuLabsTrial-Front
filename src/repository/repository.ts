import { Payload } from '../types/payload';

export interface Repository<D extends { id: string | number }> {
  getAll(): Promise<D[]>;
  getById(id: D['id']): Promise<D>;
  create?(item: FormData, token: string, id?: string): Promise<D>;
  update(id: D['id'], newData: Partial<D>, token: string): Promise<D>;
  login?(newData: Partial<D>): Promise<Payload>;
  delete(id: D['id'], token: string): Promise<void>;
}
