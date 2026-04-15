AFRAME.registerComponent('interactif', {
  schema: {
    type: { type: 'string' }
  },

  init: function () {
    // On récupère le COMPOSANT de logique, pas juste l'élément
    this.sceneEl = document.querySelector('a-scene');
    
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'e') {
        let cursor = document.querySelector('a-cursor');
        let intersection = cursor.components.raycaster.getIntersection(this.el);
        if (intersection) {
          this.actionner();
        }
      }
    });

    this.el.addEventListener('mouseenter', () => {
      let logicComponent = this.sceneEl.components['pc-logic'];
      let msg = this.getInstruction(logicComponent.data);
      if (msg) logicComponent.updateHud(msg);
    });

    this.el.addEventListener('mouseleave', () => {
      document.querySelector('#hud-texte').setAttribute('visible', false);
    });
  },

  getInstruction: function(data) {
    switch(this.data.type) {
      case 'cable': return data.cableBranche ? "[E] Debrancher le cable" : "[E] Brancher le cable";
      case 'vitre': return data.vitreOuverte ? "[E] Fermer le boitier" : "[E] Ouvrir le boitier";
      case 'ram': 
        if (!data.vitreOuverte) return "Ouvrez le boitier d'abord";
        return data.ramClipsee ? "[E] Retirer la RAM (Inspecter)" : "[E] Remettre la RAM";
      case 'power': return "[E] Allumer le PC";
      default: return null;
    }
  },

  actionner: function () {
    // ATTENTION : Pour modifier une donnée dans le schema, on utilise .setAttribute
    let logicComponent = this.sceneEl.components['pc-logic'];
    let data = logicComponent.data; 

    if (this.data.type === 'cable') {
      let nouvelEtat = !data.cableBranche;
      this.sceneEl.setAttribute('pc-logic', { cableBranche: nouvelEtat });
      
      this.el.setAttribute('animation', {
        property: 'position',
        to: nouvelEtat ? '0.5 0.42 -4.95' : '0.5 0.52 -4.60',
        dur: 600
      });
      this.el.setAttribute('animation__rot', {
        property: 'rotation',
        to: nouvelEtat ? '90 0 0' : '70 0 0',
        dur: 600
      });
    }

    if (this.data.type === 'vitre') {
      let nouvelEtat = !data.vitreOuverte;
      this.sceneEl.setAttribute('pc-logic', { vitreOuverte: nouvelEtat });
      
      this.el.setAttribute('animation', {
        property: 'position',
        to: nouvelEtat ? '0.126 0 0.5' : '0.126 0.004 0',
        dur: 800
      });
    }

    if (this.data.type === 'ram' && data.vitreOuverte) {
      if (data.ramClipsee) {
        this.sceneEl.setAttribute('pc-logic', { ramClipsee: false });
        this.el.setAttribute('animation', { property: 'position', to: '-0.2 0.5 0.6', dur: 1000 });
        this.el.setAttribute('animation__rot', { property: 'rotation', to: '0 360 0', dur: 5000, loop: true, easing: 'linear' });
      } else {
        this.sceneEl.setAttribute('pc-logic', { ramClipsee: true });
        this.el.removeAttribute('animation__rot');
        this.el.setAttribute('animation', { property: 'position', to: '-0.05 0.15 0', dur: 1000 });
        this.el.setAttribute('animation__rotBack', { property: 'rotation', to: '0 90 0', dur: 500 });
      }
    }

    if (this.data.type === 'power') {
      if (data.cableBranche && data.ramClipsee && !data.vitreOuverte) {
        this.el.setAttribute('color', '#00FF00');
        document.querySelector('#ecran-pc').setAttribute('visible', true);
      } else {
        alert("Action impossible : vérifiez le branchement, la RAM et la vitre !");
      }
    }
  }
});