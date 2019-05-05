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
  const global = qlik.getGlobal(config);

  global.on("closed", function () { });

  global.on("error", function (error) {
    alert(error.message);
  });

  qlik.getAppList(function (list) {
    // Find the correct app
    const appIds = list.filter(function (obj) {
      return obj.qDocName.indexOf('Helpdesk') !== -1; // Helpdesk Management.qvf
    }).map(function (obj) {
      return obj.qDocId;
    });
    // Open app
    const app = qlik.openApp(appIds[0], config);

    app.on("error", function (error) {
      alert(error.message);
    });

    //Create visualizations
    var vis1, vis2;
    app.visualization.create(
      'linechart',
      ["Case Owner",
        {
          "qLibraryId": "eqZjE",
          "qType": "measure"
        },
        {
          "qLibraryId": "MPcQeZ",
          "qType": "measure"
        }
      ],
      {
        "title": "Linechart",
        "navigation": false,
        "dataPoint": { "bubbleSizes": 8 },
        "labels": { "mode": 1 },
        "color": {
          "auto": false,
          "mode": "primary",
          "useBaseColors": "off",
          "paletteColor": {
            "index": -1,
            "color": "#E5A000"
          }
        }
      }
    ).then(function (vis) {
      vis1 = vis;
      vis.show("QV01");
    });

    app.visualization.create(
      'barchart',
      ["Case Owner Group", "=Avg([Case Duration Time])"],
      {
        "title": "Barchart",
        "orientation": "horizontal",
        "dataPoint": { "showLabels": true },
        "gridLine": { "auto": false, "spacing": 3 },
        "color": {
          "auto": false,
          "mode": "primary",
          "useBaseColors": "off",
          "paletteColor": {
            "index": -1,
            "color": "#E5A000"
          }
        }
      }
    ).then(function (vis) {
      vis2 = vis;
      vis.show("QV02");
    });

    function toggle(vis, element) {
      vis.toggleDataView().then(function (toggled) {
        vis.isToggled = toggled;
        document.getElementById(element).parentElement.focus();
      });
    }

    function handleKeydown(event, vis, element) {
      var visualization = document.getElementById(element);
      if (event.which === 32 || event.which === 13) { // Space, Enter
        if (vis.isToggled) {
          visualization.getElementsByClassName('qv-st')[0].focus();
        } else {
          toggle(vis, element);
        }
      } else if (event.which === 27 && vis.isToggled && visualization.querySelector(".qv-selection-toolbar") === null) { // Esc
        toggle(vis, element);
      }
    }

    document.getElementById("toggle1").addEventListener("click", function () {
      toggle(vis1, "QV01");
    });
    document.getElementById("toggle2").addEventListener("click", function () {
      toggle(vis2, "QV02");
    });
    document.getElementById("clear").addEventListener("click", function () {
      app.clearAll();
    });
    document.getElementById("linechart").addEventListener("keydown", function (event) {
      handleKeydown(event, vis1, "QV01");
    });
    document.getElementById("barchart").addEventListener("keydown", function (event) {
      handleKeydown(event, vis2, "QV02");
    });

  }, config);
});
