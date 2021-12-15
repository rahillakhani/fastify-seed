# cicct-auth-proxy

-----
## Description

A proxy service that exchanges certain authentication credentials for others and proxies requests to various downstream services.

For instance, you can make a request to this proxy with a valid `flex-token` and it will fetch a valid `OAuth bearer token` then forward your request to the downstream `cicct-twilio-worker-api` application.

Intended to make it easier to integrate various applications by providing the option of exchanging one type of valid credentials for another. Otherwise, we would need to update various downstream applications to handle multiple authentication methods. This can be easy in some apps, but harder in others depending how authentication is implemented.

-----
## Installation


Install dependencies using your package manager of choice. It is recommended that you use [`npm`](https://www.npmjs.com/get-npm)
or [`yarn`](https://yarnpkg.com/getting-started).

-----
## Pipeline Information


For information about your generated pipeline, and how it works, please see the
[DNA Blueprint Guide](https://dna-guide.lmig.com/products/api/nodejs/nodejs-and-bamboo-specs.html)

-----
## Using The Proxy Locally

```sh
npm start
```
This command will run `npm run build` to compile source code into the `dist` directory.
Then it will run start the application on port `8080`

-----

```sh
npm run build
```
Source code is written in `TypeScript` so this command will clear the `dist` directory then compile source code located in `src` into the `dist` directory. Uses `gulp` task to clear the `dist` directory and the `TypeScript` compiler to compile the source code.

-----

```sh
npm test
```
Runs unit tests. Uses `jest` as the unit testing framework and subsequently `babel` to compile `TypeScript`.

-----

## Authentication

Incoming requests must include a `flex-token` header with a value of a valid token from the corresponding environment's Twilio Flex instance.
If this header is missing or the token is invalid, the request will not be proxied and a `401` response will be returned.

-----

## CORS

This proxy will respond with CORS headers so that downstream application don't have to!

Uses the [cors](https://www.npmjs.com/package/cors) package to apply `Express` middleware to manage CORS.

It is intended that this proxy is used to handle requests from Flex running in the browser at `flex.twilio.com`.

CORS is configured to send appropriate headers for the `https://flex.twilio.com` domain

> Note: When deployed to the `dev` environment or running locally this application will also handle CORS for the `localhost` domain so that a locally running instance of Flex can hit the `dev` instance of this proxy.

-----

## Routes

### `/worker-api/*`

Proxies requests to the [cicct-twilio-worker-api](https://console.forge.lmig.com/artifact/4795304d-f550-4d91-bb09-f773c10446a0) application

Automatically appends `/api` to the beginning of the path requested when proxying the request

Will automatically fetch a valid `OAuth Bearer Token` and add to request headers

### Examples:

Fetch worker from the twilio worker api

| Environment | Request to | Will proxy to |
| ---: | --- | --- |
| development | `https://cicct-auth-proxy-development.us-east-1.np.paas.lmig.com/worker-api/worker/WK1234` | `https://cicct-twilio-worker-api-development.us-east-1.np.paas.lmig.com/api/worker/WK1234` |
| test | `https://cicct-auth-proxy-test.us-east-1.np.paas.lmig.com/worker-api/worker/WK1234` | `https://cicct-twilio-worker-api-test.us-east-1.np.paas.lmig.com/api/worker/WK1234` |
| production | `https://cicct-auth-proxy-production.us-east-1.paas.lmig.com/worker-api/worker/WK1234` | `https://cicct-twilio-worker-api.us-east-1.paas.lmig.com/api/worker/WK1234` |

-----

## External Routes via [cicct-gateway-proxy](https://console.forge.lmig.com/artifact/90e499ef-de15-4b40-91c3-2254e735b863) apigee proxy

The external gateway proxy application is configured with a route to this proxy so that external applications (i.e. Flex plugins) can use this proxy from outside the network.

> Note that to authenticate with apigee you need to pass a valid `apikey` query parameter in the request

The routes to reach this proxy by environment are:

| Environment | Route |
| ---: | --- |
| development | `https://test-apis.us-east-1.libertymutual.com/cicct/auth-proxy/dev/*` |
| test | `https://test-apis.us-east-1.libertymutual.com/cicct/auth-proxy/test/*` |
| production | `https://apis.us-east-1.libertymutual.com/cicct/auth-proxy/*` |

[More information about the apigee proxy](https://forge.lmig.com/wiki/display/CICCT/Apigee)

### Examples:

Fetch worker from the twilio worker api

| Environment | Request to | Will proxy to | Will proxy to |
| ---: | --- | --- | --- |
| development | `https://test-apis.us-east-1.libertymutual.com/cicct/auth-proxy/dev/worker-api/worker/WK1234` | `https://cicct-auth-proxy-development.us-east-1.np.paas.lmig.com/worker-api/worker/WK1234` | `https://cicct-twilio-worker-api-development.us-east-1.np.paas.lmig.com/api/worker/WK1234` |
| test | `https://test-apis.us-east-1.libertymutual.com/cicct/auth-proxy/test/worker-api/worker/WK1234` | `https://cicct-auth-proxy-test.us-east-1.np.paas.lmig.com/worker-api/worker/WK1234` | `https://cicct-twilio-worker-api-test.us-east-1.np.paas.lmig.com/api/worker/WK1234` |
| production | `https://apis.us-east-1.libertymutual.com/cicct/auth-proxy/worker-api/worker/WK1234` | `https://cicct-auth-proxy-production.us-east-1.paas.lmig.com/worker-api/worker/WK1234` | `https://cicct-twilio-worker-api.us-east-1.paas.lmig.com/api/worker/WK1234` |