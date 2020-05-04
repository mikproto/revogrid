import each from 'lodash/each';
import sortedIndex from 'lodash/sortedIndex';
import reduce from 'lodash/reduce';
import { mergeSortedArray } from '../utils/utils';
/**
* Pre-calculation dimension sizes and sizes for each cell
*/
export function calculateDimensionData(state, newSizes) {
    let positionIndexes = [];
    const positionIndexToCoordinate = {};
    const itemIndexToCoordinate = {};
    // to compare how real width changed
    let newTotal = 0;
    // combine all sizes
    const sizes = Object.assign(Object.assign({}, state.sizes), newSizes);
    // prepare order sorted new sizes and calculate changed real size
    let newIndexes = [];
    each(newSizes, (size, index) => {
        // if first introduced custom size
        if (!state.sizes[index]) {
            newTotal += size - state.originItemSize;
            newIndexes.splice(sortedIndex(newIndexes, parseInt(index, 10)), 0, parseInt(index, 10));
        }
        else {
            newTotal += size - state.sizes[index];
        }
    });
    // add order to cached order collection for faster linking
    const updatedIndexesCache = mergeSortedArray(state.indexes, newIndexes);
    // fill new coordinates
    reduce(updatedIndexesCache, (previous, itemIndex, i) => {
        const newItem = {
            itemIndex,
            start: 0,
            end: 0
        };
        if (previous) {
            newItem.start = (itemIndex - previous.itemIndex - 1) * state.originItemSize + previous.end;
        }
        else {
            newItem.start = itemIndex * state.originItemSize;
        }
        newItem.end = newItem.start + sizes[itemIndex];
        positionIndexes.push(newItem.start);
        itemIndexToCoordinate[itemIndex] = positionIndexToCoordinate[i] = newItem;
        return newItem;
    }, undefined);
    return {
        indexes: updatedIndexesCache,
        realSize: state.realSize + newTotal,
        sizes,
        positionIndexes,
        positionIndexToCoordinate,
        itemIndexToCoordinate
    };
}
