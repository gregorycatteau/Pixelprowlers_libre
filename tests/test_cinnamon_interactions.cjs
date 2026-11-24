'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

/** Construit une interface isolée et intercepte ses événements. */
function createApplication() {
  const listeners = new Map();
  const root = { innerHTML: '', textContent: '' };

  const document = {
    addEventListener(type, callback) {
      listeners.set(type, callback);
    },
    getElementById() {
      return root;
    },
    querySelector() {
      return null;
    }
  };

  const context = {
    document,
    window: {},
    console,
    Map,
    Set,
    Promise
  };

  vm.createContext(context);

  const source = fs.readFileSync(
    path.join(__dirname, '..', 'web', 'app.js'),
    'utf8'
  );

  vm.runInContext(source + `
    globalThis.testApi = {
      handleSimulation,
      resetSimulation,
      interactiveDesktop,
      activate() {
        discoveryDepth = 3;
        simActive = true;
      }
    };
  `, context);

  return { api: context.testApi, listeners };
}

test('Le menu contextuel fictif peut être ouvert et fermé', () => {
  const { api } = createApplication();

  api.resetSimulation();
  api.handleSimulation('context-open');

  assert.match(api.interactiveDesktop(), /class="sim-context-menu"/);

  api.handleSimulation('context-close');

  assert.doesNotMatch(
    api.interactiveDesktop(),
    /class="sim-context-menu"/
  );
});

test('Ouvrir Nemo ferme le menu contextuel', () => {
  const { api } = createApplication();

  api.handleSimulation('context-open');
  api.handleSimulation('open:files');

  assert.match(api.interactiveDesktop(), /Nemo — Personnel/);
  assert.doesNotMatch(
    api.interactiveDesktop(),
    /class="sim-context-menu"/
  );
});

test('La réinitialisation efface le menu contextuel', () => {
  const { api } = createApplication();

  api.handleSimulation('context-open');
  api.resetSimulation();

  assert.doesNotMatch(
    api.interactiveDesktop(),
    /class="sim-context-menu"/
  );
});

test('Le clic droit ouvre le menu uniquement dans la simulation', () => {
  const { api, listeners } = createApplication();
  const handler = listeners.get('contextmenu');

  assert.equal(typeof handler, 'function');

  let prevented = false;

  handler({
    target: { closest: () => ({}) },
    preventDefault() { prevented = true; }
  });

  assert.equal(prevented, false);

  api.activate();

  handler({
    target: { closest: () => ({}) },
    preventDefault() { prevented = true; }
  });

  assert.equal(prevented, true);
  assert.match(api.interactiveDesktop(), /class="sim-context-menu"/);
});

test('Échap ferme le menu contextuel sans action système', () => {
  const { api, listeners } = createApplication();

  api.activate();
  api.handleSimulation('context-open');

  let prevented = false;

  listeners.get('keydown')({
    key: 'Escape',
    preventDefault() { prevented = true; }
  });

  assert.equal(prevented, true);
  assert.doesNotMatch(
    api.interactiveDesktop(),
    /class="sim-context-menu"/
  );
});

test('Le clic droit hors du bureau fictif reste inchangé', () => {
  const { api, listeners } = createApplication();

  api.activate();

  let prevented = false;

  listeners.get('contextmenu')({
    target: { closest: () => null },
    preventDefault() { prevented = true; }
  });

  assert.equal(prevented, false);
  assert.doesNotMatch(
    api.interactiveDesktop(),
    /class="sim-context-menu"/
  );
});
