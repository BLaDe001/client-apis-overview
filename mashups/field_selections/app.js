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

  const app = qlik.openApp('9bb1ae58-4f4d-4232-923a-4085f63e7c18', config);

  app.getObject('CurrentSelections', 'CurrentSelections');

  app.visualization
    .get('PAppmU')
    .then(qVis => qVis.show('QV01'));

  app.visualization
    .get('hRZaKk')
    .then(qVis => qVis.show('QV02'));

  app.visualization
    .get('298bbd6d-f23d-4469-94a2-df243d680e0c')
    .then(qVis => qVis.show('QV03'));
  // app.clearAll();
  app.visualization
    .get('a5e0f12c-38f5-4da9-8f3f-0e4566b28398')
    .then(qVis => qVis.show('QV04'));

  app.field('Case Owner').selectValues(['Sally N. Pujtkinski', '1st Line Helpdesk', 'Carlita F. Glahn'], false, false);
  app.field('Priority').selectValues(['High', 'Low'], false, false);
  app.field('Year').selectValues(['2010', '2011', '2012'], false, false);
  app.field('Priority').selectValues(['Medium'], false, false);

  // alternative method call
  //
  // app.selectAssociations(0, 
  //     [
  //       'Sally N. Pujtkinski', '1st Line Helpdesk', 'Carlita F. Glahn',
  //       '2010','2011', '2012',
  //       'High', 'Low', 'Medium',
  //     ], 
  //     { qContext: 'CurrentSelections', qSearchFields: [] });

  // using async await
  // async function init() {
  //   const app = qlik.openApp('9bb1ae58-4f4d-4232-923a-4085f63e7c18', config);

  //   await app.getObject('CurrentSelections', 'CurrentSelections');

  //   await app.visualization
  //     .get('PAppmU')
  //     .then(qVis => qVis.show('QV01'));

  //   await app.visualization
  //     .get('hRZaKk')
  //     .then(qVis => qVis.show('QV02'));

  //   await app.visualization
  //     .get('298bbd6d-f23d-4469-94a2-df243d680e0c')
  //     .then(qVis => qVis.show('QV03'));
  //   await app.clearAll();
  //   await app.visualization
  //     .get('a5e0f12c-38f5-4da9-8f3f-0e4566b28398')
  //     .then(qVis => qVis.show('QV04'));

  //   await app.field('Case Owner').selectValues(['Sally N. Pujtkinski', '1st Line Helpdesk', 'Carlita F. Glahn'], false, false);
  //   await app.field('Priority').selectValues(['High', 'Low'], false, false);
  //   await app.field('Year').selectValues(['2010', '2011', '2012'], false, false);
  //   await app.field('Priority').selectValues(['Medium'], false, false);

  // }
  // init();
});
















// app.selectAssociations(0, 
//   [
//     'Sally N. Pujtkinski', '1st Line Helpdesk', 'Carlita F. Glahn',
//     '2010','2011', '2012',
//     'High', 'Low', 'Medium',
//   ], 
//   { qContext: 'CurrentSelections', qSearchFields: [] });