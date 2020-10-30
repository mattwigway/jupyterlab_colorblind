require('../style/plugin.css')

const {Menu} = require('@lumino/widgets')
const {IMainMenu} = require('@jupyterlab/mainmenu')

// use obj so passed by reference/mutable
let visionMode = { visionMode: 'normal' }

function setVisionMode (newVisionMode) {
  const elems = document.getElementsByClassName('jp-RenderedImage')
  for (let elem of elems) {
    console.log('colorblind: setting vision mode ' + newVisionMode)

    if (elem.classList.contains('jp-colorblind-protanomaly-10')) elem.classList.remove('jp-colorblind-protanomaly-10')
    if (elem.classList.contains('jp-colorblind-deuteranomaly-10')) elem.classList.remove('jp-colorblind-deuteranomaly-10')
    if (elem.classList.contains('jp-colorblind-tritanomaly-10')) elem.classList.remove('jp-colorblind-tritanomaly-10')
    if (elem.classList.contains('jp-colorblind-grayscale-10')) elem.classList.remove('jp-colorblind-grayscale-10')

    if (newVisionMode !== 'normal') {
      elem.classList.add('jp-colorblind-' + newVisionMode + '-10')
    }

    visionMode.visionMode = newVisionMode
  }
}


module.exports = [{
    id: 'jupyterlab_colorblind',
    autoStart: true,
    requires: [IMainMenu],
    activate: function(app, mainMenu) {
      app.commands.addCommand('protanomaly-vision', {
        label: 'Protanomaly Vision (Rare)',
        isEnabled: () => true,
        isVisible: () => true,
        isToggled: () => visionMode.visionMode == 'protanomaly',
        execute: () => setVisionMode('protanomaly')
      })

      app.commands.addCommand('deuteranomaly-vision', {
        label: 'Deuteranomaly Vision (Common)',
        isEnabled: () => true,
        isVisible: () => true,
        isToggled: () => visionMode.visionMode == 'deuteranomaly',
        execute: () => setVisionMode('deuteranomaly')
      })

      app.commands.addCommand('tritanomaly-vision', {
        label: 'Tritanomaly Vision (Very Rare)',
        isEnabled: () => true,
        isVisible: () => true,
        isToggled: () => visionMode.visionMode == 'tritanomaly',
        execute: () => setVisionMode('tritanomaly')
      })

      app.commands.addCommand('grayscale-vision', {
        label: 'Grayscale',
        isEnabled: () => true,
        isVisible: () => true,
        isToggled: () => visionMode.visionMode == 'grayscale',
        execute: () => setVisionMode('grayscale')
      })

      app.commands.addCommand('normal-vision', {
        label: 'Normal Vision',
        isEnabled: () => true,
        isVisible: () => true,
        isToggled: () => visionMode.visionMode == 'normal',
        execute: () => setVisionMode('normal')
      })

      const menu = new Menu({ commands: app.commands })
      menu.title.label = 'Color-Blindness Simulation'
      menu.addItem({
        command: 'deuteranomaly-vision',
        args: {}
      })
      menu.addItem({
        command: 'protanomaly-vision',
        args: {}
      })
      menu.addItem({
        command: 'tritanomaly-vision',
        args: {}
      })
      menu.addItem({
        command: 'grayscale-vision',
        args: {}
      })
      menu.addItem({
        command: 'normal-vision',
        args: {}
      })

      mainMenu.viewMenu.addGroup([{type: 'submenu', submenu: menu}], 40)

      console.log('JupyterLab extension jupyterlab_colorblind is activated!');
    }
}];
