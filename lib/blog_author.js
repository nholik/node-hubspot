class Author {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/blogs/v3/blog-authors',
      qs: options,
    })
  }

  getAll(options) {
    return this.get(options)
  }

  getById(id) {
    return this.client._request({
      method: 'GET',
      path: '/blogs/v3/blog-authors/' + id,
    })
  }

  create(data) {
    return this.client._request({
      method: 'POST',
      path: '/blogs/v3/blog-authors',
      body: data,
    })
  }

  update(id, data) {
    return this.client._request({
      method: 'PUT',
      path: '/blogs/v3/blog-authors/' + id,
      body: data,
    })
  }

  delete(id) {
    return this.client._request({
      method: 'DELETE',
      path: '/blogs/v3/blog-authors/' + id,
    })
  }

  search(query) {
    return this.client._request({
      method: 'GET',
      path: '/blogs/v3/blog-authors/search',
      qs: query,
    })
  }
}

module.exports = Author
