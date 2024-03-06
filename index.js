const { URL } = require('url')

/**
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 * @param {import('express').RequestHandler} handler 
 */
const checkTrailingSlash = (request, response, next, handler) => {
  // parse the non-host specific part of the URL
  const parsedUrl = new URL(request.originalUrl, 'https://example.com/')

  // if the path does not have trailing slash
  // and it is not filename-like with dot in it
  if (!parsedUrl.pathname.endsWith('/') && !parsedUrl.pathname.split('/').at(-1).includes('.')) {
    // redirect to the corresponding path with trailing slash
    parsedUrl.pathname += '/'
    response.redirect(parsedUrl.pathname + parsedUrl.search + parsedUrl.hash)
  } else {
    // otherwise handle request as normally
    handler(request, response, next)
  }
}

/**
 * GET request handler with automatic trailing slash appender.
 * @param {import('express').Router} router 
 * @param {import('express').IRouterMatcher} path 
 * @param {import('express').RequestHandler} handler 
 */
const get = (router, path, handler) => {
  router.get(path, (req, res, next) => {
    checkTrailingSlash(req, res, next, handler)
  })
}

module.exports = {
  get,
}
