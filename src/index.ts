// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ShoppingApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

export {ShoppingApplication};

export async function main(options: ApplicationConfig = {}) {
  options.rest = options.rest || {};

  if (!appEnv.isLocal) options.rest.port = appEnv.port;

  const app = new ShoppingApplication(options);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
