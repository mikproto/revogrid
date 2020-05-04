import { a as patchEsm, b as bootstrapLazy } from './index-b7d7b9ba.js';
var defineCustomElements = function (win, options) { return patchEsm().then(function () {
    return bootstrapLazy([["revo-grid_4", [[0, "revo-grid", { "dimensions": [16], "settings": [16], "source": [16], "columns": [16] }], [0, "revogr-data"], [0, "revogr-header"], [4, "revogr-viewport-scrollable", { "scrollX": [64], "scrollY": [64] }]]]], options);
}); };
export { defineCustomElements };
