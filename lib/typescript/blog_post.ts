import { RequestPromise } from 'request-promise'

declare class BlogPost {
  get(opts?: {}): RequestPromise

  getById(id: number): RequestPromise

  create(data: {}): RequestPromise

  update(id: number, data: {}): RequestPromise

  delete(id: number): RequestPromise

  publish(id: number): RequestPromise

  unpublish(id: number): RequestPromise
}

export { BlogPost }
