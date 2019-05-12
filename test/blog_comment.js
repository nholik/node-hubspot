const { expect } = require('chai')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const Hubspot = require('..')

describe('blog comments', function() {
  const hubspot = new Hubspot({ apiKey: 'demo' })

  describe('get', () => {
    it('Should return all comments', () => {
      return hubspot.blogs.comments.get().then(data => {
        expect(data.objects).to.be.a('array')
        data.objects.every(i => expect(i).to.include.keys('id', 'comment'))
      })
    })
  })

  describe('getById', () => {
    let commentId

    before(function() {
      if (!process.env.NOCK_OFF) {
        return hubspot.blogs.comments
          .get({ limit: 1 })
          .then(data => (commentId = data.objects[0].id))
      } else {
        commentId = 12345
        const commentEndpoint = {
          path: '/comments/v3/comments/' + commentId,
          response: {
            id: commentId,
          },
        }

        fakeHubspotApi.setupServer({
          demo: true,
          getEndpoints: [commentEndpoint],
        })
      }
    })

    it('Should return a specific comment', () => {
      return hubspot.blogs.comments.getById(commentId).then(data => {
        expect(data).to.be.a('object')
        expect(data.id).to.be.equal(commentId)
      })
    })
  })

  describe('create', () => {
    const testCommentData = {
      comment: 'This is a test blog comment',
      contentId: '6513512292',
      collectionId: '6513512292',
      contentTitle: 'This is a test blog title',
      userEmail: 'tester@gmail.com',
      userName: 'tester',
    }

    if (!process.env.NOCK_OFF) {
      const createCommentEndpoint = {
        path: '/comments/v3/comments',
        request: testCommentData,
        response: {
          id: 12345,
          userEmail: 'tester@gmail.com',
        },
      }

      fakeHubspotApi.setupServer({
        demo: true,
        postEndpoints: [createCommentEndpoint],
      })
    }

    it('can create', () => {
      return hubspot.blogs.comments.create(testCommentData).then(data => {
        expect(data).to.be.an('object')
        expect(data).to.include.keys('id', 'userEmail')
      })
    })
  })

  describe('delete', () => {
    let commentId
    if (process.env.NOCK_OFF) {
      return hubspot.blogs.comments
        .get({ limit: 1 })
        .then(data => (commentId = data.objects[0].id))
    } else {
      commentId = 12345
      const deleteCommentEndpoint = {
        path: '/comments/v3/comments/' + commentId,
        statusCode: 204,
      }

      fakeHubspotApi.setupServer({
        demo: true,
        deleteEndpoints: [deleteCommentEndpoint],
      })
    }
    it('can delete', () => {
      return hubspot.blogs.comments.delete(commentId).then(data => {
        expect(data).to.be.equal(undefined)
      })
    })
  })
})
