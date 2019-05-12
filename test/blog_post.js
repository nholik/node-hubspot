const { expect } = require('chai')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const Hubspot = require('..')

describe('blogs.posts', () => {
  //  const hubspot = new Hubspot({ apiKey: 'demo' })
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'fake-token',
  })

  describe('get', () => {
    const allBlogPostsEndpoint = {
      path: '/content/api/v2/blog-posts',
      response: {
        limit: 20,
        total_count: 2,
        objects: [
          {
            archived: false,
            author_user_id: 2345,
            id: 423949,
          },
          {
            archived: false,
            author_user_id: 12345,
            id: 123949,
          },
        ],
      },
    }

    fakeHubspotApi.setupServer({
      getEndpoints: [allBlogPostsEndpoint],
    })

    it('Should get the first set of posts', () => {
      return hubspot.blogs.posts.get().then(data => {
        expect(data.objects).to.be.a('array')
        expect(data.limit).to.be.equal(20)
      })
    })
  })

  // describe('getById', () => {
  //   let postId
  //   before(function() {
  //     if (!process.env.NOCK_OFF) {
  //       return hubspot.blogs.posts.get().then(data => {
  //         postId = data.objects[0].id
  //       })
  //     } else {
  //       postId = 12345
  //     }
  //   })

  //   const postByIdEndpoint = {
  //     path: '/content/api/v2/blogs/' + postId,
  //     response: {
  //       id: postId,
  //     },
  //   }

  //   fakeHubspotApi.setupServer({
  //     getEndpoints: [postByIdEndpoint],
  //   })

  //   it('Should return a specific posts', () => {
  //     return hubspot.blogs.posts.getById(postId).then(data => {
  //       expect(data).to.be.an('object')
  //       expect(data.id).to.be.equal(postId)
  //     })
  //   })
  // })

  // describe('create', () => {
  //   let blogId
  //   let postId

  //   before(() => {
  //     if (!process.env.NOCK_OFF) {
  //       return hubspot.blogs.get().then(data => (blogId = data.objects[0].id))
  //     } else {
  //       blogId = 12345
  //     }
  //   })

  //   after(() => {
  //     if (!process.env.NOCK_OFF) {
  //       return hubspot.blogs.posts.delete(postId)
  //     }
  //   })

  //   it('Returns a 201 with the newly created post', () => {
  //     return hubspot.blogs.posts
  //       .create({
  //         name: 'A test post',
  //         content_group_id: blogId,
  //       })
  //       .then(data => {
  //         postId = data.id
  //         expect(data).to.be.a('object')
  //         expect(data.name).to.be.equal('A test post')
  //       })
  //   })
  // })

  // describe('update', () => {
  //   let postId
  //   let original = {}
  //   before(() => {
  //     if (!process.env.NOCK_OFF) {
  //       return hubspot.blogs.posts.get().then(data => {
  //         postId = data.objects[0].id
  //         original = Object.assign(original, data.objects[0])
  //       })
  //     } else {
  //       postId = 12345
  //     }
  //   })

  //   after(() => {
  //     if (!process.env.NOCK_OFF) {
  //       return hubspot.blogs.posts.update(postId, original)
  //     }
  //   })

  //   it('Modifies the request fields in the post', () => {
  //     return hubspot.blogs.posts
  //       .update(postId, {
  //         post_body: `<p>Hey guys! I'm using the <b>API</b>! Woohoo!</p>`,
  //         post_summary: `<p>Hey guys!</p>`,
  //       })
  //       .then(data => {
  //         expect(data).to.be.a('object')
  //         expect(data.id).to.be.equal(postId)
  //         expect(data.post_body).to.be.equal(
  //           `<p>Hey guys! I'm using the <b>API</b>! Woohoo!</p>`
  //         )
  //         expect(data.post_summary).to.be.equal(`<p>Hey guys!</p>`)
  //       })
  //   })
  // })

  // describe('delete', () => { })

  // describe('publish', () => {
  //   let blogId
  //   let authorId
  //   before(() => {
  //     return Promise.all([
  //       hubspot.blogs.get().then(data => (blogId = data.objects[0].id)),
  //       hubspot.blogs.authors.get().then(data => {
  //         authorId = data.objects[0].id
  //       }),
  //     ])
  //   })
  //   it('Publishes a new entry and returns 204 empty response', () => {
  //     return hubspot.blogs.posts
  //       .create({
  //         name: 'publish me please',
  //         content_group_id: blogId,
  //         blog_author_id: authorId,
  //         meta_description: 'this is a test for the node api wrapper',
  //         slug: '/some-test-post',
  //       })
  //       .then(data => hubspot.blogs.posts.publish(data.id))
  //       .then(data => expect(data).to.be.undefined)
  //   })
  // })

  // describe('unpublish', () => {
  //   let blogId
  //   let authorId
  //   let postId
  //   before(() => {
  //     return Promise.all([
  //       hubspot.blogs.get().then(data => (blogId = data.objects[0].id)),
  //       hubspot.blogs.authors.get().then(data => {
  //         authorId = data.objects[0].id
  //       }),
  //     ])
  //       .then(() =>
  //         hubspot.blogs.posts.create({
  //           name: 'publish me please',
  //           content_group_id: blogId,
  //           blog_author_id: authorId,
  //           meta_description: 'this is a test for the node api wrapper',
  //           slug: '/some-test-post',
  //         })
  //       )
  //       .then(data => {
  //         postId = data.id
  //         return hubspot.blogs.posts.publish(data.id)
  //       })
  //   })

  //   after(() => {
  //     return hubspot.blogs.posts.delete(postId)
  //   })

  //   it('Un-publishes an existing entry and returns 204 empty response', () => {
  //     return hubspot.blogs.posts
  //       .unpublish(postId)
  //       .then(data => expect(data).to.be.undefined)
  //   })
  // })
})
