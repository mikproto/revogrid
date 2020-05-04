'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8248193b.js');

const defineCustomElements = (win, options) => index.patchEsm().then(() => {
  return index.bootstrapLazy([["revo-grid_4.cjs",[[0,"revo-grid",{"dimensions":[16],"settings":[16],"source":[16],"columns":[16]}],[0,"revogr-data"],[0,"revogr-header"],[4,"revogr-viewport-scrollable",{"scrollX":[64],"scrollY":[64]}]]]], options);
});

exports.defineCustomElements = defineCustomElements;
