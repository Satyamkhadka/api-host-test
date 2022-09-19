Graffpunks api
==================================

Getting Started
---------------

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start

License
-------

NOT-MIT

Authorization: Basic c2F0eWFtOmtoYWRrYQ==

API DOC

```json 
{
  "transaction_id":"6259f2386002eebf97ce7e1d10145c4bbcbe6af4f67a057db7fbdee9963e0d37",
  "address_from":"blockchain22",
  "address_to":"blockchain11",
  "amount_sent":"10.00000000 WAX"
}
```

### setting up environment
```js
   import * as dotenv from 'dotenv'
   dotenv.config({ path: 'development.env' })
```
insert private key in production.env file as :
```sh
USER_PRIVATE_KEY=5JY5--EXAMPLE-KEY--dyfM
```
also there is config.json to configure api's addresses. 