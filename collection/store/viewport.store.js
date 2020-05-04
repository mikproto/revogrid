/**
* Store is responsible for visible
* Viewport information for each dimension
* Redraw items during scrolling
*/
import { createStore } from '@stencil/store';
import { addMissingItems, getFirstItem, getLastItem, getUpdatedItemsByPosition, isActiveRange } from './viewport.helpers';
import { getCurrentState } from './dimension.store';
import { setStore } from './helpers';
function initialState() {
    return {
        items: [],
        itemIndexes: [],
        frameOffset: 0,
        virtualSize: 0,
        realCount: 0
    };
}
;
const rowsStore = createStore(initialState());
const colsStore = createStore(initialState());
function getStoreByType(type) {
    switch (type) {
        case 'col':
            return colsStore;
        case 'row':
            return rowsStore;
    }
}
function getItems(store) {
    return {
        items: store.get('items'),
        itemIndexes: store.get('itemIndexes')
    };
}
function setViewport(data, dimensionType) {
    const store = getStoreByType(dimensionType);
    if (!data.virtualSize) {
        store.set('itemIndexes', []);
        store.set('items', []);
    }
    setStore(store, data);
}
function setViewPortCoordinate(position, dimensionType) {
    const store = getStoreByType(dimensionType);
    // no visible data to calculate
    if (!store.get('virtualSize')) {
        return;
    }
    const dimension = getCurrentState(dimensionType);
    const outsize = store.get('frameOffset') * 2 * dimension.originItemSize;
    const virtualSize = store.get('virtualSize') + outsize;
    let maxCoordinate = 0;
    if (dimension.realSize > virtualSize) {
        maxCoordinate = dimension.realSize - virtualSize;
    }
    let pos = position;
    pos -= store.get('frameOffset') * dimension.originItemSize;
    pos = pos < 0 ? 0 : pos < maxCoordinate ? pos : maxCoordinate;
    const firstItem = getFirstItem(getItems(store));
    const lastItem = getLastItem(getItems(store));
    // left position changed
    if (!isActiveRange(pos, firstItem)) {
        const toUpdate = getUpdatedItemsByPosition(pos, getItems(store), store.get('realCount'), virtualSize, dimension);
        setStore(store, toUpdate);
        // right position changed
    }
    else if (firstItem && (store.get('virtualSize') + pos) > (lastItem === null || lastItem === void 0 ? void 0 : lastItem.end)) {
        const toUpdate = addMissingItems(firstItem, store.get('realCount'), virtualSize + pos - firstItem.start, getItems(store), dimension);
        setStore(store, {
            items: [...store.get('items'), ...toUpdate.items],
            itemIndexes: [...store.get('itemIndexes'), ...toUpdate.itemIndexes]
        });
    }
}
function setViewPortDimension(sizes, dimensionType) {
    const store = getStoreByType(dimensionType);
    // viewport not inited
    if (!store.get('items').length) {
        return;
    }
    const items = store.get('items');
    let changedCoordinate = 0;
    for (let i of store.get('itemIndexes')) {
        let changedSize = 0;
        const item = items[i];
        // change pos if size change present before
        if (changedCoordinate) {
            item.start += changedCoordinate;
            item.end += changedCoordinate;
        }
        // change size
        const size = sizes[item.itemIndex] || 0;
        if (size) {
            changedSize = size - item.size;
            changedCoordinate += changedSize;
            item.size = size;
        }
        if (changedSize || changedCoordinate) {
            items[i] = Object.assign({}, item);
        }
    }
    setStore(store, { items });
}
export { setViewport, setViewPortCoordinate, setViewPortDimension, rowsStore, colsStore };
