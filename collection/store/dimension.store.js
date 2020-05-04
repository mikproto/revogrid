/**
* Storing pre-calculated
* Dimension information and sizes
*/
import { createStore } from '@stencil/store';
import reduce from 'lodash/reduce';
import { setStore } from './helpers';
import { setViewPortDimension } from './viewport.store';
import { calculateDimensionData } from './dimension.helpers';
function initialState() {
    return {
        indexes: [],
        // item index to size
        sizes: {},
        // order in indexes[] to coordinate
        positionIndexToCoordinate: {},
        // initial element to coordinate ^
        itemIndexToCoordinate: {},
        positionIndexes: [],
        // size which all items can take
        realSize: 0,
        // initial item size if it wasn't changed
        originItemSize: 0
    };
}
;
const rowsStore = createStore(initialState());
const colsStore = createStore(initialState());
function getCurrentState(type) {
    const state = initialState();
    const keys = Object.keys(state);
    let store = type === 'col' ? colsStore : rowsStore;
    return reduce(keys, (r, k) => {
        const data = store.get(k);
        r[k] = data;
        return r;
    }, state);
}
function getStoreByType(type) {
    switch (type) {
        case 'col':
            return colsStore;
        case 'row':
            return rowsStore;
    }
}
function setSettings(data, dimensionType) {
    const store = getStoreByType(dimensionType);
    setStore(store, { originItemSize: data });
}
function setRealSize(count, dimensionType) {
    const store = getStoreByType(dimensionType);
    let realSize = 0;
    for (let i = 0; i < count; i++) {
        realSize += store.get('sizes')[i] || store.get('originItemSize');
    }
    setStore(store, { realSize });
}
function setDimensionSize(sizes, dimensionType) {
    const store = getStoreByType(dimensionType);
    setStore(store, calculateDimensionData(getCurrentState(dimensionType), sizes));
    setViewPortDimension(sizes, dimensionType);
}
;
export { rowsStore, colsStore, setDimensionSize, setRealSize, setSettings, getCurrentState };
