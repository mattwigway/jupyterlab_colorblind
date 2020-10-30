require('../style/plugin.css');

module.exports = [{
    id: 'jupyterlab_colorblind',
    autoStart: true,
    activate: function(app) {
      console.log('JupyterLab extension jupyterlab_colorblind is activated!');
      console.log(app.commands);
    }
}];
