const prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);

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

  // const app = qlik.openApp('9bb1ae58-4f4d-4232-923a-4085f63e7c18', config);
  // let configWithIdentity = { ...config, identity: '1234' };
  // const appWithIdentity = qlik.openApp('9bb1ae58-4f4d-4232-923a-4085f63e7c18', configWithIdentity);

  // app.visualization
  //   .get('298bbd6d-f23d-4469-94a2-df243d680e0c')
  //   .then(qVis => qVis.show('QV01'));

  // app.visualization
  //   .get('a5e0f12c-38f5-4da9-8f3f-0e4566b28398')
  //   .then(qVis => qVis.show('QV02'));

  // appWithIdentity.visualization
  //   .get('PAppmU')
  //   .then(qVis => qVis.show('QV03'));

  // appWithIdentity.visualization
  //   .get('hRZaKk')
  //   .then(qVis => qVis.show('QV04'));

});

