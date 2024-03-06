# Express-trailer

<img src="logo.jpg" height="120">

_Handle trailing slashes in Express_

## Installation

Install with NPM:

```
npm install PyryL/express-trailer
```

## Usage

```
// replace this

app.get('/foo', (req, res) => {
  // ...
})

// with this

const trailer = require('express-trailer')
trailer.get(app, '/foo', (req, res) => {
  // ...
})
```

## Development

Run tests with

```
npm test
```

If you want, you can start the server used in tests for manual testing with

```
npm run start:test
```

## License

MIT license
