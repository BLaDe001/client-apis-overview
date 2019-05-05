const prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);

import * as testExtension from './extensions/test_extension/test_extension.js';

const config = {
  host: 'selun-aaz.qliktech.com',
  prefix: '/',
  port: '443',
  isSecure: true
};

require.config({
  baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {
  qlik.registerExtension('test', testExtension.default);
  const app = qlik.openApp('9bb1ae58-4f4d-4232-923a-4085f63e7c18', config);

  app.visualization.create('test', ["Case Owner Group"]).then(function (qVis) {
    qVis.show("QV01");
  }).catch(err=>{
    console.log(err);
  })
});

