const Author = require('./blog_author')
const Comment = require('./blog_comment')
const BlogPost = require('./blog_post')

class Blog {
  constructor(client) {
    this.client = client
    this.authors = new Author(this.client)
    this.comments = new Comment(this.client)
    this.posts = new BlogPost(this.client)
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/content/api/v2/blogs',
      qs: options,
    })
  }

  getById(id) {
    return this.client._request({
      method: 'GET',
      path: ' /content/api/v2/blogs/' + id,
    })
  }
}

module.exports = Blog
