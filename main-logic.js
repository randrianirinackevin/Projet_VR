AFRAME.registerComponent('pc-logic', {
  schema: {
    cableBranche: { type: 'boolean', default: false },
    vitreOuverte: { type: 'boolean', default: false },
    ramEnMain: { type: 'boolean', default: false },
    ramClipsee: { type: 'boolean', default: true },
    pcAllume: { type: 'boolean', default: false } // Elle est dedans au début
  },

  init: function () {
    this.hud = document.querySelector('#hud-texte');
  },

  updateHud: function (msg) {
    this.hud.setAttribute('value', msg);
    this.hud.setAttribute('visible', true);
  }
});