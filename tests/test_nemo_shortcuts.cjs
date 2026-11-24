'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

/** Crée une simulation autonome avec interception du clavier. */
function setup() {
  const listeners = new Map();
  const context = {
    document: {
      addEventListener(type, listener) {
        listeners.set(type, listener);
      },
      getElementById() {
        return { innerHTML: '', textContent: '' };
      }
    },
    window: {},
    console,
    Map,
    Set,
    Promise
  };

  vm.createContext(context);

  const code = fs.readFileSync(
    path.join(__dirname, '..', 'web', 'app.js'),
    'utf8'
  );

  vm.runInContext(code + `
    globalThis.api = {
      handleSimulation,
      interactiveDesktop,
      activate() {
        discoveryDepth = 3;
        simActive = true;
      },
      deactivate() {
        simActive = false;
      }
    };
  `, context);

  context.api.activate();
  context.api.handleSimulation('open:files');

  /** Simule une touche sans envoyer d'événement au système réel. */
  function press(key, options = {}) {
    let prevented = false;

    listeners.get('keydown')({
      key,
      altKey: true,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      target: {
        closest(selector) {
          if (selector === '.sim-desktop') {
            return options.outside ? null : {};
          }
          return options.editable ? {} : null;
        }
      },
      preventDefault() {
        prevented = true;
      }
    });

    return prevented;
  }

  return { api: context.api, press };
}

test('Alt + gauche revient au dossier précédent', () => {
  const { api, press } = setup();

  api.handleSimulation('folder:Documents');
  api.handleSimulation('folder:Images');

  assert.equal(press('ArrowLeft'), true);
  assert.match(api.interactiveDesktop(), /Nemo — Documents/);
});

test('Alt + droite retrouve le dossier suivant', () => {
  const { api, press } = setup();

  api.handleSimulation('folder:Documents');
  api.handleSimulation('folder:Images');

  press('ArrowLeft');

  assert.equal(press('ArrowRight'), true);
  assert.match(api.interactiveDesktop(), /Nemo — Images/);
});

test('Alt + haut remonte au dossier personnel', () => {
  const { api, press } = setup();

  api.handleSimulation('folder:Téléchargements');

  assert.equal(press('ArrowUp'), true);
  assert.match(api.interactiveDesktop(), /Nemo — Personnel/);
});

test('Les raccourcis sont inactifs hors simulation', () => {
  const { api, press } = setup();

  api.handleSimulation('folder:Documents');
  api.deactivate();

  assert.equal(press('ArrowLeft'), false);
  assert.match(api.interactiveDesktop(), /Nemo — Documents/);
});

test('Les raccourcis ne capturent pas le clavier hors bureau', () => {
  const { api, press } = setup();

  api.handleSimulation('folder:Documents');

  assert.equal(press('ArrowLeft', { outside: true }), false);
  assert.match(api.interactiveDesktop(), /Nemo — Documents/);
});

test('Les champs éditables conservent leurs raccourcis', () => {
  const { api, press } = setup();

  api.handleSimulation('folder:Documents');

  assert.equal(press('ArrowLeft', { editable: true }), false);
  assert.match(api.interactiveDesktop(), /Nemo — Documents/);
});

test('Les raccourcis Nemo ne modifient pas une autre application', () => {
  const { api, press } = setup();

  api.handleSimulation('open:calculator');

  assert.equal(press('ArrowLeft'), false);
  assert.match(api.interactiveDesktop(), /Calculatrice · simulation/);
});
