import { RequestPromise } from 'request-promise'
import { Author } from './blog_author'
import { Comment } from './blog_comment'
import { BlogPost } from './blog_post'

declare class Blog {
  get(opts?: {}): RequestPromise

  getById(id: number): RequestPromise

  authors: Author

  comments: Comment

  posts: BlogPost
}

export { Blog }
