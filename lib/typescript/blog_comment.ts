import { RequestPromise } from 'request-promise'

declare class Comment {
  get(options?: {}): RequestPromise

  getAll(options?: {}): RequestPromise

  getById(id: number): RequestPromise

  create(data: {}): RequestPromise

  delete(id: number): RequestPromise
}

export { Comment }
