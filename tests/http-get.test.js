const request = require('supertest')
const app = require('./app')

describe('redirects GET request', () => {
  test('redirects subpage', async () => {
    await request(app).get('/subpage?foo=bar')
      .expect(302)
      .expect('Location', '/subpage/?foo=bar')
  })

  test('redirects router index', async () => {
    await request(app).get('/myapp?foo=bar')
      .expect(302)
      .expect('Location', '/myapp/?foo=bar')
  })

  test('redirects router subpage', async () => {
    await request(app).get('/myapp/about?foo=bar')
      .expect(302)
      .expect('Location', '/myapp/about/?foo=bar')
  })

  test('redirects without query parameters', async () => {
    await request(app).get('/subpage')
      .expect(302)
      .expect('Location', '/subpage/')
  })

  test('redirects with three express handler parameters', async () => {
    // this handler has (req, res, next) instead of just two
    await request(app).get('/error')
      .expect(302)
      .expect('Location', '/error/')
  })
})

describe('doesnt redirect GET request', () => {
  test('doesnt redirect index page', async () => {
    // global root page does not need to be redirected
    await request(app).get('/?foo=bar')
      .expect(200)
      .expect({
        page: 'index',
        url: '/?foo=bar',
        urlparam: { foo: 'bar' },
      })
  })

  test('doesnt redirect path with file extension', async () => {
    await request(app).get('/image.jpg')
      .expect(200)
      .expect('Content-Type', /jpeg/)
  })

  test('doesnt redirect non-existent path with file extension', async () => {
    await request(app).get('/this-does-not-exist.png')
      .expect(404)
  })

  test('doesnt redirect file with leading dot', async () => {
    await request(app).get('/.config')
      .expect(200)
      .expect({
        page: 'config',
        url: '/.config',
        urlparam: {},
      })
  })

  test('doesnt redirect when already has trailing slash', async () => {
    await request(app).get('/subpage/?foo=bar')
      .expect(200)
      .expect({
        page: 'subpage',
        url: '/subpage/?foo=bar',
        urlparam: { foo: 'bar' },
      })
  })

  test('doesnt redirect with trailing slash and no query', async () => {
    await request(app).get('/myapp/about/')
      .expect(200)
      .expect({
        page: 'myapp-about',
        url: '/myapp/about/',
        urlparam: {},
      })
  })

  test('doesnt redirect with three express handler parameters', async () => {
    // this handler has (req, res, next) instead of just two
    // it is supposed to raise internal server error
    await request(app).get('/error/')
      .expect(500)
  })
})
