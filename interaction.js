// --- ÉTAPE 1 : LE CÂBLE ---
AFRAME.registerComponent('cable-alim', {
  init: function () {
    this.el.addEventListener('click', () => {
      let logic = document.querySelector('[simulation-logic]').components['simulation-logic'];
      if (logic.validerEtape(1)) {
        // Animation : rapprochement vers le PC
        this.el.setAttribute('animation', 'property: position; to: 0 0.5 -1; dur: 500');
        this.el.setAttribute('material', 'color', '#222'); // Simule le branchement
      }
    });
  }
});

// --- ÉTAPE 2 : LE BOÎTIER ---
AFRAME.registerComponent('boitier-lateral', {
  init: function () {
    this.el.addEventListener('click', () => {
      let logic = document.querySelector('[simulation-logic]').components['simulation-logic'];
      if (logic.validerEtape(2)) {
        // On fait disparaître le panneau ou on le décale
        this.el.setAttribute('animation', 'property: position; to: 2 1 -2; dur: 800');
        this.el.setAttribute('visible', 'false'); 
      }
    });
  }
});

// --- ÉTAPE 3 : LA RAM ---
AFRAME.registerComponent('ram-slot', {
  init: function () {
    this.el.addEventListener('click', () => {
      let logic = document.querySelector('[simulation-logic]').components['simulation-logic'];
      if (logic.validerEtape(3)) {
        // Simulation de la pression (descend de 5cm)
        this.el.setAttribute('animation', 'property: position; dir: alternate; dur: 200; to: 0 -0.05 0; relative: true');
        console.log("RAM clipsée !");
      }
    });
  }
});

// --- ÉTAPE 4 : BOUTON POWER ---
AFRAME.registerComponent('power-button', {
  init: function () {
    this.el.addEventListener('click', () => {
      let logic = document.querySelector('[simulation-logic]').components['simulation-logic'];
      if (logic.data.etapeActuelle === 4) {
        alert("PC Réparé ! Le système démarre...");
        // Optionnel : Allumer une lumière verte dans la scène
        document.querySelector('#status-led').setAttribute('color', 'green');
      } else {
        console.log("Rien ne se passe... vérifiez les branchements.");
      }
    });
  }
});