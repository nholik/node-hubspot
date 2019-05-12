const { expect } = require('chai')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const Hubspot = require('..')

const mockBlogDatum = {
  id: 6513512292,
}

describe('blogs', function() {
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'fake-token',
  })

  describe('get', () => {
    const allBlogEndpoint = {
      path: '/content/api/v2/blogs',
      response: {
        limit: 20,
        objects: [mockBlogDatum],
        offset: 0,
        total: 1,
        total_count: 1,
      },
    }

    fakeHubspotApi.setupServer({
      getEndpoints: [allBlogEndpoint],
    })

    it('Should get the first set of blogs', () => {
      return hubspot.blogs.get().then(data => {
        expect(data.objects).to.be.a('array')
        expect(data.limit).to.be.equal(20)
      })
    })
  })

  describe('getById', () => {
    const blogByIdEndpoint = {
      path: '/content/api/v2/blogs/' + mockBlogDatum.id,
      response: mockBlogDatum,
    }
    fakeHubspotApi.setupServer({
      getEndpoints: [blogByIdEndpoint],
    })
    it('Should return a specific blog', () => {
      return hubspot.blogs.getById(mockBlogDatum.id).then(data => {
        expect(data).to.be.an('object')
        expect(data.id).to.be.equal(mockBlogDatum.id)
      })
    })
  })
})
