'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

/** Prépare une instance indépendante de la simulation Nemo. */
function createNemo() {
  const context = {
    document: {
      addEventListener() {},
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

  const source = fs.readFileSync(
    path.join(__dirname, '..', 'web', 'app.js'),
    'utf8'
  );

  vm.runInContext(source + `
    globalThis.nemo = {
      handleSimulation,
      resetSimulation,
      interactiveDesktop
    };
  `, context);

  const api = context.nemo;
  api.resetSimulation();
  api.handleSimulation('open:files');

  return api;
}

test('Nemo ouvre un dossier fictif', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Documents');

  assert.match(nemo.interactiveDesktop(), /Nemo — Documents/);
});

test('Précédent revient au dossier précédent', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Documents');
  nemo.handleSimulation('folder:Images');
  nemo.handleSimulation('history-back');

  assert.match(nemo.interactiveDesktop(), /Nemo — Documents/);
});

test('Suivant restaure le dossier suivant', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Documents');
  nemo.handleSimulation('folder:Images');
  nemo.handleSimulation('history-back');
  nemo.handleSimulation('history-forward');

  assert.match(nemo.interactiveDesktop(), /Nemo — Images/);
});

test('Une nouvelle navigation efface l’historique futur', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Documents');
  nemo.handleSimulation('folder:Images');
  nemo.handleSimulation('history-back');
  nemo.handleSimulation('folder:Téléchargements');
  nemo.handleSimulation('history-forward');

  assert.match(
    nemo.interactiveDesktop(),
    /Nemo — Téléchargements/
  );
});

test('Précédent ne dépasse pas le début de l’historique', () => {
  const nemo = createNemo();

  nemo.handleSimulation('history-back');

  assert.match(nemo.interactiveDesktop(), /Nemo — Personnel/);
  assert.match(
    nemo.interactiveDesktop(),
    /data-sim="history-back" disabled/
  );
});

test('Suivant ne dépasse pas la fin de l’historique', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Documents');
  nemo.handleSimulation('history-forward');

  assert.match(nemo.interactiveDesktop(), /Nemo — Documents/);
  assert.match(
    nemo.interactiveDesktop(),
    /data-sim="history-forward" disabled/
  );
});

test('Le dossier parent revient à Personnel', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Images');
  nemo.handleSimulation('folder:Personnel');

  assert.match(nemo.interactiveDesktop(), /Nemo — Personnel/);
});

test('Un dossier arbitraire est refusé', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Documents');
  nemo.handleSimulation('folder:/etc');
  nemo.handleSimulation('folder:../../secret');

  assert.match(nemo.interactiveDesktop(), /Nemo — Documents/);
  assert.doesNotMatch(
    nemo.interactiveDesktop(),
    /Nemo — \.\.\/\.\.\/secret/
  );
});

test('Réouvrir Nemo réinitialise son historique', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Documents');
  nemo.handleSimulation('open:files');
  nemo.handleSimulation('history-back');

  assert.match(nemo.interactiveDesktop(), /Nemo — Personnel/);
});

test('La réinitialisation efface l’historique', () => {
  const nemo = createNemo();

  nemo.handleSimulation('folder:Documents');
  nemo.handleSimulation('reset');
  nemo.handleSimulation('open:files');
  nemo.handleSimulation('history-forward');

  assert.match(nemo.interactiveDesktop(), /Nemo — Personnel/);
});
