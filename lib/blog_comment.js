class Comment {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/comments/v3/comments',
      qs: options,
    })
  }

  getAll(options) {
    return this.get(options)
  }

  getById(id) {
    return this.client._request({
      method: 'GET',
      path: '/comments/v3/comments/' + id,
    })
  }

  create(data) {
    return this.client._request({
      method: 'POST',
      path: '/comments/v3/comments',
      body: data,
    })
  }

  delete(id) {
    return this.client._request({
      method: 'DELETE',
      path: '/comments/v3/comments/' + id,
    })
  }
}

module.exports = Comment
