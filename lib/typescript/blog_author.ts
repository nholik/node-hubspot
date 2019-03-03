import { RequestPromise } from 'request-promise'

declare class Author {
  get(options?: {}): RequestPromise

  getAll(options?: {}): RequestPromise

  getById(id: number): RequestPromise

  create(data: {}): RequestPromise

  update(id: number, data: {}): RequestPromise

  delete(id: number): RequestPromise

  search(query: {}): RequestPromise
}

export { Author }
