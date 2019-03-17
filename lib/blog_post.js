class BlogPost {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/content/api/v2/blog-posts',
      qs: options,
    })
  }

  getAll(options) {
    return this.get(options)
  }

  getById(id) {
    return this.client._request({
      method: 'GET',
      path: '/content/api/v2/blog-posts/' + id,
    })
  }

  create(data) {
    return this.client._request({
      method: 'POST',
      path: '/content/api/v2/blog-posts',
      body: data,
    })
  }

  update(id, data) {
    return this.client._request({
      method: 'PUT',
      path: '/content/api/v2/blog-posts/' + id,
      body: data,
    })
  }

  delete(id) {
    return this.client._request({
      method: 'DELETE',
      path: '/content/api/v2/blog-posts/' + id,
    })
  }

  publish(id) {
    return this.client._request({
      method: 'POST',
      path: '/content/api/v2/blog-posts/' + id + '/publish-action',
      body: {
        action: 'schedule-publish',
      },
    })
  }

  unpublish(id) {
    return this.client._request({
      method: 'POST',
      path: '/content/api/v2/blog-posts/' + id + '/publish-action',
      body: {
        action: 'cancel-publish',
      },
    })
  }
}

module.exports = BlogPost
