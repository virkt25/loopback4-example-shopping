// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ShoppingApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

const userDataSource = require('./datasources/user.datasource');

const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

export {ShoppingApplication};

export async function main(options: ApplicationConfig = {}) {
  options.rest = options.rest || {};
  options.rest.port = appEnv.isLocal ? options.rest.port : appEnv.port;

  const app = new ShoppingApplication(options);

  if (!appEnv.isLocal) {
    userDataSource.url = appEnv.getServiceURL('t-shopping-cloudant');
    userDataSource.connector = 'cloudant';

    app.bind('datasources.config.user').to(userDataSource);
  }

  console.log('cloudant url: ', userDataSource.url);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
