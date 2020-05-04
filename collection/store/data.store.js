/**
* Storing initial data and column information
*/
import { createStore } from '@stencil/store';
import size from 'lodash/size';
import DataSource from './data.manager';
import { setViewport } from './viewport.store';
import { setRealSize } from './dimension.store';
const store = createStore({
    data: [],
    columns: []
});
const dataStore = new DataSource(store);
function setColumn(data) {
    const cols = size(data);
    dataStore.setColumn(data);
    setViewport({ realCount: cols }, 'col');
    setRealSize(cols, 'col');
}
function setData(data) {
    const rows = size(data);
    dataStore.setData(data);
    setViewport({ realCount: rows }, 'row');
    setRealSize(rows, 'row');
}
export { setColumn, setData };
export default dataStore;
